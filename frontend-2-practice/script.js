// JavaScript для страницы выбора даты и времени.
//
// ЗАДАНИЕ
// ========
// Оживить свою свёрстанную страницу. Скорее всего на ней будет работать:
//   1. При открытии страницы выбрать день по умолчанию.
//   2. По клику на день — день становится выбранным,
//      слоты обновляются.
//   3. По клику на слот — время становится выбранным,
//      попадает в нижнюю панель.
//   4. Стрелки «‹» и «›» листают месяцы.
//   5. Дни раньше «сегодня» нельзя выбрать.
//   6. Нижняя панель обновляется при выборе дня и времени.
//
// ГДЕ ЖИВУТ ДАННЫЕ
// ----------------
// Слотов пока нет с сервера. Захардкодьте массив в этом файле.
// Формат слота: { time: "10:00", available: true }.
// «Сегодня» можно взять из new Date() или захардкодить —
// как удобнее для проверки.
//
// СТРУКТУРА КОДА
// --------------
// Разделите код на смысловые части комментариями:
//   1. Данные (слоты, «сегодня»).
//   2. Состояние (месяц, день, время, слоты).
//   3. Чистые функции (для работы с датами).
//   4. Отрисовка и обработчики.
//   5. Инициализация.
//
// ЧИСТЫЕ ФУНКЦИИ
// --------------
// Если понадобится строить сетку календаря — вот функция,
// которую можно использовать. Она не зависит от DOM,
// просто принимает год и месяц и возвращает массив недель.
//
// function buildCalendarGrid(year, month) {
//   const firstDay = new Date(year, month, 1);
//   const lastDay = new Date(year, month + 1, 0);
//   const daysInMonth = lastDay.getDate();
//   const startDayOfWeek = firstDay.getDay();
//   const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
//   const prevMonthLastDay = new Date(year, month, 0).getDate();
//
//   const cells = [];
//
//   for (let i = offset - 1; i >= 0; i--) {
//     cells.push({ day: prevMonthLastDay - i, otherMonth: true });
//   }
//   for (let d = 1; d <= daysInMonth; d++) {
//     cells.push({ day: d, otherMonth: false });
//   }
//   const totalCells = Math.ceil(cells.length / 7) * 7;
//   let nextDay = 1;
//   while (cells.length < totalCells) {
//     cells.push({ day: nextDay, otherMonth: true });
//     nextDay++;
//   }
//
//   const weeks = [];
//   for (let i = 0; i < cells.length; i += 7) {
//     weeks.push(cells.slice(i, i + 7));
//   }
//   return weeks;
// }

// Начните писать код здесь.


// временные слоты
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

// текущая дата
const today = new Date();
today.setHours(0, 0, 0, 0);

// состояние страницы
const state = {
    currentMonth: today.getMonth(),
    currentYear: today.getFullYear(),
    selectedDay: today.getDate(),
    selectedMonth: today.getMonth(),
    selectedYear: today.getFullYear(),
    selectedTime: null,
    slots: DEFAULT_SLOTS
};


// месяцы
const MONTHS_NOMINATIVE = [
    "Январь", "Февраль", "Март", "Апрель",
    "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const MONTHS_GENITIVE = [
    "января", "февраля", "марта", "апреля",
    "мая", "июня", "июля", "августа",
    "сентября", "октября", "ноября", "декабря"
];

const DAYS_OF_WEEK = [
    "Воскресенье", "Понедельник", "Вторник",
    "Среда", "Четверг", "Пятница", "Суббота"
];

// сравнение двух дат без учета времени
function compareDates(date1, date2) {
    const first = new Date(
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate()
    );
    const second = new Date(
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate()
    );
    return Math.sign(first.getTime() - second.getTime());
}

// проверка возможности выбора дня
function isDateSelectable(day, month, year, today) {
    const date = new Date(year, month, day);
    return compareDates(date, today) >= 0;
}

// календарная сетка
function buildCalendarGrid(year, month) {
    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(
        year, month + 1, 0
    ).getDate();
    const weeks = [];
    let week = [];

    // пустые ячейки перед первым числом месяца
    for (let i = 0; i < startOffset; i++) {
        week.push(null);
    }

    // дни текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
        week.push(day);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }

    // последняя неполная неделя
    if (week.length > 0) {
        while (week.length < 7) {
            week.push(null);
        }
        weeks.push(week);
    }
    return weeks;
}

