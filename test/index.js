const Res = require("./dist/core");

if (!Res) console.error("Failed to load.");
else console.info("Run test succeeded.");

module.exports = Res;
