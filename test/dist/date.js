"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
let now = new Date();
console.info(index_1.toDateString(now, "locale"));
let diff = index_1.toDateDiffString(new Date(2018, 5, 26));
if (!diff)
    throw "Date error.";
let span = index_1.toTimeSpanString(12345678);
if (span !== "03:25:45")
    throw "Time span error.";
exports.default = now;
