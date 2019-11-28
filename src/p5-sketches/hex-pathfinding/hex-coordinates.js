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
}

export default HexCoordinates
