class Koa {
  constructor() {
    this.middleware = [];
  }
  use(middleware) {
    this.middleware.push(middleware);
    return this;
  }
  compose(middleware) {
    return function (context, next) {
      let index = -1;
      return dispatch(0);

      function dispatch(i) {
        index = i;
        let fn = middleware[i];
        if (i === middleware.length) next = null;
        if (!fn) return Promise.resolve();

        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      }
    };
  }
  handleRequest(ctx, fnMiddleware) {
    return fnMiddleware(ctx);
  }
  test() {
    const fn = this.compose(this.middleware);
    this.handleRequest(1, fn);
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
