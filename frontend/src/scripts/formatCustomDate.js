// For show last time messages in chats
export const formatCustomDate = (date) => {
    if (!date) return ''
    const inputDate = new Date(date);
    const today = new Date();

    // Normalizar fechas (establecer horas a 0 para comparación correcta)
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    const differenceInDays = Math.floor((today - inputDate) / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) return "Hoy";
    if (differenceInDays === 1) return "Ayer";
    return inputDate.toLocaleDateString("es-ES"); // Formato DD/MM/AAAA
};