import { useRef, useEffect, useState, type CSSProperties, type ReactNode } from "react";

interface AutoFitTextProps {
  children: ReactNode;
  maxFontSize?: number;
  minFontSize?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Tự co font-size để text luôn nằm trên 1 dòng.
 * Bắt đầu từ maxFontSize, giảm dần 0.5px cho đến khi text không bị overflow.
 */
export default function AutoFitText({
  children,
  maxFontSize = 20,
  minFontSize = 8,
  className = "",
  style = {},
}: AutoFitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let size = maxFontSize;
    el.style.fontSize = `${size}px`;

    // Shrink until no overflow
    while (el.scrollWidth > el.clientWidth && size > minFontSize) {
      size -= 0.5;
      el.style.fontSize = `${size}px`;
    }

    setFontSize(size);
  }, [children, maxFontSize, minFontSize]);

  // Re-fit on window resize
  useEffect(() => {
    const handleResize = () => {
      const el = ref.current;
      if (!el) return;
      let size = maxFontSize;
      el.style.fontSize = `${size}px`;
      while (el.scrollWidth > el.clientWidth && size > minFontSize) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
      }
      setFontSize(size);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [maxFontSize, minFontSize]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        ...style,
        fontSize: `${fontSize}px`,
        display: "block",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      {children}
    </span>
  );
}
