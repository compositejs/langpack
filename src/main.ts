/// <reference path="./lp.ts" />

// For asynchronous modules loaders.
(function () {
    if (typeof define === 'function') {
        if (define.amd || typeof __webpack_require__ !== "undefined") {
            define(["exports"], function (exports: any) {
                return LangPack;
            });
        }
    } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        module["exports"] = LangPack;
    }
})();
