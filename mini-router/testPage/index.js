import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, useHistory, useListen, Switch } from "../index";
import Detail from "./Detail"; /* 详情页 */
import Home from "./Home"; /* 首页 */
import List from "./List"; /* 列表页 */

const menusList = [
  {
    name: "首页",
    path: "/home"
  },
  {
    name: "列表",
    path: "/list"
  },
  {
    name: "详情",
    path: "/detail"
  }
];
function Nav() {
  const history = useHistory();
  /* 路由跳转 */
  const RouterGo = (url) => history.push(url);
  const path = history.location.path;
  return (
    <div>
      {menusList.map((item) => (
        <span
          className={`nav ${item.path === path ? "active" : ""}`}
          key={item.path}
          onClick={() => RouterGo(item.path)}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
}

function Top() {
  /* 路由监听 */
  useListen((location) => {
    console.log("当前路由是：", location.pathname);
  });
  console.log(111);
  return <div>--------top------</div>;
}

function App() {
  console.log("根组件渲染");
  return (
    <Router>
      <Top />
      <Nav />
      <Switch>
        <Route component={Home} path="/home"></Route>
        <Route component={Detail} path="/detail" />
        <Route path="/list" render={(props) => <List {...props} />} />
      </Switch>
      <div>--------bottom------</div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))
