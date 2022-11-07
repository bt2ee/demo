import svgIcon from './assets/svgs/fullScreen.svg'
import svgRaw from './assets/svgs/fullScreen.svg?raw'

// const img = document.createElement('img')

// img.src = svgIcon

// document.body.appendChild(img)

document.body.innerHTML = svgRaw

const svgElement = document.getElementsByTagName("svg")[0]

svgElement.onmouseenter = function () {
  this.style.fill = 'red'
}
