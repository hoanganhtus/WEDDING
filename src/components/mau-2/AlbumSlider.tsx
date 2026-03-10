import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AlbumSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : images.length - 1));
  const next = () => setCurrent((c) => (c < images.length - 1 ? c + 1 : 0));

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (thumbRef.current) {
      const thumb = thumbRef.current.children[current] as HTMLElement;
      if (thumb)
        thumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
    }
  }, [current]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full bg-[#611010] pb-2">
      <div className="relative w-full aspect-4/3 p-4">
        <img
          src={images[current]}
          alt={`Album ảnh ${current + 1}`}
          className="w-full h-full object-cover rounded-2xl"
        />
        <button
          onClick={prev}
          className="flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full text-lg hover:bg-black/60"
        >
          <ChevronLeft size={20} className="pr-0.5" />
        </button>
        <button
          onClick={next}
          className="flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full text-lg hover:bg-black/60"
        >
          <ChevronRight size={20} className="pl-0.5" />
        </button>
        <button
          onClick={() => setFullscreen(true)}
          className="absolute top-2 right-2 bg-black/40 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm hover:bg-black/60"
          aria-label="Toàn màn hình"
        >
          ⛶
        </button>
      </div>

      <div
        ref={thumbRef}
        className="flex justify-center gap-2 w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`shrink-0 w-[62px] h-[62px] rounded overflow-hidden border transition-all snap-start ${
              i === current ? "border-blue-500 opacity-100" : "border-transparent hover:opacity-90"
            }`}
          >
            <img src={img} alt={`Thumbnail ${i + 1}`} className="w-[62px] h-[62px] object-cover rounded-md" />
          </button>
        ))}
      </div>

      {fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl z-10"
            onClick={() => setFullscreen(false)}
          >
            ✕
          </button>
          <div
            className="relative flex items-center justify-center w-full max-w-lg px-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prev}
              className="absolute left-0 text-white text-4xl w-10 h-10 flex items-center justify-center"
            >
              ‹
            </button>
            <img
              src={images[current]}
              alt={`Ảnh ${current + 1}`}
              className="max-h-[80vh] max-w-full rounded-xl object-contain"
            />
            <button
              onClick={next}
              className="absolute right-0 text-white text-4xl w-10 h-10 flex items-center justify-center"
            >
              ›
            </button>
          </div>
          <p className="text-white/60 text-sm mt-3">
            {current + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
