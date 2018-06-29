You can install this web front-end library by npm or by downloading the bundled file to insert a `script` tag into your web page directly.

## ES6 / Type Script via npm

```
npm i langpack
```

Then you can import the ones you needed by patching. Following is a sample.

```typescript
import { Resources } from 'langpack';

let res = new Resources();
res.register({
    language: "en",
    strings: {
        name: "App name",
        description: "The business logic library."
    }
});
console.info(res.getLocaleString("name"));
```

And of couse, you can import all the library as a namespace to use.

```typescript
import * as LangPack from 'langpack';
```

## CommonJS via npm

```
npm i langpack
```

And you can require the library and patch what you needed. Following is a sample.

```typescript
const { Resources } = require('langpack');

let res = new Resources();
res.register({
    language: "en",
    strings: {
        name: "App name",
        description: "The business logic library."
    }
});
console.info(res.getLocaleString("name"));
```

## Insert script file

You can download the [bundle file](https://raw.githubusercontent.com/compositejs/langpack/master/dist/index.js) and insert it into your web page, then you can use the global namespace `LangPack`. Following is a sample.

```typescript
const { Resources } = LangPack;

let res = new Resources();
res.register({
    language: "en",
    strings: {
        name: "App name",
        description: "The business logic library."
    }
});
console.info(res.getLocaleString("name"));
```

---

[Next](./localization)
