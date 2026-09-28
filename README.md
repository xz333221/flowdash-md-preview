# flowdash-md-preview

框架无关的 **Markdown 预览渲染器**。把 Markdown 渲染成 HTML，或者一步挂出一块可增量刷新的预览面板 —— 不绑定任何 UI 框架，浏览器、SSR、Node 都能用。

- 🪶 只依赖 `markdown-it`，ESM / CJS / 类型声明齐全
- 🧩 两层 API：纯渲染 `render()`，面板 `createPreview()`
- 🎨 内置亮 / 暗两套主题，也可以完全接管样式
- 🔒 默认关闭内联 HTML，避免把 `<script>` 直接渲染出来

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
import { DARK_THEME, createPreview } from 'flowdash-md-preview'

createPreview('#preview', { theme: DARK_THEME }) // 内置暗色
createPreview('#preview', { theme: '.md-preview { color: red }' }) // 自己的 CSS
createPreview('#preview', { theme: false }) // 不注入任何样式
```

## API

### `render(markdown, options?) => string`

渲染成 HTML 字符串。用于 SSR、写文件、塞进别的模板。

### `renderToElement(markdown, options?, doc?) => HTMLElement`

渲染成一个新的 DOM 节点。`doc` 一般不用传，测试时可注入 jsdom 文档。

### `createRenderer(options?) => MarkdownIt`

拿到配置好的 markdown-it 实例，用于做深度定制。

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
| `plugins` | `MarkdownPlugin[]` | `[]` | 追加的 markdown-it 插件 |
| `markdownItOptions` | `object` | — | 直接透传给 `new MarkdownIt()`，优先级最高 |

`PreviewOptions` 在此基础上多了 `theme`、`scrollable`、`initialValue`。

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
  theme.ts      # DEFAULT_THEME / DARK_THEME
  types.ts      # 公开类型
test/           # vitest（jsdom 环境）
examples/       # 手动体验用的静态页面
```

看 demo：先 `npm run build`，再在浏览器打开 `examples/index.html`。

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
