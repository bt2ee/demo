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
      return dispatch(0);
      function dispatch(i) {
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
