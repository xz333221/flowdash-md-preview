/** 渲染结果的默认包裹 class。 */
export const DEFAULT_CLASS = 'md-preview'

/** 注入主题样式时给 `<style>` 打的标记属性。 */
export const THEME_ATTR = 'data-flowdash-md-preview-theme'

/**
 * 内置的默认主题 —— 排版在 GitHub 风格基础上做了精简，只覆盖预览必需的部分：
 * 字号、行高、标题间距、代码块、引用、表格、图片自适应。
 *
 * 想换肤的话直接给 `createPreview(el, { theme: yourCSS })` 传自己的样式即可。
 */
export const DEFAULT_THEME = `
.${DEFAULT_CLASS} {
  color: #1f2328;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.7;
  word-wrap: break-word;
}
.${DEFAULT_CLASS} > :first-child { margin-top: 0; }
.${DEFAULT_CLASS} > :last-child { margin-bottom: 0; }
.${DEFAULT_CLASS} h1,
.${DEFAULT_CLASS} h2,
.${DEFAULT_CLASS} h3,
.${DEFAULT_CLASS} h4,
.${DEFAULT_CLASS} h5,
.${DEFAULT_CLASS} h6 {
  margin: 1.6em 0 0.6em;
  font-weight: 600;
  line-height: 1.3;
}
.${DEFAULT_CLASS} h1 { font-size: 1.9em; padding-bottom: 0.3em; border-bottom: 1px solid #d8dee4; }
.${DEFAULT_CLASS} h2 { font-size: 1.5em; padding-bottom: 0.3em; border-bottom: 1px solid #d8dee4; }
.${DEFAULT_CLASS} h3 { font-size: 1.25em; }
.${DEFAULT_CLASS} h4 { font-size: 1.05em; }
.${DEFAULT_CLASS} h5 { font-size: 0.95em; }
.${DEFAULT_CLASS} h6 { font-size: 0.9em; color: #656d76; }
.${DEFAULT_CLASS} p,
.${DEFAULT_CLASS} blockquote,
.${DEFAULT_CLASS} ul,
.${DEFAULT_CLASS} ol,
.${DEFAULT_CLASS} table,
.${DEFAULT_CLASS} pre { margin: 0 0 1em; }
.${DEFAULT_CLASS} ul,
.${DEFAULT_CLASS} ol { padding-left: 1.8em; }
.${DEFAULT_CLASS} li + li { margin-top: 0.25em; }
.${DEFAULT_CLASS} a { color: #0969da; text-decoration: none; }
.${DEFAULT_CLASS} a:hover { text-decoration: underline; }
.${DEFAULT_CLASS} strong { font-weight: 600; }
.${DEFAULT_CLASS} hr { height: 1px; margin: 1.8em 0; border: 0; background: #d8dee4; }
.${DEFAULT_CLASS} blockquote {
  padding: 0 1em;
  color: #656d76;
  border-left: 0.25em solid #d0d7de;
}
.${DEFAULT_CLASS} code {
  padding: 0.2em 0.4em;
  font-size: 0.9em;
  background: rgba(175, 184, 193, 0.2);
  border-radius: 6px;
  font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
}
.${DEFAULT_CLASS} pre {
  padding: 14px 16px;
  overflow: auto;
  background: #f6f8fa;
  border-radius: 8px;
}
.${DEFAULT_CLASS} pre code { padding: 0; background: none; font-size: 0.875em; }
.${DEFAULT_CLASS} table { border-collapse: collapse; display: block; overflow: auto; width: max-content; max-width: 100%; }
.${DEFAULT_CLASS} th,
.${DEFAULT_CLASS} td { padding: 6px 13px; border: 1px solid #d0d7de; }
.${DEFAULT_CLASS} th { font-weight: 600; background: #f6f8fa; }
.${DEFAULT_CLASS} img { max-width: 100%; box-sizing: content-box; }
.${DEFAULT_CLASS} kbd {
  padding: 0.2em 0.4em;
  font-size: 0.85em;
  border: 1px solid #d0d7de;
  border-bottom-width: 2px;
  border-radius: 6px;
}
`.trim()

/** 深色主题，开箱可用：`createPreview(el, { theme: DARK_THEME })`。 */
export const DARK_THEME = `
.${DEFAULT_CLASS} {
  color: #e6edf3;
  background: #0d1117;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.7;
  word-wrap: break-word;
}
.${DEFAULT_CLASS} > :first-child { margin-top: 0; }
.${DEFAULT_CLASS} > :last-child { margin-bottom: 0; }
.${DEFAULT_CLASS} h1,
.${DEFAULT_CLASS} h2,
.${DEFAULT_CLASS} h3,
.${DEFAULT_CLASS} h4,
.${DEFAULT_CLASS} h5,
.${DEFAULT_CLASS} h6 { margin: 1.6em 0 0.6em; font-weight: 600; line-height: 1.3; }
.${DEFAULT_CLASS} h1 { font-size: 1.9em; padding-bottom: 0.3em; border-bottom: 1px solid #30363d; }
.${DEFAULT_CLASS} h2 { font-size: 1.5em; padding-bottom: 0.3em; border-bottom: 1px solid #30363d; }
.${DEFAULT_CLASS} h3 { font-size: 1.25em; }
.${DEFAULT_CLASS} h4 { font-size: 1.05em; }
.${DEFAULT_CLASS} h5 { font-size: 0.95em; }
.${DEFAULT_CLASS} h6 { font-size: 0.9em; color: #8b949e; }
.${DEFAULT_CLASS} p,
.${DEFAULT_CLASS} blockquote,
.${DEFAULT_CLASS} ul,
.${DEFAULT_CLASS} ol,
.${DEFAULT_CLASS} table,
.${DEFAULT_CLASS} pre { margin: 0 0 1em; }
.${DEFAULT_CLASS} ul,
.${DEFAULT_CLASS} ol { padding-left: 1.8em; }
.${DEFAULT_CLASS} a { color: #4493f8; text-decoration: none; }
.${DEFAULT_CLASS} a:hover { text-decoration: underline; }
.${DEFAULT_CLASS} hr { height: 1px; margin: 1.8em 0; border: 0; background: #30363d; }
.${DEFAULT_CLASS} blockquote { padding: 0 1em; color: #8b949e; border-left: 0.25em solid #30363d; }
.${DEFAULT_CLASS} code {
  padding: 0.2em 0.4em;
  font-size: 0.9em;
  background: rgba(110, 118, 129, 0.4);
  border-radius: 6px;
  font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
}
.${DEFAULT_CLASS} pre { padding: 14px 16px; overflow: auto; background: #161b22; border-radius: 8px; }
.${DEFAULT_CLASS} pre code { padding: 0; background: none; font-size: 0.875em; }
.${DEFAULT_CLASS} table { border-collapse: collapse; display: block; overflow: auto; width: max-content; max-width: 100%; }
.${DEFAULT_CLASS} th,
.${DEFAULT_CLASS} td { padding: 6px 13px; border: 1px solid #30363d; }
.${DEFAULT_CLASS} th { font-weight: 600; background: #161b22; }
.${DEFAULT_CLASS} img { max-width: 100%; }
`.trim()
