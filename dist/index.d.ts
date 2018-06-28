declare namespace LangPack {
    /**
     * The language pack information data.
     */
    interface LanguagePackInfoContract {
        /**
         * The language code or the list of language code.
         */
        language: string | string[];
        /**
         * The strings object to register.
         */
        strings: any;
        /**
         * The options object to register.
         */
        options?: any;
    }
    /**
     * The options for getting query info object.
     */
    interface QueryInfoResolveOptionsContract {
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
    function getQueryInfo(url?: string, options?: QueryInfoResolveOptionsContract): any;
}
declare namespace LangPack {
    /**
     * The locale resources to load strings and options from the langauge packs.
     */
    class ReadonlyLocaleResource {
        private _language;
        private _getString;
        private _copyStrings;
        private _getOption;
        private _copyOptions;
        private _getProp;
        /**
         * Initializes a new instance of the ReadonlyLocaleResource class.
         */
        constructor(_language: () => string, _getString: (locale: boolean, key: string, ...args: string[]) => string, _copyStrings: (locale: boolean, thisArg: any) => any, _getOption: (locale: boolean, key: string) => any, _copyOptions: (locale: boolean, thisArg: any) => any, _getProp: (key: string) => any);
        /**
         * Gets the code of this locale resource..
         */
        readonly language: string;
        /**
         * Gets the string.
         * @param key The string key.
         * @param args The arguments used to format.
         */
        getString(key: string, ...args: string[]): string;
        /**
         * Gets the string of the language pack.
         * @param key The string key.
         * @param args The arguments used to format.
         */
        getCurrentPackString(key: string, ...args: string[]): string;
        /**
         * Copies the strings object.
         * @param thisArg An optional object used to set properties from the strings.
         */
        copyStrings(thisArg?: any): any;
        /**
         * Copies the strings object of the language pack.
         * @param thisArg An optional object used to set properties from the strings.
         */
        copyCurrentPackStrings(thisArg?: any): any;
        /**
         * Gets the option.
         * @param key The string key.
         */
        getOptions(key: string): any;
        /**
         * Gets the option of the language pack.
         * @param key The string key.
         */
        getCurrentPackOption(key: string): any;
        /**
         * Copies the options object.
         * @param thisArg An optional object used to set properties from the options.
         */
        copyOptions(thisArg?: any): any;
        /**
         * Copies the options object of the language pack.
         * @param thisArg An optional object used to set properties from the options.
         */
        copyCurrentPackOptions(thisArg?: any): any;
        /**
         * Gets the specific prop.
         * @param key The property key.
         */
        getProp(key: string): any;
    }
    /**
     * The resources to load strings and options from the langauge packs.
     */
    class ReadonlyResource {
        private _language;
        private _getString;
        private _copyStrings;
        private _getOption;
        private _copyOptions;
        private _getProp;
        /**
         * Gets the local resource of the current language.
         */
        readonly locale: ReadonlyLocaleResource;
        /**
         * Initializes a new instance of the ReadonlyResources class.
         */
        constructor(_language: () => string, _getString: (lang: string, locale: boolean, key: string, ...args: string[]) => string, _copyStrings: (lang: string, locale: boolean, thisArg: any) => any, _getOption: (lang: string, locale: boolean, key: string) => any, _copyOptions: (lang: string, locale: boolean, thisArg: any) => any, _getProp: (key: string) => any);
        /**
         * Gets the specific locale resource.
         * @param lang The language code.
         */
        specific(lang: string | null): ReadonlyLocaleResource;
        /**
         * Gets the code of the current language if set to override the global one.
         */
        readonly language: string;
        /**
         * Gets the locale string.
         * @param key The string key.
         * @param args The arguments used to format.
         */
        getLocaleString(key: string, ...args: string[]): string;
        /**
         * Gets the locale string of the specific language.
         * @param lang The language code.
         * @param key The string key.
         * @param args The arguments used to format.
         */
        getSpecificLocaleString(lang: string, key: string, ...args: string[]): string;
        /**
         * Gets the locale string of the current language pack.
         * @param lang The language code.
         * @param key The string key.
         * @param args The arguments used to format.
         */
        getCurrentPackString(key: string, ...args: string[]): string;
        /**
         * Gets the locale string of the specific language pack.
         * @param lang The language code.
         * @param key The string key.
         * @param args The arguments used to format.
         */
        getSpecificPackString(lang: string, key: string, ...args: string[]): string;
        /**
         * Copies the strings of the current or the specific language.
         * @param lang The language code; or null, to copy from the current language.
         * @param thisArg An optional object used to set properties from the strings.
         */
        copyStrings(lang?: string, thisArg?: any): any;
        /**
         * Copies the strings of the current or the specific language pack.
         * @param lang The language code; or null, to copy from the current language pack.
         * @param thisArg An optional object used to set properties from the strings.
         */
        copySpecificPackStrings(lang?: string, thisArg?: any): any;
        /**
         * Gets the keys of the current or the strings of the specific language.
         * @param lang The language code; or null, to copy from the current language.
         * @param thisArg An optional object used to set properties from the strings.
         */
        getStringsKeys(lang?: string, thisArg?: any): string[];
        /**
         * Gets the locale option.
         * @param key The string key.
         */
        getLocalOption(key: string): any;
        /**
         * Gets the locale option of the specific language.
         * @param lang The language code.
         * @param key The string key.
         */
        getSpecificLocaleOption(lang: string, key: string): any;
        /**
         * Gets the locale option of the current language pack.
         * @param lang The language code.
         * @param key The string key.
         */
        getCurrentPackOption(key: string): any;
        /**
         * Gets the locale option of the specific language pack.
         * @param lang The language code.
         * @param key The string key.
         */
        getSpecificPackOption(lang: string, key: string): any;
        /**
         * Copies the options of the current or the specific language.
         * @param lang The language code; or null, to copy from the current language.
         * @param thisArg An optional object used to set properties from the options.
         */
        copyOptions(lang?: string, thisArg?: any): any;
        /**
         * Copies the options of the current or the specific language pack.
         * @param lang The language code; or null, to copy from the current language pack.
         * @param thisArg An optional object used to set properties from the options.
         */
        copySpecificPackOptions(lang?: string, thisArg?: any): any;
        /**
         * Gets the keys of the current or the options of the specific language.
         * @param lang The language code; or null, to copy from the current language.
         * @param thisArg An optional object used to set properties from the options.
         */
        getOptionsKeys(lang?: string, thisArg?: any): string[];
        /**
         * Gets the specific prop.
         * @param key The property key.
         */
        getProp(key: string): any;
    }
}
declare namespace LangPack {
    /**
     * Gets the code of the default language
     * so that it can be used if the current langauge set is not registered
     */
    function getDefaultLanguage(): string;
    /**
     * Sets the code of the default language.
     * @param value The code of the new default langauge to set.
     */
    function setDefaultLanguage(value: string): boolean;
    /**
     * Gets the code of the current language.
     */
    function getLanguage(): string;
    /**
     * Sets the code of the current language.
     * @param value The code of the new current language to set.
     */
    function setLanguage(value: string): boolean;
    /**
     * Sets the current language by system language.
     */
    function useSystemLanguage(): boolean;
    /**
     * Sets the current language by the lang attribute in html tag or the specific DOM.
     * @param dom The DOM to get lang attribute. Or use lang attribute of html tag.
     */
    function useDOMLanguage(dom?: HTMLElement): boolean;
    /**
     * Sets the current language by the value in URL query.
     * @param key The query key of URL. The default is mkt.
     */
    function useQueryLanguage(key?: string): boolean;
    /**
     * The resources to manage the langauge packs.
     */
    class Resources {
        private _res;
        /**
         * Gets the readonly instance.
         */
        readonly readonly: ReadonlyResource;
        /**
         * Gets the local resource of the current language.
         */
        readonly locale: ReadonlyLocaleResource;
        /**
         * Initializes a new instance of the Resources class.
         */
        constructor();
        /**
         * Gets the current language used.
         */
        readonly languageUsed: string;
        /**
         * Gets the current language if set to override the global one.
         */
        /**
        * Sets the current language for this resource.
        */
        language: string;
        /**
         * Gets the default language of this resource.
         */
        /**
        * Sets the default language for this resource.
        */
        defaultLanguage: string;
        /**
         * Registers a language pack.
         * @param langPack The language pack to register.
         * @param override true if override the original one if registered; otherwise, false, by default, to merge.
         */
        register(langPack: LanguagePackInfoContract | LanguagePackInfoContract[], override?: boolean): number;
        /**
         * Gets the locale string.
         * @param key The string key.
         * @param args The arguments used to format.
         */
        getLocaleString(key: string, ...args: string[]): string;
        /**
         * Gets the locale string of the specific language.
         * @param lang The language code.
         * @param key The string key.
         * @param args The arguments used to format.
         */
        getSpecificLocaleString(lang: string, key: string, ...args: string[]): string;
        /**
         * Gets the locale string of the current language pack.
         * @param lang The language code.
         * @param key The string key.
         * @param args The arguments used to format.
         */
        getCurrentPackString(key: string, ...args: string[]): string;
        /**
         * Gets the locale string of the specific language pack.
         * @param lang The language code.
         * @param key The string key.
         * @param args The arguments used to format.
         */
        getSpecificPackString(lang: string, key: string, ...args: string[]): string;
        /**
         * Sets the locale string of a specific language pack.
         * @param lang The language pack.
         * @param key The string key.
         * @param value The string.
         */
        setString(lang: string, key: string, value?: string): boolean;
        /**
         * Sets the locale string of the language pack of the current language.
         * @param key The string key.
         * @param value The string.
         */
        setCurrentPackString(key: string, value?: string): boolean;
        /**
         * Removes the locale string of a specific language pack.
         * @param lang The language pack.
         * @param key The string key.
         * @param value The string.
         */
        removeString(lang: string, key: string, value?: string): boolean;
        /**
         * Removes the locale string of the language pack of the current language.
         * @param key The string key.
         * @param value The string.
         */
        removeCurrentPackString(key: string, value?: string): boolean;
        /**
         * Sets the strings of a specific language pack.
         * @param lang The language code.
         * @param data The strings.
         */
        batchSetStrings(lang: string, data: any): number;
        /**
         * Copies the strings of the current or the specific language.
         * @param lang The language code; or null, to copy from the current language.
         * @param thisArg An optional object used to set properties from the strings.
         */
        copyStrings(lang?: string, thisArg?: any): any;
        /**
         * Copies the strings of the current or the specific language pack.
         * @param lang The language code; or null, to copy from the current language pack.
         * @param thisArg An optional object used to set properties from the strings.
         */
        copySpecificPackStrings(lang?: string, thisArg?: any): any;
        /**
         * Gets the keys of the current or the strings of the specific language.
         * @param lang The language code; or null, to copy from the current language.
         * @param thisArg An optional object used to set properties from the strings.
         */
        getStringsKeys(lang?: string, thisArg?: any): string[];
        /**
         * Gets the locale option.
         * @param key The string key.
         */
        getLocaleOption(key: string): any;
        /**
         * Gets the locale option of the specific language.
         * @param lang The language code.
         * @param key The string key.
         */
        getSpecificLocaleOption(lang: string, key: string): any;
        /**
         * Gets the locale option of the current language pack.
         * @param lang The language code.
         * @param key The string key.
         */
        getCurrentPackOption(key: string): any;
        /**
         * Gets the locale option of the specific language pack.
         * @param lang The language code.
         * @param key The string key.
         */
        getSpecificPackOption(lang: string, key: string): any;
        /**
         * Sets the locale option of a specific language pack.
         * @param lang The language pack.
         * @param key The string key.
         * @param value The string.
         */
        setOption(lang: string, key: string, value?: any): boolean;
        /**
         * Sets the locale string of the language pack of the current language.
         * @param key The string key.
         * @param value The string.
         */
        setCurrentPackOption(key: string, value?: any): boolean;
        /**
         * Removes the locale option of a specific language pack.
         * @param lang The language pack.
         * @param key The string key.
         */
        removeOption(lang: string, key: string): boolean;
        /**
         * Removes the locale string of the language pack of the current language.
         * @param key The string key.
         */
        removeCurrentPackOption(key: string): boolean;
        /**
         * Sets the options of a specific language pack.
         * @param lang The language code.
         * @param data The options.
         */
        batchSetOptions(lang: string, data: any): number;
        /**
         * Copies the options of the current or the specific language.
         * @param lang The language code; or null, to copy from the current language.
         * @param thisArg An optional object used to set properties from the options.
         */
        copyOptions(lang?: string, thisArg?: any): any;
        /**
         * Copies the options of the current or the specific language pack.
         * @param lang The language code; or null, to copy from the current language pack.
         * @param thisArg An optional object used to set properties from the options.
         */
        copySpecificPackOptions(lang?: string, thisArg?: any): any;
        /**
         * Gets the keys of the current or the options of the specific language.
         * @param lang The language code; or null, to copy from the current language.
         * @param thisArg An optional object used to set properties from the options.
         */
        getOptionsKeys(lang?: string, thisArg?: any): string[];
        /**
         * Gets the specific prop.
         * @param key The property key.
         */
        getProp(key: string): any;
        /**
         * Sets the specific prop.
         * @param key The property key.
         * @param value The value of the property
         */
        setProp(key: string, value: any): boolean;
        /**
         * Removes the specific prop.
         * @param key The property key.
         */
        removeProp(key: string): boolean;
    }
}
