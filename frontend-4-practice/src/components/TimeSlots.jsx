function TimeSlots({ loading, error, slots, selectedDay, selectedTime, onTimeSlotClick }) {
    return (
        <section className="time-card" aria-labelledby="time-title">
            <h2 className="card-title" id="time-title">
                Доступное время
            </h2>

            {loading ? <p role="status">Загрузка слотов…</p> : error ? (
                <p role="alert">{error}</p>
            ) : selectedDay === null ? <p>Выберите день в календаре.</p> : slots.length === 0 ? (
                <p>На выбранный день нет доступного времени.</p>
            ) : <div className="time-grid">
                {slots.map((slot) => {
                    const selected = slot.time === selectedTime;
                    const available = slot.available && selectedDay !== null;

                    const classes = [
                        "time-slot",
                        !slot.available ? "slot-busy" : "",
                        selected ? "slot-selected" : ""
                    ].filter(Boolean).join(" ");

                    return (
                        <button
                            key={slot.time}
                            className={classes}
                            type="button"
                            disabled={!available}
                            onClick={() => onTimeSlotClick(slot.time)}
                        >
                            {slot.available ? (
                                slot.time
                            ) : (
                                <>
                                    <span className="slot-time">
                                        {slot.time}
                                    </span>
                                    <span className="slot-status">
                                        Занято
                                    </span>
                                </>
                            )}
                        </button>
                    );
                })}
            </div>}
        </section>
    );
}

export default TimeSlots;