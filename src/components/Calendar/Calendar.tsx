import { CalendarHeader } from "@components/CalendarHeader";
import { CalendarToolbar } from "@components/CalendarToolbar/CalendarToolbar";
import { CalendarBody } from "../CalendarBody";
import "./style.css";

export const Calendar = () => {
    return (
        <div class="calendar">
            <CalendarToolbar />
            <table>
                <CalendarHeader />
                <CalendarBody />
            </table>
        </div>
    );
};
