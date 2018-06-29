import { toDateString, toDateDiffString, toTimeSpanString } from '../../index';

let now = new Date();
console.info(toDateString(now, "locale"));

let diff = toDateDiffString(new Date(2018, 5, 26));
if (!diff) throw "Date error.";

let span = toTimeSpanString(12345678);
if (span !== "03:25:45") throw "Time span error.";

export default now;
