# 常见问题

## 插件无法启动

目前已知插件无法在较低版本的 VSCode 上运行，建议升级 VSCode（本人使用的是 1.46.1）。

> 已知原因：
> - 使用了 `vscode.workspace.fs` 对象进行文件读写，该对象在较低版本的 VSCode 上没有提供。

## 如何自定义语音包

请参阅：http://saekiraku.github.io/#/zh/voice-packages.md

## 如何修改内置语音包（增加/修改关键字等）

NOTE：不建议直接修改内置语音包的配置文件，因为当语音包版本更新时，会覆盖之前的所有修改。请遵循以下步骤进行修改：

1. 安装并启动插件
2. 点击 Web 界面中的 `打开语音包所在目录`。
3. 在该目录下复制内置语音包 `built-in-voice-chinese` 文件夹，修改为其他名称（例如：built-in-copy-01）。
4. 进入复制出的文件夹，修改 `manifest.json` 文件中的 `name` 字段，确保其与所在的文件夹的名称一致（例如：built-in-copy-01）。
5. 在 `contributes.json` 中，按自己的需求增加修改关键字或其他任意内容。
6. 在 Web 界面中点击 `刷新` 即可。

## 如何在 VSCode Remote 中使用？

连接远端服务器后，进入 VSCode 的扩展面板，找到 `@installed rainbow-fart`，VSCode 应该会提示你 `在 SSH:*.*.*.* 中安装 `，点击该按钮，安装成功后正常启动即可。

## 如何在 VSCode Remote 中修改内置语音包？

与本地修改大致相同，除了 `打开语音包所在目录` 并不可用，您需要自己定位内置语音包位置。在 CentOS 系统下，其目录大致为：`/$USER/.vscode-server/data/User/globalStorage/saekiraku.rainbow-fart/voice-packages/built-in-voice-chinese/`