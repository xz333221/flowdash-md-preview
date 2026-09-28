import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_THEME, THEME_ATTR, createPreview } from '../src/index'

let host: HTMLDivElement

beforeEach(() => {
  document.head.innerHTML = ''
  document.body.innerHTML = ''
  host = document.createElement('div')
  host.id = 'preview'
  document.body.appendChild(host)
})

describe('createPreview()', () => {
  it('挂载到选择器指向的节点并渲染初始内容', () => {
    const preview = createPreview('#preview', { initialValue: '# hello' })
    expect(preview.element).toBe(host)
    expect(host.querySelector('h1')?.textContent).toBe('hello')
    expect(preview.getHTML()).toContain('<h1>hello</h1>')
  })

  it('可以直接传元素', () => {
    const preview = createPreview(host)
    preview.update('**bold**')
    expect(host.querySelector('strong')?.textContent).toBe('bold')
  })

  it('默认注入内置主题，setTheme(false) 可移除', () => {
    const preview = createPreview(host)
    expect(document.head.querySelector(`style[${THEME_ATTR}]`)?.textContent).toBe(DEFAULT_THEME)

    preview.setTheme(false)
    expect(document.head.querySelector(`style[${THEME_ATTR}]`)).toBeNull()
  })

  it('自定义主题会被注入', () => {
    createPreview(host, { theme: '.md-preview{color:red}' })
    expect(document.head.querySelector(`style[${THEME_ATTR}]`)?.textContent).toBe(
      '.md-preview{color:red}'
    )
  })

  it('内容没变化时不重建 DOM', () => {
    const preview = createPreview(host, { initialValue: 'a' })
    const node = preview.content.firstElementChild
    preview.update('a')
    expect(preview.content.firstElementChild).toBe(node)
  })

  it('destroy() 清掉内容与样式', () => {
    const preview = createPreview(host, { initialValue: 'a' })
    preview.destroy()
    expect(host.innerHTML).toBe('')
    expect(document.head.querySelector(`style[${THEME_ATTR}]`)).toBeNull()
    // destroy 之后的 update 是空操作
    preview.update('b')
    expect(host.innerHTML).toBe('')
  })

  it('找不到挂载点时报错', () => {
    expect(() => createPreview('#nope')).toThrow(/找不到挂载节点/)
  })
})
