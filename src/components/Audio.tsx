import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

type AudioProps = {
  src: string;
  className?: string;
};

function Audio({ src, className }: AudioProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && src) {
      const el = audioRef.current;
      const playPromise = el.play();

      el.addEventListener("pause", () => setIsPlaying(false));
      el.addEventListener("play", () => setIsPlaying(true));

      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [src]);

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((error) => console.error("Lỗi khi phát audio:", error));
        }
      }
    }
  };

  if (!src || src.trim() === "") return null;

  return (
    <div className={cn("fixed bottom-14 right-4 z-40", className)}>
      <audio ref={audioRef} autoPlay loop preload="auto">
        <source src={src} type="audio/mpeg" />
        <source src={src} type="audio/mp3" />
        <source src={src} type="audio/wav" />
        <source src={src} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <button
        aria-label="Play music"
        className="relative w-12 h-12 rounded-full shadow-lg cursor-pointer focus:outline-none transition-all hover:scale-110 active:scale-95 hover:shadow-xl"
        onClick={handleTogglePlay}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(to right bottom, rgba(76, 45, 31, 0.8), rgb(76, 45, 31), rgba(76, 45, 31, 0.867))",
          }}
        >
          <div className="absolute inset-1 rounded-full border border-white/20"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-transparent"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-end gap-0.5 h-4">
                <motion.div
                  initial={{ height: "60%" }}
                  animate={{ height: "50%" }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
                  className="w-1 bg-white rounded-full"
                />
                <motion.div
                  initial={{ height: "100%" }}
                  animate={{ height: "50%" }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse", delay: 0.04 }}
                  className="w-1 bg-white rounded-full"
                />
                <motion.div
                  initial={{ height: "40%" }}
                  animate={{ height: "50%" }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse", delay: 0.08 }}
                  className="w-1 bg-white rounded-full"
                />
                <motion.div
                  initial={{ height: "80%" }}
                  animate={{ height: "50%" }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse", delay: 0.12 }}
                  className="w-1 bg-white rounded-full"
                />
              </div>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}

export default Audio;
