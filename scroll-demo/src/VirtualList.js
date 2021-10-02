import { useEffect, useRef, useState } from "react";

const list = {
  listStyle: "none",
  backgroundColor: "#fc4838",
  padding: "10px 20px",
  color: "#fff",
  height: "50px",
  lineHeight: "50px",
  boxSizing: "border-box",
  marginBottom: "10px",
  marginLeft: "24px",
  marginRight: "24px",
  fontWeight: "bold",
  borderRadius: "10px"
};

const list_box = {
  position: "fixed",
  left: 0,
  top: "60px",
  overflow: "scroll",
  bottom: 0,
  right: 0
};

function VirtualList() {
  const [dataList, setDataList] = useState([]);
  const [position, setPosition] = useState([0, 0]);
  const scroll = useRef(null); // 获取 scroll 元素
  const box = useRef(null); // 元素容器高度
  const context = useRef(null); // 移动视图区域
  const scrollInfo = useRef({
    height: 500, // 容器高度
    bufferCount: 8, // 缓冲区个数
    itemHeight: 60, // 每一个 item 高度
    renderCount: 0 // 渲染个数
  });

  useEffect(() => {
    const height = box.current.offsetHeight;
    const { itemHeight, bufferCount } = scrollInfo.current;
    const renderCount = Math.ceil(height / itemHeight) + bufferCount;
    scrollInfo.current = { renderCount, height, bufferCount, itemHeight };
    const dataList = new Array(10000).fill(1).map((item, index) => index + 1);
    setDataList(dataList);
    setPosition([0, renderCount]);
  }, []);

  const handleScroll = () => {
    const { scrollTop } = scroll.current;
    console.log('触发滑动', scrollTop)
    const { itemHeight, renderCount } = scrollInfo.current;
    const currentOffset = scrollTop - (scrollTop % itemHeight);
    console.log(currentOffset, '==== ')
    const start = Math.floor(scrollTop / itemHeight);
    context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`; /* 偏移，造成下滑效果 */
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
    if (end !== position[1] || start !== position[0]) {
      /* 如果render内容发生改变，那么截取  */
      setPosition([start, end]);
    }
  };

  const { itemHeight, height } = scrollInfo.current;
  console.log(position, "position");
  const [start, end] = position;
  const renderList = dataList.slice(start, end);

  return (
    <div ref={box} style={{...list_box}}>
      <div
        style={{...list_box, height: height + "px" }}
        onScroll={handleScroll}
        ref={scroll}
      >
        <div ref={context} style={{border: '1px solid #000'}}>
          {renderList.map((item, index) => (
            <div style={{...list, height: itemHeight}} key={index}>
              {item + " "} Item
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VirtualList;
