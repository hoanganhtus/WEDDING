import { useEffect, useState } from "react";
import type React from "react";

type InvitationCountdownSectionProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  chuRe: string;
  coDau: string;
  loiNhan?: string;
  targetDate: string;
  bgImage?: string;
  invitationLabel?: string;
  countdownLabels?: [string, string, string, string];
};

function CountdownTimer({
  targetDate,
  labels = ["ngày", "giờ", "phút", "giây"],
}: {
  targetDate: string;
  labels?: [string, string, string, string];
}) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const boxes = [
    { value: time.days, label: labels[0] },
    { value: time.hours, label: labels[1] },
    { value: time.minutes, label: labels[2] },
    { value: time.seconds, label: labels[3] },
  ];

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-[20px] justify-center">
      {boxes.map(({ value, label }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center bg-[#611010] text-white rounded-md w-[54px] h-[67px] shadow"
          style={{ fontFamily: "Arial" }}
        >
          <span className="text-[10px] font-bold leading-none">{value}</span>
          <span className="text-[10px] mt-3">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function InvitationCountdownSection({
  sectionRef,
  chuRe,
  coDau,
  loiNhan,
  targetDate,
  bgImage = "/images/mau-2/4.png",
  invitationLabel = "INVITATION",
  countdownLabels = ["ngày", "giờ", "phút", "giây"],
}: InvitationCountdownSectionProps) {
  return (
    <section ref={sectionRef} className="relative bg-[#930101] text-center mb-17 mt-5">
      <div className="w-full">
        <div className="relative">
          <img src={bgImage} alt="" className="w-full object-cover px-6" loading="lazy" decoding="async" />
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[77%]">
        <div className="bg-[#f7f3f37c] p-1 pb-7 pt-2">
          <p
            className="text-lg tracking-[6px] font-light text-white uppercase"
            style={{ fontFamily: "Arial" }}
          >
            {invitationLabel}
          </p>
          <p
            className="italic text-primary mb-10"
            style={{ fontFamily: "HoaTay1", fontSize: "19px" }}
          >
            {chuRe} – {coDau}
          </p>

          {loiNhan && (
            <div className="text-[9.4px] font-medium leading-relaxed mb-6 max-w-xs mx-auto text-left">
              {loiNhan.split(/\r?\n/).map((line, index) => (
                <p
                  className="text-center text-black leading-5"
                  style={{ fontFamily: "Quicksand" }}
                  key={index}
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        <CountdownTimer targetDate={targetDate} labels={countdownLabels} />
      </div>
    </section>
  );
}
