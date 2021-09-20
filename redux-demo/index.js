import { connect, Provider } from "react-redux";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

function numberRedux(state = 1, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "DEL":
      return state - 1;
    default:
      return state;
  }
}

function infoReduce(state = {}, action) {
  const { payload = {} } = action;
  console.log(payload, action, state);
  switch (action.type) {
    case "SET":
      return {
        ...state,
        payload
      };
    default:
      return state;
  }
}

function logMiddleware() {
  return (next) => {
    return (action) => {
      const { type } = action;
      console.log("发生 action", type);
      return next(action);
    };
  };
}

const initState = { number: 1, info: { name: null } };
const rootMiddleware = applyMiddleware(logMiddleware);
const rootReducer = combineReducers({ number: numberRedux, info: infoReduce });
const store = createStore(rootReducer, initState, rootMiddleware);

/* A组件 */
function ComponentA({ toCompB, compBSay }) {
  const [CompASay, setCompASay] = useState("");
  return (
    <div className="box">
      <p>我是组件A</p>
      <div> B组件对我说：{compBSay} </div>
      我对B组件说：
      <input
        onChange={(e) => setCompASay(e.target.value)}
        placeholder="CompASay"
      />
      <button onClick={() => toCompB(CompASay)}>确定</button>
    </div>
  );
}

const CompAMapStateProps = (state) => ({ compBSay: state.info.compBSay });
const compAMapDispatchToProps = (dispatch) => ({
  toCompB: (mes) => dispatch({ type: "SET", payload: { CompASay: mes } })
});

export const CompA = connect(
  CompAMapStateProps,
  compAMapDispatchToProps
)(ComponentA);

/* B组件 */
class ComponentB extends React.Component {
  state = { compBSay: "" };
  handleToA = () => {
    console.log(this.props);
    this.props.dispatch({
      type: "SET",
      payload: { compBSay: this.state.compBSay }
    });
  };
  render() {
    return (
      <div className="box">
        <p>我是组件B</p>
        <div> A组件对我说：{this.props.compASay} </div>
        我对A组件说：
        <input
          onChange={(e) => this.setState({ compBSay: e.target.value })}
          placeholder="CompBSay"
        />
        <button onClick={this.handleToA}>确定</button>
      </div>
    );
  }
}

const CompBMapStateToProps = (state) => ({ compASay: state.info.compASay });
export const CompB = connect(CompBMapStateToProps)(ComponentB);

function Index() {
  return (
    <div>
      <CompA />
      <CompB />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
