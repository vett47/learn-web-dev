import { useState } from "react";

import Header from "./components/Header.jsx";
import BookingSteps from "./components/BookingSteps.jsx";
import Calendar from "./components/Calendar.jsx";
import TimeSlots from "./components/TimeSlots.jsx";
import BookingBottomBar from "./components/BookingBottomBar.jsx";
import Footer from "./components/Footer.jsx";

// сегодняшняя дата без времени
const today = new Date();
today.setHours(0, 0, 0, 0);


const DEFAULT_SLOTS = [
    { time: "10:00", available: true },
    { time: "11:00", available: false },
    { time: "12:00", available: true },
    { time: "13:00", available: false },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: true },
    { time: "17:00", available: true }
];


function App() {
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const [selectedDay, setSelectedDay] = useState(today.getDate());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());

    const [selectedTime, setSelectedTime] = useState(null);

    // выбор дня
    function handleDayClick(day) {
        setSelectedDay(day);
        setSelectedMonth(currentMonth);
        setSelectedYear(currentYear);

        // при смене дня сбрасываем время
        setSelectedTime(null);
    }

    // переключение месяца
    function handleMonthChange(direction) {
        const newDate = new Date(
            currentYear,
            currentMonth + direction,
            1
        );

        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
        setSelectedDay(null);
        setSelectedMonth(null);
        setSelectedYear(null);
        setSelectedTime(null);
    }

    
    const [slots] = useState(DEFAULT_SLOTS);

    // выбор времени
    function handleTimeSlotClick(time) {
        if (selectedDay === null) {
            return;
        }

        const slot = slots.find((item) => item.time === time);

        if (!slot || !slot.available) {
            return;
        }

        setSelectedTime(time);
    }

    
    // переход к следующему этапу записи
    function handleNextClick() {
        if (selectedDay === null || selectedTime === null) {
            return;
        }

        alert("Дата и время выбраны!");
    }



    return (
        <>
            <Header />

            <main className="page">
                <BookingSteps />

                <section className="booking-section">
                    <div className="booking-heading">
                        <a className="back-link" href="#">
                            ← Назад
                        </a>

                        <h1 className="page-title">
                            Выберите дату и время
                        </h1>
                    </div>

                    <div className="booking-grid">
                        <Calendar
                            currentMonth={currentMonth}
                            currentYear={currentYear}
                            selectedDay={selectedDay}
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            today={today}
                            onDayClick={handleDayClick}
                            onMonthChange={handleMonthChange}
                        />
                        <TimeSlots
                            slots={slots}
                            selectedDay={selectedDay}
                            selectedTime={selectedTime}
                            onTimeSlotClick={handleTimeSlotClick}
                        />
                    </div>
                    <BookingBottomBar
                        selectedDay={selectedDay}
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                        selectedTime={selectedTime}
                        onNextClick={handleNextClick}
                    />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default App;