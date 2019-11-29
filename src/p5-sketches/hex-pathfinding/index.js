import World from './world'

let p5 = null
let world = null

function sketch(p) {
  p5 = p

  p5.setup = function() {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.background(125)

    world = new World()

    canvas.mouseClicked(onClickCanvas)
  }

  p5.draw = function() {
    world.display()
  }
}

function onClickCanvas() {
  let mousePosition = { x: p5.mouseX, y: p5.mouseY }

  world.selectCell(mousePosition)
}

export default sketch
export { p5 }
