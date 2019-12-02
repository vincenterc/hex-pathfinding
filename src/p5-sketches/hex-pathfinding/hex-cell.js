import HexMetrics from './hex-metrics'
import Vector2 from './vector2'
import HexCoordinates from './hex-coordinates'
import { p5 } from './index'
import HexCellType from './hex-cell-type'

class HexCell {
  constructor(x, y) {
    this.position = new Vector2(
      HexMetrics.innerRadius +
        x * 2 * HexMetrics.innerRadius +
        (y & 1) * HexMetrics.innerRadius,
      HexMetrics.outerRadius + y * 1.5 * HexMetrics.outerRadius
    )
    this.coordinates = HexCoordinates.fromOffsetCoordinates(x, y)

    this.type = HexCellType.normal.key

    this.distance = 0
    this.distanceDisplayed = false
  }

  set type(type) {
    this._type = type
    this.movementCost = HexCellType[type].movementCost
    this.color = HexCellType[type].color
  }

  get type() {
    return this._type
  }

  display = () => {
    p5.strokeWeight(3)
    p5.stroke(0)
    p5.fill(this.color)
    p5.beginShape()
    for (let i = 0; i < HexMetrics.corners.length; i++) {
      let position = HexMetrics.corners[i].clone().add(this.position)
      p5.vertex(position.x, position.y)
    }
    p5.endShape(p5.CLOSE)

    // this.displayCoordinates()

    if (this.distanceDisplayed) {
      this.displayDistance()
    }
  }

  displayCoordinates = () => {
    let string = `${this.coordinates.X}\n${this.coordinates.Y}\n${this.coordinates.Z}`
    p5.stroke(0)
    p5.strokeWeight(1)
    p5.fill(0)
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.text(string, this.position.x, this.position.y)
  }

  displayDistance = () => {
    p5.stroke(0)
    p5.strokeWeight(1)
    p5.fill(0)
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.text(`${this.distance}`, this.position.x, this.position.y)
  }
}

export default HexCell
