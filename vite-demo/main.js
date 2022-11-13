// import { count } from './counter'
// import './variable.css'
// import './componentA'
// import './index.css'

import './src/imageLoader'
import './src/svgLoader'
import { name } from '@assets/json/index.json'

// vite 支持解析 json，便于 tree shaking
console.log(name, '==== json')

fetch("/api/users", {
  method: "post"
}).then(data => {
  console.log("data", data);
}).catch(error => {
  console.log("error", error);
})
