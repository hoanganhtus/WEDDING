import { useState, useEffect } from "react";
import { getWishesList, addWish, type WishEntry } from "../lib/storage";

interface WishesSectionProps {
  primaryColor?: string;
  cardBg?: string;
  inputBg?: string;
  btnColor?: string;
  title?: string;
  className?: string;
}

const EMOJIS = ["❤️", "🌸", "🥂", "🌹", "🎊", "💌", "✨", "🙏"];

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Vừa xong";
  if (diffMin < 60) return `${diffMin} phút trước`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH} giờ trước`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `${diffD} ngày trước`;
  return d.toLocaleDateString("vi-VN");
}

export default function WishesSection({
  primaryColor = "#4c2d1f",
  cardBg = "#fffffff0",
  inputBg = "#fdf5ec",
  btnColor = "#c9a96e",
  title = "Sổ lưu bút",
  className = "",
}: WishesSectionProps) {
  const [open, setOpen] = useState(false);
  const [wishes, setWishes] = useState<WishEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setWishes(getWishesList());
  }, []);

  const appendEmoji = (emoji: string) => setMessage((prev) => prev + emoji);

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) return;
    const newWish: WishEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      created_at: new Date().toISOString(),
    };
    addWish(newWish);
    setWishes((prev) => [newWish, ...prev]);
    setName("");
    setMessage("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const borderColor = primaryColor + "44";
  const subTextColor = primaryColor + "99";

  return (
    <div className={`fixed bottom-[4.5rem] right-4 z-50 flex flex-col items-end pointer-events-none ${className}`}>
      {open && (
        <div
          className="pointer-events-auto w-72 rounded-2xl mb-2 shadow-2xl overflow-hidden"
          style={{ background: cardBg, border: `1px solid ${borderColor}` }}
        >
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{ borderBottom: `1px solid ${borderColor}`, background: inputBg }}
          >
            <p className="font-bold text-sm" style={{ color: primaryColor }}>
              💌 {title}
            </p>
            <button onClick={() => setOpen(false)} className="text-lg leading-none" style={{ color: subTextColor }}>
              ×
            </button>
          </div>

          <div className="max-h-48 overflow-y-auto px-3 py-2 flex flex-col gap-2">
            {wishes.length === 0 && (
              <p className="text-xs text-center py-3" style={{ color: subTextColor }}>
                Hãy là người đầu tiên gửi lời chúc! 🌸
              </p>
            )}
            {wishes.map((w) => (
              <div
                key={w.id}
                className="rounded-xl px-3 py-2"
                style={{ border: `1px solid ${borderColor}`, background: inputBg }}
              >
                <div className="flex justify-between items-center mb-0.5">
                  <p className="font-bold text-[12px]" style={{ color: primaryColor }}>{w.name}</p>
                  <p className="text-[10px] shrink-0 ml-2" style={{ color: subTextColor }}>{formatTime(w.created_at)}</p>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: primaryColor + "dd" }}>{w.message}</p>
              </div>
            ))}
          </div>

          <div className="px-3 pb-3 pt-2 flex flex-col gap-2" style={{ borderTop: `1px solid ${borderColor}` }}>
            <input
              type="text"
              value={name}
              maxLength={100}
              placeholder="Tên của bạn..."
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-xs focus:outline-none"
              style={{ border: `1px solid ${borderColor}`, color: primaryColor, background: inputBg }}
            />
            <div className="flex gap-2">
              <textarea
                value={message}
                maxLength={500}
                rows={2}
                placeholder="Gửi lời chúc..."
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 rounded-lg px-3 py-2 text-xs resize-none focus:outline-none"
                style={{ border: `1px solid ${borderColor}`, color: primaryColor, background: inputBg }}
              />
              <button
                onClick={handleSubmit}
                className="px-3 py-2 rounded-lg text-xs font-semibold self-end shrink-0"
                style={{ background: btnColor, color: primaryColor }}
              >
                Gửi
              </button>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {EMOJIS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => appendEmoji(em)}
                  className="text-sm hover:scale-125 transition-transform"
                >
                  {em}
                </button>
              ))}
            </div>
            {success && <p className="text-xs text-green-600">✓ Đã gửi lời chúc!</p>}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl text-xs font-semibold transition-transform active:scale-95"
        style={{ background: btnColor, color: primaryColor }}
      >
        <span>Gửi lời chúc</span>
        <span>💌</span>
        {wishes.length > 0 && (
          <span
            className="bg-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold"
            style={{ color: primaryColor }}
          >
            {wishes.length}
          </span>
        )}
      </button>
    </div>
  );
}
