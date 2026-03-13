import { useState } from "react";
import { useParams } from "react-router-dom";
import { submitRsvp, submitWish } from "../lib/api";
import FadeIn from "../components/FadeIn";
import PageLayout from "../components/PageLayout";
import jsonData from "../data/mau-2-initial.json";

export default function GuestFormPage() {
  const { side } = useParams<{ side: string }>();
  const [activeTab, setActiveTab] = useState<'rsvp' | 'wishes'>('rsvp');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Xác định kiểu (co-dau hoặc chu-re)
  const isBride = side === 'co-dau';
  const sideLabel = isBride ? 'co-dau' as const : 'chu-re' as const;
  const sideTitle = isBride ? 'Thiệp mời cô dâu' : 'Thiệp mời chú rể';
  
  const { thongTin } = jsonData;

  // RSVP Form
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    is_attending: 'co' as 'co' | 'khong',
    guest_count: 1,
  });

  // Wishes Form
  const [wishForm, setWishForm] = useState({
    name: "",
    message: "",
  });

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) return;

    setLoading(true);
    try {
      await submitRsvp({
        ...rsvpForm,
        side: sideLabel,
      });
      setMessage("✓ Cảm ơn bạn đã xác nhận!");
      setRsvpForm({ name: "", is_attending: 'co', guest_count: 1 });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("✗ Lỗi: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishForm.name.trim() || !wishForm.message.trim()) return;

    setLoading(true);
    try {
      await submitWish({
        ...wishForm,
        side: sideLabel,
      });
      setMessage("✓ Cảm ơn lời chúc của bạn!");
      setWishForm({ name: "", message: "" });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("✗ Lỗi: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout scrollDuration={0}>
      {/* Header Section */}
      <section className="relative w-full" style={{ minHeight: "300px" }}>
        <FadeIn variant="scale" duration={1.2}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              background: isBride 
                ? 'linear-gradient(135deg, #fef5f5 0%, #ffe0e0 100%)' 
                : 'linear-gradient(135deg, #f0f4f8 0%, #e0f2fe 100%)',
              minHeight: "300px",
            }}
          >
            {/* Overlay text */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                top: 0,
                padding: "20px",
                zIndex: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <FadeIn variant="fadeDown" delay={0.3}>
                <div style={{ fontSize: "40px", color: "#611010", fontFamily: "HoaTay1", fontWeight: "1000" }}>
                  Thiệp cưới
                </div>
              </FadeIn>
              <FadeIn variant="fadeUp" delay={0.5}>
                <div style={{ fontSize: "18px", color: "#611010", fontFamily: "HoaTay1", fontWeight: "600", marginTop: "10px" }}>
                  {sideTitle}
                </div>
              </FadeIn>
              <FadeIn variant="fadeUp" delay={0.7}>
                <p style={{ fontSize: "14px", color: "#666", marginTop: "15px" }}>
                  {thongTin.chuRe} &amp; {thongTin.coDau}
                </p>
              </FadeIn>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Form Section */}
      <section className="relative bg-primary w-full px-6 py-8">
        <FadeIn variant="fadeUp" delay={0.2}>
          <div className="space-y-8">
            {/* Tabs */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setActiveTab('rsvp')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  activeTab === 'rsvp'
                    ? 'bg-[#cf9c52] text-white'
                    : 'bg-white/20 text-[#fef9e6] border border-[#fef9e6]/30'
                }`}
              >
                Xác nhận tham dự
              </button>
              <button
                onClick={() => setActiveTab('wishes')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  activeTab === 'wishes'
                    ? 'bg-[#cf9c52] text-white'
                    : 'bg-white/20 text-[#fef9e6] border border-[#fef9e6]/30'
                }`}
              >
                Gửi lời chúc
              </button>
            </div>

            {/* Message */}
            {message && (
              <div className={`p-4 rounded-lg text-center font-semibold ${
                message.startsWith('✓') 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-red-500/20 text-red-300'
              }`}>
                {message}
              </div>
            )}

            {/* Forms */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#fef9e6]/20">
              {activeTab === 'rsvp' && (
                <form onSubmit={handleRsvpSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold text-[#fef9e6] mb-6">Xác nhận tham dự</h2>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#fef9e6]">
                      Họ và tên <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                      className="w-full px-4 py-2 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cf9c52]"
                      placeholder="Nhập họ tên"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3 text-[#fef9e6]">
                      Bạn có thể tham dự không? <span className="text-red-400">*</span>
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center text-[#fef9e6]">
                        <input
                          type="radio"
                          name="attending"
                          value="co"
                          checked={rsvpForm.is_attending === 'co'}
                          onChange={() => setRsvpForm({ ...rsvpForm, is_attending: 'co' })}
                          className="mr-2 accent-[#cf9c52]"
                        />
                        <span>Có, tôi sẽ tham dự</span>
                      </label>
                      <label className="flex items-center text-[#fef9e6]">
                        <input
                          type="radio"
                          name="attending"
                          value="khong"
                          checked={rsvpForm.is_attending === 'khong'}
                          onChange={() => setRsvpForm({ ...rsvpForm, is_attending: 'khong' })}
                          className="mr-2 accent-[#cf9c52]"
                        />
                        <span>Không, tôi không thể tham dự</span>
                      </label>
                    </div>
                  </div>

                  {rsvpForm.is_attending === 'co' && (
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#fef9e6]">
                        Số lượng khách <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={rsvpForm.guest_count}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, guest_count: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cf9c52]"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#cf9c52] hover:bg-[#b8854f]'
                    }`}
                  >
                    {loading ? 'Đang gửi...' : 'Xác nhận'}
                  </button>
                </form>
              )}

              {activeTab === 'wishes' && (
                <form onSubmit={handleWishSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold text-[#fef9e6] mb-6">Gửi lời chúc</h2>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#fef9e6]">
                      Tên của bạn <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={wishForm.name}
                      onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })}
                      className="w-full px-4 py-2 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cf9c52]"
                      placeholder="Nhập tên"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#fef9e6]">
                      Lời chúc <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={wishForm.message}
                      onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })}
                      className="w-full px-4 py-2 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cf9c52] resize-none"
                      rows={5}
                      placeholder="Nhập lời chúc của bạn"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#cf9c52] hover:bg-[#b8854f]'
                    }`}
                  >
                    {loading ? 'Đang gửi...' : 'Gửi lời chúc'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <section className="relative bg-primary w-full px-6 py-8 text-center">
        <FadeIn variant="fadeUp">
          <p className="text-[#fef9e6]/70 text-sm">
            Cảm ơn bạn đã xác nhận và gửi lời chúc đến chúng tôi! <br/>
            <span className="mt-2 block">Rất mong được bạn tham gia trong ngày vui của chúng tôi.</span>
          </p>
        </FadeIn>
      </section>
    </PageLayout>
  );
}
