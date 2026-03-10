

type EventInfo = {
  thu: string;
  gio: string;
  ngay: string;
  thang: string;
  nam: string;
  amLich?: string;
  diaDiem: string;
  diaChi: string;
  mapUrl?: string;
};

export default function WeddingEventCard({
  title,
  event,
  className = "",
  mapLabel = "Xem chỉ đường",
}: {
  title: string;
  event: EventInfo;
  className?: string;
  mapLabel?: string;
}) {
  return (
    <div className={`bg-[#611010] text-white rounded-[30px] py-4 text-center shadow-md ${className}`}>
      <div style={{ position: "relative", width: "100%", height: "100%", padding: "0px", borderRadius: "0px", boxShadow: "none", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box", opacity: 1, border: "0px solid" }}>
        <div style={{ height: "auto", width: "100%", minWidth: "20px", color: "rgb(250, 245, 245)", fontSize: "14.304px", textShadow: "rgba(0,0,0,0) 0px 0px 2px", fontWeight: "normal", fontFamily: '"Scarlet Bradley", "1FTV VIP Signora", serif', textAlign: "center", lineHeight: "1.63", letterSpacing: "0px", textTransform: "uppercase", textDecoration: "none", fontStyle: "normal", pointerEvents: "none", overflow: "hidden", wordBreak: "break-word" }}>
          {title}
        </div>
      </div>

      <p className="text-[11px] opacity-80">
        {event.thu.toUpperCase()} - {event.gio}
      </p>

      <div style={{ position: "relative", width: "140.656px", height: "auto", zIndex: 0, cursor: "default", transform: "rotate(0deg)", margin: "4px auto" }}>
        <div style={{ transition: "1.3s ease-out", transform: "none", opacity: 1, width: "100%", height: "100%" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", padding: "0px", borderRadius: "0px", boxShadow: "none", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box", opacity: 1, border: "0px solid" }}>
            <div style={{ height: "auto", width: "100%", minWidth: "20px", color: "rgb(221, 170, 18)", fontSize: "17.88px", textShadow: "rgba(0,0,0,0) 0px 0px 2px", fontWeight: "bold", fontFamily: '"Scarlet Bradley", "1FTV VIP Signora", serif', textAlign: "center", lineHeight: "normal", letterSpacing: "0px", textTransform: "none", textDecoration: "none", fontStyle: "normal", pointerEvents: "none", overflow: "hidden", wordBreak: "break-word" }}>
              {event.ngay} . {event.thang} . {event.nam}
            </div>
          </div>
        </div>
      </div>

      {event.amLich && <p className="text-[10px] opacity-70 mb-1">Tức Ngày {event.amLich}</p>}

      <div style={{ position: "relative", width: "100%", height: "100%", padding: "0px", borderRadius: "0px", boxShadow: "none", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box", opacity: 1, border: "0px solid" }}>
        <div style={{ height: "auto", width: "100%", minWidth: "20px", color: "rgb(250, 245, 245)", fontSize: "15.496px", textShadow: "rgba(0,0,0,0) 0px 0px 2px", fontWeight: "normal", fontFamily: '"Scarlet Bradley", "1FTV VIP Signora", serif', textAlign: "center", lineHeight: "1.63", letterSpacing: "0px", textTransform: "uppercase", textDecoration: "none", fontStyle: "normal", pointerEvents: "none", overflow: "hidden", wordBreak: "break-word" }}>
          TẠI {event.diaDiem.toUpperCase()}
        </div>
      </div>

      <p className="text-[11px] opacity-80 mb-2">{event.diaChi}</p>

      <a
        href={event.mapUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block border border-white/60 text-white text-[11px] uppercase tracking-widest px-6 py-1.5 rounded-full hover:bg-white/20 transition"
      >
        {mapLabel}
      </a>
    </div>
  );
}
