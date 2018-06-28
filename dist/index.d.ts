declare namespace LangPack {
    interface QueryInfoResolveOptionsContract {
        emptyString?: boolean;
        notToDecode?: boolean;
        multipleValues?: boolean;
    }
    function getQueryInfo(url?: string, options?: QueryInfoResolveOptionsContract): any;
}
declare namespace LangPack {
    class ReadonlyLocalResource {
        private _language;
        private _getString;
        private _copyStrings;
        private _getOption;
        private _copyOptions;
        constructor(_language: () => string, _getString: (locale: boolean, key: string, ...args: string[]) => string, _copyStrings: (locale: boolean, thisArg: any) => any, _getOption: (locale: boolean, key: string) => any, _copyOptions: (locale: boolean, thisArg: any) => any);
        readonly language: string;
        getString(key: string, ...args: string[]): string;
        getCurrentPackString(lang: string, key: string, ...args: string[]): string;
        copyStrings(thisArg?: any): any;
        copyCurrentPackStrings(thisArg?: any): any;
        getLocalOptions(key: string): any;
        getCurrentPackOption(key: string): any;
        copyOptions(thisArg?: any): any;
        copyCurrentPackOptions(thisArg?: any): any;
    }
    class ReadonlyResource {
        private _language;
        private _getString;
        private _copyStrings;
        private _getOption;
        private _copyOptions;
        readonly locale: ReadonlyLocalResource;
        constructor(_language: () => string, _getString: (lang: string, locale: boolean, key: string, ...args: string[]) => string, _copyStrings: (lang: string, locale: boolean, thisArg: any) => any, _getOption: (lang: string, locale: boolean, key: string) => any, _copyOptions: (lang: string, locale: boolean, thisArg: any) => any);
        specific(lang: string | null): ReadonlyLocalResource;
        language(): string;
        getLocalString(lang: string, key: string, ...args: string[]): string;
        getSpecificLocaleString(lang: string, key: string, ...args: string[]): string;
        getCurrentPackString(lang: string, key: string, ...args: string[]): string;
        getSpecificPackString(lang: string, key: string, ...args: string[]): string;
        copyStrings(lang?: string, thisArg?: any): any;
        copyCurrentPackStrings(lang?: string, thisArg?: any): any;
        getLocalOptions(lang: string, key: string): any;
        getSpecificLocaleOption(lang: string, key: string): any;
        getCurrentPackOption(key: string): any;
        getSpecificPackOption(lang: string, key: string): any;
        copyOptions(lang?: string, thisArg?: any): any;
        copyCurrentPackOptions(lang?: string, thisArg?: any): any;
    }
}
declare namespace LangPack {
    interface LanguagePackInfoContract {
        language: string | string[];
        strings: any;
        options?: any;
    }
    function getDefaultLanguage(): string;
    function setDefaultLanguage(value: string): boolean;
    function getLanguage(): string;
    function setLanguage(value: string): boolean;
    function useSystemLanguage(): boolean;
    function useDOMLanguage(dom?: HTMLElement): boolean;
    function useQueryLanguage(key?: string): boolean;
    class Resources {
        private _res;
        readonly readonly: ReadonlyResource;
        readonly locale: ReadonlyLocalResource;
        constructor();
        readonly language: string;
        currentLanguage: string;
        defaultLanguage: string;
        register(langPack: LanguagePackInfoContract, override?: boolean): number;
        getLocaleString(key: string, ...args: string[]): string;
        getSpecificLocaleString(lang: string, key: string, ...args: string[]): string;
        getCurrentPackString(lang: string, key: string, ...args: string[]): string;
        getSpecificPackString(lang: string, key: string, ...args: string[]): string;
        setString(lang: string, key: string, value: string): boolean;
        setCurrentPackString(key: string, value: string): boolean;
        batchSetStrings(lang: string, data: any): number;
        copyStrings(lang?: string, thisArg?: any): any;
        copyCurrentPackStrings(lang?: string, thisArg?: any): any;
        getStringsKeys(lang?: string, thisArg?: any): string[];
        getLocaleOption(key: string): any;
        getSpecificLocaleOption(lang: string, key: string): any;
        getCurrentPackOption(key: string): any;
        getSpecificPackOption(lang: string, key: string): any;
        setOption(lang: string, key: string, value: string): boolean;
        setCurrentPackOption(key: string, value: string): boolean;
        batchSetOptions(lang: string, data: any): number;
        copyOptions(lang?: string, thisArg?: any): any;
        copyCurrentPackOptions(lang?: string, thisArg?: any): any;
        getOptionsKeys(lang?: string, thisArg?: any): string[];
    }
}
