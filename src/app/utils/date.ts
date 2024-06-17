import { format, isToday, isYesterday } from "date-fns"

export function formatDate(date: Date): string {
    if (isToday(date)) {
        return format(date, "h:m bbb")
    } else if (isYesterday(date)) {
        return "Yesterday"

    } else {
        return format(date, "yyyy/MM/dd")
    }
}

