/**
 * Public option / instance types for flowdash-md-preview.
 */

/** 一个 markdown-it 插件（或 `[插件, ...参数]` 元组）。 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MarkdownPluginFn = (md: any, ...args: any[]) => void
export type MarkdownPlugin = MarkdownPluginFn | [MarkdownPluginFn, ...args: unknown[]]

/** 根据标题文字、标题级别和从 0 开始的顺序生成锚点 ID。 */
export type HeadingIdGenerator = (text: string, level: number, index: number) => string

/** 代码块高亮回调；返回的字符串会原样作为 `<code>` 内容使用。 */
export type HighlightCode = (code: string, language: string, attributes: string) => string

/** 从 Markdown 中提取的目录条目。 */
export interface Heading {
  level: number
  text: string
  /** 标题锚点；显式关闭 headingId 且插件未设置 ID 时为空字符串。 */
  id: string
}

/** 渲染后的 HTML 和按文档顺序排列的标题。 */
export interface RenderResult {
  html: string
  headings: Heading[]
}

/** `render()` / `createPreview()` 共用的渲染配置。 */
export interface RenderOptions {
  /**
   * 是否解析 Markdown 源文里的内联 HTML。
   * 默认 `false` —— 关闭后 `<script>` 之类会被原样转义输出，是最安全的默认值。
   * 如果你的内容来源完全可信、且需要 HTML 能力，再显式打开。
   */
  html?: boolean
  /** 是否把单个换行当作 `<br>`。默认 `true`。 */
  breaks?: boolean
  /** 是否自动把裸 URL / 邮箱识别成链接。默认 `true`。 */
  linkify?: boolean
  /** 是否开启排版美化（智能引号、破折号等）。默认 `false`。 */
  typographer?: boolean
  /**
   * 包裹渲染结果的根节点 class；默认 `'md-preview'`。
   * 传 `false` 表示不加任何包裹层，直接返回 markdown-it 的输出。
   */
  className?: string | false
  /**
   * 是否为标题生成唯一的锚点，或提供自定义 ID 生成函数。
   * render/createRenderer 默认 false；renderWithMetadata 默认 true。
   * 自动 ID 保留中文；同名标题自动添加 -2、-3 等后缀。
   */
  headingId?: boolean | HeadingIdGenerator
  /** 是否把 GFM 任务列表（`- [ ] item`）渲染成不可编辑的复选框。默认 `true`。 */
  taskLists?: boolean
  /** 代码高亮回调，默认使用内置 highlight.js；也可接入 Shiki 等高亮器。 */
  highlight?: HighlightCode
  /** 追加的 markdown-it 插件，按顺序 use。 */
  plugins?: MarkdownPlugin[]
  /** 透传给 `new MarkdownIt()` 的原始配置，优先级高于上面的快捷开关。 */
  markdownItOptions?: Record<string, unknown>
}

/** `createPreview()` 的配置。 */
export interface PreviewOptions extends RenderOptions {
  /**
   * 预览面板的样式。
   * - 不传：使用内置的 `DEFAULT_THEME`
   * - 传字符串：使用你提供的 CSS
   * - 传 `false`：不注入任何样式，完全由使用方接管
   */
  theme?: string | false
  /** 是否需要外层滚动容器，默认 `true`（会设置 `overflow: auto`）。 */
  scrollable?: boolean
  /** 初始 Markdown 内容，默认空字符串。 */
  initialValue?: string
}

/** `createPreview()` 返回的预览实例。 */
export interface PreviewInstance {
  /** 预览面板的根元素。 */
  readonly element: HTMLElement
  /** 渲染 Markdown 内容的容器（就是 `.md-preview` 那个节点）。 */
  readonly content: HTMLElement
  /** 用新的 Markdown 内容刷新面板；内容没变化时是空操作。 */
  update(markdown: string): void
  /** 取回当前已渲染的 HTML。 */
  getHTML(): string
  /** 切换主题；传 `false` 表示移除已注入的样式。 */
  setTheme(theme: string | false): void
  /** 移除面板内容，并清掉本实例注入的样式与监听。 */
  destroy(): void
}
