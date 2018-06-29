/// <reference path="./lp.ts" />

namespace LangPack {

export interface DateContract {
    year: number;
    month: number;
    date: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
}

export interface DateFormatOptions {
    utc?: boolean;
    date?: string | boolean;
    time?: string | boolean;
}

const dayTick = 86400000;

function inSameWeek(a: Date, b: Date) {
    if (!a || !b) return false;
    if (a > b) {
        let c = a;
        a = b;
        b = c;
    }

    let wd = a.getDay();
    if (wd === 0 || wd > b.getDay()) return false;
    let diff = (b.getTime() - a.getTime()) / dayTick;
    return diff < 6;
}

/**
 * Parses a date object. A null will be returned if failed to parse.
 * @param date  The date to parse. It can be (1) a ISO date time string, (2) a YYYYMMDD string, (3) a number of milliseconds from Jan 1st 1970, or (4) an object with year, month and date properties.
 */
export function parseDate(date: number | Date | string | DateContract) {
    if (!date) return null;
    if (date instanceof Date) return date;
    if (typeof date === "number") try {
        return isNaN(date) ? null : new Date(date);
    } catch (ex) {
        return null;
    }

    if (typeof date !== "string") {
        if (date.year && date.month && date.date) try {
            return new Date(date.year, date.month, date.date, date.hour || 0, date.minute || 0, date.second || 0, date.millisecond || 0);
        } catch (ex) {
            return null;
        }

        return null;
    }

    if (date.toLowerCase() === "now") return new Date();
    try {
        if (date.length === 8) {
            let dateYear = parseInt(date.substr(0, 4), 10);
            let dateMonth = parseInt(date.substr(4, 2), 10) - 1;
            let dateDate = parseInt(date.substr(6, 2), 10);
            return new Date(dateYear, dateMonth, dateDate);
        } else if (date.length === 19 && date.indexOf("-") === 4) {
            let dateYear = parseInt(date.substr(0, 4), 10);
            let dateMonth = parseInt(date.substr(5, 2), 10) - 1;
            let dateDate = parseInt(date.substr(8, 2), 10);
            let dateHour = parseInt(date.substr(11, 2), 10);
            let dateMinute = parseInt(date.substr(14, 2), 10);
            let dateSecond = parseInt(date.substr(17, 2), 10);
            return new Date(dateYear, dateMonth, dateDate, dateHour, dateMinute, dateSecond);
        }
    } catch (ex) {
        return null;
    }

    try {
        let date2 = Date.parse(date);
        return new Date(date2);
    } catch (ex) {
        return null;
    }
}

/**
 * Gets a string representation of a date. The format of the string depends on the format options and locale.
 * @param date  The date.
 * @param format  The format options.
 */
export function toDateString(date: number | Date | string | DateContract, format?: boolean | string | DateFormatOptions) {
    date = parseDate(date);
    if (!date || !date.toLocaleDateString) return "";
    if (format === false || format === "string") return date.toString();
    else if (format === "number") return date.getTime().toString();
    else if (format === "tick") return date.getTime().toString();
    else if (!format || format === true || format === "locale") format = { date: "full locale", time: "s" };
    else if (format === "differ") return toDateDiffString(date);
    else if (format === "date") format = { date: "full locale" };
    else if (format === "time") format = { time: "s" };
    if ((format as DateFormatOptions).utc) date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());

    let dateYear = date.getFullYear();
    let dateMonth = date.getMonth() + 1;
    let dateDate = date.getDate();
    let dateHours = date.getHours();
    let dateTt = InnerResource.getLocaleString(dateHours > 12 ? "pm" : "am");
    let dateMinutes = date.getMinutes();
    let dateSeconds = date.getSeconds();

