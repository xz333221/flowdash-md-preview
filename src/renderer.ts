import MarkdownIt, { type Options as MarkdownItOptions } from 'markdown-it'
import hljs from 'highlight.js/lib/common'
import type Token from 'markdown-it/lib/token.mjs'
import { DEFAULT_CLASS } from './theme'
import type { Heading, HighlightCode, MarkdownPlugin, RenderOptions, RenderResult } from './types'

/**
 * 开箱即用的代码高亮器。使用 common 构建只注册常见语言，体积比完整语言
 * 集合小；不识别的语言安全回退为纯文本。
 */
export const highlightCode: HighlightCode = (code, language) => {
  const normalized = language.trim().split(/\s+/)[0] || 'plaintext'
  const validLanguage = hljs.getLanguage(normalized) ? normalized : 'plaintext'
  try {
    return hljs.highlight(code, { language: validLanguage, ignoreIllegals: true }).value
  } catch {
    return hljs.highlight(code, { language: 'plaintext' }).value
  }
}

/** 把简化选项翻译成 markdown-it 的原始配置。 */
function toMarkdownItOptions(options: RenderOptions): MarkdownItOptions {
  return {
    // 关闭内联 HTML 是防 XSS 的第一道闸门，默认必须为 false。
    html: options.html ?? false,
    breaks: options.breaks ?? true,
    linkify: options.linkify ?? true,
    typographer: options.typographer ?? false,
    highlight: options.highlight ?? highlightCode,
    ...(options.markdownItOptions as MarkdownItOptions | undefined)
  }
}

function applyPlugins(md: MarkdownIt, plugins: MarkdownPlugin[] | undefined): void {
  for (const plugin of plugins ?? []) {
    if (typeof plugin === 'function') {
      md.use(plugin)
    } else {
      const [fn, ...args] = plugin
      md.use(fn, ...args)
    }
  }
}

/**
 * 给 GFM 任务列表补上 checkbox。markdown-it 本身只把 `[x]` 当普通文本，
 * 这里在 inline token 阶段改写，因此不会引入第二个 Markdown 解析器。
 */
function applyTaskLists(md: MarkdownIt, enabled: boolean): void {
  if (!enabled) return
  const addClass = (token: Token, className: string): void => {
    const classes = (token.attrGet('class') ?? '').split(/\s+/).filter(Boolean)
    if (!classes.includes(className)) classes.push(className)
    token.attrSet('class', classes.join(' '))
  }
  md.core.ruler.push('flowdash-task-lists', (state) => {
    let currentList: Token | undefined
    for (const token of state.tokens) {
      if (token.type === 'bullet_list_open' || token.type === 'ordered_list_open') {
        currentList = token
        continue
      }
      if (token.type === 'bullet_list_close' || token.type === 'ordered_list_close') {
        currentList = undefined
        continue
      }
      if (token.type !== 'list_item_open') continue

      const inline = state.tokens[state.tokens.indexOf(token) + 2]
      const first = inline?.type === 'inline' ? inline.children?.[0] : undefined
      if (!inline || inline.type !== 'inline' || !first || first.type !== 'text') continue
      const match = first.content.match(/^\[([ xX])\]\s+/)
      if (!match) continue

      first.content = first.content.slice(match[0].length)
      // 不从 markdown-it 的内部模块实例化 Token，保证 CJS 包在 Node 18
      // 以及浏览器原生 ESM 中都不需要额外的 .mjs 子路径导入。
      const checkbox = {
        type: 'html_inline',
        tag: '',
        attrs: null,
        map: null,
        nesting: 0,
        level: inline.level,
        children: null,
        content: `<input class="md-task-checkbox" type="checkbox" disabled${match[1].toLowerCase() === 'x' ? ' checked' : ''}> `,
        markup: '',
        info: '',
        meta: null,
        block: false,
        hidden: false
      } as unknown as Token
      inline.children = [checkbox, ...(inline.children ?? [])]
      addClass(token, 'task-list-item')
      if (currentList) {
        addClass(currentList, 'contains-task-list')
      }
    }
  })
}

/** 读取实际展示的标题文字，忽略强调、链接等 Markdown 标记。 */
function inlineText(tokens: Token[]): string {
  return tokens.map((token) => {
    if (token.type === 'softbreak' || token.type === 'hardbreak') return ' '
    if (token.children) return inlineText(token.children)
    if (token.type === 'html_inline' || token.nesting !== 0) return ''
    return token.content
  }).join('')
}

