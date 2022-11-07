// import { count } from './counter'
// import './variable.css'
// import './componentA'
// import './index.css'

import './src/imageLoader'
import './src/svgLoader'
import { name } from './src/assets/json/index.json'

// vite 支持解析 json，便于 tree shaking
console.log(name, '==== json')
