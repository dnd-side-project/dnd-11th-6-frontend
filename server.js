const fs = require('fs')
const { createServer: createHttpServer } = require('http')
const { createServer: createHttpsServer } = require('https')
const os = require('os')
const path = require('path')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

function getLocalIpAddress() {
  return (
    Object.values(os.networkInterfaces())
      .flat()
      .find(
        (alias) =>
          alias.family === 'IPv4' &&
          !alias.internal &&
          alias.address !== '127.0.0.1',
      )?.address || '0.0.0.0'
  )
}

const ip = getLocalIpAddress()
const useHttps = process.env.USE_HTTPS === 'true'
const port = process.env.PORT || (dev ? '3000' : '80')

const httpsOptions = useHttps
  ? {
      key: fs.readFileSync(
        path.join(process.cwd(), '_wildcard.get-snappy.co.kr+5-key.pem'),
      ),
      cert: fs.readFileSync(
        path.join(process.cwd(), '_wildcard.get-snappy.co.kr+5.pem'),
      ),
    }
  : {}

app.prepare().then(() => {
  const serverCallback = (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }

  const server = useHttps
    ? createHttpsServer(httpsOptions, serverCallback)
    : createHttpServer(serverCallback)

  server.listen(port, '0.0.0.0', (err) => {
    if (err) throw err
    console.log(`> Ready on ${useHttps ? 'https' : 'http'}://0.0.0.0:${port}`)
    console.log(`> Ready on ${useHttps ? 'https' : 'http'}://localhost:${port}`)
    console.log(`> Ready on ${useHttps ? 'https' : 'http'}://${ip}:${port}`)
    console.log(
      `> Ready on ${useHttps ? 'https' : 'http'}://get-snappy.co.kr:${port}`,
    )
  })
})
