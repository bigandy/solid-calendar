import { createMemo } from "solid-js";

import languageStore from "./language-store";
import { getDays } from "./utils";

const { languageCode } = languageStore;

export const CalendarHeader = () => {
    const days = createMemo(() => getDays(languageCode()));

    return (
        <thead>
            <tr>
                {days().map((day) => {
                    return <th>{day}</th>;
                })}
            </tr>
        </thead>
    );
};
