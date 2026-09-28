import { render } from './renderer'
import { DEFAULT_CLASS, DEFAULT_THEME, THEME_ATTR } from './theme'
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
  content.className = DEFAULT_CLASS
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
    if (themeEl) {
      themeEl.remove()
      themeEl = null
    }
    if (theme === false) return
    themeEl = doc.createElement('style')
    themeEl.setAttribute(THEME_ATTR, '')
    themeEl.textContent = theme
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
