import { Resources, setLanguage, getLanguage } from '../../index';

// Test the current langauge environment.
const mkt = "en-US";
setLanguage(mkt);
if (getLanguage() !== mkt) throw "Language set failed.";

// Create a resource and register some language packs.
// We can register two types of locale informatino for each language pack:
// (a) strings, which contains all the fields used to display text with arguments supports;
// (b) options, additional data in any object types.
const res = new Resources();
res.register({
    language: "en", // Includes en-US, en-UK, en-CA, etc.
    strings: {
        hello: "Hello {0}", // {0} will be replaced by the argument passed.
        bye: "Bye"
    },
    options: {  // Additional data if needed.
        lcid: 1033
    }
});
res.register({
    language: ["zh-Hans", "zh-CN", "zh-SG"],    // Multiple languages supported.
    strings: {
        hello: "你好{0}",
        bye: "再见"
    },
    options: {
        lcid: 2052
    }
});

// Test to get the locale strings.
if (res.getLocaleString("bye") !== "Bye") throw "The local string is not correct. 1";
if (res.getLocaleString("hello", "Kingcean") !== "Hello Kingcean") throw "The local string with argument is not correct. 2";

// Test to get the locale options.
if (res.getLocaleOption("lcid") !== 1033) throw "The local option is not correct. 1";

// Change a language to test.
setLanguage("zh-Hans-CN");
if (res.getLocaleString("bye") !== "再见") throw "The local string is not correct. 3";
if (res.getLocaleOption("lcid") !== 2052) throw "The local option is not correct. 2";

// Change a language which does not register.
// The default language ("en-US" by default and it can be changed) will be used.
setLanguage("ja-JP");
if (res.getLocaleString("bye") !== "Bye") throw "The local string is not correct. 4";
if (res.getLocaleOption("lcid") !== 1033) throw "The local option is not correct. 3";

// And we can get a copy model of current language.
let lp = res.copyStrings();
if (lp.bye !== "Bye") throw "The local string is not correct. 5";

// You cannot register any language pack or set strings in readonly instance.
export default res.readonly;
