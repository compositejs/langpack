var LangPack,__extends=this&&this.__extends||function(){var r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}(),__assign=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};(LangPack||(LangPack={})).getQueryInfo=function(e,o){if(e||"undefined"==typeof location||location&&(e=location.search),!e)return{};var t=e.indexOf("?");if(0<t&&(e=e.substring(t+1)),!e)return{};var n=e.split("&");o||(o={});var i={};return n.forEach(function(e){if(e){var t=e.split("="),n=t[0];if(n){o.notToDecode||o.notToDecodeKey||(n=decodeURIComponent(n));var r=(1<t.length?t[1]:null)||(o.emptyString?"":void 0);r&&!o.notToDecode&&(r=decodeURIComponent(r)),i[n]&&o.multipleValues?i[n]instanceof Array?i[n].push(r):i[n]=[i[n],r]:i[n]=r}}}),i},function(n){var t=function(){function e(e){this._impl=e}return Object.defineProperty(e.prototype,"language",{get:function(){return this._impl.language()},enumerable:!0,configurable:!0}),e.prototype.isLanguage=function(e,t){return n.isLanguage(e,t,this._impl.language())},e.prototype.getString=function(e){for(var t,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];return(t=this._impl).getString.apply(t,[!0,e].concat(n))},e.prototype.getCurrentPackString=function(e){for(var t,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];return(t=this._impl).getString.apply(t,[!1,e].concat(n))},e.prototype.copyStrings=function(e){return this._impl.copyStrings(!0,e)},e.prototype.copyCurrentPackStrings=function(e){return this._impl.copyStrings(!1,e)},e.prototype.getOptions=function(e){return this._impl.getOption(!0,e)},e.prototype.getCurrentPackOption=function(e){return this._impl.getOption(!1,e)},e.prototype.copyOptions=function(e){return this._impl.copyOptions(!0,e)},e.prototype.copyCurrentPackOptions=function(e){return this._impl.copyOptions(!1,e)},e.prototype.getProp=function(e){return this._impl.getProp(e)},e}();n.ReadonlyLocaleResource=t;var e=function(){function e(e){this._impl=e,this.locale=this.specific(null)}return e.prototype.specific=function(e){var i=e?function(){return e}:this._impl.language;return new t({language:i,getString:function(e,t){for(var n,r=[],o=2;o<arguments.length;o++)r[o-2]=arguments[o];return(n=this._impl).getString.apply(n,[i(),e,t].concat(r))},copyStrings:function(e,t){return this._impl.copyStrings(i(),e,t)},getOption:function(e,t){return this._impl.getOption(i(),e,t)},copyOptions:function(e,t){return this._impl.copyOptions(i(),e,t)},getProp:function(e){return this._impl.getProp(e)}})},Object.defineProperty(e.prototype,"language",{get:function(){return this._impl.language()},enumerable:!0,configurable:!0}),e.prototype.getLocaleString=function(e){for(var t,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];return(t=this._impl).getString.apply(t,[null,!0,e].concat(n))},e.prototype.getSpecificLocaleString=function(e,t){for(var n,r=[],o=2;o<arguments.length;o++)r[o-2]=arguments[o];return(n=this._impl).getString.apply(n,[e,!0,t].concat(r))},e.prototype.getCurrentPackString=function(e){for(var t,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];return(t=this._impl).getString.apply(t,[null,!1,e].concat(n))},e.prototype.getSpecificPackString=function(e,t){for(var n,r=[],o=2;o<arguments.length;o++)r[o-2]=arguments[o];return(n=this._impl).getString.apply(n,[e,!1,t].concat(r))},e.prototype.copyStrings=function(e,t){return this._impl.copyStrings(e,!0,t)},e.prototype.copySpecificPackStrings=function(e,t){return this._impl.copyStrings(e,!1,t)},e.prototype.getStringsKeys=function(e,t){return Object.keys(this._impl.copyOptions(e,!0,t))},e.prototype.getLocalOption=function(e){return this._impl.getOption(null,!0,e)},e.prototype.getSpecificLocaleOption=function(e,t){return this._impl.getOption(e,!0,t)},e.prototype.getCurrentPackOption=function(e){return this._impl.getOption(null,!1,e)},e.prototype.getSpecificPackOption=function(e,t){return this._impl.getOption(e,!1,t)},e.prototype.copyOptions=function(e,t){return this._impl.copyOptions(e,!0,t)},e.prototype.copySpecificPackOptions=function(e,t){return this._impl.copyOptions(e,!1,t)},e.prototype.getOptionsKeys=function(e,t){return Object.keys(this._impl.copyOptions(e,!0,t))},e.prototype.getProp=function(e){return this._impl.getProp(e)},e}();n.ReadonlyResource=e}(LangPack||(LangPack={})),function(r){var s={market:void 0,defaultMarket:"en-US",format:function(r,e){if(!r)return"";if(e&&0<e.length){e.forEach(function(e,t){e||(e="");var n="{"+t.toString()+"}";r=r.replace(n,e).replace(n,e).replace(n,e).replace(n,e)});for(var t=e.length;t<20;t++){var n="{"+t.toString()+"}";r=r.replace(n,"").replace(n,"").replace(n,"").replace(n,"")}}return r},getLocalProperty:function(o,e,i){var a;return e.some(function(e){if(!e)return!1;for(var t=e.toLowerCase().split("-");0<t.length;){var n=t.join("-"),r=o[n];if(r&&void 0!==r[i])return a=r[i],!0;t=t.slice(0,t.length-1)}return!1}),a},getLocalProperties:function(o,e,i){return i||(i={}),e.forEach(function(e){if(!e)return!1;for(var n,r=e.toLowerCase().split("-"),t=function(){n=r.join("-");var t=o[n];t&&Object.keys(t).forEach(function(e){!i.hasOwnProperty(e)&&t.hasOwnProperty(e)&&(i[e]=t[e])}),r=r.slice(0,r.length-1)};0<r.length;)t()}),i},gen:function(){var t,n,o={},i={},r={},a=function(e){return e?[e,n,s.defaultMarket]:[t,s.market,n,s.defaultMarket]},u={getLanguageUsed:function(){return t||s.market||n||s.defaultMarket},getLanguage:function(){return t},setLanguage:function(e){return(null==e||"string"==typeof e)&&(t=e,!0)},getDefaultLanguage:function(e){return n},setDefaultLanguage:function(e){return(null==e||"string"==typeof e)&&(n=e,!0)},register:function(t,n){if(!t||!t.language)return 0;var r=0;return(t.language instanceof Array?t.language:[t.language]).forEach(function(e){e&&"string"==typeof e&&(e=e.toLowerCase(),r++,n&&(o[e]={},i[e]={}),t.strings&&(o[e]=__assign({},o[e]||{},t.strings)),t.options&&(i[e]=__assign({},i[e]||{},t.options)))}),r},getString:function(e,t,n){if(n&&"string"==typeof n){if(t)return s.getLocalProperty(o,a(e),n);if(e||(e=u.getLanguage()),e&&"string"==typeof e)return o[e]?o[e][n]:void 0}},setString:function(e,t,n){if(e||(e=u.getLanguage()),!e||!t||"string"!=typeof e||"string"!=typeof t)return!1;if(null==n)o[e]&&delete o[e][t];else{if("string"!=typeof n)return!1;o[e]||(o[e]={}),o[e][t]=n}return!0},copyStrings:function(e,t,n){return s.getLocalProperties(o,t?a(e):[e||u.getLanguage()],n)},getOption:function(e,t,n){if(n&&"string"==typeof n){if(t)return s.getLocalProperty(i,a(e),n);if(e||(e=u.getLanguage()),e&&"string"==typeof e)return i[e]?i[e][n]:void 0}},setOption:function(e,t,n){return e||(e=u.getLanguage()),!(!e||!t||"string"!=typeof e||"string"!=typeof t)&&(void 0===n?i[e]&&delete i[e][t]:(i[e]||(i[e]={}),i[e][t]=n),!0)},copyOptions:function(e,t,n){return s.getLocalProperties(i,t?a(e):[e||u.getLanguage()],n)},getProp:function(e){if(e&&"string"==typeof e)return r[e]},setProp:function(e,t){return!(!e||"string"!=typeof e)&&(r[e]=t,!0)},removeProp:function(e){return!(!e||"string"!=typeof e)&&(delete r[e],!0)}};return u}};function o(){return s.defaultMarket}function i(){return s.market}function t(e){return!(!e&&"string"!=typeof e)&&(s.market=e,!0)}function e(){if("undefined"==typeof navigator)return!1;if(!navigator)return!1;var e=navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage;return!e&&navigator.languages&&navigator.languages.length&&navigator.languages[0]&&(e=navigator.languages[0]),t(e)}function n(e){return e||"undefined"==typeof document||document&&(e=document.documentElement),!!e&&t((e||document.documentElement).lang)}function a(e){return t(r.getQueryInfo()[e||"mkt"])}r.getDefaultLanguage=o,r.setDefaultLanguage=function(e){return!(!e&&"string"!=typeof e||(s.defaultMarket=e,0))},r.getLanguage=i,r.setLanguage=t,r.useSystemLanguage=e,r.useDOMLanguage=n,r.useQueryLanguage=a,r.isLanguage=function(e,t,n){return!e||"string"==typeof e&&(e=e.toLowerCase(),null==n&&(n=i()||o()),!(!n||"string"!=typeof n||e!==(n=n.toLowerCase())&&(t||0!==n.indexOf(e+"-"))))};try{var u=a();u||(u=e()),u||(u=n())}catch(e){}var g=function(n){function e(){var e=this,a=s.gen(),t={language:a.getLanguage,getString:function(e,t,n){for(var r=[],o=3;o<arguments.length;o++)r[o-3]=arguments[o];var i=a.getString(e,t,n);return s.format(i,r)},copyStrings:function(e,t,n){return a.copyStrings(e,t,n)},getOption:function(e,t,n){return a.getOption(e,t,n)},copyOptions:function(e,t,n){return a.copyOptions(e,t,n)},getProp:function(e){return a.getProp(e)}};return(e=n.call(this,t)||this)._res=a,e.readonly=new r.ReadonlyResource(t),e.locale=e.readonly.locale,e}return __extends(e,n),Object.defineProperty(e.prototype,"languageUsed",{get:function(){return this._res.getLanguageUsed()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"language",{get:function(){return this._res.getLanguage()},set:function(e){this._res.setLanguage(e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"defaultLanguage",{get:function(){return this._res.getDefaultLanguage()},set:function(e){this._res.setDefaultLanguage(e)},enumerable:!0,configurable:!0}),e.prototype.register=function(e,t){var n=this,r=0;return e instanceof Array?e.forEach(function(e){r+=n._res.register(e,t)}):r=this._res.register(e,t),r},e.prototype.getLocaleString=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=this._res.getString(null,!0,e);return s.format(r,t)},e.prototype.getSpecificLocaleString=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var o=this._res.getString(e,!0,t);return s.format(o,n)},e.prototype.getCurrentPackString=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=this._res.getString(null,!1,e);return s.format(r,t)},e.prototype.getSpecificPackString=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var o=this._res.getString(e,!1,t);return s.format(o,n)},e.prototype.setString=function(e,t,n){return this._res.setString(e,t,n)},e.prototype.setCurrentPackString=function(e,t){return this._res.setString(null,e,t)},e.prototype.removeString=function(e,t,n){return this._res.setString(e,t,void 0)},e.prototype.removeCurrentPackString=function(e,t){return this._res.setString(null,e,void 0)},e.prototype.batchSetStrings=function(e,t){return t?this._res.register({language:e,strings:t}):0},e.prototype.copyStrings=function(e,t){return this._res.copyStrings(e,!0,t)},e.prototype.copySpecificPackStrings=function(e,t){return this._res.copyStrings(e,!1,t)},e.prototype.getStringsKeys=function(e,t){return Object.keys(this._res.copyOptions(e,!0,t))},e.prototype.getLocaleOption=function(e){return this._res.getOption(null,!0,e)},e.prototype.getSpecificLocaleOption=function(e,t){return this._res.getOption(e,!0,t)},e.prototype.getCurrentPackOption=function(e){return this._res.getOption(null,!1,e)},e.prototype.getSpecificPackOption=function(e,t){return this._res.getOption(e,!1,t)},e.prototype.setOption=function(e,t,n){return this._res.setOption(e,t,n)},e.prototype.setCurrentPackOption=function(e,t){return this._res.setOption(null,e,t)},e.prototype.removeOption=function(e,t){return this._res.setOption(e,t,void 0)},e.prototype.removeCurrentPackOption=function(e){return this._res.setOption(null,e,void 0)},e.prototype.batchSetOptions=function(e,t){return t?this._res.register({language:e,strings:null,options:t}):0},e.prototype.copyOptions=function(e,t){return this._res.copyOptions(e,!0,t)},e.prototype.copySpecificPackOptions=function(e,t){return this._res.copyOptions(e,!1,t)},e.prototype.getOptionsKeys=function(e,t){return Object.keys(this._res.copyOptions(e,!0,t))},e.prototype.getProp=function(e){return this._res.getProp(e)},e.prototype.setProp=function(e,t){return this._res.setProp(e,t)},e.prototype.removeProp=function(e){return this._res.removeProp(e)},e}(r.ReadonlyResource);r.Resources=g}(LangPack||(LangPack={})),function(e){e.InnerResource=new e.Resources,e.InnerResource.register({language:"en",strings:{prefix:"Prefix",suffix:"Suffix",month1:"Janunary",month2:"Febrary",month3:"March",month4:"April",month5:"May",month6:"June",month7:"July",month8:"August",month9:"September",month10:"October",month11:"November",month12:"December",month1s:"Jan",month2s:"Feb",month3s:"Mar",month4s:"Apr",month5s:"May",month6s:"Jun",month7s:"Jul",month8s:"Aug",month9s:"Sep",month10s:"Oct",month11s:"Nov",month12s:"Dec",weekDay0:"Sunday",weekDay1:"Monday",weekDay2:"Tuesday",weekDay3:"Wednesday",weekDay4:"Thursday",weekDay5:"Friday",weekDay6:"Saturday",weekDay0s:"Sun",weekDay1s:"Mon",weekDay2s:"Tue",weekDay3s:"Wed",weekDay4s:"Thu",weekDay5s:"Fri",weekDay6s:"Sat",weekDay0c:"S",weekDay1c:"M",weekDay2c:"T",weekDay3c:"W",weekDay4c:"T",weekDay5c:"F",weekDay6c:"S",am:"AM",pm:"PM",fewSecondsAgo:"Just now",secondsAgo:"{0}s ago",minutesAgo:"{0}min ago",hoursAgo:"{0}h ago",yesterday:"Yesterday",twoDaysAgo:"2d ago",daysAgo:"{0}d ago",fewSecondsLater:"Soon",secondsLater:"{0}s later",minutesLater:"{0}min later",hoursLater:"{0}h later",tomorrow:"Tomorrow",twoDaysLater:"2d later",daysLater:"{0}d later",today:"Today",timeDate:"{0} {1}",dateFull:"MM/DD/YYYY",dateFull2:"MMM D, YYYY",dateFull3:"www MMM D YYYY",dateShort:"MM/DD",dateShort2:"MMM D",dateYear:"YYYY",time12h:"{0} tt",minute:"{0} minutes",minute1:"minutes",minute2:"more then {0} minutes",oneDay:"1 day",oneWeek:"1 week",date:"Date",time:"Time",duration:"Duration",colon:": ",comma:", ",semicolon:"; ",periodMark:". ",questionMark:"? ",exclamationSymbol:"! ",ldquo:'"',rdquo:'"',lsquo:"'",rsquo:"'",slightPauseMark:", ",bookTitle:"{0}",name:"Name"},options:{lcid:1033}}),e.InnerResource.register({language:["zh","zh-Hans","zh-CHS","zh-CN","zh-SG","zh-gan"],strings:{prefix:"前缀",suffix:"后缀",month1:"一月",month2:"二月",month3:"三月",month4:"四月",month5:"五月",month6:"六月",month7:"七月",month8:"八月",month9:"九月",month10:"十月",month11:"十一月",month12:"十二月",month1s:"1月",month2s:"2月",month3s:"3月",month4s:"4月",month5s:"5月",month6s:"6月",month7s:"7月",month8s:"8月",month9s:"9月",month10s:"10月",month11s:"11月",month12s:"12月",weekDay0:"星期日",weekDay1:"星期一",weekDay2:"星期二",weekDay3:"星期三",weekDay4:"星期四",weekDay5:"星期五",weekDay6:"星期六",weekDay0s:"周日",weekDay1s:"周一",weekDay2s:"周二",weekDay3s:"周三",weekDay4s:"周四",weekDay5s:"周五",weekDay6s:"周六",weekDay0c:"日",weekDay1c:"一",weekDay2c:"二",weekDay3c:"三",weekDay4c:"四",weekDay5c:"五",weekDay6c:"六",am:"上午",pm:"下午",fewSecondsAgo:"刚刚",secondsAgo:"{0}秒前",minutesAgo:"{0}分钟前",hoursAgo:"{0}小时前",yesterday:"昨天",twoDaysAgo:"前天",daysAgo:"{0}天前",fewSecondsLater:"即将",secondsLater:"{0}秒后",minutesLater:"{0}分钟后",hoursLater:"{0}小时后",tomorrow:"明天",twoDaysLater:"后天",daysLater:"{0}天后",today:"今天",timeDate:"{1} {0}",dateFull:"YYYY-MM-DD",dateFull2:"YYYY年M月D日",dateFull3:"YYYY年M月D日www",dateShort:"MM-DD",dateShort2:"M月D日",dateYear:"YYYY年",time12h:"tt{0}",minute:"{0}分钟",minute1:"分钟",minute2:" {0}分钟以上",oneDay:"一天",oneWeek:"一周",date:"日期",time:"时间",duration:"时长",colon:"：",comma:"，",semicolon:"；",periodMark:"。",questionMark:"？",exclamationSymbol:"！",ldquo:"“",rdquo:"”",lsquo:"“",rsquo:"”",slightPauseMark:"、",bookTitle:"《{0}》",name:"名称"},options:{lcid:2052}})}(LangPack||(LangPack={})),function(m){var g=864e5;function h(e,t){if(!e||!t)return!1;if(t<e){var n=e;e=t,t=n}var r=e.getDay();return!(0===r||r>t.getDay())&&(t.getTime()-e.getTime())/g<6}function S(e){if(!e)return null;if(e instanceof Date)return e;if("number"==typeof e)try{return isNaN(e)?null:new Date(e)}catch(e){return null}if("string"!=typeof e){if(e.year&&e.month&&e.date)try{return new Date(e.year,e.month,e.date,e.hour||0,e.minute||0,e.second||0,e.millisecond||0)}catch(e){return null}return null}if("now"===e.toLowerCase())return new Date;try{if(8===e.length){var t=parseInt(e.substr(0,4),10),n=parseInt(e.substr(4,2),10)-1,r=parseInt(e.substr(6,2),10);return new Date(t,n,r)}if(19===e.length&&4===e.indexOf("-")){t=parseInt(e.substr(0,4),10),n=parseInt(e.substr(5,2),10)-1,r=parseInt(e.substr(8,2),10);var o=parseInt(e.substr(11,2),10),i=parseInt(e.substr(14,2),10),a=parseInt(e.substr(17,2),10);return new Date(t,n,r,o,i,a)}}catch(e){return null}try{var u=Date.parse(e);return new Date(u)}catch(e){return null}}function d(e,t){if(!(e=S(e)))return"";var n=S(t)||new Date,r=n.getTime()-e.getTime(),o=0<r?"Ago":"Later";if((r=Math.abs(r))<4e4)return m.InnerResource.getLocaleString("fewSeconds"+o);if(r<=358e4)return m.InnerResource.getLocaleString("minutes"+o,Math.round(r/6e4).toString());if(r<=85e6)return m.InnerResource.getLocaleString("hours"+o,Math.round(r/36e5).toString());var i=(e.getHours()<10?"0":"")+e.getHours()+":"+(e.getMinutes()<10?"0":"")+e.getMinutes(),a=Math.floor(n.getTime()/g)-Math.floor(e.getTime()/g);if(0===a)return m.InnerResource.getLocaleString("timeDate",i,m.InnerResource.getLocaleString("today"));if(1===a)return m.InnerResource.getLocaleString("timeDate",i,m.InnerResource.getLocaleString("yesterday"));if(-1===a)return m.InnerResource.getLocaleString("timeDate",i,m.InnerResource.getLocaleString("tomorrow"));if(2===a||-2===a)return m.InnerResource.getLocaleString("timeDate",i,m.InnerResource.getLocaleString("twoDays"+o));if(h(e,n))return m.InnerResource.getLocaleString("timeDate",i,D(e,!0));var u=e.getMonth()+1,s={YYYY:e.getFullYear().toString(),MMMM:m.InnerResource.getLocaleString("month"+u),MMM:m.InnerResource.getLocaleString("month"+u+"s"),MM:m.toNumberString(u,{figures:2}),M:u.toString(),DD:m.toNumberString(e.getDate(),{figures:2}),D:e.getDate().toString()};return m.InnerResource.getLocaleString(e.getFullYear()===n.getFullYear()?"dateShort2":"dateFull").replace("YYYY",s.YYYY).replace("YYYY",s.YYYY).replace("MMMM",s.MMMM).replace("MMMM",s.MMMM).replace("MMM",s.MMM).replace("MMM",s.MMM).replace("MM",s.MM).replace("MM",s.MM).replace("M",s.M).replace("M",s.M).replace("DD",s.DD).replace("DD",s.DD).replace("D",s.D).replace("D",s.D)}function D(e,t){if(null!=e&&"number"!=typeof e&&"function"==typeof e.getDay&&(e=e.getDay()),"number"!=typeof e||isNaN(e)||e<0||6<e||1!==e.toString().length)return"";var n="weekDay"+e;if(t){var r=t.toString().toLowerCase();if(0==="character".indexOf(r)||1===t)n+="c";else{if(0==="number".indexOf(r)||0===t)return e.toString();n+="s"}}return m.InnerResource.getLocaleString(n)}m.parseDate=S,m.toDateString=function(e,t){if(!(e=S(e))||!e.toLocaleDateString)return"";if(!1===t||"string"===t)return e.toString();if("number"===t)return e.getTime().toString();if("tick"===t)return e.getTime().toString();if(t&&!0!==t&&"locale"!==t){if("differ"===t)return d(e);"date"===t?t={date:"full locale"}:"time"===t&&(t={time:"s"})}else t={date:"full locale",time:"s"};t.utc&&(e=new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds()));var r,n=e.getFullYear(),o=e.getMonth()+1,i=e.getDate(),a=e.getHours(),u=m.InnerResource.getLocaleString(12<a?"pm":"am"),s=e.getMinutes(),g=e.getSeconds(),c={YYYY:n,YY:n%100,MMMM:m.InnerResource.getLocaleString("month"+o),MMM:m.InnerResource.getLocaleString("month"+o+"s"),MM:m.toNumberString(o,{figures:2}),M:o.toString(),DD:m.toNumberString(i,{figures:2}),D:i,HH:m.toNumberString(a,{figures:2}),H:a,hh:m.toNumberString(a%12,{figures:2}),h:a%12,tt:u,t:(u||"").substr(0,1),www:D(e),ww:D(e,!0),w:D(e,"c"),mm:m.toNumberString(s,{figures:2}),m:s,sss:m.toNumberString(e.getMilliseconds(),{figures:3}),ss:m.toNumberString(g,{figures:2}),s:g},p=new Date;if("string"!=typeof t){var l=void 0;if(t.date)switch(!0===t.date?"full":t.date.toString().toLowerCase()){case"year":l=m.InnerResource.getLocaleString("dateYear");break;case"short":l=m.InnerResource.getLocaleString("dateShort");break;case"short locale":l=m.InnerResource.getLocaleString("dateShort2");break;case"full":l=m.InnerResource.getLocaleString("dateFull");break;case"full locale":l=m.InnerResource.getLocaleString("dateFull3");break;case"full locale 2":l=m.InnerResource.getLocaleString("dateFull2");break;case"auto":l=p.getFullYear()===e.getFullYear()?m.InnerResource.getLocaleString("dateShort"):h(p,e)?D(e,!0):m.InnerResource.getLocaleString("dateFull")}var f=void 0;if(t.time){var y=!0===t.time?"s":t.time.toString().toLowerCase();switch(y){case"m":case"Hm":f="HH:mm";break;case"m tt":case"hm":f=m.InnerResource.getLocaleString("time12h","hh:mm");break;case"s":case"Hms":f="HH:mm:ss";break;case"s tt":case"hms":f=m.InnerResource.getLocaleString("time12h","hh:mm:ss");break;case"sss":case"ms":case"Hms.":f="HH:mm:ss.sss";break;case"sss tt":case"ms tt":case"hms.":f=m.InnerResource.getLocaleString("time12h","hh:mm:ss.sss");break;default:0<y.indexOf(":")&&(f=y)}}if(l&&f)r=m.InnerResource.getLocaleString("timeDate",f,l);else if(l)r=l;else{if(!f)return"";r=f}}else switch(t.replace(" ","").toLowerCase()){case"fulldate":r=m.InnerResource.getLocaleString("dateFull");break;case"shortdate":r=m.InnerResource.getLocaleString("dateShort");break;default:r=t}return Object.keys(c).forEach(function(e){var t=c[e];if("string"==typeof t||"number"==typeof t){var n=t.toString();r=r.replace(e,n).replace(e,n).replace(e,n).replace(e,n)}}),r},m.toDateDiffString=d,m.getWeekDayStrings=function(e){var t=[];("number"!=typeof e||isNaN(e))&&(e=0),(e=Math.floor(e)%7)<0&&(e+=7);for(var n=e;n<7;n++)t.push(m.InnerResource.getLocaleString("weekDay"+n.toString()+"s"));for(n=0;n<e;n++)t.push(m.InnerResource.getLocaleString("weekDay"+n.toString()+"s"));return t},m.toWeekDayString=D,m.toTimeSpanString=function(e,t){if("string"==typeof e)return e;var n=Math.round(e)%1e3,r=Math.floor(e/1e3),o=r%60,i=(r=Math.floor(r/60))%60,a=r=Math.floor(r/60);r=Math.floor(r/24);var u="";return 24<a&&(u+=r+":",a%=24),0<a?u+=(9<a?"":"0")+a.toString()+":":u&&(u+="00:"),u+=(9<i?"":"0")+i.toString()+":"+(9<o?"":"0")+o.toString(),t&&(u+=99<n?"."+n.toString():9<n?".0"+n.toString():".00"+n.toString()),u}}(LangPack||(LangPack={})),"function"==typeof define?(define.amd||"undefined"!=typeof __webpack_require__)&&define(["exports"],function(e){return LangPack}):"function"==typeof require&&"object"==typeof exports&&"object"==typeof module&&(module.exports=LangPack),function(n){n.toNumberString=function(e,t){if(t||(t={}),null==e||"number"!=typeof e||isNaN(e))return void 0===t.empty?"":t.empty;if("number"==typeof t.exponent&&!isNaN(t.exponent))return e.toExponential(t.exponent);if(t.exponent)return t.precision?e.toExponential(t.precision):e.toExponential();var n=t.precision?e.toFixed(t.precision):e.toString();if("number"==typeof t.figures&&!isNaN(t.figures))for(var r=n.length;r<t.figures;r++)n="0"+n;if(t.group){var o=n.indexOf("."),i=n;for(o<0?(o=n.length,n=""):(i=n.substr(0,o),n=n.substr(o)),r=0;r<o;r++)r%3==0&&0<r&&(n=","+n),n=i[o-r-1]+n}return n},n.shortNumber=function(e,t){if(null==e||isNaN(e))return null==t||!1===t?e:!0===t?"":t;if(n.isLanguage("zh")||n.isLanguage("ja")){if(1e12<=e)return(e/1e12).toFixed(1)+(n.isLanguage("ja")||n.isLanguage("zh-Hant")||n.isLanguage("zh-tw")?"兆亿":"万亿");if(1e8<=e)return(e/1e8).toFixed(1)+"亿";if(1e4<=e)return(e/1e4).toFixed(1)+"万"}else{if(1e12<=e)return(e/1e12).toFixed(1)+"T";if(1e9<=e)return(e/1e9).toFixed(1)+"G";if(1e6<=e)return(e/1e6).toFixed(1)+"M";if(1e3<=e)return(e/1e3).toFixed(1)+"K"}return e},n.near=function(e,a,u,s){if(e&&e instanceof Array&&"number"==typeof a){var g,c=[];return"string"!=typeof u||["in","greater","less","nearby"].indexOf(u.toLowerCase())<0||u.toLowerCase(),s||(s=function(e){return e}),e.forEach(function(e){var t,n,r=s(e);if(null!=r&&("number"==typeof r?n=t=r:(t=r.from,n=r.end),"number"==typeof t&&"number"==typeof n&&!isNaN(t)&&!isNaN(n))){if(n<t){var o=t;t=n,n=o}if(!(a<t&&"nearby"!==u&&"greater"!==u||n<a&&"nearby"!==u&&"less"!==u)){var i=t<a&&a<n?0:Math.min(Math.abs(t),Math.abs(n));null==g||g<i?(c=[e],g=i):g===i&&c.push(e)}}}),c}}}(LangPack||(LangPack={}));