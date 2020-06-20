# 定制语音包

## Step 1: 创建 `manifest.json`

首先，找一个空目录并在其中创建 `manifest.json` 文件，该元信息文件应至少包含以下几个字段：

```json
// manifest.json
{
    "name": "",
    // 语音包名称，必须为小写字母，可以包含连字符。例如："built-in-voice-chinese"
    "version": "",
    // 语音包版本号，例如："1.0.0"
    "contributes": [
        // ... 语音配置，详见下步
    ]
}
```

## Step 2: 配置语音

将录制好的音频文件（mp3）拷贝与 `manifest.json` 同级的目录中，当前 `vscode-rainbow-fart` 扩展暂时不支持处理子目录内的音频文件。

然后，在 `manifest.json` 中为 `contributes` 字段增添配置。假设我们需要检测 `function` 关键字然后播放 `function.mp3` 音频，则如下填写：

```json
// manifest.json
{
    "contributes": [
        {
            "keywords": "function",
            "voices": "function.mp3"
        }
    ]
}
```

同时，扩展还支持多个关键字共用一个音频，或者对应多个音频并随机播放。如下：

```json
// manifest.json
{
    "contributes": [
        {
            "keywords": ["function", "=>"],
            // 支持 ES6 箭头函数 ()=>{}
            "voices": [
                "function_01.mp3",
                "function_02.mp3",
                "function_03.mp3",
                // ...
            ]
        }
    ]
}
```

## Step 3: 丰富语音包元信息

语音包元信息文件还有很多其他字段，可以展示很多额外的信息（如下）。

<ImageZoom src="/zh/assets/ui-settings.png" :border="true" width="300"/>

<Note>以下字段均为可选字段</Note>

### display-name <Badge>String</Badge>

`name` 字段更多的是语音包的标识ID，而 `display-name` 字段则可以在页面上显示绝大部分字符（空格、数字、Emoji 等）

### description <Badge>String</Badge>

语音包描述，可以写一些关于语音包的声明等纯文本。

### author <Badge>String</Badge>

作者名

### avatar <Badge>String</Badge>

头像图片，需要将图片文件拷贝到语音包目录中，然后在 `avatar` 字段中填写文件名。

### avatar-dark <Badge>String</Badge>

在暗黑模式下呈现的头像图片，通过降低图片的饱和度、亮度使其在夜间也可以适宜的观看。

<Note>部分内置语音包所使用的字段并未在此呈现，因为这些字段是实验性质的。</Note>

## Step 4: 打包

最后，选中所有文件，压缩为 zip 文件。**请勿将父目录一并压缩，所有文件应处于 zip 的顶层。**