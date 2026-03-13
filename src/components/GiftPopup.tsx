import { motion, AnimatePresence } from "framer-motion";

interface GiftPopupProps {
  isOpen: boolean;
  onClose: () => void;
  qrChuRe: string;
  qrCoDau: string;
  stkChuRe?: string;
  stkCoDau?: string;
  bankChuRe?: string;
  bankCoDau?: string;
}

export default function GiftPopup({
  isOpen,
  onClose,
  qrChuRe,
  qrCoDau,
  stkChuRe = "109877369318",
  stkCoDau = "0987654321",
  bankChuRe = "Viettinbank",
  bankCoDau = "Vietcombank",
}: GiftPopupProps) {
  const handleCopy = (stk: string) => {
    navigator.clipboard.writeText(stk);
    alert("Đã copy số tài khoản: " + stk);
  };

  const handleDownload = (qrUrl: string, name: string) => {
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `QR_${name}.webp`; // Use webp since qrUrl is likely webp
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-[95%] max-w-[400px] bg-white rounded-[20px] shadow-2xl overflow-hidden font-sans"
          >
            {/* Nút đóng (X) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
              </svg>
            </button>

            {/* Header */}
            <div className="px-6 pt-8 pb-4 text-center border-b border-gray-100">
              <h2 className="text-[28px] font-bold text-[#c2904c] mb-2 tracking-wide" style={{ fontFamily: "Quicksand, sans-serif" }}>
                Hộp mừng cưới
              </h2>
              <p className="text-[13px] text-[#c2904c] italic">
                Vợ chồng mình xin cảm ơn tất cả tình cảm của mọi người ♥ ♥
              </p>
            </div>

            {/* Nội dung 2 bên */}
            <div className="flex justify-between p-5 gap-3">
              {/* Chú Rể */}
              <div className="flex flex-col flex-1 items-center">
                <h3 className="text-[13px] font-bold text-[#c2904c] mb-2 text-center min-h-[36px] uppercase flex items-end justify-center">
                  MỪNG CƯỚI ĐẾN<br />CHÚ RỂ
                </h3>
                <div className="w-full aspect-square bg-[#f8f9fa] border border-[#e5e7eb] rounded-[10px] overflow-hidden mb-3 p-2">
                  <img
                    src={qrChuRe}
                    alt="QR Chú Rể"
                    className="w-full h-full object-contain mix-blend-multiply"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="text-center mb-3">
                  <p className="text-[14px] font-bold text-gray-800 uppercase">{bankChuRe}</p>
                  <p className="text-[13px] text-gray-600 font-semibold">{stkChuRe}</p>
                </div>

                <div className="flex gap-2 w-full justify-center">
                  <button
                    onClick={() => handleDownload(qrChuRe, "ChuRe")}
                    className="flex-1 bg-[#c2904c] hover:bg-[#b08040] text-white text-[13px] py-1.5 px-0.5 rounded-[5px] transition-colors font-semibold border border-[#c2904c] flex flex-col items-center justify-center !leading-[1.1]"
                  >
                    <span>Tải</span>
                    <span>ảnh QR</span>
                  </button>
                  <button
                    onClick={() => handleCopy(stkChuRe)}
                    className="flex-1 bg-white hover:bg-gray-50 text-[#c2904c] text-[13px] py-1.5 px-0.5 rounded-[5px] transition-colors font-semibold border border-[#c2904c] flex flex-col items-center justify-center !leading-[1.1]"
                  >
                    <span>Copy</span>
                    <span>STK</span>
                  </button>
                </div>
              </div>

              {/* Cô Dâu */}
              <div className="flex flex-col flex-1 items-center">
                <h3 className="text-[13px] font-bold text-[#c2904c] mb-2 text-center min-h-[36px] uppercase flex items-end justify-center">
                  MỪNG CƯỚI ĐẾN<br />CÔ DÂU
                </h3>
                <div className="w-full aspect-square bg-[#f8f9fa] border border-[#e5e7eb] rounded-[10px] overflow-hidden mb-3 p-2">
                  <img
                    src={qrCoDau}
                    alt="QR Cô Dâu"
                    className="w-full h-full object-contain mix-blend-multiply"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="text-center mb-3">
                  <p className="text-[14px] font-bold text-gray-800 uppercase">{bankCoDau}</p>
                  <p className="text-[13px] text-gray-600 font-semibold">{stkCoDau}</p>
                </div>

                <div className="flex gap-2 w-full justify-center">
                  <button
                    onClick={() => handleDownload(qrCoDau, "CoDau")}
                    className="flex-1 bg-[#c2904c] hover:bg-[#b08040] text-white text-[13px] py-1.5 px-0.5 rounded-[5px] transition-colors font-semibold border border-[#c2904c] flex flex-col items-center justify-center !leading-[1.1]"
                  >
                    <span>Tải</span>
                    <span>ảnh QR</span>
                  </button>
                  <button
                    onClick={() => handleCopy(stkCoDau)}
                    className="flex-1 bg-white hover:bg-gray-50 text-[#c2904c] text-[13px] py-1.5 px-0.5 rounded-[5px] transition-colors font-semibold border border-[#c2904c] flex flex-col items-center justify-center !leading-[1.1]"
                  >
                    <span>Copy</span>
                    <span>STK</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
