# LangPack

这是一个可以用于为你对业务代码或底层库提供多语言环境的前端库。

## 安装和引用

通过执行以下命令，可以从 [npm](https://www.npmjs.com/package/langpack) 来安装。

```sh
npm i langpack
```

另外，你也可以直接下载以下打包后的JS脚本文件之一，并以 `script` 标签插入你的网页中来进行使用。

- `https://cdn.jsdelivr.net/npm/langpack/dist/index.js`
- `https://unpkg.com/langpack/dist/index.js`

具体安装和引用方法，请[点击此处](../anzhuang/)来进行了解。

## 主要功能

LangPack 能帮你管理网站或前端库的语言包，以及相关资源。

以下是本库的几个核心功能，可以点击进入查看详情（部分内容为英文），其中示例默认以 Type Script 语言书写。

- [本地化](../bendihua/) - 一套提供本地化和全球化的工具，并能通过浏览器自动获取当前语言环境。

## 编译和测试

编译之前，需要先确保安装有 `gulp` 和 `tsc`。然后执行以下命令即可编译。

```sh
npm run-script build
```

编译之后，还可以通过执行以下命令来运行所有的单元测试。

```sh
npm test
```

## 许可

本项目基于 [MIT 许可](https://github.com/compositejs/langpack/blob/master/LICENSE)授权，欢迎使用。你也可以根据需要 clone 或 folk 本仓库。
