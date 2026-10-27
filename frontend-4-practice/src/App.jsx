import { useEffect, useState } from "react";

import Header from "./components/Header.jsx";
import BookingSteps from "./components/BookingSteps.jsx";
import Calendar from "./components/Calendar.jsx";
import TimeSlots from "./components/TimeSlots.jsx";
import BookingBottomBar from "./components/BookingBottomBar.jsx";
import Footer from "./components/Footer.jsx";

import { fetchToday, fetchSlots } from "./api.js";

function App() {
    const [todayState, setTodayState] = useState({ loading: true, error: null, data: null });
    const [slotsState, setSlotsState] = useState({ loading: false, error: null, data: null });
    const [currentMonth, setCurrentMonth] = useState(null);
    const [currentYear, setCurrentYear] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        let active = true;
        fetchToday().then((date) => {
            if (!active) return;
            setCurrentMonth(date.month);
            setCurrentYear(date.year);
            setSelectedDay(date.day);
            setSelectedMonth(date.month);
            setSelectedYear(date.year);
            setSlotsState({ loading: true, error: null, data: null });
            setTodayState({ loading: false, error: null, data: date });
        }).catch(() => {
            if (active) setTodayState({ loading: false, error: "Не удалось загрузить сегодняшнюю дату. Обновите страницу, чтобы повторить попытку.", data: null });
        });
        return () => { active = false; };
    }, []);

    useEffect(() => {
        if (selectedDay === null) return;
        let active = true;
        fetchSlots({ day: selectedDay, month: selectedMonth, year: selectedYear }).then((data) => {
            // Cleanup запрещает старым ответам и ошибкам менять новый выбор.
            if (active) setSlotsState({ loading: false, error: null, data });
        }).catch(() => {
            if (active) setSlotsState({ loading: false, error: "Не удалось загрузить время. Выберите другой день или обновите страницу.", data: null });
        });
        return () => { active = false; };
    }, [selectedDay, selectedMonth, selectedYear]);

    const today = todayState.data
        ? new Date(todayState.data.year, todayState.data.month, todayState.data.day)
        : null;
    const slots = slotsState.data?.slots ?? [];

    // выбор дня
    function handleDayClick(day) {
        if (day === selectedDay && currentMonth === selectedMonth && currentYear === selectedYear) return;
        setSlotsState({ loading: true, error: null, data: null });
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
        setSlotsState({ loading: false, error: null, data: null });
        setSelectedDay(null);
        setSelectedMonth(null);
        setSelectedYear(null);
        setSelectedTime(null);
    }

    


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

                    {todayState.loading ? <p role="status">Загрузка…</p> : todayState.error ? (
                        <p role="alert">{todayState.error}</p>
                    ) : <div className="booking-grid">
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
                            loading={slotsState.loading}
                            error={slotsState.error}
                            slots={slots}
                            selectedDay={selectedDay}
                            selectedTime={selectedTime}
                            onTimeSlotClick={handleTimeSlotClick}
                        />
                    </div>}
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