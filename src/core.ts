namespace LangPack {

export interface LanguagePackInfoContract {
    language: string | string[],
    strings: any,
    options?: any
}

export interface QueryInfoResolveOptionsContract {
    emptyString?: boolean;
    notToDecode?: boolean;
    multipleValues?: boolean;
}

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

}