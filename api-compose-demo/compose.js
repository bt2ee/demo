function ApiCompose() {
  // todo 如果不是 new，throw Error
  const apiCompose = []
  const use = function (fn) {
    if(Array.isArray(fn)) {
      apiCompose.push(...fn)
    } else {
      apiCompose.push(fn)
    }
  }

  const compose = function(apiCompose) {
    return (ctx, next) => {
      let index = -1
      return dispatch(0)

      function dispatch(i) {
        if(i < index) {
          return Promise.reject(new Error('next() called  multiple times'))
        }
        index = i
        let fn = apiCompose[i]
        if(i === apiCompose.length) next = null
        if(!fn) return Promise.resolve()
        return Promise.resolve(fn(ctx, dispatch.bind(null, i+ 1)))
       }
    }
  }
  const start = function() {
    const fn = compose(apiCompose)
    fn(1)
  }
  return {use, start}
}

export default ApiCompose
