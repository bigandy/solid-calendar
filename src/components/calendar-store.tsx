import { Temporal } from "temporal-polyfill-lite";

const initialDate = Temporal.Now.plainDateISO();

import { createSignal, createMemo, createRoot } from "solid-js";

function createCalendarStore() {
    const [date, setDate] = createSignal(initialDate);

    const isToday = createMemo(() => date() === initialDate);

    const resetDate = () => setDate(initialDate);

    return { date, isToday, setDate, resetDate };
}

export default createRoot(createCalendarStore);
