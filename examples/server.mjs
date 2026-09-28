import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const port = Number(process.env.PORT || 4173)
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.cjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
}

function safePath(urlPath) {
  const pathname = decodeURIComponent(urlPath.split('?')[0] || '/')
  const candidate = resolve(root, `.${normalize(pathname)}`)
  return candidate === root || candidate.startsWith(`${root}${sep}`) ? candidate : null
}

const server = createServer((request, response) => {
  try {
    const filePath = safePath(request.url || '/')
    if (!filePath) {
      response.writeHead(403)
      response.end('Forbidden')
      return
    }

    let target = filePath
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html')
    if (!existsSync(target) || !statSync(target).isFile()) {
      response.writeHead(404)
      response.end('Not found')
      return
    }

    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentTypes[extname(target)] || 'application/octet-stream'
    })
    createReadStream(target).pipe(response)
  } catch {
    response.writeHead(400)
    response.end('Bad request')
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`flowdash-md-preview demo: http://127.0.0.1:${port}/examples/index.html`)
  console.log('Press Ctrl+C to stop.')
})
