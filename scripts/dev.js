const { exec } = require('child_process')
const os = require('os')

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
console.log(`Application will be running at http://${ip}:3000`)
console.log('Application will be running at http://localhost:3000')
console.log('Press Ctrl+C to stop the server')
exec('pnpm next dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.log(stdout)
  console.error(stderr)
})
