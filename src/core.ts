namespace LangPack {

/**
 * The language pack information data.
 */
export interface LanguagePackInfoContract {
    /**
     * The language code or the list of language code.
     */
    language: string | string[],

    /**
     * The strings object to register.
     */
    strings: any,

    /**
     * The options object to register.
     */
    options?: any
}

/**
 * The options for getting query info object.
 */
export interface QueryInfoResolveOptionsContract {
    /**
     * true if use an empty string instead undefined for the one with key but no value in query string; otherwise, false.
     */
    emptyString?: boolean;

    /**
     * true if do not decode URL query keys and values (decodeURIComponent); otherwise, false.
     */
    notToDecode?: boolean;

    /**
     * true if do not decode URL query keys (decodeURIComponent); otherwise, false.
     */
    notToDecodeKey?: boolean;

    /**
     * true if use an array for multiple values of the key; otherwise, false, to use the last one.
     */
    multipleValues?: boolean;
}

/**
 * Gets an object with proeprties from the ones of the URL query string.
 * @param url The URL; or null if use the location of the current web page.
 * @param options The options to get query info.
 */
export function getQueryInfo(url?: string, options?: QueryInfoResolveOptionsContract) {
    if (!url && typeof location !== "undefined") {
        if (location) url = location.search;
    }

    if (!url) return {};
    let questionMarkPosition = url.indexOf("?");
    if (questionMarkPosition > 0) url = url.substring(questionMarkPosition + 1);
    if (!url) return {};
    let query = url.split("&");
    if (!options) options = {};
    let result: any = {};
    query.forEach(prop => {
        if (!prop) return;
        let propArr = prop.split("=");
        let key = propArr[0];
        if (!key) return;
        if (!options.notToDecode && !options.notToDecodeKey) key = decodeURIComponent(key);
        let iValue = (propArr.length > 1 ? propArr[1] : null) || (options.emptyString ? "" : undefined);
        if (iValue && !options.notToDecode) iValue = decodeURIComponent(iValue);
        if (result[key] && options.multipleValues) {
            if (result[key] instanceof Array) result[key].push(iValue);
            else result[key] = [result[key], iValue];
        } else {
            result[key] = iValue;
        }
    });
    return result;
}

export function getLocaleProp<T = any>(obj: T, key?: keyof(T) | null, options?: {
    mkt?: string | boolean;
    fallback?: any;
    bind?: any;
}) {
    if (!obj) return options?.fallback || undefined;
    let mkt: string;
    const b = options?.bind || {};
    if (typeof options?.mkt === "string") mkt = options?.mkt;
    if (!mkt && options?.mkt !== false && typeof navigator === "object") mkt = navigator.language;
    if (!key) key = "name" as any;
    if (typeof key !== "string") return getKeyedPropValue(obj, key as any, undefined, options);
    if (!mkt || typeof mkt !== "string") return getKeyedPropValue(obj, key, undefined, options);
    let k = `${key}#${mkt}`;
    let v = (obj as any)[k];
    if (v !== undefined) {
        b.key = k;
        return v;
    }

    const arr = mkt.split("-");
    if (arr.length < 2) return getKeyedPropValue(obj, key, undefined, options);
    if (arr.length === 2) return getKeyedPropValue(obj, `${key}#${arr[0]}`, key, options);
    const special = `${key}#${arr[0]}-${arr[2]}`;
    while (arr.length > 2) {
        arr.pop();
        k = "";
        for (let j = 0; j < arr.length; j++) {
            v = arr[j];
            if (!v) continue;
            if (k) k += "-";
            k += v;
        }

        v = (obj as any)[`${key}#${k}`];
        if (v !== undefined) return v;
    }

    v = (obj as any)[special];
    if (v !== undefined) {
        b.key = special;
        return v;
    }

    return getKeyedPropValue(obj, `${key}#${arr[0]}`, key, options);
}

function getKeyedPropValue(obj: any, key1: string, key2: string, options: {
    bind?: any;
    fallback?: any;
}) {
    let key = key1;
    let v = obj[key];
    if (v === undefined && key2) {
        key = key2;
        v = obj[key2];
    }

    if (v === undefined) return options?.fallback;
    const b = options?.bind;
    if (b) b.key = key;
    return v;
}

}