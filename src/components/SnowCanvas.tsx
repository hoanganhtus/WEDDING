import { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  r: number;
  speed: number;
  wind: number;
  opacity: number;
  wobble: number;
  angle: number;
  rotationSpeed: number;
}

interface Slot {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  flakes: Snowflake[];
  w: number;
  h: number;
  minR: number;
  maxR: number;
  img: HTMLImageElement | null;
}

const slots = new Set<Slot>();
let rafId: number | null = null;

function randomFlake(w: number, h: number, minR: number, maxR: number, yStart?: number): Snowflake {
  return {
    x: Math.random() * w,
    y: yStart !== undefined ? yStart : Math.random() * h,
    r: Math.random() * (maxR - minR) + minR,
    speed: Math.random() * 0.8 + 0.4,
    wind: Math.random() * 0.4 - 0.2,
    opacity: Math.random() * 0.5 + 0.3,
    wobble: Math.random() * Math.PI * 2,
    angle: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
  };
}

function createFlakes(w: number, h: number, count: number, minR: number, maxR: number): Snowflake[] {
  return Array.from({ length: count }, () => randomFlake(w, h, minR, maxR));
}

function tick() {
  for (const slot of slots) {
    const { ctx, flakes, w, h, img } = slot;
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      f.wobble += 0.012;
      f.x += f.wind + Math.sin(f.wobble) * 0.35;
      f.y += f.speed;
      f.angle += f.rotationSpeed;

      if (f.y > h + f.r) {
        flakes[i] = randomFlake(w, h, slot.minR, slot.maxR, -f.r);
        continue;
      }
      if (f.x > w + f.r) f.x = -f.r;
      if (f.x < -f.r) f.x = w + f.r;

      ctx.save();
      ctx.globalAlpha = f.opacity;
      ctx.translate(f.x, f.y);
      ctx.rotate(f.angle);

      if (img) {
        const s = f.r * 2;
        ctx.drawImage(img, -f.r, -f.r, s, s);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, f.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      ctx.restore();
    }
  }

  rafId = requestAnimationFrame(tick);
}

function registerSlot(slot: Slot) {
  slots.add(slot);
  if (rafId === null) rafId = requestAnimationFrame(tick);
}

function unregisterSlot(slot: Slot) {
  slots.delete(slot);
  if (slots.size === 0 && rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

interface SnowCanvasProps {
  count?: number;
  size?: number | [number, number];
  image?: string;
  className?: string;
}

export default function SnowCanvas({ count = 80, size = [1, 4], image, className }: SnowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [minR, maxR] = Array.isArray(size) ? size : [1, size];

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx2d = el.getContext("2d");
    if (!ctx2d) return;

    const parent = el.parentElement!;
    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    el.width = w;
    el.height = h;

    const slot: Slot = {
      canvas: el,
      ctx: ctx2d,
      flakes: createFlakes(w, h, count, minR, maxR),
      w,
      h,
      minR,
      maxR,
      img: null,
    };

    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        slot.img = img;
      };
    }

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      el.width = width;
      el.height = height;
      slot.w = width;
      slot.h = height;
      slot.flakes = createFlakes(width, height, count, minR, maxR);
    });
    ro.observe(parent);

    registerSlot(slot);

    return () => {
      ro.disconnect();
      unregisterSlot(slot);
    };
  }, [count, minR, maxR, image]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
