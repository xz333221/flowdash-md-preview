import MarkdownIt, { type Options as MarkdownItOptions } from 'markdown-it'
import { DEFAULT_CLASS } from './theme'
import type { MarkdownPlugin, RenderOptions } from './types'

/** 把简化选项翻译成 markdown-it 的原始配置。 */
function toMarkdownItOptions(options: RenderOptions): MarkdownItOptions {
  return {
    // 关闭内联 HTML 是防 XSS 的第一道闸门，默认必须为 false。
    html: options.html ?? false,
    breaks: options.breaks ?? true,
    linkify: options.linkify ?? true,
    typographer: options.typographer ?? false,
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
 * 创建一个配置好的 markdown-it 实例。
 * 需要深度定制（自定义 rule、自定义 renderer）时用这个。
 */
export function createRenderer(options: RenderOptions = {}): MarkdownIt {
  const md = new MarkdownIt(toMarkdownItOptions(options))
  applyPlugins(md, options.plugins)
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
  const className = options.className === undefined ? DEFAULT_CLASS : options.className
  return className ? `<div class="${className}">${html}</div>` : html
}

/**
 * 把 Markdown 渲染成一个新的 DOM 元素。
 * 浏览器里直接调用；SSR / Node 场景请用 `render()` 拿字符串。
 *
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
  return (container.firstElementChild as HTMLElement | null) ?? container
}
