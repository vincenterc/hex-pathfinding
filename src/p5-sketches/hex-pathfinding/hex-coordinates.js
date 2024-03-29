import HexMetrics from './hex-metrics'

class HexCoordinates {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  get X() {
    return this.x
  }

  get Y() {
    return this.y
  }

  get Z() {
    return -this.x - this.y
  }

  static fromOffsetCoordinates = (x, y) => {
    return new HexCoordinates(x - Math.floor(y / 2), y)
  }

  static toOffsetCoordinates = coordinates => {
    return {
      x: coordinates.x + Math.floor(coordinates.y / 2),
      y: coordinates.y,
    }
  }

  static fromPosition = position => {
    let x =
      ((Math.sqrt(3) / 3) * position.x - (1 / 3) * position.y) /
      HexMetrics.outerRadius
    let y = ((2 / 3) * position.y) / HexMetrics.outerRadius

    let rx = Math.round(x)
    let ry = Math.round(y)
    let rz = Math.round(-x - y)

    if (rx + ry + rz !== 0) {
      let dx = Math.abs(x - rx)
      let dy = Math.abs(y - ry)
      let dz = Math.abs(-x - y - rz)

      if (dx > dy && dx > dz) {
        rx = -ry - rz
      } else if (dy > dz) {
        ry = -rx - rz
      }
    }

    return new HexCoordinates(rx, ry)
  }

  distanceTo(other) {
    return (
      (Math.abs(this.X - other.X) +
        Math.abs(this.Y - other.Y) +
        Math.abs(this.Z - other.Z)) /
      2
    )
  }
}

export default HexCoordinates
