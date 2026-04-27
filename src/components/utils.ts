import { Temporal } from "temporal-polyfill-lite";

const today = Temporal.Now.plainDateISO();

const stringToHsl = (title: string): string => {
    var h,
        s,
        l,
        opts = {
            hue: [0, 360],
            sat: [75, 100],
            lit: [40, 60],
        };

    const range = (hash: number, min: number, max: number) => {
        var diff = max - min;
        var x = ((hash % diff) + diff) % diff;
        return x + min;
    };

    var hash = 0;
    if (title.length === 0) return hash;
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

type Event = {
    title: string;
    start: Temporal.PlainDate;
    end: Temporal.PlainDate;
    range: Array<Temporal.PlainDate>;
    backgroundColor: string;
};

const someEvents: Array<Event> = [
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
const getMonthEvents = (someEvents: Array<Event>, month: number) => {
    return someEvents.filter((event) => {
        return (
            event.range.filter((eventDate) => {
                return eventDate.month === month;
            }).length > 0
        );
    });
};

const getEventsByDate = (someEvents: Array<Event & { index?: number }>) => {
    const events = {};
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
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Day = (typeof days)[number];

export const getWeeks = (date: Temporal.PlainDate) => {
    // 1. get days in month
    const daysInMonth = date.daysInMonth;
    // 2. which day is the first of the month?
    const startOfMonth = date.subtract({
        days: date.day - 1,
    });

    const startOfMonthDay = startOfMonth.toLocaleString("en-GB", {
        weekday: "short",
    });

    // 3. Get calendar days

    // type Day = Days[number];
    const getIndexFromDayName = (day: Day): number => {
        return days.indexOf(day);
    };

    // 4. Get first day of the month
    const firstDayofMonth = getIndexFromDayName(startOfMonthDay as Day);

    // 5. Filter Events that only happen in this month.
    const thisMonthsEvents = getMonthEvents(someEvents, date.month);
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
                        events: eventsByDate[todayDate],
                        dayNumber,
                        date: {
                            day,
                            month,
                            year,
                            dayOfWeek: todayDate.toLocaleString("en", {
                                weekday: "long",
                            }),
                        },
                        isToday: todayDate.equals(today),
                    };
                }
            });
        });
    };

    return getMonthDays(daysInMonth, firstDayofMonth, startOfMonth);
};
