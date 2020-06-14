<h1 align="center">
  <br>
    <img src="https://github.com/SaekiRaku/vscode-rainbow-fart/blob/master/assets/logo.png?raw=true" alt="logo" width="100">
  <br>
  <br>
  🌈 RAINBOW FART
  <br>
  <br>
</h1>

## 概述

这是一个在你编程时持续夸你写的牛逼的扩展，可以根据代码关键字播放贴近代码意义的真人语音。由于当前插件内的语音均为中文，因此不方便发布到 VSCode 商店，所以以 VISX 的形式发布。请直接 [查看文档并下载安装](https://saekiraku.github.io/vscode-rainbow-fart/)。

## English Description

This is a VSCode extension that keeps giving you compliment while you are coding, for example when you type `function` it will play sound that says you wrote a such good function. However the sounds is recorded in Chinese, so it's may not suitable for you. But you can still modify the source code, like add English version compliment sound file.

Rainbow Fart is a literal translation word from Chinese, it's mean give somebody exaggerated compliment that even seems a little fake. It's not involved any connection to specific group or people.

## Q&A

Q：安装扩展时 VSCode 提示不兼容。  
A：请修改 `package.json` 中 `engines.vscode` 和 `devDependencies.@types/vscode` 字段为你当前的 VSCode 版本号（如下），然后在进入当前目录的终端运行 `npm i && npm run build`。 此时在工作区目录下将产生新编译的扩展，安装即可。详情请看：[Issue #1](https://github.com/SaekiRaku/vscode-rainbow-fart/issues/1)

```json
{
  "engines": {
      "vscode": "^[当前版本号]",
  },
  "devDependencies": {
      "@types/vscode": "^[当前版本号]",
  }
}
```

## 许可

基于 MIT 开源，包括所有设计资源及音频资源。此外，由于仓库中的音频资源大部分由真人录音，并且根据 MIT 被授权人义务。在此明确：尤其的对于仓库中多媒体资源，您有（单独）标明资源原作者、链接、许可的义务。