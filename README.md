# LangPack

A JavaScript library for enable multiple languages for your web app.

## Installation and Usage

You can install this by [npm](https://www.npmjs.com/package/langpack).

```sh
npm i langpack
```

And you can also insert the [JavaScript bundled file](./dist/index.js) by `script` tag into your web page directly and use `LangPack` namespace to access.

## Tutorial

Import the package.

```typescript
import { Resources, setLanguage } from 'langpack'
```

Or you can use it by following way if you insert the JavaScript bundled file by `script` tag into your web page directly.

```typescript
const { Resources, setLanguage } = LangPack;
```

Then you can create a resource for usage in your web app.

```typescript
const res = new Resources();
```

And you can register your language packs.

```typescript
res.register({
    language: "en",
    strings: {
        hello: "Hello",
        bye: "Bye"
    }
});
res.register({
    language: ["zh-Hans", "zh-CN", "zh-SG"],
    strings: {
        hello: "你好",
        bye: "再见"
    }
});
```

Then you can get the local strings.

```typescript
res.getLocaleString("hello");
```

The above should be a string `Hello` if your current language is English.

You can also update a local string.

```typescript
// You can set the string in the specific language.
// The 1st argument is than language code, null for current.
res.setString(null, "hello", "Greetings");
```

The current language is loaded from your browser. To change language, just call following function.

```typescript
setLanguage("zh-Hans-CN");
```

You can also export a readonly client for other files.

```typescript
export res.readonly;
```

## Building / Testing

You may need install Gulp to build. Following is the command line to build this project including the source and test cases.

```sh
gulp
```

You can run all test cases after building by following command line.

```sh
npm test
```
