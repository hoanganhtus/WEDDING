

type CeremonyEvent = {
  thu: string;
  gio: string;
  ngay: string;
  thang: string;
  nam: string;
  amLich?: string;
  diaDiem: string;
  mapUrl?: string;
};

function JourneyCeremonyBlock({
  title,
  event,
  className = "",
  textLabels,
}: {
  title: string;
  event: CeremonyEvent;
  className?: string;
  textLabels?: {
    vao?: string;
    thangLabel?: string;
    namLabel?: string;
    tucNgay?: string;
    tai?: string;
  };
}) {
  return (
    <div className={`relative flex flex-col items-center text-center z-5 ${className}`}>
      <p className="text-[21px] uppercase tracking-widest text-[#fef9e6]" style={{ fontFamily: "Scarlet Bradley" }}>
        {title}
      </p>
      <p className="text-[11.5px] text-[#fef9e6] mb-2" style={{ fontFamily: "Quicksand" }}>
        {textLabels?.vao || "VÀO"} {event.thu.toUpperCase()} - {event.gio}
      </p>
      <div className="flex items-center gap-3 mb-1">
        <div className="text-center">
          <p className="text-[21px] pr-2 text-[#fef9e6] uppercase tracking-wide" style={{ fontFamily: "Scarlet Bradley" }}>{textLabels?.thangLabel || "Tháng"} {event.thang}</p>
        </div>
        <div className="border-l border-r border-[#fef9e6] px-2">
          <p className="text-4xl font-bold text-[#fef9e6]" style={{ fontFamily: "Montserrat" }}>{event.ngay}</p>
        </div>
        <div className="text-center">
          <p className="text-[21px] pl-2 text-[#fef9e6] uppercase tracking-wide" style={{ fontFamily: "Scarlet Bradley" }}>{textLabels?.namLabel || "Năm"} {event.nam}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {event.amLich && (
          <p className="text-[11px] uppercase text-[#fef9e6] mt-1" style={{ fontFamily: "Quicksand" }}>
            {textLabels?.tucNgay || "Tức Ngày"} {event.amLich}
          </p>
        )}
        <p className="text-[12px] uppercase font-semibold text-[#fef9e6] mt-0.5">
          {textLabels?.tai || "TẠI"} {event.diaDiem.toUpperCase()}
        </p>
        <div className="self-center w-[80%] h-[1px] bg-[#fef9e6] mt-1"></div>
      </div>
    </div>
  );
}

export default function JourneySection({
  leVuQuy,
  leThanhHon,
  hinhBanDo,
  textLabels,
}: {
  leVuQuy: CeremonyEvent;
  leThanhHon: CeremonyEvent;
  hinhBanDo?: string;
  textLabels?: {
    leVuQuyTitle?: string;
    leThanhHonTitle?: string;
    vao?: string;
    thangLabel?: string;
    namLabel?: string;
    tucNgay?: string;
    tai?: string;
    chiDuong?: string;
    mapAlt?: string;
  };
}) {
  return (
    <section className="relative w-full py-6">
      <JourneyCeremonyBlock
        title={textLabels?.leVuQuyTitle || "LỄ VU QUY"}
        event={leVuQuy}
        className="mb-2"
        textLabels={textLabels}
      />

      <div className="relative flex justify-center mt-8 mb-4">
        <div className="map_image group relative overflow-hidden rounded-lg -mt-12 mx-auto w-full">
          <img
            src={hinhBanDo}
            alt={textLabels?.mapAlt || "Bản đồ"}
            className="block w-full object-cover object-center transition-transform duration-500 scale-110"
            loading="lazy"
            decoding="async"
          />
          {leVuQuy.mapUrl && (
            <a
              href={leVuQuy.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-20 right-6 z-10 bg-[#811818] text-white rounded-full px-3 py-1 text-[11px]"
            >
              {textLabels?.chiDuong || "Chỉ Đường"}
            </a>
          )}
        </div>
      </div>
      <div className="relative flex flex-col items-center">
        {leThanhHon.mapUrl && (
          <a
            href={leThanhHon.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#611010] text-white rounded-full px-3 py-1 text-[11px] mb-2 left-16 transform -translate-x-1/2 absolute -top-8 z-10"
          >
            {textLabels?.chiDuong || "Chỉ Đường"}
          </a>
        )}
        <JourneyCeremonyBlock
          title={textLabels?.leThanhHonTitle || "LỄ THÀNH HÔN"}
          event={leThanhHon}
          textLabels={textLabels}
        />
      </div>
    </section>
  );
}
