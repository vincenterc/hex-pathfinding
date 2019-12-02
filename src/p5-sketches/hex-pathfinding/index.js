import World from './world'

let p5 = null
let world = null
let isMapEditing = false

function sketch(p) {
  p5 = p

  p5.setup = function() {
    createEditMapButton()
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.background(125)

    world = new World()

    canvas.mouseClicked(onMouseClickCanvas)
  }

  p5.draw = function() {
    world.display()
  }
}

function createEditMapButton() {
  let button = p5.createButton('EDIT MAP')
  button.position(10, 10)
  button.style('width', '70px')
  button.style('height', '24px')
  button.style('border-radius', '5px')
  button.style('font-size', '12px')
  button.mouseClicked(() => {
    if (isMapEditing) {
      isMapEditing = false
      button.html('EDIT MAP')
    } else {
      isMapEditing = true
      button.html('BACK')
    }
  })
}

function onMouseClickCanvas() {
  if (isMapEditing) {
    world.setCell({ x: p5.mouseX, y: p5.mouseY })
  } else {
    world.selectCell({ x: p5.mouseX, y: p5.mouseY })
  }
}

export default sketch
export { p5 }
