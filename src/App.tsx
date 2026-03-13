import { useState, useRef } from "react";
import { motion } from "framer-motion";
import FadeIn from "./components/FadeIn";
import PageLayout from "./components/PageLayout";
import Envelope from "./components/Envelope";
import SnowCanvas from "./components/SnowCanvas";
import InvitationCountdownSection from "./components/mau-2/InvitationCountdownSection";
import AlbumSlider from "./components/mau-2/AlbumSlider";
import CalendarSection from "./components/mau-2/CalendarSection";
import JourneySection from "./components/mau-2/JourneySection";
import RsvpForm from "./components/mau-2/RsvpForm";
import WeddingEventCard from "./components/mau-2/WeddingEventCard";
import WishesSection from "./components/WishesSection";
import GiftPopup from "./components/GiftPopup";
import jsonData from "./data/mau-2-initial.json";
import { PRIMARY_COLOR, GOLD_COLOR } from "./theme";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showGiftPopup, setShowGiftPopup] = useState(false);

  const coverRef = useRef<HTMLElement>(null);
  const familyRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLElement>(null);
  const calendarRef = useRef<HTMLElement>(null);
  const countdownRef = useRef<HTMLElement>(null);
  const rsvpRef = useRef<HTMLElement>(null);
  const albumRef = useRef<HTMLElement>(null);

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="flex justify-center"
          style={{
            backgroundColor: "rgb(240, 242, 245)",
            height: "100vh",
            width: "100vw",
          }}
        >
          <SnowCanvas
            image={images.heartSnow || "/images/mau-3/heart.webp"}
            className="z-20"
            size={12}
            count={70}
          />

          <PageLayout>
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
                    <FadeIn variant="scale" duration={1.2}>
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
                    </FadeIn>
                  )}

                  {/* Thông tin sự kiện */}
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      top: 0,
                      padding: "16px 20px 6px 20px",
                      zIndex: 2,
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <FadeIn variant="fadeDown" delay={0.3}>
                      <div style={{ fontSize: "40px", color: "#611010", fontFamily: "HoaTay1", fontWeight: "1000" }}>
                        Happy Wedding
                      </div>
                    </FadeIn>
                    <FadeIn variant="fadeUp" delay={0.5}>
                      <div style={{ fontSize: "23px", color: "#611010", fontFamily: "HoaTay1", fontWeight: "600" }}>
                        Trịnh Huyền &amp; Anh Tú
                      </div>
                    </FadeIn>
                  </div>
                </section>

                {/* Gia đình */}
                <section ref={familyRef} className="relative bg-primary py-3 px-0 mt-5 mt-15">
                  <div className="relative flex flex-col gap-4 px-5">
                    <FadeIn variant="fadeLeft">
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
                    </FadeIn>

                    <div className="flex flex-col gap-4 border-l-3 border-[#999999] ml-1 pl-1 pt-2 pb-2">
                      {/* Nhà Trai */}
                      <div className="flex items-center gap-3 mr-1">
                        <FadeIn variant="scale" delay={0.1} className="flex-shrink-0 w-24 h-24 sm:w-30 sm:h-30">
                          <img
                            src="/images/mau-2/avata-chong.png"
                            alt="Chú rể"
                            className="w-full h-full rounded-full object-cover border-2 border-[#fef9e6]/40"
                            loading="lazy"
                            decoding="async"
                          />
                        </FadeIn>
                        <FadeIn variant="fadeRight" delay={0.2}>
                          <div className="flex flex-col items-end text-right flex-1 min-w-0">
                            <p className="text-[16px] sm:text-[20px] tracking-widest uppercase font-medium text-[#fef9e6] mb-1">
                              {text.nhaTraiLabel || "NHÀ TRAI"}
                            </p>
                            <p className="text-[13px] sm:text-[15px] text-[#fef9e6] font-medium truncate w-full text-right">
                              Ông : {thongTin.nhaTrai.bo}
                            </p>
                            <p className="text-[13px] sm:text-[15px] text-[#fef9e6] font-medium truncate w-full text-right">
                              Bà : {thongTin.nhaTrai.me}
                            </p>
                            <p className="text-[12px] sm:text-[15px] text-[#fef9e6] line-clamp-2 break-words w-full text-right">
                              {thongTin.nhaTrai.diaChi}
                            </p>
                          </div>
                        </FadeIn>
                      </div>
                      {/* Nhà Gái */}
                      <div className="flex items-center gap-3">
                        <FadeIn variant="fadeLeft" delay={0.2}>
                          <div className="flex flex-col flex-1 text-left min-w-0">
                            <p className="text-[16px] sm:text-[20px] tracking-widest uppercase font-medium text-[#fef9e6] mb-1">
                              {text.nhaGaiLabel || "NHÀ GÁI"}
                            </p>
                            <p className="text-[13px] sm:text-[15px] text-[#fef9e6] font-medium truncate w-full">
                              Ông : {thongTin.nhaGai.bo}
                            </p>
                            <p className="text-[13px] sm:text-[15px] text-[#fef9e6] font-medium truncate w-full">
                              Bà : {thongTin.nhaGai.me}
                            </p>
                            <p className="text-[12px] sm:text-[15px] text-[#fef9e6] line-clamp-2 break-words w-full">
                              {thongTin.nhaGai.diaChi}
                            </p>
                          </div>
                        </FadeIn>
                        <FadeIn variant="scale" delay={0.1} className="flex-shrink-0 w-24 h-24 sm:w-30 sm:h-30">
                          <img
                            src="/images/mau-2/avata-vo.png"
                            alt="Cô dâu"
                            className="w-full h-full rounded-full object-cover border-2 border-[#fef9e6]/40"
                            loading="lazy"
                            decoding="async"
                          />
                        </FadeIn>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col items-center text-center">
                    <div className="w-full mt-2 text-[#fef9e6]">
                      <FadeIn variant="fadeRight" delay={0.1}>
                        <p
                          className="w-full text-[35px] tracking-3 text-right pr-6 leading-tight"
                          style={{ fontFamily: "HoaTay1", fontWeight: "500" }}
                        >
                          {thongTin.hoTenChuRe ?? thongTin.chuRe}
                        </p>
                      </FadeIn>
                      <FadeIn variant="scale" delay={0.2}>
                        <span
                          className="block text-center leading-tight"
                          style={{
                            fontSize: "30px",
                            fontFamily: "HoaTay1",
                            fontWeight: "500",
                          }}
                        >
                          {text.amp || "&"}
                        </span>
                      </FadeIn>
                      <FadeIn variant="fadeLeft" delay={0.3}>
                        <p
                          className="w-full text-[35px] tracking-3 text-left pl-6 top-6 leading-tight"
                          style={{ fontFamily: "HoaTay1", fontWeight: "500" }}
                        >
                          {thongTin.hoTenCoDau ?? thongTin.coDau}
                        </p>
                      </FadeIn>
                    </div>
                  </div>

                  {hinhMinhHoaCuoi && (
                    <FadeIn variant="scale" delay={0.2}>
                      <div className="mt-6 w-full px-9 rounded-[10px] overflow-hidden relative ">
                        <img
                          src={hinhMinhHoaCuoi}
                          alt="Ảnh đôi"
                          className="w-full object-cover"
                          style={{ maxHeight: 300 }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </FadeIn>
                  )}
                </section>

                {/* Sự kiện */}
                <section
                  ref={eventsRef}
                  className="relative bg-primary w-full px-3"
                >
                  <FadeIn variant="fadeDown">
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
                  </FadeIn>

                  <FadeIn variant="fadeLeft" delay={0.1}>
                    <WeddingEventCard
                      title={text.tiecCuoiNhaTraiTitle || "TIỆC CƯỚI NHÀ TRAI"}
                      event={tiecCuoiNhaTrai}
                      className="mb-4"
                      mapLabel={text.xemChiDuong || "Xem chỉ đường"}
                    />
                  </FadeIn>

                  <FadeIn variant="fadeRight" delay={0.2}>
                    <WeddingEventCard
                      title={text.tiecCuoiNhaGaiTitle || "TIỆC CƯỚI NHÀ GÁI"}
                      event={tiecCuoiNhaGai}
                      mapLabel={text.xemChiDuong || "Xem chỉ đường"}
                    />
                  </FadeIn>
                </section>

                {/* Hành trình */}
                <section ref={journeyRef} className="relative">
                  <FadeIn variant="fadeUp">
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
                  </FadeIn>
                </section>

                {/* Lịch */}
                <section
                  ref={calendarRef}
                  className="relative bg-primary py-0 w-full"
                >
                  <FadeIn variant="flipY">
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
                  </FadeIn>
                </section>

                {/* Đếm ngược */}
                <FadeIn variant="blur">
                  <InvitationCountdownSection
                    sectionRef={countdownRef}
                    chuRe={thongTin.chuRe}
                    coDau={thongTin.coDau}
                    loiNhan={loiNhan}
                    targetDate={targetDate}
                    bgImage={images.countdownBg || "/images/mau-2/4.webp"}
                    invitationLabel={text.invitationLabel || "INVITATION"}
                    countdownLabels={
                      (text.countdownLabels as [string, string, string, string]) || [
                        "ngày", "giờ", "phút", "giây",
                      ]
                    }
                  />
                </FadeIn>

                {/* Ảnh Love / You — scrapbook collage */}
                <section className="bg-primary w-full py-6 px-4">
                  <FadeIn variant="scale">
                    <div style={{ position: "relative", width: "100%", height: "auto", minHeight: "clamp(560px, 80vw, 650px)" }}>
                      <div
                        style={{
                          position: "absolute",
                          top: -10,
                          left: 10,
                          zIndex: 5,
                        }}
                      >
                        <p
                          className="text-[15px] text-[#fef9e6]/80 uppercase tracking-[3px] leading-relaxed"
                          style={{ fontFamily: "'Scarlet Bradley', sans-serif" }}
                        >
                          {text.love || "Love"}<br />
                          {text.you || "You"}
                        </p>
                      </div>

                      {/* Ảnh 1: Trên trái */}
                      <div
                        style={{
                          position: "absolute",
                          top: 50,
                          left: 5,
                          width: "50%",
                          zIndex: 3,
                          transform: "rotate(-3deg)",
                        }}
                      >
                        <div className="bg-primary p-[5px] pb-[18px] shadow-lg" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                          <img
                            src="/images/mau-2/5.webp"
                            alt="Love"
                            className="w-full object-cover"
                            style={{ aspectRatio: "3/4" }}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>

                      {/* Ảnh 2: Trên phải */}
                      <div
                        style={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          width: "50%",
                          zIndex: 2,
                          transform: "rotate(2.5deg)",
                        }}
                      >
                        <div className="bg-primary p-[5px] pb-[18px] shadow-lg" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                          <img
                            src="/images/mau-2/4.webp"
                            alt="Couple"
                            className="w-full object-cover"
                            style={{ aspectRatio: "3/4" }}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>

                      {/* Ảnh 3: Dưới trái */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 40,
                          left: 4,
                          width: "50%",
                          zIndex: 5,
                          transform: "rotate(2deg)",
                        }}
                      >
                        <div className="bg-primary p-[5px] pb-[18px] shadow-lg" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                          <img
                            src="/images/mau-2/12.webp"
                            alt="Together"
                            className="w-full object-cover"
                            style={{ aspectRatio: "3/4" }}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>

                      {/* Ảnh 4: Dưới phải */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 70,
                          right: 0,
                          width: "50%",
                          zIndex: 4,
                          transform: "rotate(-2.5deg)",
                        }}
                      >
                        <div className="bg-primary p-[5px] pb-[18px] shadow-lg" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                          <img
                            src="/images/mau-2/5.webp"
                            alt="Forever"
                            className="w-full object-cover"
                            style={{ aspectRatio: "3/4" }}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>

                      {/* Text dưới cùng */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: -20,
                          right: -10,
                          zIndex: 5,
                          textAlign: "right",
                          width: "60%",
                        }}
                      >
                        <p
                          className="text-[12px] text-[#fef9e6]/75 leading-relaxed text-center"
                          style={{ fontFamily: "'Scarlet Bradley', sans-serif" }}
                        >
                          {trichDan || "Khi mây và sương tan biến, anh yêu em và mọi người đều biết điều đó"}
                        </p>
                      </div>

                    </div>
                  </FadeIn>
                </section>

                {/* Xác nhận tham dự */}
                <section ref={rsvpRef} className="relative w-full mt-6">
                  <FadeIn variant="scale">
                    <img
                      src="/images/mau-2/7.webp"
                      alt="RSVP background"
                      className="w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </FadeIn>
                  <FadeIn variant="fadeUp" delay={0.2}>
                    <div className="relative z-10 -mt-24 px-10">
                      <RsvpForm />
                    </div>
                  </FadeIn>
                </section>

                {/* Gửi quà mừng */}
                <section className="relative bg-primary py-6 px-4">
                  <div
                    onClick={() => setShowGiftPopup(true)}
                    className="flex flex-col items-center gap-3 border border-[#cf9c52]/30 rounded-[10px] py-6 px-4 cursor-pointer hover:bg-[#fef9e6]/50 transition-colors shadow-sm"
                  >
                    <FadeIn variant="scale">
                      <motion.img
                        src={images.giftBox || "/images/mau-2/bc7ro23uqhun7ge954163l.webp"}
                        alt="Quà mừng"
                        className="w-24 h-24 object-contain mx-auto block origin-bottom"
                        loading="lazy"
                        decoding="async"
                        animate={{
                          rotate: [0, -5, 5, -5, 5, -5, 5, 0]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: "easeInOut"
                        }}
                      />
                    </FadeIn>
                    <FadeIn variant="fadeUp" delay={0.1}>
                      <p className="text-[13px] text-[#fef9e6] text-center font-medium">
                        {text.guiQuaMung || "Gửi quà mừng tới Cô Dâu – Chú Rể"}
                      </p>
                    </FadeIn>
                  </div>
                </section>

                {/* Album */}
                <section ref={albumRef} className="relative bg-primary pt-4">
                  <div className="flex flex-col items-center mb-4 text-center gap-2 px-4">
                    <FadeIn variant="fadeLeft">
                      <p
                        className="text-left self-start text-[34px] leading-[25px] font-bold text-[#fef9e6] tracking-[4px] uppercase"
                        style={{ fontFamily: "Scarlet Bradley" }}
                      >
                        {text.album || "ALBUM"}
                      </p>
                    </FadeIn>
                    <FadeIn variant="scale" delay={0.1}>
                      <p
                        className="text-[55px] leading-[25px] italic text-[#fef9e6]"
                        style={{ fontFamily: "RetroSignature" }}
                      >
                        {text.albumOf || "of"}
                      </p>
                    </FadeIn>
                    <FadeIn variant="fadeRight" delay={0.2}>
                      <p
                        className="text-right self-end text-[34px] leading-[34px] font-bold text-[#fef9e6] tracking-[4px] uppercase -mt-1"
                        style={{ fontFamily: "Scarlet Bradley" }}
                      >
                        {text.love || "LOVE"}
                      </p>
                    </FadeIn>
                  </div>

                  <FadeIn variant="fadeUp" delay={0.3}>
                    <AlbumSlider images={danhSachAnh} />
                  </FadeIn>
                </section>

                {/* Ảnh kết */}
                <div className="w-full">
                  <img
                    src={images.finalImage || "/images/mau-2/11.webp"}
                    alt="Ảnh kết trang"
                    className="w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

            {/* Sổ lưu bút (Floating button) */}
            <WishesSection
              primaryColor={PRIMARY_COLOR}
              btnColor={GOLD_COLOR}
              title={text.soLuuBut || "Sổ lưu bút"}
            />
          </PageLayout>

          {/* Popup Gửi quà mừng */}
          <GiftPopup
            isOpen={showGiftPopup}
            onClose={() => setShowGiftPopup(false)}
            qrChuRe={images.qrChuRe || "/images/mau-2/1.webp"}
            qrCoDau={images.qrCoDau || "/images/mau-2/2.webp"}
          />
        </motion.div>
      )}
    </>
  );
}

export default App;

