import { createRoot, createSignal } from "solid-js";

function createCalendarStore() {
    const [languageCode, setLanguageCode] = createSignal("fr");

    return { languageCode, setLanguageCode };
}

export default createRoot(createCalendarStore);
