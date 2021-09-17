import { useEffect } from 'react'

// 定义 document.title
const useTitle = (title) => {
    useEffect(() => {
      document.title = title
    }, [])

    return
  }

export default useTitle
