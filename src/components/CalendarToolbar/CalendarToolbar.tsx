import calendarStore from "../calendar-store";

import "./style.css";

const { date, setDate, isToday, resetDate } = calendarStore;

export const CalendarToolbar = () => {
    const prevMonth = () => {
        setDate((date) => date.subtract({ months: 1 }));
    };

    const nextMonth = () => {
        setDate((date) => date.add({ months: 1 }));
    };

    const nextYear = () => {
        setDate((date) => date.add({ years: 1 }));
    };

    const prevYear = () => {
        setDate((date) => date.subtract({ years: 1 }));
    };

    return (
        <>
            <div class="calendar-header">
                <button type="button" onClick={prevYear}>
                    Previous Year
                </button>
                <button type="button" onClick={prevMonth}>
                    Previous Month
                </button>
                <button
                    type="button"
                    onClick={resetDate}
                    disabled={isToday()}
                >
                    Today
                </button>
                <button type="button" onClick={nextMonth}>
                    Next Month
                </button>
                <button type="button" onClick={nextYear}>
                    Next Year
                </button>
            </div>
            <h2>
                {date().toLocaleString(undefined, {
                    month: "long",
                })}{" "}
                - {date().year}
            </h2>
        </>
    );
};
