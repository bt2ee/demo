// vite 插件最后需要返回一个配置对象，vite 会进行合并
const fs = require('fs')
const path = require('path')

function diffDirAndFile(dirFilesArr = [], basePath = '') {
  const result = {
    dirs: [],
    files: []
  }
  dirFilesArr.forEach(name => {
    const currentFileStat = fs.statSync(path.resolve(__dirname, basePath + '/' + name))
    const isDirectory = currentFileStat.isDirectory()
    if(isDirectory) {
      result.dirs.push(name)
    } else {
      result.files.push(name)
    }
  })

  return result
 }

function getTotalDir(keyName) {
  const result = fs.readdirSync(path.resolve(__dirname, '../src'))
  const diffResult = diffDirAndFile(result, '../src')
  const resolveAliasesObj = {} // 别名配置
  diffResult.dirs.forEach(dirname => {
    const key = `${keyName}${dirname}`
    const absPath = path.resolve(__dirname, '../src' + '/' + dirname)
    resolveAliasesObj[key] = absPath
  })
  return resolveAliasesObj
}

module.exports = ({
  keyName = '@'
} = {}) => {
  return {
    config: () => {
      // env: mode: string, command: string
      const resolveAliasesObj = getTotalDir(keyName)
      return {
        // 返回一个 resolve 出去
        resolve: {
          alias: resolveAliasesObj
        }
      }
    }
  }
}
