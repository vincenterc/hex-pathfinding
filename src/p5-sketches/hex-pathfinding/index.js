import World from './world'

export default function sketch(p) {
  let world = new World()

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(125)
  }

  p.draw = function() {
    world.display(p)
  }
}
