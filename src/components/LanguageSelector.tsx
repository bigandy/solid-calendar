import calendarStore from "@stores/calendar-store";

const { languageCode, setLanguageCode } = calendarStore;

export const LanguageSelector = () => {
    const handleLanguageChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        if (target?.value) {
            setLanguageCode(target.value);
        }
    };

    return (
        <select
            id="languageSelection"
            value={languageCode()}
            onChange={handleLanguageChange}
        >
            <button>
                <selectedcontent />
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
    );
};
