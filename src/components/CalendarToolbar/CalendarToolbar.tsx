import calendarStore from "@stores/calendar-store";
import { createMemo } from "solid-js";

import "./style.css";

const { date, setDate, isToday, resetDate, languageCode, setLanguageCode } =
    calendarStore;

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

    const handleLanguageChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        if (target?.value) {
            setLanguageCode(target.value);
        }
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
                    <button>
                        <selectedcontent></selectedcontent>
                    </button>
                    <option value="en">
                        <span class="icon" aria-hidden="true">
                            🇬🇧
                        </span>
                        English
                    </option>
                    <option value="fr">
                        <span class="icon" aria-hidden="true">
                            🇫🇷
                        </span>
                        French
                    </option>
                    <option value="de">
                        <span class="icon" aria-hidden="true">
                            🇩🇪
                        </span>
                        German
                    </option>
                    <option value="it">
                        <span class="icon" aria-hidden="true">
                            🇮🇹
                        </span>
                        Italian
                    </option>
                    <option value="es">
                        <span class="icon" aria-hidden="true">
                            🇪🇸
                        </span>
                        Spanish
                    </option>
                </select>
            </div>
            <h2>
                {month()} - {date().year}
            </h2>
        </>
    );
};
