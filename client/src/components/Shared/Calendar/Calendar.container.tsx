import React, { ReactElement, useEffect, useState } from "react";
import dayjs from "dayjs";
import Calendar from "./Calendar";
interface Props {}

export default function CalendarContainer({}: Props): ReactElement {
  const [month, setMonth] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(0);
  useEffect(() => {
    const startOfMonth = dayjs().add(selectedMonth, "month").startOf("month");
    const daysInMonth = startOfMonth.daysInMonth();
    const weekdays = new Array(daysInMonth)
      .fill(startOfMonth)
      .map((day, idx) => day.add(idx, "day").format("dddd, MMMM D YYYY"));

    setMonth(weekdays);
  }, [selectedMonth]);

  const handleOnChangeMonthClick = (direction: "next" | "previous") => {
    return direction === "next"
      ? setSelectedMonth((prev) => prev + 1)
      : setSelectedMonth((prev) => prev - 1);
  };

  const handleOnDateClick = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Calendar
        selectedDate={selectedDate}
        onDateClick={(date) => handleOnDateClick(date)}
        onNextMonthClick={() => handleOnChangeMonthClick("next")}
        onPreviousMonthClick={() => handleOnChangeMonthClick("previous")}
        days={month}
        month={dayjs(month[0]).format("MMMM YYYY")}
      />
    </div>
  );
}