function headingText(tokens: Token[], index: number): string {
  const inline = tokens[index + 1]
  return inline?.type === 'inline' ? inlineText(inline.children ?? []).trim() : ''
}

function slugify(text: string): string {
  return text.toLowerCase().trim()
    .replace(/[^\p{L}\p{N}\p{M}\s_-]/gu, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section'
}

function applyHeadingIds(md: MarkdownIt, headingId: RenderOptions['headingId']): void {
  if (!headingId) return
  md.core.ruler.push('flowdash-heading-ids', (state) => {
    // 每份文档独立计数；保留插件已经分配的 ID，避免自动 ID 与它们碰撞。
    const used = new Set(state.tokens
      .filter((token) => token.type === 'heading_open')
      .map((token) => token.attrGet('id'))
      .filter((id): id is string => !!id))
    let headingIndex = 0
    state.tokens.forEach((token, index) => {
      if (token.type !== 'heading_open') return
      const currentIndex = headingIndex++
      if (token.attrGet('id')) return
      const text = headingText(state.tokens, index)
      const level = Number(token.tag.slice(1))
      const base = (typeof headingId === 'function'
        ? headingId(text, level, currentIndex).trim()
        : slugify(text)) || 'section'
      let id = base
      let suffix = 2
      while (used.has(id)) id = `${base}-${suffix++}`
      used.add(id)
      token.attrSet('id', id)
    })
  })
}

function wrapHTML(html: string, options: RenderOptions, md: MarkdownIt): string {
  const className = options.className === undefined ? DEFAULT_CLASS : options.className
  return className ? `<div class="${md.utils.escapeHtml(className)}">${html}</div>` : html
}

/**
 * 创建一个配置好的 markdown-it 实例。
 * 需要深度定制（自定义 rule、自定义 renderer）时用这个。
 */
export function createRenderer(options: RenderOptions = {}): MarkdownIt {
  const md = new MarkdownIt(toMarkdownItOptions(options))
  applyPlugins(md, options.plugins)
  applyTaskLists(md, options.taskLists ?? true)
  applyHeadingIds(md, options.headingId)
  return md
}

/**
 * 把 Markdown 渲染成 HTML 字符串。
 *
 * ```ts
 * render('# hi')            // => '<div class="md-preview"><h1>hi</h1>\n</div>'
 * render('# hi', { className: false }) // => '<h1>hi</h1>\n'
 * ```
 */
export function render(markdown: string, options: RenderOptions = {}): string {
  const md = createRenderer(options)
  const html = md.render(markdown ?? '')
  return wrapHTML(html, options, md)
}

/** 渲染 HTML 并提取目录；默认生成唯一标题 ID，方便跳转。 */
export function renderWithMetadata(markdown: string, options: RenderOptions = {}): RenderResult {
  const md = createRenderer({ ...options, headingId: options.headingId ?? true })
  const env = {}
  const tokens = md.parse(markdown ?? '', env)
  const headings: Heading[] = []
  tokens.forEach((token, index) => {
    if (token.type !== 'heading_open') return
    headings.push({
      level: Number(token.tag.slice(1)),
      text: headingText(tokens, index),
      id: token.attrGet('id') ?? ''
    })
  })
  const html = md.renderer.render(tokens, md.options, env)
  return { html: wrapHTML(html, options, md), headings }
}

/**
 * 把 Markdown 渲染成一个新的 DOM 元素。
 * 浏览器里直接调用；SSR / Node 场景请用 `render()` 拿字符串。
 *
 * className: false 时返回无 class 的 div 容器，保留所有顶层节点。
 * @param doc 目标文档，默认取全局 `document`（便于测试时注入 jsdom）。
 */
export function renderToElement(
  markdown: string,
  options: RenderOptions = {},
  doc?: Document
): HTMLElement {
  const document_ = doc ?? (globalThis as { document?: Document }).document
  if (!document_) {
    throw new Error('[flowdash-md-preview] 当前环境没有 document，请改用 render() 拿 HTML 字符串。')
  }
  const container = document_.createElement('div')
  container.innerHTML = render(markdown, options)
  if (options.className === false || options.className === '') return container
  return (container.firstElementChild as HTMLElement | null) ?? container
}
