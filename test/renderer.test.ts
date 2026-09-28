import { describe, expect, it } from 'vitest'
import { createRenderer, render, renderToElement, renderWithMetadata } from '../src/index'

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

  it('默认把 GFM 任务列表渲染成只读 checkbox', () => {
    const html = render('- [x] done\n- [ ] todo')
    expect(html).toContain('class="contains-task-list"')
    expect(html).toContain('type="checkbox" disabled checked')
    expect(html).toContain('type="checkbox" disabled> todo')
  })

  it('可以通过 highlight 回调接入外部代码高亮器', () => {
    const html = render('```ts\nconst answer = 42\n```', {
      highlight: (code, language) => `<mark data-language="${language}">${code}</mark>`
    })
    expect(html).toContain('<mark data-language="ts">const answer = 42\n</mark>')
  })

  it('默认高亮常见代码语言', () => {
    const html = render('```ts\nconst answer = 42\n```')
    expect(html).toContain('<span class="hljs-keyword">const</span>')
    expect(html).toContain('<span class="hljs-number">42</span>')
  })

  it('空输入不炸', () => {
    expect(() => render('')).not.toThrow()
  })

  it('自定义 class 作为属性值输出', () => {
    const className = 'article" data-extra="yes & more'
    const element = renderToElement('hello', { className })
    expect(element.className).toBe(className)
    expect(element.hasAttribute('data-extra')).toBe(false)
  })

  it('可以显式为普通渲染开启标题 ID', () => {
    expect(render('# Hello world', { headingId: true })).toContain('<h1 id="hello-world">')
  })
})

describe('renderWithMetadata()', () => {
  it('提取标题的文字、层级和中文锚点', () => {
    const result = renderWithMetadata('# **你好** `Markdown`\n\n### [安装](https://example.com)')
    expect(result.headings).toEqual([
      { level: 1, text: '你好 Markdown', id: '你好-markdown' },
      { level: 3, text: '安装', id: '安装' }
    ])
    expect(result.html).toContain('<h1 id="你好-markdown">')
    expect(result.html).toContain('<h3 id="安装">')
  })

  it('重复标题和带数字后缀的标题不会使用相同的 ID', () => {
    const result = renderWithMetadata('# Guide\n\n# Guide\n\n# Guide-2\n\n# !!!\n\n# ???')
    expect(result.headings.map((heading) => heading.id)).toEqual([
      'guide', 'guide-2', 'guide-2-2', 'section', 'section-2'
    ])
  })

  it('支持自定义生成规则并自动处理重复 ID', () => {
    const inputs: unknown[] = []
    const result = renderWithMetadata('# One\n\n## Two', {
      headingId: (text, level, index) => {
        inputs.push([text, level, index])
        return 'chapter'
      }
    })
    expect(inputs).toEqual([['One', 1, 0], ['Two', 2, 1]])
    expect(result.headings.map((heading) => heading.id)).toEqual(['chapter', 'chapter-2'])
  })

  it('可显式关闭自动 ID，同时继续提取标题', () => {
    const result = renderWithMetadata('# hello', { headingId: false, className: false })
    expect(result).toEqual({
      html: '<h1>hello</h1>\n',
      headings: [{ level: 1, text: 'hello', id: '' }]
    })
  })

  it('提取图片替代文字，但不把内联 HTML 标签当成标题文字', () => {
    const result = renderWithMetadata('# <b>Hello</b> ![small **image**](image.png)', { html: true })
    expect(result.headings[0].text).toBe('Hello small image')
  })

  it('保留插件已经设置的 ID，生成的 ID 避开这些锚点', () => {
    const result = renderWithMetadata('# Reserved\n\n# Custom', {
      plugins: [(md) => {
        md.core.ruler.push('custom-heading', (state: any) => {
          state.tokens.find((token: any) => token.type === 'heading_open' && token.map?.[0] === 2)
            .attrSet('id', 'reserved')
        })
      }]
    })
    expect(result.headings.map((heading) => heading.id)).toEqual(['reserved-2', 'reserved'])
  })

  it('没有标题时返回空目录', () => {
    expect(renderWithMetadata('just text').headings).toEqual([])
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

  it('复用 renderer 时，每份文档独立生成标题 ID', () => {
    const md = createRenderer({ headingId: true })
    const first = md.render('# Same\n\n# Same')
    expect(md.render('# Same\n\n# Same')).toBe(first)
    expect(first).toContain('id="same-2"')
  })
})

describe('renderToElement()', () => {
  it('返回真实 DOM 节点', () => {
    const el = renderToElement('# hi')
    expect(el.tagName).toBe('DIV')
    expect(el.className).toBe('md-preview')
    expect(el.querySelector('h1')?.textContent).toBe('hi')
  })

  it('关闭包裹 class 时，保留所有顶层节点', () => {
    const el = renderToElement('# First\n\nSecond\n\n- Third', { className: false })
    expect(el.tagName).toBe('DIV')
    expect(el.className).toBe('')
    expect(Array.from(el.children, (child) => child.tagName)).toEqual(['H1', 'P', 'UL'])
    expect(el.textContent).toContain('Third')
  })
})
