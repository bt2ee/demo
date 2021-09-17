import { useState } from 'react'

// 组件强行渲染
const useUpdate = () => {
    const [, setFlag] = useState()
    const update = () => {
        setFlag(Date.now())
    }

    return update
  }

export default useUpdate
