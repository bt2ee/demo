const fs = require('fs')
const path = require('path')
export default (options) => {
  return {
    configureServer(server) {
      const mockStat = fs.statSync('mock')
      const isDirectory = mockStat.isDirectory()
      let mockResult = []
      if(isDirectory) {
        mockResult = require(path.resolve(process.cwd(), "mock/index.js"))
      }
      server.middlewares.use((req, res, next) => {
        const matchItem = mockResult.find(item => item.url === req.url)

        if(matchItem) {
          const responseData = matchItem.response(req)
          console.log('进来了responseData', responseData)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(responseData))
        } else {
          next()
        }
      })
    }
  }
}
