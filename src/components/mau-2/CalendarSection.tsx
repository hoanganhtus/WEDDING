

export default function CalendarSection({
  thang,
  nam,
  highlightDays,
  monthLabel = "Tháng",
  dayNames = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  highlightIcon = "/images/mau-2/10.png",
}: {
  thang: number;
  nam: number;
  highlightDays: number[];
  monthLabel?: string;
  dayNames?: string[];
  highlightIcon?: string;
}) {
  const daysInMonth = new Date(nam, thang, 0).getDate();
  const firstDayRaw = new Date(nam, thang - 1, 1).getDay();
  const firstDay = (firstDayRaw + 6) % 7;

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="w-full max-w-sm mx-6 border-b-1 border-[#e8c4c4]">
      <div className="bg-[#611010] flex justify-end gap-2 py-1">
        <span
          className="self-right mr-4 text-white text-[23px] italic"
          style={{ fontFamily: "Aquarelle" }}
        >
          {monthLabel} {thang}
        </span>
      </div>
      <div className="grid grid-cols-7 bg-white border-b border-gray-100">
        {dayNames.map((d) => (
          <div
            key={d}
            className="text-center text-[11px] text-gray-400 py-2 font-medium"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 bg-white">
        {cells.map((day, i) => {
          const isHighlight = day !== null && highlightDays.includes(day);
          return (
            <div
              key={i}
              className="relative flex items-center justify-center h-10"
            >
              {day !== null && (
                <>
                  {isHighlight ? (
                    <div className="relative flex items-center justify-center w-9 h-9">
                      <img
                        src={highlightIcon}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                      <span className="relative text-white text-[11px] font-bold z-10 mt-1">
                        {day}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-600 text-[13px]">{day}</span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
