import React, { Suspense } from "react";
import { VueWrapper } from "vuera";

const User = React.lazy(() => import("app1/User"));
const Header = () => import("app3/Header");

let App = () => {
  return (
    <div>
      <h3> webpack2222 </h3>{" "}
      <Suspense fallback={"Loading App 2"}>
        <User />
      </Suspense>{" "}
      <VueWrapper component={Header} />{" "}
    </div>
  );
};
export default App;
