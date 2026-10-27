// Формат API сохранён; время слотов соответствует предыдущей практике.
const times = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
export const database = {
    today: { day: 17, month: 9, year: 2026 },
    slotsOddDay: times.map((time) => ({ time, available: !["11:00", "13:00"].includes(time) })),
    slotsEvenDay: times.map((time) => ({ time, available: !["12:00", "16:00"].includes(time) })),
};
