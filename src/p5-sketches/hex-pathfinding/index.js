import World from './world'

let p5 = null
let world = null
let isMapEditing = false

function sketch(p) {
  p5 = p

  p5.setup = function() {
    createPanel()
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.background(125)

    world = new World()

    canvas.mouseClicked(onMouseClickCanvas)
  }

  p5.draw = function() {
    world.display()
  }
}

function createPanel() {
  // Information p
  let normalInformation =
    'LEFT CLICK to set start cell\nSHIFT + LEFT CLICK to set end cell'
  let editModeInformation =
    'LEFT CLICK to edit cells\nWATER BLUE is the river\nBLACK is the wall'
  let informationP = p5.createP(normalInformation)
  informationP.position(10, 35)
  informationP.style('color', '#333')
  informationP.style('font-weight', 'bold')
  informationP.style('text-shadow', '1px 1px #999')
  informationP.style('white-space', 'pre-wrap')
  informationP.style('pointer-events', 'none')

  // Edit button
  let editButton = p5.createButton('EDIT MAP')
  editButton.position(10, 10)
  editButton.style('width', '70px')
  editButton.style('height', '24px')
  editButton.style('border-radius', '5px')
  editButton.style('font-size', '12px')
  editButton.mouseClicked(() => {
    if (isMapEditing) {
      isMapEditing = false
      editButton.html('EDIT MAP')
      informationP.html(normalInformation)
    } else {
      isMapEditing = true
      editButton.html('BACK')
      informationP.html(editModeInformation)
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
