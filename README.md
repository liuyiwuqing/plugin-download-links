# 云盘链接下载插件

## 交流群

[点击链接加入群聊【halo博客-lywq插件】](https://qm.qq.com/q/wuC7NZr0sw)

<img src="https://github.com/user-attachments/assets/bf162401-07fd-49ec-b50f-5218c9510937" style="height: 400px !important; width: auto; object-fit: contain;" />

## 简介

一款为Halo提供云盘下载链接卡片展示的插件，支持默认编辑器中可视化插入网盘链接。

## 展示
<img style="width: 400px !important; height: auto; object-fit: contain;" src="https://github.com/user-attachments/assets/c33ceb01-fbe4-4540-a902-d7ef4995478d" />
<img style="width: 400px !important; height: auto; object-fit: contain;" src="https://github.com/user-attachments/assets/f6c28e31-9503-4d6b-ac8a-c8413e61a96b" />
<img style="width: 800px !important; height: auto; object-fit: contain;" src="https://github.com/user-attachments/assets/3b692bda-7319-47c1-8093-23d03e9aecdb" />


## 开发环境

- Java 21+
- Node.js 18+
- pnpm

## 开发

```bash
# 启用插件
./gradlew haloServer
# 开发前端
cd ui
pnpm install
pnpm dev
```

## 构建

```bash
./gradlew build
```

构建完成后，可以在 `build/libs` 目录找到插件 jar 文件。

## 许可证

[GPL-3.0](./LICENSE) © lywq 
