function createStore(initState, reduce) {
  let state = initState;
  let listeners = [];
  function subscribe(listener) {
    if (typeof listener === "function") {
      listeners.push(listener);
    }
  }
  function dispatch(action) {
    state = reduce(state, action());
    listeners.forEach((func) => func());
  }
  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState
  };
}

const ADD_COUNT = "ADD_COUNT";

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        count: state.count + 1
      };
    default:
      return state;
  }
}

const initState = {
  user: "David"
};

const store = createStore(initState, reducer);

store.subscribe(() => {
  let state = store.getState();
  console.log(`${state.user.name}: ${state.user.age}`);
});

store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter?.count);
  console.log(state, "=== state");
});

const ADD = "ADD";

function add() {
  return {
    type: ADD
  };
}

store.dispatch(add())
