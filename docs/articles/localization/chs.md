# 本地化

你可以使用本库来实现字符串和其它静态资源的多地区语言的本地化。

## 引用和创建实例

引入以下类和函数。

```typescript
import { Resources, setLanguage } from 'langpack'
```

或者，如果你是通过`script`标签插入HTML的，那么可以通过以下方式从全局变量中引用。

```typescript
const { Resources, setLanguage } = LangPack;
```

然后你可以创建一个资源实例，用于管理你当前网站或前端库的所有本地化资源。

```typescript
const res = new Resources();
```

## 注册语言包

你可以注册所有语言包。

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

## 访问本地化资源

获取本地化文本非常容易，如下所示。

```typescript
res.getLocaleString("hello");
```

如果你当前处于简体中文环境，将会返回`你好`字符串。

你也可以设置一个新的值。

```typescript
// 你可以针对不同语言进行设置。
// 第一个参数即为语言代号；若传空则为当前语言。
res.setString(null, "hello", "嗨");
```

当前语言是从浏览器中自动获取的。你也可以强制修改语言。

```typescript
setLanguage("en-US");
```

## 本地化只读资源

你可以创建一个只读实例，用于只访问当前语言的内容，并且不可修改。

```typescript
export default res.locale;
```

<!-- End -->
---

[Back](../shuoming/)
