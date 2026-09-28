import { render } from './renderer'
import {
  DEFAULT_CLASS,
  DEFAULT_THEME,
  PREVIEW_SCOPE_ATTR,
  THEME_ATTR,
  resolveTheme
} from './theme'
import type { PreviewInstance, PreviewOptions } from './types'

function resolveElement(target: string | HTMLElement, doc: Document): HTMLElement {
  if (typeof target !== 'string') return target
  const found = doc.querySelector<HTMLElement>(target)
  if (!found) {
    throw new Error(`[flowdash-md-preview] 找不到挂载节点：${target}`)
  }
  return found
}

/**
 * 在一个容器里挂一块 Markdown 预览面板，返回可增量刷新的实例。
 *
 * ```ts
 * const preview = createPreview('#preview')
 * preview.update('# Hello\n\nworld')
 * // 用完记得 preview.destroy()
 * ```
 */
export function createPreview(
  target: string | HTMLElement,
  options: PreviewOptions = {}
): PreviewInstance {
  const doc = typeof target === 'string' ? globalThis.document : target.ownerDocument
  if (!doc) {
    throw new Error('[flowdash-md-preview] createPreview() 只能在有 DOM 的环境里使用。')
  }

  const element = resolveElement(target, doc)

  // 预览内容的实际容器：update() 只动这一层，不碰使用方自己的节点。
  const content = doc.createElement('div')
  const customClass = typeof options.className === 'string' ? options.className.trim() : ''
  content.className = [DEFAULT_CLASS, customClass].filter(Boolean).join(' ')
  const scopeId = `preview-${Math.random().toString(36).slice(2, 10)}`
  content.setAttribute(PREVIEW_SCOPE_ATTR, scopeId)
  if (options.scrollable !== false) {
    content.style.overflow = 'auto'
    content.style.height = '100%'
  }
  element.appendChild(content)

  let themeEl: HTMLStyleElement | null = null
  let currentMarkdown: string | null = null
  let currentHTML = ''
  let destroyed = false

  function setTheme(theme: string | false): void {
    if (destroyed) return
    if (themeEl) {
      themeEl.remove()
      themeEl = null
    }
    if (theme === false) return
    const preset = resolveTheme(theme)
    const css = preset ?? theme
    // 主题 CSS 只要引用了 .md-preview，就自动限制到当前实例，避免多个
    // 预览面板最后注入的主题覆盖前一个面板。
    const scope = `[${PREVIEW_SCOPE_ATTR}="${scopeId}"].${DEFAULT_CLASS}`
    themeEl = doc.createElement('style')
    themeEl.setAttribute(THEME_ATTR, '')
    // 保留直接传入 DEFAULT_THEME / 自定义 CSS 时的旧行为；使用预设名称时
    // 采用实例作用域，既兼容已有代码，也让主题选择器可以安全地多开面板。
    themeEl.textContent = preset !== undefined && theme !== DEFAULT_THEME
      ? css.split(`.${DEFAULT_CLASS}`).join(scope)
      : css
    doc.head.appendChild(themeEl)
  }

  function update(markdown: string): void {
    if (destroyed) return
    const next = markdown ?? ''
    if (next === currentMarkdown) return
    currentMarkdown = next
    currentHTML = render(next, {
      ...options,
      // 包裹层已经由 content 承担，这里不要重复套一层 div。
      className: false
    })
    content.innerHTML = currentHTML
  }

  function destroy(): void {
    if (destroyed) return
    destroyed = true
    currentMarkdown = null
    currentHTML = ''
    content.innerHTML = ''
    content.remove()
    if (themeEl) {
      themeEl.remove()
      themeEl = null
    }
  }

  setTheme(options.theme === undefined ? DEFAULT_THEME : options.theme)
  update(options.initialValue ?? '')

  return {
    element,
    content,
    update,
    getHTML: () => currentHTML,
    setTheme,
    destroy
  }
}