    let dateInfo = {
        YYYY: dateYear,
        YY: dateYear % 100,
        MMMM: InnerResource.getLocaleString("month" + dateMonth),
        MMM: InnerResource.getLocaleString("month" + dateMonth + "s"),
        MM: toNumberString(dateMonth, { figures: 2 }),
        M: dateMonth.toString(),
        DD: toNumberString(dateDate, { figures: 2 }),
        D: dateDate,
        HH: toNumberString(dateHours, { figures: 2 }),
        H: dateHours,
        hh: toNumberString(dateHours % 12, { figures: 2 }),
        h: dateHours % 12,
        tt: dateTt,
        t: (dateTt || "").substr(0, 1),
        www: toWeekDayString(date),
        ww: toWeekDayString(date, true),
        w: toWeekDayString(date, "c"),
        mm: toNumberString(dateMinutes, { figures: 2 }),
        m: dateMinutes,
        sss: toNumberString(date.getMilliseconds(), { figures: 3 }),
        ss: toNumberString(dateSeconds, { figures: 2 }),
        s: dateSeconds
    };
    let str: string;
    let now = new Date();
    if (typeof format !== "string") {
        let dateFormat: string;
        if (format.date) {
            let dateFormatKey = ((format as DateFormatOptions).date === true) ? "full" : format.date.toString().toLowerCase();
            switch (dateFormatKey) {
                case "year":
                    dateFormat = InnerResource.getLocaleString("dateYear");
                    break;
                case "short":
                    dateFormat = InnerResource.getLocaleString("dateShort");
                    break;
                case "short locale":
                    dateFormat = InnerResource.getLocaleString("dateShort2");
                    break;
                case "full":
                    dateFormat = InnerResource.getLocaleString("dateFull");
                    break;
                case "full locale":
                    dateFormat = InnerResource.getLocaleString("dateFull3");
                    break;
                case "full locale 2":
                    dateFormat = InnerResource.getLocaleString("dateFull2");
                    break;
                case "auto":
                    if (now.getFullYear() === date.getFullYear()) dateFormat = InnerResource.getLocaleString("dateShort");
                    else if (inSameWeek(now, date)) dateFormat = toWeekDayString(date, true);
                    else dateFormat = InnerResource.getLocaleString("dateFull");
                    break;
            }
        }

        let timeFormat: string;
        if (format.time) {
            let timeFormatKey = (format.time === true) ? "s" : format.time.toString().toLowerCase();
            switch (timeFormatKey) {
                case "m":
                case "Hm":
                    timeFormat = "HH:mm";
                    break;
                case "m tt":
                case "hm":
                    timeFormat = InnerResource.getLocaleString("time12h", "hh:mm");
                    break;
                case "s":
                case "Hms":
                    timeFormat = "HH:mm:ss";
                    break;
                case "s tt":
                case "hms":
                    timeFormat = InnerResource.getLocaleString("time12h", "hh:mm:ss");
                    break;
                case "sss":
                case "ms":
                case "Hms.":
                    timeFormat = "HH:mm:ss.sss";
                    break;
                case "sss tt":
                case "ms tt":
                case "hms.":
                    timeFormat = InnerResource.getLocaleString("time12h", "hh:mm:ss.sss");
                    break;
                default:
                    if (timeFormatKey.indexOf(":") > 0) timeFormat = timeFormatKey;
                    break;
            }
        }

        if (dateFormat && timeFormat) str = InnerResource.getLocaleString("timeDate", timeFormat, dateFormat);
        else if (dateFormat) str = dateFormat;
        else if (timeFormat) str = timeFormat;
        else return "";
    } else {
        switch (format.replace(" ", "").toLowerCase()) {
            case "fulldate":
                str = InnerResource.getLocaleString("dateFull");
                break;
            case "shortdate":
                str = InnerResource.getLocaleString("dateShort");
                break;
            default:
                str = format;
                break;
        }
    }

    Object.keys(dateInfo).forEach(prop => {
        let propV = (dateInfo as any)[prop] as any;
        if (typeof propV !== "string" && typeof propV !== "number") return;
        let propStr = propV.toString();
        str = str.replace(prop, propStr).replace(prop, propStr).replace(prop, propStr).replace(prop, propStr);
    })

    return str;
}

/**
 * Gets a string representation of a date differs from now. The format of the string depends on the locale.
 * @param date  The date.
 */
