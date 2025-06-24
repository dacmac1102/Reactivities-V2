import { format, isValid, parseISO } from "date-fns";
import z from "zod";

export function formatDate(date: Date | string | number | null | undefined): string {
    if (!date) return "";

    // Nếu là chuỗi => parse
    const parsedDate = typeof date === "string" ? parseISO(date) : new Date(date);

    if (!isValid(parsedDate)) return "";

    return format(parsedDate, "dd MMM yyyy h:mm a");
}
export const requiredString = (fieldName: string) => z.string({ required_error: `${fieldName} is required` }).min(1,
    { message: `${fieldName} is required` })