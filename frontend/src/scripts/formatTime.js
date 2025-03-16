// Format time of message
export function formatTime(date) {
    const dateMessage = new Date(date)

    let hours = dateMessage.getHours(); // Obtiene la hora en formato 24h
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.'; // Determina si es AM o PM

    hours = hours % 12;
    hours = hours ? hours : 12; // Si es 0 (medianoche), se convierte a 12

    const formattedHours = dateMessage.getHours().toString().padStart(2, '0')
    const minutes = dateMessage.getMinutes().toString().padStart(2, '0')

    const time = `${formattedHours}:${minutes} ${ampm}`

    return time
  }