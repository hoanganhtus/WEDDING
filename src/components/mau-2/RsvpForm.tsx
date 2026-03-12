import { useState } from "react";
import type React from "react";
import { addRsvp } from "../../lib/storage";

export default function RsvpForm() {
  const [ten, setTen] = useState("");
  const [thamDu, setThamDu] = useState<"co" | "khong">("co");
  const [soLuong, setSoLuong] = useState("1");
  const [phia, setPhia] = useState<"nha-trai" | "nha-gai">("nha-trai");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ten.trim()) return;
    addRsvp({
      id: Date.now().toString(),
      ten: ten.trim(),
      thamDu,
      soLuong: parseInt(soLuong),
      phia,
      createdAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <div className="text-4xl mb-3">💌</div>
        <p className="text-primary font-semibold text-base">
          Cảm ơn {ten} đã xác nhận!
        </p>
        <p className="text-gray-500 text-sm mt-1">
          {thamDu === "co"
            ? "Chúng tôi rất vui khi biết bạn sẽ tham dự!"
            : "Rất tiếc khi bạn không thể tham dự lần này."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-6 max-w-sm mx-auto bg-white rounded-[5px] border border-gray-200">
      <h3 className="text-center text-[15px] font-bold text-gray-700 mb-1">
        Xác nhận tham dự
      </h3>

      <div className="flex flex-col gap-1">
        <label className="text-[12px] text-gray-600">Họ và tên</label>
        <input
          type="text"
          placeholder="Nhập tên của bạn"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[12px] text-gray-600">Bạn sẽ tham dự chứ?</label>
        <label className="flex items-center gap-2 text-[13px] cursor-pointer">
          <input
            type="radio"
            name="thamDu"
            value="co"
            checked={thamDu === "co"}
            onChange={() => setThamDu("co")}
            className="accent-[#611010]"
          />
          Có, tôi sẽ tham dự
        </label>
        <label className="flex items-center gap-2 text-[13px] cursor-pointer">
          <input
            type="radio"
            name="thamDu"
            value="khong"
            checked={thamDu === "khong"}
            onChange={() => setThamDu("khong")}
            className="accent-[#611010]"
          />
          Tôi bận, rất tiếc không thể tham dự
        </label>
      </div>

      {thamDu === "co" && (
        <div className="flex flex-col gap-1">
          <label className="text-[12px] text-gray-600">Số lượng người tham dự</label>
          <select
            value={soLuong}
            onChange={(e) => setSoLuong(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-primary"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} người
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-[12px] text-gray-600">Bạn là khách mời của ai?</label>
        <label className="flex items-center gap-2 text-[13px] cursor-pointer">
          <input
            type="radio"
            name="phia"
            value="nha-trai"
            checked={phia === "nha-trai"}
            onChange={() => setPhia("nha-trai")}
            className="accent-[#611010]"
          />
          Nhà trai
        </label>
        <label className="flex items-center gap-2 text-[13px] cursor-pointer">
          <input
            type="radio"
            name="phia"
            value="nha-gai"
            checked={phia === "nha-gai"}
            onChange={() => setPhia("nha-gai")}
            className="accent-[#611010]"
          />
          Nhà gái
        </label>
      </div>

      <button
        type="submit"
        className="bg-[#611010] text-white rounded-md py-3 text-[10px] font-base tracking-widest mt-2 active:opacity-80"
        style={{ fontFamily: "Arial" }}
      >
        Gửi xác nhận
      </button>
    </form>
  );
}
