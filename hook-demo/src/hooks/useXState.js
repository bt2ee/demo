import { useEffect, useRef, useState } from "react";

// 支持 setState 后回调函数
const useXState = (initState) => {
  const [state, setState] = useState(initState);
  let isUpdate = useRef();
  const setXState = (state, cb) => {
    isUpdate.current = cb;
    setState(state);
  };
  useEffect(() => {
    if (isUpdate.current) {
      isUpdate.current(state);
      isUpdate.current = null;
    }
  }, [state]);
  return [state, setXState];
};

export default useXState;