export function toDateDiffString(date: number | Date | string | DateContract, compareDate?: number | Date | string | DateContract) {
    date = parseDate(date)
    if (!date) return "";
    let now = parseDate(compareDate) || new Date();
    let diff = now.getTime() - date.getTime();
    let posStr = diff > 0 ? "Ago" : "Later";
    diff = Math.abs(diff);
    if (diff < 40000) return InnerResource.getLocaleString("fewSeconds" + posStr);
    else if (diff <= 3580000) return InnerResource.getLocaleString("minutes" + posStr, Math.round(diff / 60000).toString());
    else if (diff <= 85000000) return InnerResource.getLocaleString("hours" + posStr, Math.round(diff / 3600000).toString());
    var str = `${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
    let diffDays = Math.floor(now.getTime() / dayTick) - Math.floor(date.getTime() / dayTick);
    if (diffDays === 0) return InnerResource.getLocaleString("timeDate", str, InnerResource.getLocaleString("today"));
    if (diffDays === 1) return InnerResource.getLocaleString("timeDate", str, InnerResource.getLocaleString("yesterday"));
    if (diffDays === -1) return InnerResource.getLocaleString("timeDate", str, InnerResource.getLocaleString("tomorrow"));
    if (diffDays === 2 || diffDays === -2) return InnerResource.getLocaleString("timeDate", str, InnerResource.getLocaleString("twoDays" + posStr));
    if (inSameWeek(date, now)) return InnerResource.getLocaleString("timeDate", str, toWeekDayString(date, true));
    let dateMonth = date.getMonth() + 1;
    let replaceObj = {
        YYYY: date.getFullYear().toString(),
        MMMM: InnerResource.getLocaleString("month" + dateMonth),
        MMM: InnerResource.getLocaleString("month" + dateMonth + "s"),
        MM: toNumberString(dateMonth, { figures: 2 }),
        M: dateMonth.toString(),
        DD: toNumberString(date.getDate(), { figures: 2 }),
        D: date.getDate().toString()
    }
    return InnerResource.getLocaleString(date.getFullYear() === now.getFullYear() ? "dateShort2" : "dateFull")
        .replace("YYYY", replaceObj.YYYY)
        .replace("YYYY", replaceObj.YYYY)
        .replace("MMMM", replaceObj.MMMM)
        .replace("MMMM", replaceObj.MMMM)
        .replace("MMM", replaceObj.MMM)
        .replace("MMM", replaceObj.MMM)
        .replace("MM", replaceObj.MM)
        .replace("MM", replaceObj.MM)
        .replace("M", replaceObj.M)
        .replace("M", replaceObj.M)
        .replace("DD", replaceObj.DD)
        .replace("DD", replaceObj.DD)
        .replace("D", replaceObj.D)
        .replace("D", replaceObj.D);
}

/**
 * Gets a string list of all week day.
 */
export function getWeekDayStrings(startDay?: number) {
    let arr: string[] = [];
    if (typeof startDay !== "number" || isNaN(startDay)) startDay = 0;
    startDay = Math.floor(startDay) % 7;
    if (startDay < 0) startDay += 7;
    for (let i = startDay; i < 7; i++) {
        arr.push(InnerResource.getLocaleString("weekDay" + i.toString() + "s"));
    }

    for (let i = 0; i < startDay; i++) {
        arr.push(InnerResource.getLocaleString("weekDay" + i.toString() + "s"));
    }

    return arr;
}

/**
 * Gets a string representation of a week day. The format of the string depends on the locale.
 * @param weekDay  a week day number, or a date.
 * @param short  An optional value indicating whether the week day is short. Default is false, for full word; true, "s" or "short" is for short word; "c" or "character" is for character; "n" or "number" is for number.
 */
export function toWeekDayString(weekDay: number | Date, short?: boolean | "f" | "full" | "l" | "long" | "s" | "short" | "c" | "character") {
    if (weekDay != null && typeof weekDay !== "number" && typeof weekDay.getDay === "function") weekDay = weekDay.getDay();
    if (typeof weekDay !== "number" || isNaN(weekDay) || weekDay < 0 || weekDay > 6 || weekDay.toString().length !== 1) return "";
    let key = "weekDay" + weekDay;
    if (short) {
        let shortStr = short.toString().toLowerCase();
        if ("character".indexOf(shortStr) === 0 || (short as any) === 1) key += "c";
        else if ("number".indexOf(shortStr) === 0 || (short as any) === 0) return weekDay.toString();
        else key += "s";
    }

    return InnerResource.getLocaleString(key);
}

/**
 * Gets a string representation of a time span.
 * @param milliseconds  The milliseconds.
 * @param showMillisecond  An optional value indicating whether show milliseconds.
 */
export function toTimeSpanString(milliseconds: number, showMillisecond?: boolean) {
    if (typeof milliseconds === "string") return milliseconds;
    let ms = Math.round(milliseconds) % 1000;
    let value = Math.floor(milliseconds / 1000);
    let s = value % 60;
    value = Math.floor(value / 60);
    let m = value % 60;
    value = Math.floor(value / 60);
    let h = value;
    value = Math.floor(value / 24);
    let str = "";

    if (h > 24) {
        str += value + ":";
        h = h % 24;
    }

    if (h > 0) {
        str += (h > 9 ? "" : "0") + h.toString() + ":";
    } else if (str) {
        str += "00:";
    }

    str += (m > 9 ? "" : "0") + m.toString() + ":" + (s > 9 ? "" : "0") + s.toString();
    if (showMillisecond) {
        if (ms > 99) str += "." + ms.toString();
        else if (ms > 9) str += ".0" + ms.toString();
        else str += ".00" + ms.toString();
    }

    return str;
}

}
