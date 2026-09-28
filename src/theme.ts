/** 渲染结果的默认包裹 class。 */
export const DEFAULT_CLASS = 'md-preview'

/** 注入主题样式时给 `<style>` 打的标记属性。 */
export const THEME_ATTR = 'data-flowdash-md-preview-theme'

/** 每个预览实例独有的属性，用于隔离内置主题。 */
export const PREVIEW_SCOPE_ATTR = 'data-flowdash-md-preview'

/**
 * 内置的默认主题 —— 排版在 GitHub 风格基础上做了精简，只覆盖预览必需的部分：
 * 字号、行高、标题间距、代码块、引用、表格、图片自适应。
 *
 * 想换肤的话直接给 `createPreview(el, { theme: yourCSS })` 传自己的样式即可。
 */
export const DEFAULT_THEME = `
.${DEFAULT_CLASS} {
  box-sizing: border-box;
  padding: 16px;
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
.${DEFAULT_CLASS} .contains-task-list { list-style: none; padding-left: 0; }
.${DEFAULT_CLASS} .task-list-item { list-style: none; }
.${DEFAULT_CLASS} .md-task-checkbox { margin: 0 0.45em 0 0; vertical-align: middle; accent-color: #0969da; }
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
.${DEFAULT_CLASS} pre code .hljs-comment,
.${DEFAULT_CLASS} pre code .hljs-quote { color: #6e7781; }
.${DEFAULT_CLASS} pre code .hljs-keyword,
.${DEFAULT_CLASS} pre code .hljs-selector-tag,
.${DEFAULT_CLASS} pre code .hljs-literal { color: #cf222e; }
.${DEFAULT_CLASS} pre code .hljs-string,
.${DEFAULT_CLASS} pre code .hljs-doctag { color: #0a3069; }
.${DEFAULT_CLASS} pre code .hljs-number,
.${DEFAULT_CLASS} pre code .hljs-symbol { color: #0550ae; }
.${DEFAULT_CLASS} pre code .hljs-title,
.${DEFAULT_CLASS} pre code .hljs-section { color: #8250df; }
`.trim()

/** 深色主题，开箱可用：`createPreview(el, { theme: DARK_THEME })`。 */
export const DARK_THEME = `
.${DEFAULT_CLASS} {
  box-sizing: border-box;
  padding: 16px;
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
.${DEFAULT_CLASS} .contains-task-list { list-style: none; padding-left: 0; }
.${DEFAULT_CLASS} .task-list-item { list-style: none; }
.${DEFAULT_CLASS} .md-task-checkbox { margin: 0 0.45em 0 0; vertical-align: middle; accent-color: #4493f8; }
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
.${DEFAULT_CLASS} pre code .hljs-comment,
.${DEFAULT_CLASS} pre code .hljs-quote { color: #8b949e; }
.${DEFAULT_CLASS} pre code .hljs-keyword,
.${DEFAULT_CLASS} pre code .hljs-selector-tag,
.${DEFAULT_CLASS} pre code .hljs-literal { color: #ff7b72; }
.${DEFAULT_CLASS} pre code .hljs-string,
.${DEFAULT_CLASS} pre code .hljs-doctag { color: #a5d6ff; }
.${DEFAULT_CLASS} pre code .hljs-number,
.${DEFAULT_CLASS} pre code .hljs-symbol { color: #79c0ff; }
.${DEFAULT_CLASS} pre code .hljs-title,
.${DEFAULT_CLASS} pre code .hljs-section { color: #d2a8ff; }
`.trim()

/**
 * 一组可以直接传给 `createPreview({ theme })` 的主题预设。
 *
 * 这些预设提取自 FlowDash 桌面端的 Markdown 预览配色，并把选择器限制在
 * `.md-preview` 内，避免把宿主应用的排版规则一起改掉。字体保持系统字体，
 * 使用方可以在自己的 CSS 中按需加载霞鹜文楷或 Cascadia Code。
 */
export type ThemePalette = {
  accent: string
  background: string
  surface: string
  text: string
  muted: string
  border: string
  code: string
  headingStyle?: 'plain' | 'gradient'
}

type SyntaxPalette = {
  keyword: string
  string: string
  number: string
  title: string
  builtIn: string
}

const LIGHT_SYNTAX: SyntaxPalette = {
  keyword: '#c92a2a',
  string: '#2b8a3e',
  number: '#b35c00',
  title: '#7048e8',
  builtIn: '#0b7285'
}

