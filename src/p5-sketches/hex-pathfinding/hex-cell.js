import HexMetrics from './hex-metrics'
import Vector2 from './vector2'
import HexCoordinates from './hex-coordinates'
import { p5 } from './index'

class HexCell {
  constructor(x, y) {
    this.position = new Vector2(
      HexMetrics.innerRadius +
        x * 2 * HexMetrics.innerRadius +
        (y & 1) * HexMetrics.innerRadius,
      HexMetrics.outerRadius + y * 1.5 * HexMetrics.outerRadius
    )
    this.coordinates = new HexCoordinates(x - Math.floor(y / 2), y)

    this.displayCoordinates()
  }

  display = () => {
    p5.strokeWeight(3)
    p5.stroke(0)
    p5.fill(255)
    p5.beginShape()
    for (let i = 0; i < HexMetrics.corners.length; i++) {
      let position = HexMetrics.corners[i].clone().add(this.position)
      p5.vertex(position.x, position.y)
    }
    p5.endShape(p5.CLOSE)
  }

  displayCoordinates = () => {
    let text = p5.createP(
      `${this.coordinates.X}\n${this.coordinates.Y}\n${this.coordinates.Z}`
    )
    text.position(this.position.x, this.position.y)
    text.style('transform', 'translate(-50%, -50%)')
    text.style('font-size', '12px')
    text.style('white-space', 'pre-wrap')
    text.style('text-align', 'center')
  }
}

export default HexCell
