import { createMemo, For } from "solid-js";
import { getWeeks } from "./utils";

export const CalendarBody = () => {
    const weeks = createMemo(() => getWeeks());

    return (
        <tbody class="calendar-body">
            <For each={weeks()}>
                {(row) => (
                    <tr>
                        <For each={row}>
                            {(cell) => {
                                if (!cell) {
                                    return <td />;
                                }

                                return (
                                    <td
                                        classList={{
                                            isToday: cell.isToday,
                                        }}
                                    >
                                        <span class="cell-title">
                                            <span class="weekday">
                                                {cell.date.dayOfWeek}
                                            </span>{" "}
                                            {cell.dayNumber}
                                        </span>

                                        <div
                                            class="events"
                                            data-events-count={`${cell.thisMonthsEventsCount}`}
                                        >
                                            {cell?.events?.length > 0 &&
                                                cell.events.map((event) => {
                                                    const isFirstDay =
                                                        event.start.equals(
                                                            cell.date,
                                                        );

                                                    const isLastDay =
                                                        event.end.equals(
                                                            cell.date,
                                                        );

                                                    return (
                                                        <span
                                                            class="event"
                                                            classList={{
                                                                isFirstDay,
                                                                isLastDay,
                                                            }}
                                                            data-event-index={`${event.index}`}
                                                            style={{
                                                                "background-color":
                                                                    event.backgroundColor,
                                                            }}
                                                        ></span>
                                                    );
                                                })}
                                        </div>
                                    </td>
                                );
                            }}
                        </For>
                    </tr>
                )}
            </For>
        </tbody>
    );
};
