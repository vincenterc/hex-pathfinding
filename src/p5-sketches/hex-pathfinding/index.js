import World from './world'
import HexCoordinates from './hex-coordinates'
import HexMetrics from './hex-metrics'

let p5 = null
let world = null

function sketch(p) {
  p5 = p
  world = new World()

  p5.setup = function() {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
    canvas.mouseClicked(onClickCanvas)

    p5.background(125)
  }

  p5.draw = function() {
    world.display()
  }
}

function onClickCanvas() {
  selectCell()
}

const selectCell = (function() {
  let cellSelected = null

  return function() {
    if (cellSelected) cellSelected.color = '#fff'

    let mousePosition = {
      x: p5.mouseX - HexMetrics.innerRadius,
      y: p5.mouseY - HexMetrics.outerRadius,
    }
    let hexCoordinates = HexCoordinates.fromPosition(mousePosition)

    cellSelected = world.map.cells[hexCoordinates.x][hexCoordinates.y]
    if (cellSelected) cellSelected.color = '#decc9c'
  }
})()

export default sketch
export { p5 }
