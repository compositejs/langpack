namespace LangPack {

let inner = {
    market: undefined as string,
    defaultMarket: "en-US",
    format(str: string, args: string[]) {
        if (!str) return "";
        if (args && args.length > 0) {
            args.forEach((item, i) => {
                if (!item) item = "";
                let placeholder = "{" + i.toString() + "}";
                str = str.replace(placeholder, item).replace(placeholder, item).replace(placeholder, item).replace(placeholder, item);
            });
            for (let i = args.length; i < args.length + 10; i++) {
                let placeholder = "{" + i.toString() + "}";
                str = str.replace(placeholder, "").replace(placeholder, "").replace(placeholder, "").replace(placeholder, "");
            }
        }

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
            getLanguageUsed() {
                return market || inner.market || defaultMarket || inner.defaultMarket;
            },
            getLanguage() {
                return market;
            },
            setLanguage(value?: string) {
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
            setOption(lang: string | null, key: string, value: any) {
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

/**
 * Gets the code of the default language
 * so that it can be used if the current langauge set is not registered
 */
export function getDefaultLanguage() {
    return inner.defaultMarket;
}

/**
 * Sets the code of the default language.
 * @param value The code of the new default langauge to set.
 */
export function setDefaultLanguage(value: string) {
    if (!value && typeof value !== "string") return false;
    inner.defaultMarket = value;
    return true;
}

/**
 * Gets the code of the current language.
 */
export function getLanguage() {
    return inner.market;
}

/**
 * Sets the code of the current language.
 * @param value The code of the new current language to set.
 */
export function setLanguage(value: string) {
    if (!value && typeof value !== "string") return false;
    inner.market = value;
    return true;
}

/**
 * Sets the current language by system language.
 */
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

/**
 * Sets the current language by the lang attribute in html tag or the specific DOM.
 * @param dom The DOM to get lang attribute. Or use lang attribute of html tag.
 */
export function useDOMLanguage(dom?: HTMLElement) {
    if (!dom && typeof document !== "undefined") {
        if (document) dom = document.documentElement;
    }

    if (!dom) return false;
    let value = (dom || document.documentElement).lang;
    return setLanguage(value);
}

/**
 * Sets the current language by the value in URL query.
 * @param key The query key of URL. The default is mkt.
 */
export function useQueryLanguage(key?: string) {
    let value = getQueryInfo()[key || "mkt"];
    return setLanguage(value);
}

try {
    let hasSet = useQueryLanguage();
    if (!hasSet) hasSet = useSystemLanguage();
    if (!hasSet) hasSet = useDOMLanguage();
} catch (ex) {}

/**
 * The resources to manage the langauge packs.
 */
export class Resources {

    private _res = inner.gen();

    /**
     * Gets the readonly instance.
     */
    public readonly readonly: ReadonlyResource;

    /**
     * Gets the local resource of the current language.
     */
    public readonly locale: ReadonlyLocaleResource;

    /**
     * Initializes a new instance of the Resources class.
     */
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

    /**
     * Gets the current language used.
     */
    public get languageUsed() {
        return this._res.getLanguageUsed();
    }

    /**
     * Gets the current language if set to override the global one.
     */
    public get language() {
        return this._res.getLanguage();
    }

    /**
     * Sets the current language for this resource.
     */
    public set language(value: string) {
        this._res.setLanguage(value);
    }

    /**
     * Gets the default language of this resource.
     */
    public get defaultLanguage() {
        return this._res.getDefaultLanguage();
    }

    /**
     * Sets the default language for this resource.
     */
    public set defaultLanguage(value: string) {
        this._res.setDefaultLanguage(value);
    }

    /**
     * Registers a language pack.
     * @param langPack The language pack to register.
     * @param override true if override the original one if registered; otherwise, false, by default, to merge.
     */
    public register(langPack: LanguagePackInfoContract | LanguagePackInfoContract[], override?: boolean) {
        let count = 0;
        if (langPack instanceof Array) langPack.forEach(lp => {
            count += this._res.register(lp, override);
        });
        else count = this._res.register(langPack, override);
        return count;
    }

    /**
     * Gets the locale string.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getLocaleString(key: string, ...args: string[]) {
        let str = this._res.getString(null, true, key);
        return inner.format(str, args);
    }

    /**
     * Gets the locale string of the specific language.
     * @param lang The language code.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getSpecificLocaleString(lang: string, key: string, ...args: string[]) {
        let str = this._res.getString(lang, true, key);
        return inner.format(str, args);
    }

    /**
     * Gets the locale string of the current language pack.
     * @param lang The language code.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getCurrentPackString(key: string, ...args: string[]) {
        let str = this._res.getString(null, false, key);
        return inner.format(str, args);
    }

    /**
     * Gets the locale string of the specific language pack.
     * @param lang The language code.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getSpecificPackString(lang: string, key: string, ...args: string[]) {
        let str = this._res.getString(lang, false, key);
        return inner.format(str, args);
    }

    /**
     * Sets the locale string of a specific language pack.
     * @param lang The language pack.
     * @param key The string key.
     * @param value The string.
     */
    public setString(lang: string, key: string, value?: string) {
        return this._res.setString(lang, key, value);
    }

    /**
     * Sets the locale string of the language pack of the current language.
     * @param key The string key.
     * @param value The string.
     */
    public setCurrentPackString(key: string, value?: string) {
        return this._res.setString(null, key, value);
    }

    /**
     * Sets the strings of a specific language pack.
     * @param lang The language code.
     * @param data The strings.
     */
    public batchSetStrings(lang: string, data: any) {
        if (!data) return 0;
        return this._res.register({
            language: lang,
            strings: data
        });
    }

    /**
     * Copies the strings of the current or the specific language.
     * @param lang The language code; or null, to copy from the current language.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public copyStrings(lang?: string, thisArg?: any) {
        return this._res.copyStrings(lang, true, thisArg);
    }

    /**
     * Copies the strings of the current or the specific language pack.
     * @param lang The language code; or null, to copy from the current language pack.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public copySpecificPackStrings(lang?: string, thisArg?: any) {
        return this._res.copyStrings(lang, false, thisArg);
    }

    /**
     * Gets the keys of the current or the strings of the specific language.
     * @param lang The language code; or null, to copy from the current language.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public getStringsKeys(lang?: string, thisArg?: any) {
        return Object.keys(this._res.copyOptions(lang, true, thisArg));
    }

    /**
     * Gets the locale option.
     * @param key The string key.
     */
    public getLocaleOption(key: string) {
        return this._res.getOption(null, true, key);
    }

    /**
     * Gets the locale option of the specific language.
     * @param lang The language code.
     * @param key The string key.
     */
    public getSpecificLocaleOption(lang: string, key: string) {
        return this._res.getOption(lang, true, key);
    }

    /**
     * Gets the locale option of the current language pack.
     * @param lang The language code.
     * @param key The string key.
     */
    public getCurrentPackOption(key: string) {
        return this._res.getOption(null, false, key);
    }

    /**
     * Gets the locale option of the specific language pack.
     * @param lang The language code.
     * @param key The string key.
     */
    public getSpecificPackOption(lang: string, key: string) {
        return this._res.getOption(lang, false, key);
    }

    /**
     * Sets the locale option of a specific language pack.
     * @param lang The language pack.
     * @param key The string key.
     * @param value The string.
     */
    public setOption(lang: string, key: string, value?: any) {
        return this._res.setOption(lang, key, value);
    }

    /**
     * Sets the locale string of the language pack of the current language.
     * @param key The string key.
     * @param value The string.
     */
    public setCurrentPackOption(key: string, value?: any) {
        return this._res.setOption(null, key, value);
    }

    /**
     * Sets the options of a specific language pack.
     * @param lang The language code.
     * @param data The options.
     */
    public batchSetOptions(lang: string, data: any) {
        if (!data) return 0;
        return this._res.register({
            language: lang,
            strings: null,
            options: data
        });
    }

    /**
     * Copies the options of the current or the specific language.
     * @param lang The language code; or null, to copy from the current language.
     * @param thisArg An optional object used to set properties from the options.
     */
    public copyOptions(lang?: string, thisArg?: any) {
        return this._res.copyOptions(lang, true, thisArg);
    }

    /**
     * Copies the options of the current or the specific language pack.
     * @param lang The language code; or null, to copy from the current language pack.
     * @param thisArg An optional object used to set properties from the options.
     */
    public copySpecificPackOptions(lang?: string, thisArg?: any) {
        return this._res.copyOptions(lang, false, thisArg);
    }

    /**
     * Gets the keys of the current or the options of the specific language.
     * @param lang The language code; or null, to copy from the current language.
     * @param thisArg An optional object used to set properties from the options.
     */
    public getOptionsKeys(lang?: string, thisArg?: any) {
        return Object.keys(this._res.copyOptions(lang, true, thisArg));
    }

}

}
