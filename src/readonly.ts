namespace LangPack {

export class ReadonlyLocalResource {

    constructor(
        private _language: () => string,
        private _getString: (locale: boolean, key: string, ...args: string[]) => string,
        private _copyStrings: (locale: boolean, thisArg: any) => any,
        private _getOption: (locale: boolean, key: string) => any,
        private _copyOptions: (locale: boolean, thisArg: any) => any
    ) {}

    public get language() {
        return this._language();
    }

    public getString(key: string, ...args: string[]) {
        return this._getString(true, key, ...args);
    }

    public getCurrentPackString(lang: string, key: string, ...args: string[]) {
        return this._getString(false, key, ...args);
    }

    public copyStrings(thisArg?: any) {
        return this._copyStrings(true, thisArg);
    }

    public copyCurrentPackStrings(thisArg?: any) {
        return this._copyStrings(false, thisArg);
    }

    public getLocalOptions(key: string) {
        return this._getOption(true, key);
    }

    public getCurrentPackOption(key: string) {
        return this._getOption(false, key);
    }

    public copyOptions(thisArg?: any) {
        return this._copyOptions(true, thisArg);
    }

    public copyCurrentPackOptions(thisArg?: any) {
        return this._copyOptions(false, thisArg);
    }
}

export class ReadonlyResource {

    public readonly locale: ReadonlyLocalResource;

    constructor(
        private _language: () => string,
        private _getString: (lang: string, locale: boolean, key: string, ...args: string[]) => string,
        private _copyStrings: (lang: string, locale: boolean, thisArg: any) => any,
        private _getOption: (lang: string, locale: boolean, key: string) => any,
        private _copyOptions: (lang: string, locale: boolean, thisArg: any) => any
    ) {
        this.locale = this.specific(null);
    }

    public specific(lang: string | null) {
        let getLang = lang ? () => {
            return lang;
        } : this._language;
        return new ReadonlyLocalResource(
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
            }
        )
    }

    public language() {
        return this._language();
    }

    public getLocalString(lang: string, key: string, ...args: string[]) {
        return this._getString(lang, true, key, ...args);
    }

    public getSpecificLocaleString(lang: string, key: string, ...args: string[]) {
        return this._getString(lang, true, key, ...args);
    }

    public getCurrentPackString(lang: string, key: string, ...args: string[]) {
        return this._getString(null, false, key, ...args);
    }

    public getSpecificPackString(lang: string, key: string, ...args: string[]) {
        return this._getString(lang, false, key, ...args);
    }

    public copyStrings(lang?: string, thisArg?: any) {
        return this._copyStrings(lang, true, thisArg);
    }

    public copyCurrentPackStrings(lang?: string, thisArg?: any) {
        return this._copyStrings(lang, false, thisArg);
    }

    public getLocalOptions(lang: string, key: string) {
        return this._getOption(lang, true, key);
    }

    public getSpecificLocaleOption(lang: string, key: string) {
        return this._getOption(lang, true, key);
    }

    public getCurrentPackOption(key: string) {
        return this._getOption(null, false, key);
    }

    public getSpecificPackOption(lang: string, key: string) {
        return this._getOption(lang, false, key);
    }

    public copyOptions(lang?: string, thisArg?: any) {
        return this._copyOptions(lang, true, thisArg);
    }

    public copyCurrentPackOptions(lang?: string, thisArg?: any) {
        return this._copyOptions(lang, false, thisArg);
    }
}

}