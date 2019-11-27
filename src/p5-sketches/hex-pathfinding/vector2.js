class Vector2 {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  add = v => {
    this.x += v.x
    this.y += v.y

    return this
  }

  clone = () => {
    return new Vector2(this.x, this.y)
  }
}

export default Vector2
