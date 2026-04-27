import calendarStore from "@stores/calendar-store";
import { Temporal } from "temporal-polyfill-lite";

const { date, languageCode } = calendarStore;

const today = Temporal.Now.plainDateISO();

const stringToHsl = (title: string): string => {
    var h: number,
        s: number,
        l: number,
        opts = {
            hue: [0, 360],
            sat: [75, 100],
            lit: [40, 60],
        };

    const range = (hash: number, min: number, max: number) => {
        const diff = max - min;
        const x = ((hash % diff) + diff) % diff;
        return x + min;
    };

    if (title.length === 0) {
        return `hsl(0 0 0)`;
    }
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }

    h = range(hash, opts.hue[0], opts.hue[1]);
    s = range(hash, opts.sat[0], opts.sat[1]);
    l = range(hash, opts.lit[0], opts.lit[1]);

    return `hsl(${h}, ${s}%, ${l}%)`;
};

const getRange = ({
    start,
    end,
}: {
    start: Temporal.PlainDate;
    end: Temporal.PlainDate;
}) => {
    // This assumes that start is before end.
    // Create an array of dates from the start to the end date.
    const dateRange = [];
    for (
        let date = start;
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/compare
        Temporal.PlainDate.compare(date, end) !== 1;
        date = date.add({ days: 1 })
    ) {
        dateRange.push(date);
    }

    return dateRange;
};

type CalendarEvent = {
    index?: number;
    title: string;
    start: Temporal.PlainDate;
    end: Temporal.PlainDate;
    range: Array<Temporal.PlainDate>;
    backgroundColor: string;
};

const someEvents: Array<CalendarEvent> = [
    {
        title: "Event One",
        start: today,
        end: today.add({ days: 5 }),
        range: getRange({
            start: today,
            end: today.add({ days: 5 }),
        }),
        backgroundColor: stringToHsl("Event One"),
    },
    {
        title: "Event Two",
        start: today.subtract({ days: 3 }),
        end: today.add({ days: 3 }),
        range: getRange({
            start: today.subtract({ days: 3 }),
            end: today.add({ days: 3 }),
        }),
        backgroundColor: stringToHsl("Event Two"),
    },
    {
        title: "Event Three",
        start: today.subtract({ months: 1 }),
        end: today.add({ days: 7 }),
        range: getRange({
            start: today.subtract({ months: 1 }),
            end: today.add({ days: 7 }),
        }),
        backgroundColor: stringToHsl("Event Three"),
    },
    {
        title: "Event Four",
        start: Temporal.PlainDate.from("2026-05-01"),
        end: Temporal.PlainDate.from("2026-05-02"),
        range: getRange({
            start: Temporal.PlainDate.from("2026-05-01"),
            end: Temporal.PlainDate.from("2026-05-02"),
        }),
        backgroundColor: stringToHsl("Event Four"),
    },
];

// Events that occur in this month
const getMonthEvents = (someEvents: Array<CalendarEvent>, month: number) => {
    return someEvents.filter((event) => {
        return (
            event.range.filter((eventDate) => {
                return eventDate.month === month;
            }).length > 0
        );
    });
};

const getEventsByDate = (someEvents: Array<CalendarEvent>) => {
    const events: Record<string, Array<CalendarEvent>> = {};
    someEvents.forEach((event, index) => {
        const outputEvent = {
            ...event,
            index,
        };

        event.range.forEach((eventDate) => {
            const date = eventDate.toString();

            if (!events[date]) {
                events[date] = [outputEvent];
            } else {
                events[date] = [...events[date], outputEvent];
            }
        });
    });

    return events;
};

// AHTODO: is it possible to use Temporal to get this? So when I change the language it is updated?
const dayDec2025 = Temporal.PlainDate.from("2025-12-01");

// HACK? I know December 2025 goes from 01 - Monday
// So can get the day name from there.
export const getDays = () => {
    return [
        dayDec2025.toLocaleString(languageCode(), {
            weekday: "short",
        }),
        dayDec2025.add({ days: 1 }).toLocaleString(languageCode(), {
            weekday: "short",
        }),
        dayDec2025.add({ days: 2 }).toLocaleString(languageCode(), {
            weekday: "short",
        }),
        dayDec2025.add({ days: 3 }).toLocaleString(languageCode(), {
            weekday: "short",
        }),
        dayDec2025.add({ days: 4 }).toLocaleString(languageCode(), {
            weekday: "short",
        }),
        dayDec2025.add({ days: 5 }).toLocaleString(languageCode(), {
            weekday: "short",
        }),
        dayDec2025.add({ days: 6 }).toLocaleString(languageCode(), {
            weekday: "short",
        }),
    ];
};

type Day = string[number];

export const getWeeks = () => {
    const daysInMonth = date().daysInMonth;
    // 2. which day is the first of the month?
    const startOfMonth = date().subtract({
        days: date().day - 1,
    });

    const startOfMonthDay = startOfMonth.toLocaleString(languageCode(), {
        weekday: "short",
    });

    // 3. Get calendar days

    // type Day = Days[number];
    const getIndexFromDayName = (day: Day): number => {
        return getDays().indexOf(day);
    };

    // 4. Get first day of the month
    const firstDayofMonth = getIndexFromDayName(startOfMonthDay as Day);

    // 5. Filter Events that only happen in this month.
    const thisMonthsEvents = getMonthEvents(someEvents, date().month);
    // console.log({ thisMonthsEvents });

    const eventsByDate = getEventsByDate(thisMonthsEvents);

    const getMonthDays = (
        daysInMonth: number,
        firstDayofMonth: number,
        startOfMonth: Temporal.PlainDate,
    ) => {
        const weeks = Math.ceil((daysInMonth + firstDayofMonth) / 7);

        let dayNumber = 0;
        return Array.from({ length: weeks }).map((_, rowIndex) => {
            return Array.from({ length: 7 }).map((_, cellIndex) => {
                if (
                    (rowIndex === 0 && cellIndex < firstDayofMonth) ||
                    dayNumber > daysInMonth - 1
                ) {
                    return null;
                } else {
                    const todayDate = startOfMonth.add({
                        days: dayNumber,
                    });
                    const { month, day, year } = todayDate;

                    dayNumber++;

                    return {
                        thisMonthsEventsCount: thisMonthsEvents.length,
                        events: eventsByDate[todayDate.toString()],
                        dayNumber,
                        date: {
                            day,
                            month,
                            year,
                            dayOfWeek: todayDate.toLocaleString(
                                languageCode(),
                                {
                                    weekday: "long",
                                },
                            ),
                        },
                        isToday: todayDate.equals(today),
                    };
                }
            });
        });
    };

    return getMonthDays(daysInMonth, firstDayofMonth, startOfMonth);
};
