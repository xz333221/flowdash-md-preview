# flowdash-md-preview

框架无关的 **Markdown 预览渲染器**。把 Markdown 渲染成 HTML，或者一步挂出一块可增量刷新的预览面板 —— 不绑定任何 UI 框架，浏览器、SSR、Node 都能用。

- 🪶 依赖 `markdown-it` 和 `highlight.js`，ESM / CJS / 类型声明齐全
- 🧩 两层 API：纯渲染 `render()`，面板 `createPreview()`
- 🎨 内置 23 个主题预设，包含从 FlowDash 桌面端整理出的 PhyCat 配色
- 🔒 默认关闭内联 HTML，避免把 `<script>` 直接渲染出来
- ✅ 默认支持 GFM 任务列表和常见语言代码高亮，也可以接入自己的高亮器

## 安装

```bash
npm install flowdash-md-preview
# pnpm add flowdash-md-preview
# yarn add flowdash-md-preview
```

## 快速开始

### 只想要 HTML 字符串

```ts
import { render } from 'flowdash-md-preview'

render('# Hello')
// => '<div class="md-preview"><h1>Hello</h1>\n</div>'

render('# Hello', { className: false })
// => '<h1>Hello</h1>\n'
```

### 挂一块预览面板

```ts
import { createPreview } from 'flowdash-md-preview'

const preview = createPreview('#preview', { initialValue: '# Hello' })

// 输入框内容变化时刷新
editor.addEventListener('input', () => {
  preview.update(editor.value)
})

// 页面卸载 / 组件销毁时
preview.destroy()
```

### 换主题

```ts
import { createPreview } from 'flowdash-md-preview'

createPreview('#preview', { theme: 'github-dark' }) // 预设名称
createPreview('#preview', { theme: 'phycat-forest' }) // FlowDash / PhyCat 森绿
createPreview('#preview', { theme: '.md-preview { color: red }' }) // 自己的 CSS
createPreview('#preview', { theme: false }) // 不注入任何样式
```

也可以导入完整 CSS，方便做自己的主题选择器：

```ts
import { THEME_PRESETS, THEMES } from 'flowdash-md-preview'

createPreview('#preview', { theme: THEME_PRESETS.notion })
Object.keys(THEMES) // github、github-dark、notion、phycat-forest ...
```

## API

### `render(markdown, options?) => string`

渲染成 HTML 字符串。用于 SSR、写文件、塞进别的模板。

### `renderToElement(markdown, options?, doc?) => HTMLElement`

渲染成一个新的 DOM 节点。`doc` 一般不用传，测试时可注入 jsdom 文档。

### `createRenderer(options?) => MarkdownIt`

拿到配置好的 markdown-it 实例，用于做深度定制。

### `highlightCode(code, language, attributes) => string`

内置的 highlight.js 高亮回调。默认渲染器会自动使用它；需要换成 Shiki 或自己的高亮方案时，传入 `highlight` 覆盖即可。

### `renderWithMetadata(markdown, options?) => { html, headings }`

渲染 HTML 的同时返回目录数据。这个 API 默认给标题生成中文友好的 `id`，同名标题会自动追加 `-2`、`-3`，适合做目录导航：

```ts
const { html, headings } = renderWithMetadata('# 快速开始\n## 安装')
// headings: [{ level: 1, text: '快速开始', id: '快速开始' }, ...]
```

### `createPreview(target, options?) => PreviewInstance`

`target` 是选择器或元素，返回实例：

| 成员 | 说明 |
| --- | --- |
| `element` | 挂载的根元素 |
| `content` | 实际承载渲染结果的节点（带 `.md-preview` class） |
| `update(markdown)` | 刷新内容；内容没变时是空操作 |
| `getHTML()` | 取回当前渲染出的 HTML |
| `setTheme(theme \| false)` | 切换 / 移除注入的样式 |
| `destroy()` | 清理内容、样式与实例状态 |

### 通用选项 `RenderOptions`

| 选项 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `html` | `boolean` | `false` | 是否解析 Markdown 里的内联 HTML。**默认关闭更安全** |
| `breaks` | `boolean` | `true` | 单个换行是否转成 `<br>` |
| `linkify` | `boolean` | `true` | 是否自动识别裸 URL / 邮箱 |
| `typographer` | `boolean` | `false` | 是否开启排版美化 |
| `className` | `string \| false` | `'md-preview'` | 顶层包裹 class，传 `false` 不包裹 |
| `headingId` | `boolean \| function` | `false` | 是否自动生成标题锚点；`renderWithMetadata` 默认开启 |
| `taskLists` | `boolean` | `true` | 把 `- [ ]` / `- [x]` 渲染成只读 checkbox |
| `highlight` | `function` | 内置 highlight.js | 代码块高亮回调，返回 HTML |
| `plugins` | `MarkdownPlugin[]` | `[]` | 追加的 markdown-it 插件 |
| `markdownItOptions` | `object` | — | 直接透传给 `new MarkdownIt()`，优先级最高 |

`PreviewOptions` 在此基础上多了 `theme`、`scrollable`、`initialValue`。

`theme` 可以传 CSS 字符串、预设名称（例如 `'notion'`、`'phycat-vampire'`），或 `false`。通过预设名称切换时，样式会自动隔离到当前预览容器；字体采用系统字体，不会强制下载桌面端字体文件。

预设包含 `github`、`github-dark`、`planet`、`notion`、`vuepress`、`docusaurus`、`bear`、`retro`、`latex`、`water-dark`、`sakura`、`sakura-dark`，以及 `phycat-forest`、`phycat-cherry`、`phycat-sky`、`phycat-sakura`、`phycat-mint`、`phycat-mauve`、`phycat-prussian`、`phycat-caramel`、`phycat-abyss`、`phycat-radiation`、`phycat-vampire`。

### 主题来源

PhyCat 预设参考了 FlowDash 桌面端的文档排版和 `typora-theme-phycat` 的配色方向，包内 CSS 是面向预览容器的独立实现，不携带桌面端字体或编辑器 UI 样式。

### 关于安全

默认 `html: false` 时，源文里的 `<script>` 会被转义成文本，不会被当标签执行。但 Markdown 语法本身仍可能生成 `[x](javascript:...)` 这类链接 —— 如果内容来自不可信的用户输入，**请在输出侧再叠一层 sanitize**（例如接入 `dompurify` 后用 `plugins` / 包装 `render` 的结果）。

## 开发

```bash
npm install
npm run dev        # tsup --watch，产出 dist/
npm run typecheck  # tsc --noEmit
npm test           # vitest run
npm run build      # 产出 ESM + CJS + d.ts
```

目录结构：

```
src/
  index.ts      # 统一出口
  renderer.ts   # render / renderToElement / createRenderer
  preview.ts    # createPreview（面板 + 主题注入）
  theme.ts      # 主题预设与 DEFAULT_THEME / DARK_THEME
  types.ts      # 公开类型
test/           # vitest（jsdom 环境）
examples/       # 手动体验用的静态页面
```

看 demo：不要直接用 `file://` 打开 HTML（浏览器会拦截模块请求并报 CORS）。在项目根目录运行：

```bash
npm run demo
```

然后打开 <http://127.0.0.1:4173/examples/index.html>。如果已经完成构建，也可以只运行 `npm run demo:server`。

## 发布到 npm

```bash
npm login
npm run build
npm publish --access public
```

`prepublishOnly` 会自动跑 `typecheck + test + build`，所以发布前不用手动再过一遍。
首次发布后建议在 npm 后台开启 2FA，并把 GitHub 设为仓库的 Trusted Publisher。

## License

[MIT](./LICENSE)
