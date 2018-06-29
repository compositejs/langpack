/// <reference path="./lp.ts" />

namespace LangPack {

/**
 * The options to number string.
 */
export interface NumberStringOptions {
    /**
     * The empty value output if set.
     */
    empty?: string;

    /**
     * The precision.
     */
    precision?: number;

    /**
     * The exponent.
     */
    exponent?: number;

    /**
     * The minimum figures to return.
     * Charactor 0 will fill as prefix if the length is less than this number.
     */
    figures?: number;

    /**
     * true if return the number with digit groups; otherwise, false.
     */
    group?: boolean;
}

/**
 * Gets a string representation of a number.
 * @param num  The number.
 * @param options  The options with exponent, precision and figures.
 */
export function toNumberString(num: number, options?: NumberStringOptions) {
    if (!options) options = {};
    if (num == null || typeof num !== "number" || isNaN(num)) return options.empty === undefined ? "" : options.empty;
    if (typeof options.exponent === "number" && !isNaN(options.exponent)) return num.toExponential(options.exponent);
    if (options.exponent) return options.precision ? num.toExponential(options.precision) : num.toExponential();
    var str = options.precision ? num.toFixed(options.precision) : num.toString();
    if (typeof options.figures === "number" && !isNaN(options.figures)) for (var i = str.length; i < options.figures; i++) {
        str = "0" + str;
    }

    if (options.group) {
        var dotPosition = str.indexOf(".");
        var str2 = str;
        if (dotPosition < 0) {
            dotPosition = str.length;
            str = "";
        } else {
            str2 = str.substr(0, dotPosition);
            str = str.substr(dotPosition);
        }

        for (var i = 0; i < dotPosition; i++) {
            var j = dotPosition - i - 1;
            if (i % 3 === 0 && i > 0) str = "," + str;
            str = str2[j] + str;
        }
    }

    return str;
}

/**
 * Gets a string representation of a number shorter.
 * @param total  The number.
 * @param empty  An optional empty value to return when the specific number is null.
 */
export function shortNumber(total: number, empty: boolean | string) {
    if (total == null || isNaN(total)) {
        if (empty == null || empty === false) return total;
        return empty === true ? "" : empty;
    }

    if (isLanguage("zh") || isLanguage("ja")) {
        if (total >= 1000000000000) return (total / 1000000000000).toFixed(1) + ((isLanguage("ja") || isLanguage("zh-Hant") || isLanguage("zh-tw")) ? "兆亿" : "万亿");
        if (total >= 100000000) return (total / 100000000).toFixed(1) + "亿";
        if (total >= 10000) return (total / 10000).toFixed(1) + "万";
    } else {
        if (total >= 1000000000000) return (total / 1000000000000).toFixed(1) + "T";
        if (total >= 1000000000) return (total / 1000000000).toFixed(1) + "G";
        if (total >= 1000000) return (total / 1000000).toFixed(1) + "M";
        if (total >= 1000) return (total / 1000).toFixed(1) + "K";
    }
    
    return total;
}

/**
 * Gets the nearest items of a specific list by comparing its key number.
 * @param list  The list to resolve.
 * @param value  The number to compare.
 * @param compact  The side. Ond of "in", "greater", "less" and "nearby".
 * @param getValue  A handler to get the key number from the item in list. The result should be a number or an object with from and end properties in number.
 */
export function near<T>(list: T[], value: number, compact: boolean | "in" | "greater" | "less" | "nearby", getValue?: ((item: T) => number | { from: number, end: number })) {
    if (!list || !(list instanceof Array) || typeof value !== "number") return undefined;
    var selected: T[] = [];
    var distance: number;
    let side: string;
    if (compact === true) side = "nearby";
    else if (!compact) side = "in";
    if (typeof compact !== "string" || ["in", "greater", "less", "nearby"].indexOf(compact.toLowerCase()) < 0) side = "in";
    else side = compact.toLowerCase();
    if (!getValue) getValue = item => {
        return item as any;
    };
    list.forEach(item => {
        var cV = getValue(item);
        if (cV == null) return;
        let cFrom: number;
        let cEnd: number;
        if (typeof cV === "number") {
            cFrom = cV;
            cEnd = cV;
        } else {
            cFrom = cV.from;
            cEnd = cV.end;
        }

        if (typeof cFrom !== "number" || typeof cEnd !== "number" || isNaN(cFrom) || isNaN(cEnd)) return;
        if (cFrom > cEnd) {
            let cTemp = cFrom;
            cFrom = cEnd;
            cEnd = cTemp;
        }

        if (cFrom > value && compact !== "nearby" && compact !== "greater") return;
        if (cEnd < value && compact !== "nearby" && compact !== "less") return;
        let cDistance = cFrom < value && cEnd > value ? 0 : Math.min(Math.abs(cFrom), Math.abs(cEnd));
        if (distance == null || distance < cDistance) {
            selected = [item];
            distance = cDistance;
        } else if (distance === cDistance) {
            selected.push(item);
        }
    });
    return selected;
}

}