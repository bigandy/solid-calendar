import { createMemo } from "solid-js";
import calendarStore from "../calendar-store";
import languageStore from "../language-store";

import "./style.css";

const { date, setDate, isToday, resetDate } = calendarStore;

const { languageCode, setLanguageCode } = languageStore;

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

    const handleLanguageChange = (e) => {
        setLanguageCode(e.target.value);
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

                <select
                    id="languageSelection"
                    value={languageCode()}
                    onChange={handleLanguageChange}
                >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="es">Spanish</option>
                </select>
            </div>
            <h2>
                {month()} - {date().year}
            </h2>
        </>
    );
};
