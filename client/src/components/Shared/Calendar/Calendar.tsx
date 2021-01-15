import dayjs from "dayjs";
import React, { ReactElement } from "react";
import styles from "./calendar.module.scss";
interface Props {
  days: string[];
  month: string;
  onNextMonthClick: () => void;
  onPreviousMonthClick: () => void;
  selectedDate: string;
  onDateClick: (date: string) => void;
}

export default function Calendar({
  selectedDate,
  onDateClick,
  days,
  month,
  onNextMonthClick,
  onPreviousMonthClick,
}: Props): ReactElement {
  return (
    <div className={styles.calendar}>
      <div className="calendar-nav">
        <button onClick={onPreviousMonthClick}>Back</button>
        <div className="calendar-month">{month}</div>
        <button onClick={onNextMonthClick}>Forward</button>
      </div>
      <div className="calendar-days" id="">
        {days.map((day) => {
          return (
            <div
              onClick={() => onDateClick(day)}
              className={`calendar-day ${
                selectedDate === day && "calendar-day-selected"
              }`}
            >
              {dayjs(day).format("D")}
            </div>
          );
        })}
      </div>
    </div>
  );
}
