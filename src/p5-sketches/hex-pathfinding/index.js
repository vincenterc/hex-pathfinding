import World from './world'

let p5 = null

export default function sketch(p) {
  p5 = p
  let world = new World()

  p5.setup = function() {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.background(125)
  }

  p5.draw = function() {
    world.display()
  }
}

export { p5 }
