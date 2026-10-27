import {
    MONTHS_NOMINATIVE,
    buildCalendarGrid,
    isDateSelectable
} from "../utils/date.js";

function Calendar({
    currentMonth,
    currentYear,
    selectedDay,
    selectedMonth,
    selectedYear,
    today,
    onDayClick,
    onMonthChange
}) {
    const weeks = buildCalendarGrid(currentYear, currentMonth);

    const weekdays = [
        "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"
    ];

    return (
        <section className="calendar-card" aria-labelledby="calendar-title">
            <div className="calendar-header">
                <h2 className="card-title" id="calendar-title">
                    {MONTHS_NOMINATIVE[currentMonth]} {currentYear}
                </h2>

                <div className="calendar-controls">
                    <button
                        className="calendar-arrow"
                        type="button"
                        aria-label="Предыдущий месяц"
                        onClick={() => onMonthChange(-1)}
                    >
                        ‹
                    </button>

                    <button
                        className="calendar-arrow"
                        type="button"
                        aria-label="Следующий месяц"
                        onClick={() => onMonthChange(1)}
                    >
                        ›
                    </button>
                </div>
            </div>

            <div className="weekdays" aria-hidden="true">
                {weekdays.map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div>

            <div className="calendar-days">
                {weeks.map((week, weekIndex) =>
                    week.map((day, dayIndex) => {
                        if (day === null) {
                            return (
                                <button
                                    key={`${weekIndex}-${dayIndex}`}
                                    className="calendar-day day-outside"
                                    type="button"
                                    disabled
                                />
                            );
                        }

                        const selectable = isDateSelectable(
                            day,
                            currentMonth,
                            currentYear,
                            today
                        );

                        const selected =
                            day === selectedDay &&
                            currentMonth === selectedMonth &&
                            currentYear === selectedYear;

                        const classes = [
                            "calendar-day",
                            !selectable ? "day-disabled" : "",
                            selected ? "day-selected" : ""
                        ].filter(Boolean).join(" ");

                        return (
                            <button
                                key={`${weekIndex}-${dayIndex}`}
                                className={classes}
                                type="button"
                                disabled={!selectable}
                                onClick={() => onDayClick(day)}
                            >
                                {day}
                            </button>
                        );
                    })
                )}
            </div>
        </section>
    );
}

export default Calendar;