const DARK_SYNTAX: SyntaxPalette = {
  keyword: '#ff7b72',
  string: '#a5d6ff',
  number: '#79c0ff',
  title: '#d2a8ff',
  builtIn: '#ffa657'
}

function getSyntaxPalette(background: string): SyntaxPalette {
  const match = background.match(/^#([\da-f]{6})$/i)
  if (!match) return LIGHT_SYNTAX
  const [red, green, blue] = [0, 2, 4].map((offset) => Number.parseInt(match[1].slice(offset, offset + 2), 16) / 255)
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue
  return luminance < 0.5 ? DARK_SYNTAX : LIGHT_SYNTAX
}

function createDocumentTheme(palette: ThemePalette): string {
  const heading = palette.headingStyle === 'gradient'
    ? `background: linear-gradient(90deg, ${palette.accent}, ${palette.text}); -webkit-background-clip: text; background-clip: text; color: transparent;`
    : `color: ${palette.text};`
  const syntax = getSyntaxPalette(palette.background)
  return `
.${DEFAULT_CLASS} {
  box-sizing: border-box;
  padding: 16px;
  color: ${palette.text};
  background: ${palette.background};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 15px;
  line-height: 1.75;
  word-wrap: break-word;
}
.${DEFAULT_CLASS} > :first-child { margin-top: 0; }
.${DEFAULT_CLASS} > :last-child { margin-bottom: 0; }
.${DEFAULT_CLASS} h1, .${DEFAULT_CLASS} h2, .${DEFAULT_CLASS} h3,
.${DEFAULT_CLASS} h4, .${DEFAULT_CLASS} h5, .${DEFAULT_CLASS} h6 {
  margin: 1.5em 0 0.55em; line-height: 1.3; font-weight: 650; ${heading}
}
.${DEFAULT_CLASS} h1 { font-size: 2em; padding-bottom: .35em; border-bottom: 1px solid ${palette.border}; }
.${DEFAULT_CLASS} h2 { font-size: 1.5em; padding-bottom: .25em; border-bottom: 1px solid ${palette.border}; }
.${DEFAULT_CLASS} h3 { font-size: 1.25em; }
.${DEFAULT_CLASS} h4 { font-size: 1.05em; }
.${DEFAULT_CLASS} h5 { font-size: .95em; }
.${DEFAULT_CLASS} h6 { font-size: .9em; color: ${palette.muted}; }
.${DEFAULT_CLASS} p, .${DEFAULT_CLASS} blockquote, .${DEFAULT_CLASS} ul,
.${DEFAULT_CLASS} ol, .${DEFAULT_CLASS} table, .${DEFAULT_CLASS} pre { margin: 0 0 1em; }
.${DEFAULT_CLASS} ul, .${DEFAULT_CLASS} ol { padding-left: 1.8em; }
.${DEFAULT_CLASS} li + li { margin-top: .25em; }
.${DEFAULT_CLASS} a { color: ${palette.accent}; text-decoration: none; }
.${DEFAULT_CLASS} a:hover { text-decoration: underline; }
.${DEFAULT_CLASS} strong { font-weight: 700; }
.${DEFAULT_CLASS} hr { height: 1px; margin: 1.8em 0; border: 0; background: ${palette.border}; }
.${DEFAULT_CLASS} blockquote { padding: 0 1em; color: ${palette.muted}; border-left: .25em solid ${palette.accent}; }
.${DEFAULT_CLASS} code { padding: .2em .4em; font-size: .9em; background: ${palette.code}; border-radius: 6px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
.${DEFAULT_CLASS} pre { padding: 14px 16px; overflow: auto; background: ${palette.surface}; border: 1px solid ${palette.border}; border-radius: 10px; }
.${DEFAULT_CLASS} pre code { padding: 0; background: none; font-size: .875em; }
.${DEFAULT_CLASS} table { display: block; width: max-content; max-width: 100%; overflow: auto; border-collapse: collapse; }
.${DEFAULT_CLASS} th, .${DEFAULT_CLASS} td { padding: 7px 13px; border: 1px solid ${palette.border}; }
.${DEFAULT_CLASS} th { font-weight: 650; background: ${palette.surface}; }
.${DEFAULT_CLASS} img { max-width: 100%; height: auto; }
.${DEFAULT_CLASS} .contains-task-list { list-style: none; padding-left: 0; }
.${DEFAULT_CLASS} .task-list-item { list-style: none; }
.${DEFAULT_CLASS} .md-task-checkbox { margin: 0 .45em 0 0; vertical-align: middle; accent-color: ${palette.accent}; }
.${DEFAULT_CLASS} pre code .hljs-comment,
.${DEFAULT_CLASS} pre code .hljs-quote { color: ${palette.muted}; }
.${DEFAULT_CLASS} pre code .hljs-keyword,
.${DEFAULT_CLASS} pre code .hljs-selector-tag,
.${DEFAULT_CLASS} pre code .hljs-literal { color: ${syntax.keyword}; }
.${DEFAULT_CLASS} pre code .hljs-string,
.${DEFAULT_CLASS} pre code .hljs-doctag { color: ${syntax.string}; }
.${DEFAULT_CLASS} pre code .hljs-number,
.${DEFAULT_CLASS} pre code .hljs-symbol { color: ${syntax.number}; }
.${DEFAULT_CLASS} pre code .hljs-title,
.${DEFAULT_CLASS} pre code .hljs-section { color: ${syntax.title}; }
.${DEFAULT_CLASS} pre code .hljs-built_in,
.${DEFAULT_CLASS} pre code .hljs-type,
.${DEFAULT_CLASS} pre code .hljs-variable { color: ${syntax.builtIn}; }
`.trim()
}

const GITHUB_THEME = DEFAULT_THEME
const GITHUB_DARK_THEME = DARK_THEME
const NOTION_THEME = createDocumentTheme({
  accent: '#2383e2', background: '#ffffff', surface: '#f7f6f3', text: '#37352f',
  muted: '#787774', border: '#e9e9e7', code: '#f1f1ef'
})
const VUEPRESS_THEME = createDocumentTheme({
  accent: '#3eaf7c', background: '#ffffff', surface: '#f6f8fa', text: '#2c3e50',
  muted: '#6a737d', border: '#eaecef', code: '#f3f5f7'
})
const SAKURA_THEME = createDocumentTheme({
  accent: '#d14d72', background: '#fffafa', surface: '#fff0f4', text: '#4a2630',
  muted: '#866d73', border: '#f2cbd5', code: '#fff0f4', headingStyle: 'gradient'
})
const SAKURA_DARK_THEME = createDocumentTheme({
  accent: '#ff7096', background: '#241c22', surface: '#30242c', text: '#f9eaf0',
  muted: '#c6a9b4', border: '#503644', code: '#3c2b35', headingStyle: 'gradient'
})
const RETRO_THEME = createDocumentTheme({
  accent: '#e76f51', background: '#fff8e8', surface: '#fff0c7', text: '#4a3324',
  muted: '#846c55', border: '#e7cda7', code: '#ffedc2', headingStyle: 'gradient'
})
const WATER_DARK_THEME = createDocumentTheme({
  accent: '#63c5da', background: '#102027', surface: '#19313a', text: '#e3f4f7',
  muted: '#9fc3cb', border: '#2b4c56', code: '#1d3942'
})

const PHY_CAT_PALETTES: Record<string, ThemePalette> = {
  'phycat-forest': { accent: '#11aa63', background: '#fbfffc', surface: '#effaf4', text: '#183b2a', muted: '#668074', border: '#cfe9da', code: '#e7f7ed', headingStyle: 'gradient' },
  'phycat-cherry': { accent: '#aa1141', background: '#fffafb', surface: '#fff0f4', text: '#451525', muted: '#8d6673', border: '#f0cbd7', code: '#fde9ef', headingStyle: 'gradient' },
  'phycat-sky': { accent: '#3498db', background: '#fbfdff', surface: '#edf7ff', text: '#18364d', muted: '#68849a', border: '#c9e2f5', code: '#e7f4ff', headingStyle: 'gradient' },
  'phycat-sakura': { accent: '#ff7096', background: '#fffafd', surface: '#fff0f5', text: '#4a2030', muted: '#966f7d', border: '#f5c9d8', code: '#ffedf3', headingStyle: 'gradient' },
  'phycat-mint': { accent: '#3db8bf', background: '#f9ffff', surface: '#eafafa', text: '#183d40', muted: '#66898b', border: '#c6e8e8', code: '#e2f6f6', headingStyle: 'gradient' },
  'phycat-mauve': { accent: '#ba68c8', background: '#fdfaff', surface: '#f7edfa', text: '#3f2447', muted: '#896b91', border: '#e3cce8', code: '#f3e7f6', headingStyle: 'gradient' },
  'phycat-prussian': { accent: '#1d4e89', background: '#f9fbff', surface: '#edf3fb', text: '#172b43', muted: '#65778b', border: '#c9d7e8', code: '#e5eef9', headingStyle: 'gradient' },
  'phycat-caramel': { accent: '#f59e0b', background: '#fffdf8', surface: '#fff5df', text: '#493319', muted: '#927b5e', border: '#eed9ae', code: '#fff1d2', headingStyle: 'gradient' },
  'phycat-abyss': { accent: '#65a6ff', background: '#10151f', surface: '#182230', text: '#edf4ff', muted: '#9aa9be', border: '#2c3b51', code: '#1b2a3d', headingStyle: 'gradient' },
  'phycat-radiation': { accent: '#c8f000', background: '#15170e', surface: '#232716', text: '#f4f7dc', muted: '#b3bb8e', border: '#424b29', code: '#2c321a', headingStyle: 'gradient' },
  'phycat-vampire': { accent: '#f04f78', background: '#1b1118', surface: '#2a1822', text: '#faeaf0', muted: '#c7a3b0', border: '#4a2938', code: '#351f2b', headingStyle: 'gradient' }
}

/** 内置主题名称到 CSS 的映射，适合主题选择器直接消费。 */
export const THEME_PRESETS = {
  github: GITHUB_THEME,
  'github-dark': GITHUB_DARK_THEME,
  planet: createDocumentTheme({ accent: '#4f7cac', background: '#f8fbff', surface: '#edf3fa', text: '#233044', muted: '#718096', border: '#d6e0eb', code: '#eaf1f8' }),
  notion: NOTION_THEME,
  vuepress: VUEPRESS_THEME,
  docusaurus: createDocumentTheme({ accent: '#25c2a0', background: '#ffffff', surface: '#f7f8fa', text: '#1c1e21', muted: '#606770', border: '#e5e7eb', code: '#f1f2f3' }),
  bear: createDocumentTheme({ accent: '#5b8c5a', background: '#fffef9', surface: '#f3f5ea', text: '#30362f', muted: '#788078', border: '#dfe5d7', code: '#edf1e7' }),
  retro: RETRO_THEME,
  latex: createDocumentTheme({ accent: '#1769aa', background: '#fff', surface: '#f5f5f5', text: '#222', muted: '#666', border: '#ccc', code: '#f4f4f4' }),
  'water-dark': WATER_DARK_THEME,
  sakura: SAKURA_THEME,
  'sakura-dark': SAKURA_DARK_THEME,
  'phycat-forest': createDocumentTheme(PHY_CAT_PALETTES['phycat-forest']),
  'phycat-cherry': createDocumentTheme(PHY_CAT_PALETTES['phycat-cherry']),
  'phycat-sky': createDocumentTheme(PHY_CAT_PALETTES['phycat-sky']),
  'phycat-sakura': createDocumentTheme(PHY_CAT_PALETTES['phycat-sakura']),
  'phycat-mint': createDocumentTheme(PHY_CAT_PALETTES['phycat-mint']),
  'phycat-mauve': createDocumentTheme(PHY_CAT_PALETTES['phycat-mauve']),
  'phycat-prussian': createDocumentTheme(PHY_CAT_PALETTES['phycat-prussian']),
  'phycat-caramel': createDocumentTheme(PHY_CAT_PALETTES['phycat-caramel']),
  'phycat-abyss': createDocumentTheme(PHY_CAT_PALETTES['phycat-abyss']),
  'phycat-radiation': createDocumentTheme(PHY_CAT_PALETTES['phycat-radiation']),
  'phycat-vampire': createDocumentTheme(PHY_CAT_PALETTES['phycat-vampire'])
} as const

/** 主题名称联合类型，例如 `theme: 'phycat-forest'`。 */
export type ThemeName = keyof typeof THEME_PRESETS

/** `THEME_PRESETS` 的简短别名。 */
export const THEMES = THEME_PRESETS

export function resolveTheme(theme: string): string | undefined {
  return Object.prototype.hasOwnProperty.call(THEME_PRESETS, theme)
    ? THEME_PRESETS[theme as ThemeName]
    : undefined
}

export function isPresetTheme(theme: string): boolean {
  return resolveTheme(theme) !== undefined
}
