import { useState, useEffect, useRef } from "react";
import Audio from "./components/Audio";
import Envelope from "./components/Envelope";
import SnowCanvas from "./components/SnowCanvas";
import AutoScrollContainer from "./components/AutoScrollContainer";
import InvitationCountdownSection from "./components/mau-2/InvitationCountdownSection";
import AlbumSlider from "./components/mau-2/AlbumSlider";
import CalendarSection from "./components/mau-2/CalendarSection";
import JourneySection from "./components/mau-2/JourneySection";
import RsvpForm from "./components/mau-2/RsvpForm";
import CoverTextItem from "./components/mau-2/CoverTextItem";
import WeddingEventCard from "./components/mau-2/WeddingEventCard";
import WishesSection from "./components/WishesSection";
import jsonData from "./data/mau-2-initial.json";
import { PRIMARY_COLOR, GOLD_COLOR } from "./theme";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const coverRef = useRef<HTMLElement>(null);
  const familyRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLElement>(null);
  const calendarRef = useRef<HTMLElement>(null);
  const countdownRef = useRef<HTMLElement>(null);
  const rsvpRef = useRef<HTMLElement>(null);
  const albumRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll được xử lý bởi <AutoScrollContainer duration={0} />

  const {
    thongTin,
    tiecCuoiNhaTrai,
    tiecCuoiNhaGai,
    leVuQuy,
    leThanhHon,
    hinhBia,
    hinhMinhHoaCuoi,
    hinhBanDo,
    danhSachAnh = [],
    loiNhan = "",
    trichDan = "",
    images,
    text,
  } = jsonData;

  const targetDate = `${tiecCuoiNhaTrai.nam}-${tiecCuoiNhaTrai.thang.padStart(2, "0")}-${tiecCuoiNhaTrai.ngay.padStart(2, "0")}T${tiecCuoiNhaTrai.gio}:00`;

  const sectionRefs = {
    cover: coverRef,
    family: familyRef,
    events: eventsRef,
    journey: journeyRef,
    calendar: calendarRef,
    countdown: countdownRef,
    rsvp: rsvpRef,
    album: albumRef,
  };

  const scrollTo = (key: keyof typeof sectionRefs) => {
    sectionRefs[key]?.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const menuItems = [
    { key: "cover", label: text.trangBia || "Trang Bìa" },
    { key: "family", label: text.giaDinh || "Gia Đình" },
    { key: "events", label: text.suKien || "Sự Kiện" },
    { key: "journey", label: text.hanhTrinh || "Hành Trình" },
    { key: "calendar", label: text.lichCuoi || "Lịch Cưới" },
    { key: "countdown", label: text.demNguoc || "Đếm Ngược" },
    { key: "rsvp", label: text.xacNhan || "Xác Nhận" },
    { key: "album", label: text.album || "Album" },
  ] as const;

  return (
    <>
      <Envelope
        groomName={thongTin.chuRe}
        brideName={thongTin.coDau}
        onOpen={() => setIsOpened(true)}
      />
      {isOpened && (
    <div
      className="flex justify-center"
      style={{
        backgroundColor: "rgb(240, 242, 245)",
        height: "100vh",
        width: "100vw",
      }}
    >
      <SnowCanvas
        image={images.heartSnow || "/images/mau-3/heart.png"}
        className="z-20"
        size={12}
        count={70}
      />

      <div
        className="relative max-w-md w-full"
        style={{ margin: "auto", height: "100vh" }}
      >
        <AutoScrollContainer
          duration={100000}
          delay={500}
          className="[&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400/60 [&::-webkit-scrollbar-thumb]:rounded-full w-full"
          style={{
            height: "100vh",
            margin: "auto",
            position: "relative",
            border: "1px solid rgb(224, 224, 224)",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px",
            borderRadius: "3px",
            backgroundColor: "rgb(255, 255, 255)",
            overflow: "hidden auto",
            touchAction: "auto",
          }}
        >
          <div
            className="bg-primary font-sans"
            style={{
              overflowX: "hidden",
              position: "relative",
              userSelect: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              boxSizing: "border-box",
              width: "100%",
              minWidth: "50px",
              minHeight: "50px",
            }}
          >
            <Audio
              src={jsonData.amThanh || "/mp3/bai-nay-khong-de-di-dien.mp3"}
              className="absolute right-2 top-1 scale-70 bottom-[none]"
            />

            {/* Nút menu nổi */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="fixed bottom-6 right-4 z-40 bg-white/90 border border-gray-200 shadow-md rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-primary"
                fill="currentColor"
              >
                <rect y="5" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="17" width="24" height="2" rx="1" />
              </svg>
            </button>

            {menuOpen && (
              <div className="fixed bottom-20 right-4 z-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-35">
                {menuItems.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => scrollTo(key)}
                    className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-primary hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* Trang bìa */}
            <section
              ref={coverRef}
              className="relative w-full"
              style={{ minHeight: "457.323px" }}
            >
              {hinhBia && (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <img
                    src={hinhBia}
                    alt="Ảnh bìa"
                    className="object-cover object-center w-full h-full"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute top-0 left-0 right-0 h-50 bg-gradient-to-b from-white/100 to-transparent" />
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-[#930101]/100 to-transparent" />
                </div>
              )}

              {/* Tên đôi */}
              {/* <div
                style={{
                  position: "absolute",
                  top: "44.104px",
                  right: "12.308px",
                  width: "75.692px",
                  height: "28px",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  fontFamily: "HoaTay1",
                }}
              >
                <CoverTextItem text={thongTin.chuRe?.split(" ").pop() ?? ""} />
                <CoverTextItem
                  text={text.amp || "&"}
                  fontSize="13.708px"
                  fontFamily='"Babylonica", serif'
                />
                <CoverTextItem text={thongTin.coDau?.split(" ").pop() ?? ""} />
              </div> */}

              {/* Thông tin sự kiện */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  top:0,
                  padding: "16px 20px 6px 20px",
                  zIndex: 2,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "40px", color: "#611010", fontFamily: "HoaTay1", fontWeight: "1000" }}>
                  Happy Wedding
                </div>
                <div style={{ fontSize: "23px", color: "#611010", fontFamily: "HoaTay1", fontWeight: "600" }}>
                  Anh Tú &amp; Trịnh Huyền
                </div>
              </div>
            </section>

            {/* Gia đình */}
            <section ref={familyRef} className="relative bg-primary py-3 px-0 mt-5 mt-15">
              <div className="relative flex flex-col gap-4 px-5">
                <div className="absolute -top-18 left-4 flex flex-col mb-1">
                  {text.nhaCoHy?.map((word: string) => (
                    <span
                      key={word}
                      className="text-[19px] text-[#c2a4a4] italic leading-tight"
                      style={{ fontFamily: "Sunshine Script" }}
                    >
                      {word}
                    </span>
                  ))}
                </div>

                {/* <div className="absolute -top-4 right-2 flex flex-col mb-1">
                  <img
                    src={images.hyIcon || "/images/mau-2/hy.png"}
                    alt="hy"
                    width={40}
                    height={40}
                    className="w-[40px]"
                    loading="lazy"
                    decoding="async"
                  />
                </div> */}

                <div className="flex flex-col gap-4 border-l-3 border-[#999999] ml-1 pl-1 pt-2 pb-2">
                  <div className="flex flex-col items-end text-left mr-1">
                    <p className="text-[15px] tracking-widest uppercase font-medium text-[#fef9e6] mb-1">
                      {text.nhaTraiLabel || "NHÀ TRAI"}
                    </p>
                    <p className="text-[11px] text-[#fef9e6] font-medium">
                      Ông : {thongTin.nhaTrai.bo}
                    </p>
                    <p className="text-[11px] text-[#fef9e6] font-medium">
                      Bà : {thongTin.nhaTrai.me}
                    </p>
                    <p className="text-[10.4px] text-[#fef9e6]">
                      {thongTin.nhaTrai.diaChi}
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] tracking-widest uppercase font-medium text-[#fef9e6] mb-1">
                      {text.nhaGaiLabel || "NHÀ GÁI"}
                    </p>
                    <p className="text-[11px] text-[#fef9e6] font-medium">
                      Ông : {thongTin.nhaGai.bo}
                    </p>
                    <p className="text-[11px] text-[#fef9e6] font-medium">
                      Bà : {thongTin.nhaGai.me}
                    </p>
                    <p className="text-[10.4px] text-[#fef9e6]">
                      {thongTin.nhaGai.diaChi}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center text-center">
                {/* <p
                  className="text-[11.5px] uppercase text-black mb-4"
                  style={{ fontFamily: "Scarlet Bradley" }}
                >
                  {text.trongTrongBaoTin ||
                    "TRÂN TRỌNG B TIN LỄ THÀNH HÔN CỦA"}
                </p> */}
                <div className="w-full mt-2 text-[#fef9e6]">
                  <p
                    className="w-full text-[28px] tracking-3 left-0 font-medium"
                    style={{ fontFamily: "HoaTay1" }}
                  >
                    {thongTin.hoTenChuRe ?? thongTin.chuRe}
                  </p>
                  <span
                    style={{
                      fontSize: "20px",
                      fontFamily: "HoaTay1",
                    }}
                  >
                    {text.amp || "&"}
                  </span>
                  <p
                    className="text-[28px] tracking-3 font-medium"
                    style={{ fontFamily: "HoaTay1" }}
                  >
                    {thongTin.hoTenCoDau ?? thongTin.coDau}
                  </p>
                </div>
              </div>

              {hinhMinhHoaCuoi && (
                <div className="mt-6 w-full px-9 rounded-sm overflow-hidden relative">
                  <img
                    src={hinhMinhHoaCuoi}
                    alt="Ảnh đôi"
                    className="w-full object-cover"
                    style={{ maxHeight: 300 }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
            </section>

            {/* Sự kiện */}
            <section
              ref={eventsRef}
              className="relative bg-primary w-full px-3"
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  padding: "0px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    color: "#fef9e6",
                    fontSize: "17px",
                    fontWeight: "bold",
                    fontFamily: "Scarlet Bradley",
                    textAlign: "center",
                  }}
                >
                  {text.thuMoiThamDu || "THƯ MỜI THAM DỰ"}
                </div>
              </div>

              <WeddingEventCard
                title={text.tiecCuoiNhaTraiTitle || "TIỆC CƯỚI NHÀ TRAI"}
                event={tiecCuoiNhaTrai}
                className="mb-4"
                mapLabel={text.xemChiDuong || "Xem chỉ đường"}
              />

              <WeddingEventCard
                title={text.tiecCuoiNhaGaiTitle || "TIỆC CƯỚI NHÀ GÁI"}
                event={tiecCuoiNhaGai}
                mapLabel={text.xemChiDuong || "Xem chỉ đường"}
              />
            </section>

            {/* Hành trình */}
            <section ref={journeyRef} className="relative">
              <JourneySection
                leVuQuy={leVuQuy}
                leThanhHon={leThanhHon}
                hinhBanDo={hinhBanDo}
                textLabels={{
                  leVuQuyTitle: text.journeyLeVuQuyTitle,
                  leThanhHonTitle: text.journeyLeThanhHonTitle,
                  vao: text.journeyVao,
                  thangLabel: text.journeyThangLabel,
                  namLabel: text.journeyNamLabel,
                  tucNgay: text.journeyTucNgay,
                  tai: text.journeyTai,
                  chiDuong: text.journeyChiDuong,
                  mapAlt: text.journeyMapAlt,
                }}
              />
            </section>

            {/* Lịch */}
            <section
              ref={calendarRef}
              className="relative bg-primary py-0 w-full"
            >
              <CalendarSection
                thang={parseInt(tiecCuoiNhaTrai.thang)}
                nam={parseInt(tiecCuoiNhaTrai.nam)}
                highlightDays={[
                  parseInt(tiecCuoiNhaGai.ngay),
                  parseInt(tiecCuoiNhaTrai.ngay),
                ]}
                monthLabel={text.thangLabel || "Tháng"}
                dayNames={
                  text.calendarDayNames || [
                    "T2", "T3", "T4", "T5", "T6", "T7", "CN",
                  ]
                }
                highlightIcon={
                  images.calendarHighlightIcon || "/images/mau-2/10.png"
                }
              />
            </section>

            {/* Đếm ngược */}
            <InvitationCountdownSection
              sectionRef={countdownRef}
              chuRe={thongTin.chuRe}
              coDau={thongTin.coDau}
              loiNhan={loiNhan}
              targetDate={targetDate}
              bgImage={images.countdownBg || "/images/mau-2/4.jpg"}
              invitationLabel={text.invitationLabel || "INVITATION"}
              countdownLabels={
                (text.countdownLabels as [string, string, string, string]) || [
                  "ngày", "giờ", "phút", "giây",
                ]
              }
            />

            {/* Ảnh Love / You */}
            <section className="bg-primary w-full">
              <div className="w-full px-9">
                <img src="/images/mau-2/5.jpg" alt="Love" className="w-full object-cover" loading="lazy" decoding="async" />
                <span
                  className="block text-[20px] text-[#fef9e6] italic px-3 pt-1"
                  style={{ fontFamily: "'Scarlet Bradley', sans-serif" }}
                >
                  {text.love || "Love"}
                </span>
              </div>
              <div className="w-full px-9">
                <img src="/images/mau-2/12.jpg" alt="You" className="w-full object-cover" loading="lazy" decoding="async" />
                <span
                  className="block text-[20px] text-[#fef9e6] italic px-3 pt-1 text-right"
                  style={{ fontFamily: "'Scarlet Bradley', sans-serif" }}
                >
                  {text.you || "You"}
                </span>
              </div>
              <div
                className="bg-[#611010] text-white text-center py-2 px-3 text-[12px] mx-9"
                style={{ fontFamily: "Mallong" }}
              >
                {trichDan ||
                  "Khi mây và sương tan biến, anh yêu em và mọi người đều biết điều đó"}
              </div>
            </section>

            {/* Xác nhận tham dự */}
            <section ref={rsvpRef} className="relative w-full mt-6">
              <img
                src="/images/mau-2/7.jpg"
                alt="RSVP background"
                className="w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="relative z-10 -mt-24 px-10">
                <RsvpForm />
              </div>
            </section>

            {/* Gửi quà mừng */}
            <section className="relative bg-primary py-6 px-4">
              <div className="flex flex-col items-center gap-3 border border-gray-200 rounded-[5px] py-6 px-4">
                <img
                  src={images.giftBox || "/images/mau-2/bc7ro23uqhun7ge954163l.png"}
                  alt="Quà mừng"
                  className="w-24 h-24 object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-[13px] text-gray-700 text-center font-medium">
                  {text.guiQuaMung || "Gửi quà mừng tới Cô Dâu – Chú Rể"}
                </p>
              </div>
            </section>

            {/* Album */}
            <section ref={albumRef} className="relative bg-primary pt-4">
              <div className="flex flex-col items-center mb-4 text-center gap-2 px-4">
                <p
                  className="self-start text-[34px] leading-[25px] font-bold text-[#fef9e6] tracking-[4px] uppercase"
                  style={{ fontFamily: "Scarlet Bradley" }}
                >
                  {text.album || "ALBUM"}
                </p>
                <p
                  className="text-[55px] leading-[25px] italic text-[#fef9e6]"
                  style={{ fontFamily: "RetroSignature" }}
                >
                  {text.albumOf || "of"}
                </p>
                <p
                  className="self-end text-[34px] leading-[34px] font-bold text-[#fef9e6] tracking-[4px] uppercase -mt-1"
                  style={{ fontFamily: "Scarlet Bradley" }}
                >
                  {text.love || "LOVE"}
                </p>
              </div>

              <AlbumSlider images={danhSachAnh} />
            </section>

            {/* Ảnh kết */}
            <div className="w-full">
              <img
                src={images.finalImage || "/images/mau-2/11.png"}
                alt="Ảnh kết trang"
                className="w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

        <WishesSection
          primaryColor={PRIMARY_COLOR}
          btnColor={GOLD_COLOR}
          title={text.soLuuBut || "Sổ lưu bút"}
        />
      </AutoScrollContainer>
      </div>
    </div>
      )}
    </>
  );
}

export default App;


