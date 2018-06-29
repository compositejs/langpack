const Res = require("./dist/core");
const DateTest = require("./dist/date");

if (!Res || !DateTest) console.error("Failed to load.");
else console.info("Run test succeeded.");

module.exports = Res;
