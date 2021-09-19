class Koa {
  constructor() {
    this.middleware = [];
  }
  use(fn) {
    this.middleware.push(fn);
    return this;
  }
  compose(middleware) {
    return (ctx, next) => {
      let index = -1;
      return dispatch(0);
      function dispatch(i) {
        //这里的i 是标识 我即将要去执行哪一个中间件  而 index 是标识 我上一次执行的是哪一个中间件
        //当 i <= index 时意味着我即将要去执行我已经执行过的中间件，这是违背洋葱模型的本质的，这时将会报错为 next 函数被调用执行多次
        if (i <= index)
          return Promise.reject(new Error("next() called multiple times"));
        index = i; // 更换辨识
        let fn = middleware[i];
        if (i === middleware.length) next = null;
        if (!fn) return Promise.resolve();
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      }
    };
  }
  test() {
    const fn = this.compose(this.middleware);
    fn(1);
  }
}

const app = new Koa();
app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(2);
});

// 中间件2
app.use(async (ctx, next) => {
  console.log(3);
  await next();
  console.log(4);
});

app.test();
