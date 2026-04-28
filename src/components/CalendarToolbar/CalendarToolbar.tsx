import calendarStore from "@stores/calendar-store";
import { createMemo } from "solid-js";

import "./style.css";

const { date, setDate, isToday, resetDate, languageCode } = calendarStore;

import { LanguageSelector } from "@components/LanguageSelector";

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

    const month = createMemo(() =>
        date().toLocaleString(languageCode(), {
            month: "long",
        }),
    );

    return (
        <>
            <div class="calendar-header">
                <button type="button" onClick={prevYear}>
                    Previous Year
                </button>
                <button type="button" onClick={prevMonth}>
                    Previous Month
                </button>
                <button type="button" onClick={resetDate} disabled={isToday()}>
                    Today
                </button>
                <button type="button" onClick={nextMonth}>
                    Next Month
                </button>
                <button type="button" onClick={nextYear}>
                    Next Year
                </button>

                <LanguageSelector />
            </div>
            <h2>
                {month()} - {date().year}
            </h2>
        </>
    );
};
