# 概述

**VSCode Rainbow Fart** 是一个在你编程时持续夸你写的牛逼的扩展，可以根据代码关键字播放贴近代码意义的真人语音。

<Note label="演示视频">

<video src="https://saekiraku.oss-cn-beijing.aliyuncs.com/github/vscode-rainbow-fart/showoff-1.mp4" controls width="100%"></video>

</Note>

<Note label="Tips">

如果您在使用中有任何建议或意见，请在 [GitHub Issues](https://github.com/saekiraku/vscode-rainbow-fart/issues) 上反馈（请尽可能的使用英语）。

对于中国（中文）用户，也可以加入 QQ 群交流：[634121064](https://jq.qq.com/?_wv=1027&k=5lH8p4c)

</Note>

## 安装与使用

<center>
    <a :href="URL_PREFIX + '/releases/rainbow-fart-' + VERSION + '.vsix'" class="download">下载插件 Version {{VERSION}}</a>
    <br>
    <a href="https://github.com/saekiraku/vscode-rainbow-fart/releases">查看历史版本</a>
    <!-- <a href="https://github.com/saekiraku/vscode-rainbow-fart/releases">查找更多语音包</a> -->
</center>

<style>
.download {
    background: #009688;
    text-align: center;
    color: #FFF;
    font-weight: bolder;
    display: inline-block;
    padding: 0px 32px;
    margin: 16px 0px;
    line-height: 48px;
    border-radius: 48px;
}
.download:hover {
    text-decoration: none !important;
    opacity: 0.75;
}
</style>

1. 下载插件
2. 在 VSCode 的菜单栏中找到 `查看 - 命令面板`，或使用快捷键 `Ctrl + Shift + P`（MacOS `Command + Shift + P`）
3. 在 `命令面板` 中输入 `> Extensions: Install from VSIX` 并回车
4. 在弹出的 `文件选择窗口` 中找到下载的插件并打开
5. 安装完成，再次呼出 `命令面板` 输入 `> Enable Rainbow Fart` 并回车以启动插件
6. 点击右下角弹出通知的 `Open` 按钮（或访问 [http://127.0.0.1:7777/](http://127.0.0.1:7777/)）
7. 遵循打开的网页的说明使用本插件

## 特性

* 界面适配暗黑模式，让你深夜加班也能愉快地写代码。
* I18N 支持：简体中文、English。
* 支持导入自定义语音包

### 内置语音包（中文）特性

* 采用真人语音，共计 34 个音频文件。
* 目前支持 JavaScript（ES6 ） 语言的常用关键字
* 提供针对时间的语音：如提醒吃午饭、下班关怀等等
* 提供针对产品经理的语音：如 `fuck`, `shit`

## 开源协议

MIT