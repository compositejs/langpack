你可以通过 npm 来安装本库；也可以直接下载打包后的脚本文件，并将其引入你的网页中。

## 通过 npm 并使用 ES6 或 Type Script

请在控制台/命令提示符中，转入你所在的项目目录，并执行以下命令。

```
npm i langpack
```

然后引入需要使用的功能。如下示例。

```typescript
import { Resources } from 'langpack';

let res = new Resources();
res.register({
    language: ["zh-Hans", "zh-CN", "zh-SG"],
    strings: {
        name: "名称",
        description: "一句话描述"
    }
});
console.info(res.getLocaleString("name"));
```

当然，你也可以将整个模块引入。


```typescript
import * as LangPack from 'langpack';
```

## CommonJS

请先在控制台/命令提示符中，转入你所在的项目目录，并执行以下命令。

```
npm i langpack
```

然后引入模块。如下示例。

```typescript
const { Resources } = require('langpack');

let res = new Resources();
res.register({
    language: ["zh-Hans", "zh-CN", "zh-SG"],
    strings: {
        name: "名称",
        description: "一句话描述"
    }
});
console.info(res.getLocaleString("name"));
```

## 直接引入JS文件

你可以将以下打包JS脚本文件之一下载到本地，并通过 `script` 标签插入到你的页面中。

- `https://cdn.jsdelivr.net/npm/langpack/dist/index.js`
- `https://unpkg.com/langpack/dist/index.js`

然后，可以通过`LangPack`命名空间来进行访问。如下示例。

```typescript
const { Resources } = LangPack;

let res = new Resources();
res.register({
    language: ["zh-Hans", "zh-CN", "zh-SG"],
    strings: {
        name: "名称",
        description: "一句话描述"
    }
});
console.info(res.getLocaleString("name"));
```

<!-- End -->
---

[下一页](../bendihua/)
