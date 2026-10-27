import {
    MONTHS_GENITIVE,
    DAYS_OF_WEEK
} from "../utils/date.js";

function BookingBottomBar({
    selectedDay,
    selectedMonth,
    selectedYear,
    selectedTime,
    onNextClick
}) {
    let text = "Дата и время не выбраны";

    if (selectedDay !== null) {
        const date = new Date(
            selectedYear,
            selectedMonth,
            selectedDay
        );

        const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
        const month = MONTHS_GENITIVE[selectedMonth];

        text = `${dayOfWeek}, ${selectedDay} ${month} ${selectedYear}`;

        if (selectedTime !== null) {
            text += ` • ${selectedTime}`;
        }
    }

    return (
        <div className="booking-summary">
            <p className="selected-date">
                {text}
            </p>

            <button
                className="next-button"
                type="button"
                disabled={selectedTime === null}
                onClick={onNextClick}
            >
                Далее →
            </button>
        </div>
    );
}

export default BookingBottomBar;