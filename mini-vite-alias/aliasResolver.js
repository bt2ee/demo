module.exports = function(aliasConf, JSContent) {
  const entires = Object.entries(aliasConf)
  console.log(entires, '=== entries')
  let lastContent = JSContent
  entires.forEach(entire =>{
    const [alia, path] = entire
    // vite 会做相对路径的处理
    const srcIndex = path.indexOf('/src')
    const realPath = path.slice(srcIndex, path.length)
    lastContent = JSContent.replace(alia, realPath)
    console.log(realPath, '++++ realPath')
  })
  console.log(lastContent, '=== lastContent')
  return lastContent
}
