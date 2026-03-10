

export default function SideWatermark() {
  return (
    <div
      className="fixed z-30 right-0 top-1/2 pointer-events-none select-none"
      style={{
        transform: "translateY(-50%) rotate(90deg)",
        transformOrigin: "right center",
        whiteSpace: "nowrap",
      }}
    >
      <span
        className="text-[9px] tracking-[3px] uppercase text-white/60"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
      >
        Made with Cinelove
      </span>
    </div>
  );
}
