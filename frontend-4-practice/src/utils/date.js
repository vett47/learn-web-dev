export const MONTHS_NOMINATIVE = [
    "Январь", "Февраль", "Март", "Апрель",
    "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

export const MONTHS_GENITIVE = [
    "января", "февраля", "марта", "апреля",
    "мая", "июня", "июля", "августа",
    "сентября", "октября", "ноября", "декабря"
];

export const DAYS_OF_WEEK = [
    "Воскресенье", "Понедельник", "Вторник",
    "Среда", "Четверг", "Пятница", "Суббота"
];

export function compareDates(date1, date2) {
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

export function isDateSelectable(day, month, year, today) {
    const date = new Date(year, month, day);

    return compareDates(date, today) >= 0;
}

export function buildCalendarGrid(year, month) {
    const firstDay = new Date(year, month, 1);

    const startOffset = (firstDay.getDay() + 6) % 7;

    const daysInMonth = new Date(
        year, month + 1, 0
    ).getDate();

    const weeks = [];
    let week = [];

    for (let i = 0; i < startOffset; i++) {
        week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        week.push(day);

        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }

    if (week.length > 0) {
        while (week.length < 7) {
            week.push(null);
        }

        weeks.push(week);
    }

    return weeks;
}