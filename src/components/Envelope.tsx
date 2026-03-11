import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type EnvelopeProps = {
  groomName?: string;
  brideName?: string;
  onOpen: () => void;
};

export default function Envelope({
  groomName = "Anh Tú",
  brideName = "Trịnh Huyền",
  onOpen,
}: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [letterAbove, setLetterAbove] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;

    setIsOpen(true);

    setTimeout(() => {
      setLetterAbove(true);
    }, 650);

    setTimeout(() => {
      setIsDone(true);
      onOpen();
    }, 2600);
  };

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center touch-none"
          style={{ backgroundColor: "#fff5f5" }}
        >
          <div
            className="relative w-[340px] h-[240px]"
            style={{ perspective: 1200 }}
          >
            {/* Envelope body */}
            <div
              className="absolute inset-0 rounded-md"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 20px 40px -15px rgba(97, 16, 16, 0.25)",
                border: "1px solid #e8c8c8",
              }}
            >
              {/* Letter inside */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: isOpen ? -200 : 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className={cn(
                  "absolute inset-x-2 top-2 bottom-2 rounded-md flex flex-col items-center justify-center p-4 shadow-sm overflow-hidden transition-all duration-300",
                  letterAbove ? "z-30" : "z-0"
                )}
                style={{
                  backgroundColor: "#fdf8f6",
                  border: "1px solid #e8d0c8",
                }}
              >
                {/* Floral decoration top */}
                <svg
                  className="absolute top-2 left-1/2 -translate-x-1/2 opacity-20 w-32 h-16"
                  viewBox="0 0 200 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 0 C120 40 180 50 200 60 C160 70 120 50 100 100 C80 50 40 70 0 60 C20 50 80 40 100 0 Z"
                    fill="#8a0d0d"
                  />
                  <circle cx="100" cy="50" r="10" fill="#611010" />
                  <path
                    d="M70 40 C60 30 40 20 20 30"
                    stroke="#8a0d0d"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M130 40 C140 30 160 20 180 30"
                    stroke="#8a0d0d"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>

                <div
                  className="text-[10px] tracking-[0.4em] mb-4 uppercase mt-2"
                  style={{
                    color: "#8a0d0d",
                    fontFamily: "Quicksand",
                  }}
                >
                  Wedding Invitation
                </div>

                <div
                  className="text-4xl mb-0 leading-none"
                  style={{
                    fontFamily: "Mallong",
                    color: "#611010",
                  }}
                >
                  {brideName}
                </div>

                <div
                  className="text-3xl my-2 opacity-70"
                  style={{
                    fontFamily: "Babylonica, serif",
                    color: "#c9a96e",
                    transform: "rotate(-10deg)",
                  }}
                >
                  &
                </div>

                <div
                  className="text-4xl leading-none mb-4"
                  style={{
                    fontFamily: "Mallong",
                    color: "#611010",
                  }}
                >
                  {groomName}
                </div>

                {/* Floral decoration bottom */}
                <svg
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-10 w-24 h-12 rotate-180"
                  viewBox="0 0 200 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 0 C120 40 180 50 200 60 C160 70 120 50 100 100 C80 50 40 70 0 60 C20 50 80 40 100 0 Z"
                    fill="#8a0d0d"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Envelope flap */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isOpen ? -130 : 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
              }}
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
              // drop-shadow handled via filter style
            >
              <svg
                viewBox="0 0 340 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
                style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}
              >
                <path
                  d="M0 0L170 140L340 0H0Z"
                  fill="#fefafa"
                  stroke="#e8c8c8"
                  strokeWidth="1"
                />
                <path
                  d="M10 5L170 130L330 5"
                  stroke="#f5e8e8"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </motion.div>

            {/* Envelope front faces */}
            <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end">
              <svg
                viewBox="0 0 340 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 -1px 2px rgba(0,0,0,0.02))" }}
              >
                {/* Left */}
                <path
                  d="M0 0L170 140L0 240V0Z"
                  fill="#faf5f5"
                  stroke="#e8c8c8"
                  strokeWidth="1"
                />
                {/* Right */}
                <path
                  d="M340 0L170 140L340 240V0Z"
                  fill="#faf5f5"
                  stroke="#e8c8c8"
                  strokeWidth="1"
                />
                {/* Bottom */}
                <path
                  d="M0 240L170 120L340 240H0Z"
                  fill="#ffffff"
                  stroke="#e8c8c8"
                  strokeWidth="1"
                />
                {/* Decorative line */}
                <path
                  d="M0 200 Q 80 230 170 200 T 340 200"
                  stroke="#e8c8c8"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            {/* Wax seal button */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                opacity: isOpen ? 0 : 1,
                scale: isOpen ? 0.8 : 1,
              }}
              transition={{ duration: 0.4 }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
              style={{ top: "130px" }}
            >
              <button
                onClick={handleOpen}
                className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "#8a0d0d",
                  boxShadow: "0 6px 15px rgba(97, 16, 16, 0.35)",
                  border: "2px solid #611010",
                  color: "#fff5f5",
                }}
              >
                <div
                  className="absolute inset-0 opacity-80"
                  style={{
                    background:
                      "linear-gradient(to top right, #611010, #b5443a)",
                  }}
                />

                {/* Seal rings */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "3px",
                    border: "1px solid rgba(201, 169, 110, 0.5)",
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "6px",
                    border: "1px solid rgba(97, 16, 16, 0.3)",
                  }}
                />

                {/* Wax texture */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M50 5 C60 2 70 8 75 15 C85 20 95 30 90 40 C95 50 90 60 85 70 C80 85 70 95 50 90 C30 95 20 85 15 70 C10 60 5 50 10 40 C5 30 15 20 25 15 C30 8 40 2 50 5 Z"
                    fill="none"
                    stroke="#fff5f5"
                    strokeWidth="1"
                    opacity="0.1"
                  />
                </svg>

                <span
                  className="relative z-10 text-3xl leading-none mt-2 text-white"
                  style={{
                    fontFamily: "Babylonica, serif",
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                  }}
                >
                  O
                </span>

                {/* Light reflection */}
                <div
                  className="absolute w-4 h-2 rounded-full"
                  style={{
                    top: "4px",
                    left: "8px",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    transform: "rotate(-45deg)",
                    filter: "blur(1px)",
                  }}
                />
              </button>
              <div
                className="absolute -bottom-6 w-full text-center pointer-events-none uppercase"
                style={{
                  fontFamily: "Quicksand",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "#8a0d0d",
                }}
              >
                Mở thiệp
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}