import {format} from "date-fns";
import { id } from "date-fns/locale";

export function FormatDate(rawDate: string) {
    return format(new Date(rawDate), "dd MMM, yyyy hh:mm a",  { locale: id });
}

export function FormatDateId(rawDate: string) {
    return format(new Date(rawDate), "dd MMMM, yyyy hh:mm a",  { locale: id });
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