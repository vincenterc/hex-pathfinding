import HexMetrics from './hex-metrics'
import Vector2 from './vector2'

class HexCell {
  constructor(x, y) {
    this.position = new Vector2(
      HexMetrics.innerRadius +
        x * 2 * HexMetrics.innerRadius +
        (y & 1) * HexMetrics.innerRadius,
      HexMetrics.outerRadius + y * 1.5 * HexMetrics.outerRadius
    )
  }

  display = p => {
    p.strokeWeight(3)
    p.stroke(0)
    p.fill(255)
    p.beginShape()
    for (let i = 0; i < HexMetrics.corners.length; i++) {
      let position = HexMetrics.corners[i].clone().add(this.position)
      p.vertex(position.x, position.y)
    }
    p.endShape(p.CLOSE)
  }
}

export default HexCell
