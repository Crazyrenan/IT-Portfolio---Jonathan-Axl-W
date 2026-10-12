/**
 * Helper to format date in Asia/Jakarta (WIB) timezone
 */
export function formatWibTime(date: Date): { display: string; fullDate: string } {
  try {
    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const fullFormatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const display = `${timeFormatter.format(date)} WIB`;
    const fullDate = `${fullFormatter.format(date)} (WIB - UTC+7)`;

    return { display, fullDate };
  } catch {
    // Fallback if Intl timeZone fails
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const display = `${hours}:${minutes} WIB`;
    const fullDate = `${date.toDateString()} ${display}`;
    return { display, fullDate };
  }
}
