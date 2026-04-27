import calendarStore from "./calendar-store";
const { date } = calendarStore;

export const CalendarHeader = () => {
    return (
        <thead>
            <tr>
                <th>M</th>
                <th>Tu</th>
                <th>W</th>
                <th>Th</th>
                <th>F</th>
                <th>Sa</th>
                <th>Su</th>
            </tr>
        </thead>
    );
};
