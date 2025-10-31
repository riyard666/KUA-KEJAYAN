import {format} from "date-fns";
import { id } from "date-fns/locale";

export function FormatDate(rawDate: string) {
    return format(new Date(rawDate), "dd MMM, yyyy hh:mm",  { locale: id });
}

export function FormatDateId(rawDate: string) {
    return format(new Date(rawDate), "dd MMMM, yyyy hh:mm",  { locale: id });
}

export function FormatDateNoTime(rawDate?: string) {
    if (!rawDate) return "-"; // kalau null/undefined/empty string

    const parsed = new Date(rawDate);
    if (isNaN(parsed.getTime())) return "-"; // kalau invalid date

    return format(parsed, "dd MMMM yyyy", { locale: id });
}

export function FormatDateNoTimeSlash(rawDate: string) {
    return format(new Date(rawDate), "dd MMM, yyyy",  { locale: id });

}

export function formatRupiah(value: number | 0): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatNumberNoDecimal(value: number | 0): string {
    return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

/**
 * Mengkonversi format tanggal standar (misal: "Sat Nov 01 2025 00:00:00 GMT...")
 * menjadi format YYYY-MM-DDTHH:mm yang dibutuhkan oleh input datetime-local.
 * @param dateString String tanggal dari Google Spreadsheet.
 * @returns String dalam format "YYYY-MM-DDTHH:mm" atau string kosong.
 */
export function formatForDateTimeLocal (dateString: string | Date): string {
    if (!dateString) return '';
    try {
        // Jika data dari Spreadsheet adalah string, Date object akan memparse-nya.
        const date = new Date(dateString);

        // Cek validitas date object
        if (isNaN(date.getTime())) return '';

        // Fungsi toISOString mengembalikan format: YYYY-MM-DDTHH:mm:ss.sssZ
        // Kita hanya perlu YYYY-MM-DDTHH:mm (lokal)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;

    } catch (e) {
        console.error("Gagal mengkonversi tanggal:", e);
        return '';
    }
};