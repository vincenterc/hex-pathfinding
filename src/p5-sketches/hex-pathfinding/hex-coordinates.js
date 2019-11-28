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
}

export default HexCoordinates
