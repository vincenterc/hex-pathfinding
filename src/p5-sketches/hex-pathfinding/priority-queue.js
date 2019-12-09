import Heap from './heap'

class PriorityQueue {
  constructor() {
    this.items = new Heap((a, b) => a.priority - b.priority)
  }

  enqueue(element, priority) {
    this.items.push({ element, priority })
  }

  dequeue() {
    return this.items.pop().element
  }

  isEmpty() {
    return this.items.length === 0
  }
}

export default PriorityQueue
