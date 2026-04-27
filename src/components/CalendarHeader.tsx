import { createMemo } from "solid-js";

import { getDays } from "./utils";

export const CalendarHeader = () => {
    const days = createMemo(() => getDays());

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
