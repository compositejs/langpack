namespace LangPack {

export interface ResourceGettersContract {
    language: () => string,
    getString: (lang: string, locale: boolean, key: string, ...args: string[]) => string,
    copyStrings: (lang: string, locale: boolean, thisArg: any) => any,
    getOption: (lang: string, locale: boolean, key: string) => any,
    copyOptions: (lang: string, locale: boolean, thisArg: any) => any,
    getProp: (key: string) => any
}

export interface ResourceLocaleGettersContract {
    language: () => string,
    getString: (locale: boolean, key: string, ...args: string[]) => string,
    copyStrings: (locale: boolean, thisArg: any) => any,
    getOption: (locale: boolean, key: string) => any,
    copyOptions: (locale: boolean, thisArg: any) => any,
    getProp: (key: string) => any
}

/**
 * The locale resources to load strings and options from the langauge packs.
 */
export class ReadonlyLocaleResource {

    /**
     * Initializes a new instance of the ReadonlyLocaleResource class.
     */
    constructor(
        private _impl: ResourceLocaleGettersContract
    ) {}

    /**
     * Gets the code of this locale resource..
     */
    public get language() {
        return this._impl.language();
    }

    /**
     * Checks if the specific language covers the current one.
     * @param lang The language code to compare.
     * @param exact true if the two should equal; otherwise, false.
     */
    public isLanguage(lang: string, exact?: boolean) {
        return isLanguage(lang, exact, this._impl.language());
    }

    /**
     * Gets the string.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getString(key: string, ...args: string[]) {
        return this._impl.getString(true, key, ...args);
    }

    /**
     * Gets the string of the language pack.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getCurrentPackString(key: string, ...args: string[]) {
        return this._impl.getString(false, key, ...args);
    }

    /**
     * Copies the strings object.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public copyStrings(thisArg?: any) {
        return this._impl.copyStrings(true, thisArg);
    }

    /**
     * Copies the strings object of the language pack.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public copyCurrentPackStrings(thisArg?: any) {
        return this._impl.copyStrings(false, thisArg);
    }

    /**
     * Gets the option.
     * @param key The string key.
     */
    public getOptions(key: string) {
        return this._impl.getOption(true, key);
    }

    /**
     * Gets the option of the language pack.
     * @param key The string key.
     */
    public getCurrentPackOption(key: string) {
        return this._impl.getOption(false, key);
    }

    /**
     * Copies the options object.
     * @param thisArg An optional object used to set properties from the options.
     */
    public copyOptions(thisArg?: any) {
        return this._impl.copyOptions(true, thisArg);
    }

    /**
     * Copies the options object of the language pack.
     * @param thisArg An optional object used to set properties from the options.
     */
    public copyCurrentPackOptions(thisArg?: any) {
        return this._impl.copyOptions(false, thisArg);
    }

    /**
     * Gets the specific prop.
     * @param key The property key.
     */
    public getProp(key: string) {
        return this._impl.getProp(key);
    }
}

/**
 * The resources to load strings and options from the langauge packs.
 */
export class ReadonlyResource {

    /**
     * Gets the local resource of the current language.
     */
    public readonly locale: ReadonlyLocaleResource;

    /**
     * Initializes a new instance of the ReadonlyResources class.
     */
    constructor(private _impl: ResourceGettersContract) {
        this.locale = this.specific(null);
    }

    /**
     * Gets the specific locale resource.
     * @param lang The language code.
     */
    public specific(lang: string | null) {
        let getLang = lang ? () => {
            return lang;
        } : this._impl.language;
        return new ReadonlyLocaleResource({
            language: getLang,
            getString(locale, key, ...args) {
                return this._impl.getString(getLang(), locale, key, ...args);
            },
            copyStrings(locale, thisArg) {
                return this._impl.copyStrings(getLang(), locale, thisArg);
            },
            getOption(locale, key) {
                return this._impl.getOption(getLang(), locale, key);
            },
            copyOptions(locale, thisArg) {
                return this._impl.copyOptions(getLang(), locale, thisArg);
            },
            getProp(key) {
                return this._impl.getProp(key);
            }
        });
    }

    /**
     * Gets the code of the current language if set to override the global one.
     */
    public get language() {
        return this._impl.language();
    }

    /**
     * Gets the locale string.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getLocaleString(key: string, ...args: string[]) {
        return this._impl.getString(null, true, key, ...args);
    }

    /**
     * Gets the locale string of the specific language.
     * @param lang The language code.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getSpecificLocaleString(lang: string, key: string, ...args: string[]) {
        return this._impl.getString(lang, true, key, ...args);
    }

    /**
     * Gets the locale string of the current language pack.
     * @param lang The language code.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getCurrentPackString(key: string, ...args: string[]) {
        return this._impl.getString(null, false, key, ...args);
    }

    /**
     * Gets the locale string of the specific language pack.
     * @param lang The language code.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getSpecificPackString(lang: string, key: string, ...args: string[]) {
        return this._impl.getString(lang, false, key, ...args);
    }

    /**
     * Copies the strings of the current or the specific language.
     * @param lang The language code; or null, to copy from the current language.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public copyStrings(lang?: string, thisArg?: any) {
        return this._impl.copyStrings(lang, true, thisArg);
    }

    /**
     * Copies the strings of the current or the specific language pack.
     * @param lang The language code; or null, to copy from the current language pack.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public copySpecificPackStrings(lang?: string, thisArg?: any) {
        return this._impl.copyStrings(lang, false, thisArg);
    }

    /**
     * Gets the keys of the current or the strings of the specific language.
     * @param lang The language code; or null, to copy from the current language.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public getStringsKeys(lang?: string, thisArg?: any) {
        return Object.keys(this._impl.copyOptions(lang, true, thisArg));
    }

    /**
     * Gets the locale option.
     * @param key The string key.
     */
    public getLocalOption(key: string) {
        return this._impl.getOption(null, true, key);
    }

    /**
     * Gets the locale option of the specific language.
     * @param lang The language code.
     * @param key The string key.
     */
    public getSpecificLocaleOption(lang: string, key: string) {
        return this._impl.getOption(lang, true, key);
    }

    /**
     * Gets the locale option of the current language pack.
     * @param lang The language code.
     * @param key The string key.
     */
    public getCurrentPackOption(key: string) {
        return this._impl.getOption(null, false, key);
    }

    /**
     * Gets the locale option of the specific language pack.
     * @param lang The language code.
     * @param key The string key.
     */
    public getSpecificPackOption(lang: string, key: string) {
        return this._impl.getOption(lang, false, key);
    }

    /**
     * Copies the options of the current or the specific language.
     * @param lang The language code; or null, to copy from the current language.
     * @param thisArg An optional object used to set properties from the options.
     */
    public copyOptions(lang?: string, thisArg?: any) {
        return this._impl.copyOptions(lang, true, thisArg);
    }

    /**
     * Copies the options of the current or the specific language pack.
     * @param lang The language code; or null, to copy from the current language pack.
     * @param thisArg An optional object used to set properties from the options.
     */
    public copySpecificPackOptions(lang?: string, thisArg?: any) {
        return this._impl.copyOptions(lang, false, thisArg);
    }

    /**
     * Gets the keys of the current or the options of the specific language.
     * @param lang The language code; or null, to copy from the current language.
     * @param thisArg An optional object used to set properties from the options.
     */
    public getOptionsKeys(lang?: string, thisArg?: any) {
        return Object.keys(this._impl.copyOptions(lang, true, thisArg));
    }

    /**
     * Gets the specific prop.
     * @param key The property key.
     */
    public getProp(key: string) {
        return this._impl.getProp(key);
    }
}

}