import { useState, useEffect } from "react";

// 返回滚动位置的变化
const useScroll = (scrollRef) => {
  const [pos, setPos] = useState([0, 0]);

  useEffect(() => {
    function handleScroll(e) {
      setPos([scrollRef.current.scrollLeft, scrollRef.current.scrollTop]);
    }
    scrollRef.current.addEventListener("scroll", handleScroll, false);
    return () => {
      scrollRef.current.removeEventListener("scroll", handleScroll, false);
    };
  }, []);

  return pos;
};

export default useScroll;
