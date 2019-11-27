import HexMetrics from './hex-metrics'
import Vector2 from './vector2'
import { p5 } from './index'

class HexCell {
  constructor(x, y) {
    this.position = new Vector2(
      HexMetrics.innerRadius +
        x * 2 * HexMetrics.innerRadius +
        (y & 1) * HexMetrics.innerRadius,
      HexMetrics.outerRadius + y * 1.5 * HexMetrics.outerRadius
    )
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
}

export default HexCell
