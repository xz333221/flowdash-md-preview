import { describe, expect, it } from 'vitest'
import { createRenderer, render, renderToElement } from '../src/index'

describe('render()', () => {
  it('默认包一层 .md-preview', () => {
    const html = render('# hi')
    expect(html).toContain('<div class="md-preview">')
    expect(html).toContain('<h1>hi</h1>')
  })

  it('className: false 时不套包裹层', () => {
    expect(render('# hi', { className: false })).toBe('<h1>hi</h1>\n')
  })

  it('默认把单个换行渲染成 <br>', () => {
    expect(render('a\nb')).toContain('<br>')
    expect(render('a\nb', { breaks: false })).not.toContain('<br>')
  })

  it('默认不解析内联 HTML（防 XSS）', () => {
    const html = render('<script>alert(1)</script>')
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('显式开启 html 后才允许内联 HTML', () => {
    expect(render('<b>x</b>', { html: true })).toContain('<b>x</b>')
  })

  it('默认开启 linkify', () => {
    expect(render('see https://example.com')).toContain('href="https://example.com"')
  })

  it('空输入不炸', () => {
    expect(() => render('')).not.toThrow()
  })
})

describe('createRenderer()', () => {
  /** 一个极简插件：把文本里的 from 换成 to（用来验证 plugins 真的生效）。 */
  const replaceText = (md: any, from = '!!', to = '！') => {
    md.core.ruler.push('replace-text', (state: any) => {
      for (const token of state.tokens) {
        for (const child of token.children ?? []) {
          if (child.type === 'text') child.content = child.content.split(from).join(to)
        }
      }
      return true
    })
  }

  it('支持函数形式的插件', () => {
    const md = createRenderer({ plugins: [replaceText] })
    expect(md.render('hello!!')).toContain('hello！')
  })

  it('支持 [插件, ...参数] 形式', () => {
    const md = createRenderer({ plugins: [[replaceText, '**', '★']] })
    expect(md.render('a**b')).toContain('a★b')
  })
})

describe('renderToElement()', () => {
  it('返回真实 DOM 节点', () => {
    const el = renderToElement('# hi')
    expect(el.tagName).toBe('DIV')
    expect(el.className).toBe('md-preview')
    expect(el.querySelector('h1')?.textContent).toBe('hi')
  })
})
