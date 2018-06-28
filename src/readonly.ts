namespace LangPack {

/**
 * The locale resources to load strings and options from the langauge packs.
 */
export class ReadonlyLocaleResource {

    /**
     * Initializes a new instance of the ReadonlyLocaleResource class.
     */
    constructor(
        private _language: () => string,
        private _getString: (locale: boolean, key: string, ...args: string[]) => string,
        private _copyStrings: (locale: boolean, thisArg: any) => any,
        private _getOption: (locale: boolean, key: string) => any,
        private _copyOptions: (locale: boolean, thisArg: any) => any,
        private _getProp: (key: string) => any
    ) {}

    /**
     * Gets the code of this locale resource..
     */
    public get language() {
        return this._language();
    }

    /**
     * Gets the string.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getString(key: string, ...args: string[]) {
        return this._getString(true, key, ...args);
    }

    /**
     * Gets the string of the language pack.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getCurrentPackString(key: string, ...args: string[]) {
        return this._getString(false, key, ...args);
    }

    /**
     * Copies the strings object.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public copyStrings(thisArg?: any) {
        return this._copyStrings(true, thisArg);
    }

    /**
     * Copies the strings object of the language pack.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public copyCurrentPackStrings(thisArg?: any) {
        return this._copyStrings(false, thisArg);
    }

    /**
     * Gets the option.
     * @param key The string key.
     */
    public getOptions(key: string) {
        return this._getOption(true, key);
    }

    /**
     * Gets the option of the language pack.
     * @param key The string key.
     */
    public getCurrentPackOption(key: string) {
        return this._getOption(false, key);
    }

    /**
     * Copies the options object.
     * @param thisArg An optional object used to set properties from the options.
     */
    public copyOptions(thisArg?: any) {
        return this._copyOptions(true, thisArg);
    }

    /**
     * Copies the options object of the language pack.
     * @param thisArg An optional object used to set properties from the options.
     */
    public copyCurrentPackOptions(thisArg?: any) {
        return this._copyOptions(false, thisArg);
    }

    /**
     * Gets the specific prop.
     * @param key The property key.
     */
    public getProp(key: string) {
        return this._getProp(key);
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
    constructor(
        private _language: () => string,
        private _getString: (lang: string, locale: boolean, key: string, ...args: string[]) => string,
        private _copyStrings: (lang: string, locale: boolean, thisArg: any) => any,
        private _getOption: (lang: string, locale: boolean, key: string) => any,
        private _copyOptions: (lang: string, locale: boolean, thisArg: any) => any,
        private _getProp: (key: string) => any
    ) {
        this.locale = this.specific(null);
    }

    /**
     * Gets the specific locale resource.
     * @param lang The language code.
     */
    public specific(lang: string | null) {
        let getLang = lang ? () => {
            return lang;
        } : this._language;
        return new ReadonlyLocaleResource(
            getLang,
            (locale, key, ...args) => {
                return this._getString(getLang(), locale, key, ...args);
            },
            (locale, thisArg) => {
                return this._copyStrings(getLang(), locale, thisArg);
            },
            (locale, key) => {
                return this._getOption(getLang(), locale, key);
            },
            (locale, thisArg) => {
                return this._copyOptions(getLang(), locale, thisArg);
            },
            key => {
                return this._getProp(key);
            }
        )
    }

    /**
     * Gets the code of the current language if set to override the global one.
     */
    public get language() {
        return this._language();
    }

    /**
     * Gets the locale string.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getLocaleString(key: string, ...args: string[]) {
        return this._getString(null, true, key, ...args);
    }

    /**
     * Gets the locale string of the specific language.
     * @param lang The language code.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getSpecificLocaleString(lang: string, key: string, ...args: string[]) {
        return this._getString(lang, true, key, ...args);
    }

    /**
     * Gets the locale string of the current language pack.
     * @param lang The language code.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getCurrentPackString(key: string, ...args: string[]) {
        return this._getString(null, false, key, ...args);
    }

    /**
     * Gets the locale string of the specific language pack.
     * @param lang The language code.
     * @param key The string key.
     * @param args The arguments used to format.
     */
    public getSpecificPackString(lang: string, key: string, ...args: string[]) {
        return this._getString(lang, false, key, ...args);
    }

    /**
     * Copies the strings of the current or the specific language.
     * @param lang The language code; or null, to copy from the current language.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public copyStrings(lang?: string, thisArg?: any) {
        return this._copyStrings(lang, true, thisArg);
    }

    /**
     * Copies the strings of the current or the specific language pack.
     * @param lang The language code; or null, to copy from the current language pack.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public copySpecificPackStrings(lang?: string, thisArg?: any) {
        return this._copyStrings(lang, false, thisArg);
    }

    /**
     * Gets the keys of the current or the strings of the specific language.
     * @param lang The language code; or null, to copy from the current language.
     * @param thisArg An optional object used to set properties from the strings.
     */
    public getStringsKeys(lang?: string, thisArg?: any) {
        return Object.keys(this._copyOptions(lang, true, thisArg));
    }

    /**
     * Gets the locale option.
     * @param key The string key.
     */
    public getLocalOption(key: string) {
        return this._getOption(null, true, key);
    }

    /**
     * Gets the locale option of the specific language.
     * @param lang The language code.
     * @param key The string key.
     */
    public getSpecificLocaleOption(lang: string, key: string) {
        return this._getOption(lang, true, key);
    }

    /**
     * Gets the locale option of the current language pack.
     * @param lang The language code.
     * @param key The string key.
     */
    public getCurrentPackOption(key: string) {
        return this._getOption(null, false, key);
    }

    /**
     * Gets the locale option of the specific language pack.
     * @param lang The language code.
     * @param key The string key.
     */
    public getSpecificPackOption(lang: string, key: string) {
        return this._getOption(lang, false, key);
    }

    /**
     * Copies the options of the current or the specific language.
     * @param lang The language code; or null, to copy from the current language.
     * @param thisArg An optional object used to set properties from the options.
     */
    public copyOptions(lang?: string, thisArg?: any) {
        return this._copyOptions(lang, true, thisArg);
    }

    /**
     * Copies the options of the current or the specific language pack.
     * @param lang The language code; or null, to copy from the current language pack.
     * @param thisArg An optional object used to set properties from the options.
     */
    public copySpecificPackOptions(lang?: string, thisArg?: any) {
        return this._copyOptions(lang, false, thisArg);
    }

    /**
     * Gets the keys of the current or the options of the specific language.
     * @param lang The language code; or null, to copy from the current language.
     * @param thisArg An optional object used to set properties from the options.
     */
    public getOptionsKeys(lang?: string, thisArg?: any) {
        return Object.keys(this._copyOptions(lang, true, thisArg));
    }

    /**
     * Gets the specific prop.
     * @param key The property key.
     */
    public getProp(key: string) {
        return this._getProp(key);
    }
}

}