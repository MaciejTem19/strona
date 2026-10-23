//Wspólne dla frontmattera (pierwszy render) i <script> (odliczanie w przeglądarce)

export type TimeLeft = {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}

export const PROMOTION_DATE_END = Date.UTC(2026, 11, 1)

//Czas do końca promocji rozbity na dni, godziny, minuty i sekundy (daty w ms) — po końcu promocji same zera
export function getTimeLeft(end: number, current: number): TimeLeft | null {
    const totalSeconds = Math.max(0, Math.floor((end - current) / 1000));

    if (totalSeconds < 0) {
        return null;
    }

    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor(totalSeconds / 3600) % 24,
        minutes: Math.floor(totalSeconds / 60) % 60,
        seconds: totalSeconds % 60,
    };
}

//Liczba na wyświetlacz timera — zawsze co najmniej dwie cyfry (5 → "05")
export function formatTimeUnit(value: number): string {
    return String(value).padStart(2, "0");
}
