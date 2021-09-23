// 中间件机制就是为了截获 action 对其进行修改
// 通过包装使 middleware 串联组合执行

let store = createStore(initState, reducer);
let next = store.dispatch;
const loggerMiddleware = function (next) {
  return function (action) {
    console.log("this state", store.getState());
    console.log("action", action);
    next(action);
    console.log("next state", store.getState());
  };
};
const exceptionMiddleware = function (next) {
  return function (action) {
    try {
      next(action);
    } catch (err) {
      console.error("错误报告: ", err);
    }
  };
};
//重写dispatch方法，依次调用完中间件逻辑后，最后再触发真正的action
store.dispatch = exceptionMiddleware(loggerMiddleware(next));

const ADD = "ADD";

function add() {
  return {
    type: ADD
  };
}

store.dispatch(add());
console.log(store.getState());
