/**
 * flowdash-md-preview —— 框架无关的 Markdown 预览渲染器。
 *
 * 两层能力：
 * 1. 纯渲染：`render()` / `renderToElement()` / `createRenderer()`，不碰 DOM 生命周期。
 * 2. 预览面板：`createPreview()`，把渲染结果挂成一块可增量刷新的面板，自带主题注入。
 */
export { createRenderer, highlightCode, render, renderToElement, renderWithMetadata } from './renderer'
export { createPreview } from './preview'
export {
  DARK_THEME,
  DEFAULT_CLASS,
  DEFAULT_THEME,
  PREVIEW_SCOPE_ATTR,
  THEME_ATTR,
  THEME_PRESETS,
  THEMES,
  isPresetTheme,
  resolveTheme
} from './theme'
export type { ThemeName, ThemePalette } from './theme'
export type {
  Heading,
  HeadingIdGenerator,
  HighlightCode,
  MarkdownPlugin,
  MarkdownPluginFn,
  PreviewInstance,
  PreviewOptions,
  RenderOptions,
  RenderResult
} from './types'
