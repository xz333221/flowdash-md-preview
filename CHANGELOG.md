# Changelog

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 与 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

## [0.1.0] - 2026-09-28

### Added

- `render()` / `renderToElement()` / `createRenderer()` 基础渲染能力
- `renderWithMetadata()` 标题目录与中文友好锚点
- `createPreview()` 预览面板：增量 `update()`、`setTheme()`、`destroy()`
- 内置 `DEFAULT_THEME`（亮色）与 `DARK_THEME`（暗色）
- 23 个内置主题预设，包含 FlowDash / PhyCat 配色系列
- GFM 任务列表和可插拔代码高亮回调，内置 highlight.js 常见语言高亮
- 为 PhyCat、Notion、VuePress 等主题补充独立的关键字、字符串、数字、函数和内置对象色板
- 将内置主题的内容间距放入 `.md-preview`，避免外层留白与主题背景断开
- 多预览实例的预设主题作用域隔离
- ESM + CJS 双格式产物与类型声明，vitest（jsdom）测试
- `npm run demo` 本地静态服务，避免直接打开 `file://` 时的 CORS 问题
