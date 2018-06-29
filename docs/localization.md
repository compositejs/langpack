# Localization

You can use this for localization and globalization by managing the resources of strings and others.

## Usage and initialize an instance

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

## Register language packs

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

## Access locale strings

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

## Readonly locale instance

You can also export a readonly client of the current language so that you can read its strings in other places.

```typescript
export default res.locale;
```

---

[Back](../README)