// отрисовка календаря
function renderCalendar() {
    const monthTitle = document.querySelector("#calendar-month");
    const calendarDays = document.querySelector("#calendar-days");
    // обновляем название месяца
    monthTitle.textContent =
        `${MONTHS_NOMINATIVE[state.currentMonth]} ${state.currentYear}`;
    // недели текущего месяца
    const weeks = buildCalendarGrid(
        state.currentYear,
        state.currentMonth
    );
    let html = "";

    // кнопки дней календаря
    for (const week of weeks) {
        for (const day of week) {
            if (day === null) {
                html += `
                    <button
                        class="calendar-day day-outside"
                        type="button"
                        disabled
                    ></button>
                `;
                continue;
            }

            const selectable = isDateSelectable(
                day,
                state.currentMonth,
                state.currentYear,
                today
            );

            const selected = day === state.selectedDay &&
                state.currentMonth === state.selectedMonth &&
                state.currentYear === state.selectedYear;

            const classes = [
                "calendar-day",
                !selectable ? "day-disabled" : "",
                selected ? "day-selected" : ""
            ].filter(Boolean).join(" ");
            html += `
                <button
                    class="${classes}"
                    type="button"
                    data-day="${day}"
                    ${!selectable ? "disabled" : ""}
                >
                    ${day}
                </button>
            `;
        }
    }
    // замена старых дней на новые
    calendarDays.innerHTML = html;
    // обработчики доступным дням
    const dayButtons = calendarDays.querySelectorAll(
        ".calendar-day:not(:disabled)"
    );
    dayButtons.forEach(function(button) {
        button.addEventListener("click", onDayClick);
    });
}

// обработка выбора дня
function onDayClick(event) {
    const button = event.currentTarget;
    const day = Number(button.dataset.day);

    state.selectedDay = day;
    state.selectedMonth = state.currentMonth;
    state.selectedYear = state.currentYear;
    state.selectedTime = null;
    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
}

// переключение месяцев
function setupMonthNavigation() {
    const prevButton = document.querySelector("#prev-month");
    const nextButton = document.querySelector("#next-month");

    prevButton.addEventListener("click", function() {
        changeMonth(-1);
    });
    nextButton.addEventListener("click", function() {
        changeMonth(1);
    });
}

// изменение месяца
function changeMonth(direction) {
    const newDate = new Date(
        state.currentYear,
        state.currentMonth + direction,
        1
    );

    state.currentMonth = newDate.getMonth();
    state.currentYear = newDate.getFullYear();
    state.selectedDay = null;
    state.selectedMonth = null;
    state.selectedYear = null;
    state.selectedTime = null;
    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
}

 // отрисовка временных слотов
function renderTimeSlots() {
    const timeGrid = document.querySelector("#time-grid");
    let html = "";
    for (const slot of state.slots) {
        const selected = slot.time === state.selectedTime;
        const available = slot.available && state.selectedDay !== null;
        const classes = [
            "time-slot",
            !slot.available ? "slot-busy" : "",
            selected ? "slot-selected" : ""
        ].filter(Boolean).join(" ");
        if (!slot.available) {
            html += `
                <button class="${classes}" type="button" disabled>
                    <span class="slot-time">${slot.time}</span>
                    <span class="slot-status">Занято</span>
                </button>
            `;
        } else {
            html += `
                <button
                    class="${classes}"
                    type="button"
                    data-time="${slot.time}"
                    ${!available ? "disabled" : ""}
                >
                    ${slot.time}
                </button>
            `;
        }
    }
    timeGrid.innerHTML = html;
    // назначение обработчиков заново после перерисовки
    const timeButtons = timeGrid.querySelectorAll(
        ".time-slot:not(:disabled)"
    );
    timeButtons.forEach(function(button) {
        button.addEventListener("click", onTimeSlotClick);
    });
}

// обработка выбора времени
function onTimeSlotClick(event) {
    const button = event.currentTarget;
    state.selectedTime = button.dataset.time;
    renderTimeSlots();
    updateBottomBar();
}

 // обновление нижней панели
function updateBottomBar() {
    const selectedDateText = document.querySelector("#selected-date");
    const nextButton = document.querySelector("#next-button");
    // если дата не выбрана
    if (state.selectedDay === null) {
        selectedDateText.textContent = "Дата и время не выбраны";
        nextButton.disabled = true;
        return;
    }
    // формируем выбранную дату
    const date = new Date(
        state.selectedYear,
        state.selectedMonth,
        state.selectedDay
    );
    const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
    const day = state.selectedDay;
    const month = MONTHS_GENITIVE[state.selectedMonth];
    const year = state.selectedYear;
    let text = `${dayOfWeek}, ${day} ${month} ${year}`;
    // добавляем время, если оно выбрано
    if (state.selectedTime !== null) {
        text += ` • ${state.selectedTime}`;
    }
    selectedDateText.textContent = text;
    // активация кнопки после выбора времени
    nextButton.disabled = state.selectedTime === null;
}


function init() {
    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
    setupMonthNavigation();
    const nextButton = document.querySelector("#next-button");
    nextButton.addEventListener("click", function() {
        if (state.selectedDay === null || state.selectedTime === null) {
            return;
        }
        alert("Дата и время выбраны!");
    });
}
document.addEventListener("DOMContentLoaded", init);
