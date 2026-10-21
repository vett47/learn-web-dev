function BookingSteps() {
    const steps = [
        "МАСТЕР",
        "УСЛУГА",
        "ДАТА",
        "КОНТАКТЫ",
        "ПОДТВЕРЖДЕНИЕ"
    ];

    return (
        <section className="booking-steps" aria-label="Этапы записи">
            <ol className="steps-list">
                {steps.map((step, index) => (
                    <li
                        key={step}
                        className={`step ${index === 2 ? "step-active" : ""}`}
                    >
                        <span className="step-number">{index + 1}</span>
                        <span className="step-name">{step}</span>

                        {index < steps.length - 1 && (
                            <span className="step-line"></span>
                        )}
                    </li>
                ))}
            </ol>
        </section>
    );
}

export default BookingSteps;