import { useEffect, useRef, type ReactNode } from "react";

interface AutoScrollContainerProps {
  /** Thời gian cuộn toàn bộ trang (ms). Đặt 0 để tắt. */
  duration?: number;
  /** Delay trước khi bắt đầu cuộn (ms). */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

export default function AutoScrollContainer({
  duration = 300,
  delay = 500,
  className,
  style,
  children,
}: AutoScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTop = 0;
    let startTime: number | null = null;
    let rafId: number;
    let stopped = false;

    const stop = () => {
      stopped = true;
      cancelAnimationFrame(rafId);
    };

    const step = (timestamp: number) => {
      if (stopped) return;
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const maxScroll = container.scrollHeight - container.clientHeight;
      container.scrollTop = maxScroll * progress;
      if (progress < 1) rafId = requestAnimationFrame(step);
    };

    container.addEventListener("click", stop, { once: true });
    container.addEventListener("wheel", stop, { once: true });
    container.addEventListener("touchstart", stop, { once: true });
    container.addEventListener("touchmove", stop, { once: true });

    const timeout = setTimeout(() => {
      if (!stopped && duration > 0) rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
      container.removeEventListener("click", stop);
      container.removeEventListener("wheel", stop);
      container.removeEventListener("touchstart", stop);
      container.removeEventListener("touchmove", stop);
    };
  }, [duration, delay]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
}
