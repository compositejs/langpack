namespace LangPack {

let inner = {
    market: undefined as string,
    defaultMarket: "en-US",
    format(str: string, args: string[]) {
        if (!str) return "";
        args.forEach((item, i) => {
            if (!item) item = "";
            let placeholder = "{" + i.toString() + "}";
            str = str.replace(placeholder, item).replace(placeholder, item).replace(placeholder, item).replace(placeholder, item);
        });

        return str;
    },
    getLocalProperty(obj: any, markets: string[], key: string) {
        let prop: any;
        markets.some(market => {
            if (!market) return false;
            var marketArr = market.toLowerCase().split("-");
            while (marketArr.length > 0) {
                var localMarket = marketArr.join("-");
                var res = obj[localMarket];
                if (res && res[key] !== undefined) {
                    prop = res[key];
                    return true;
                }

                marketArr = marketArr.slice(0, marketArr.length - 1);
            }

            return false;
        });

        return prop;
    },
    getLocalProperties(obj: any, markets: string[], thisArg: any) {
        if (!thisArg) thisArg = {};
        markets.forEach(market => {
            if (!market) return false;
            var marketArr = market.toLowerCase().split("-");
            while (marketArr.length > 0) {
                var localMarket = marketArr.join("-");
                let localObj = obj[localMarket];
                if (localObj) Object.keys(localObj).forEach(key => {
                    if (!(thisArg as Object).hasOwnProperty(key) && (localObj as Object).hasOwnProperty(key)) thisArg[key] = localObj[key];
                });

                marketArr = marketArr.slice(0, marketArr.length - 1);
            }
        });

        return thisArg;
    },
    gen() {
        let strings = {} as any;
        let options = {} as any;
        let market: string;
        let defaultMarket: string;
        let getMarkets = (lang?: string) => {
            return lang ? [lang, defaultMarket, inner.defaultMarket] : [market, inner.market, defaultMarket, inner.defaultMarket];
        };
        let obj = {
            getLanguage() {
                return market || inner.market || defaultMarket || inner.defaultMarket;
            },
            getCurrentLanguage() {
                return market;
            },
            setCurrentLanguage(value?: string) {
                if (value != null && typeof value !== "string") return false;
                market = value;
                return true;
            },
            getDefaultLanguage(value?: string) {
                return defaultMarket;
            },
            setDefaultLanguage(value?: string) {
                if (value != null && typeof value !== "string") return false;
                defaultMarket = value;
                return true;
            },
            register(langPack: LanguagePackInfoContract, override?: boolean) {
                if (!langPack || !langPack.language) return 0;
                let count = 0;
                ((langPack.language instanceof Array) ? langPack.language : [langPack.language]).forEach(lang => {
                    if (!lang || typeof lang !== "string") return;
                    lang = lang.toLowerCase();
                    count++;
                    if (override) {
                        strings[lang] = {};
                        options[lang] = {};
                    }

                    if (langPack.strings) strings[lang] = { ...(strings[lang] || {}), ...langPack.strings };
                    if (langPack.options) options[lang] = { ...(options[lang] || {}), ...langPack.options };
                });
                return count;
            },
            getString(lang: string | null, locale: boolean, key: string) {
                if (!key || typeof key !== "string") return undefined;
                if (locale) return inner.getLocalProperty(strings, getMarkets(lang), key);
                if (!lang) lang = obj.getLanguage();
                if (!lang || typeof lang !== "string") return undefined;
                return strings[lang] ? strings[lang][key] : undefined;
            },
            setString(lang: string | null, key: string, value: string) {
                if (!lang) lang = obj.getLanguage();
                if (!lang || !key || typeof lang !== "string" || typeof key !== "string") return false;
                if (value == null) {
                    if (strings[lang]) delete strings[lang][key];
                } else if (typeof value === "string") {
                    if (!strings[lang]) strings[lang] = {};
                    strings[lang][key] = value;
                } else {
                    return false;
                }

                return true;
            },
            copyStrings(lang: string | null, locale: boolean, thisArg: any) {
                return inner.getLocalProperties(strings, locale ? getMarkets(lang) : [lang || obj.getLanguage()], thisArg);
            },
            getOption(lang: string | null, locale: boolean, key: string) {
                if (!key || typeof key !== "string") return undefined;
                if (locale) return inner.getLocalProperty(options, getMarkets(lang), key);
                if (!lang) lang = obj.getLanguage();
                if (!lang || typeof lang !== "string") return undefined;
                return options[lang] ? options[lang][key] : undefined;
            },
            setOption(lang: string | null, key: string, value?: any) {
                if (!lang) lang = obj.getLanguage();
                if (!lang || !key || typeof lang !== "string" || typeof key !== "string") return false;
                if (value === undefined) {
                    if (options[lang]) delete options[lang][key];
                } else {
                    if (!options[lang]) options[lang] = {};
                    options[lang][key] = value;
                }

                return true;
            },
            copyOptions(lang: string | null, locale: boolean, thisArg: any) {
                return inner.getLocalProperties(options, locale ? getMarkets(lang) : [lang || obj.getLanguage()], thisArg);
            }
        };
        return obj;
    }
};

export function getDefaultLanguage() {
    return inner.defaultMarket;
}

export function setDefaultLanguage(value: string) {
    if (!value && typeof value !== "string") return false;
    inner.defaultMarket = value;
    return true;
}

export function getLanguage() {
    return inner.market;
}

export function setLanguage(value: string) {
    if (!value && typeof value !== "string") return false;
    inner.market = value;
    return true;
}

export function useSystemLanguage() {
    if (typeof navigator === "undefined") return false;
    if (!navigator) return false;
    let value = navigator.language
        || (navigator as any).userLanguage
        || (navigator as any).browserLanguage
        || (navigator as any).systemLanguage;
    if (!value && navigator.languages && navigator.languages.length && navigator.languages[0])
        value = navigator.languages[0];
    return setLanguage(value);
}

export function useDOMLanguage(dom?: HTMLElement) {
    if (!dom && typeof document !== "undefined") {
        if (document) dom = document.documentElement;
    }

    if (!dom) return false;
    let value = (dom || document.documentElement).lang;
    return setLanguage(value);
}

export function useQueryLanguage(key?: string) {
    let value = getQueryInfo()[key || "mkt"];
    return setLanguage(value);
}

try {
    let hasSet = useQueryLanguage();
    if (!hasSet) hasSet = useSystemLanguage();
    if (!hasSet) hasSet = useDOMLanguage();
} catch (ex) {}

export class Resources {

    private _res = inner.gen();

    public readonly readonly: ReadonlyResource;

    public readonly locale: ReadonlyLocalResource;

    constructor() {
        this.readonly = new ReadonlyResource(
            this._res.getLanguage,
            (lang, locale, key, ...args) => {
                let str = this._res.getString(lang, locale, key);
                return inner.format(str, args);
            },
            (lang, locale, thisArg) => {
                return this._res.copyStrings(lang, locale, thisArg);
            },
            (lang, locale, key) => {
                return this._res.getOption(lang, locale, key);
            },
            (lang, locale, thisArg) => {
                return this._res.copyOptions(lang, locale, thisArg);
            }
        );
        this.locale = this.readonly.locale;
    }

    public get language() {
        return this._res.getLanguage();
    }

    public get currentLanguage() {
        return this._res.getCurrentLanguage();
    }

    public set currentLanguage(value: string) {
        this._res.setCurrentLanguage(value);
    }

    public get defaultLanguage() {
        return this._res.getDefaultLanguage();
    }

    public set defaultLanguage(value: string) {
        this._res.setDefaultLanguage(value);
    }

    public register(langPack: LanguagePackInfoContract, override?: boolean) {
        return this._res.register(langPack, override);
    }

    public getLocaleString(key: string, ...args: string[]) {
        let str = this._res.getString(null, true, key);
        return inner.format(str, args);
    }

    public getSpecificLocaleString(lang: string, key: string, ...args: string[]) {
        let str = this._res.getString(lang, true, key);
        return inner.format(str, args);
    }

    public getCurrentPackString(lang: string, key: string, ...args: string[]) {
        let str = this._res.getString(null, false, key);
        return inner.format(str, args);
    }

    public getSpecificPackString(lang: string, key: string, ...args: string[]) {
        let str = this._res.getString(lang, false, key);
        return inner.format(str, args);
    }

    public setString(lang: string, key: string, value: string) {
        return this._res.setString(lang, key, value);
    }

    public setCurrentPackString(key: string, value: string) {
        return this._res.setString(null, key, value);
    }

    public batchSetStrings(lang: string, data: any) {
        if (!data) return 0;
        return this._res.register({
            language: lang,
            strings: data
        });
    }

    public copyStrings(lang?: string, thisArg?: any) {
        return this._res.copyStrings(lang, true, thisArg);
    }

    public copyCurrentPackStrings(lang?: string, thisArg?: any) {
        return this._res.copyStrings(lang, false, thisArg);
    }

    public getStringsKeys(lang?: string, thisArg?: any) {
        return Object.keys(this._res.copyOptions(lang, true, thisArg));
    }

    public getLocaleOption(key: string) {
        return this._res.getOption(null, true, key);
    }

    public getSpecificLocaleOption(lang: string, key: string) {
        return this._res.getOption(lang, true, key);
    }

    public getCurrentPackOption(key: string) {
        return this._res.getOption(null, false, key);
    }

    public getSpecificPackOption(lang: string, key: string) {
        return this._res.getOption(lang, false, key);
    }

    public setOption(lang: string, key: string, value: string) {
        return this._res.setOption(lang, key, value);
    }

    public setCurrentPackOption(key: string, value: string) {
        return this._res.setOption(null, key, value);
    }

    public batchSetOptions(lang: string, data: any) {
        if (!data) return 0;
        return this._res.register({
            language: lang,
            strings: null,
            options: data
        });
    }

    public copyOptions(lang?: string, thisArg?: any) {
        return this._res.copyOptions(lang, true, thisArg);
    }

    public copyCurrentPackOptions(lang?: string, thisArg?: any) {
        return this._res.copyOptions(lang, false, thisArg);
    }

    public getOptionsKeys(lang?: string, thisArg?: any) {
        return Object.keys(this._res.copyOptions(lang, true, thisArg));
    }

}

}
