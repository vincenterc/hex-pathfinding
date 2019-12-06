import Deque from './deque'

class Queue {
  constructor() {
    this.items = new Deque()
  }

  enqueue(item) {
    this.items.push(item)
  }

  dequeue() {
    return this.items.shift()
  }

  isEmpty() {
    return this.items.length === 0
  }
}

export default Queue
