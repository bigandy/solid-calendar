import { Temporal } from "temporal-polyfill-lite";

const initialDate = Temporal.Now.plainDateISO();

import { createMemo, createRoot, createSignal } from "solid-js";

function createCalendarStore() {
    const [date, setDate] = createSignal(initialDate);
    const [languageCode, setLanguageCode] = createSignal("fr");

    const isToday = createMemo(() => date() === initialDate);

    const resetDate = () => setDate(initialDate);

    return { date, isToday, setDate, resetDate, languageCode, setLanguageCode };
}

export default createRoot(createCalendarStore);
