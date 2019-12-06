class Deque {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  get length() {
    return this.count - this.lowestCount
  }

  push(item) {
    this.items[this.count] = item
    this.count++
  }

  pop() {
    if (this.length === 0) return
    this.count--
    let result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  unshift(item) {
    if (this.length === 0) {
      this.push(item)
    } else {
      this.lowestCount--
      this.items[this.lowestCount] = item
    }
  }

  shift() {
    if (this.length === 0) return
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }
}

export default Deque
