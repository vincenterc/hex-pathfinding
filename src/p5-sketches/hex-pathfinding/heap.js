class Heap {
  constructor(compareFn = (a, b) => a - b) {
    this.compareFn = compareFn
    this.content = []
  }

  get length() {
    return this.content.length
  }

  push(value) {
    if (value != null) {
      this.content.push(value)
      this.siftUp(this.content.length - 1)
      return true
    }

    return false
  }

  pop() {
    if (this.length === 0) return

    if (this.length === 1) return this.content.pop()

    const removedValue = this.content[0]
    this.content[0] = this.content.pop()
    this.siftDown(0)

    return removedValue
  }

  siftUp(index) {
    let parentIndex = this.getParentIndex(index)

    while (
      index > 0 &&
      this.compareFn(this.content[parentIndex], this.content[index]) > 0
    ) {
      swap(this.content, parentIndex, index)
      index = parentIndex
      parentIndex = this.getParentIndex(index)
    }
  }

  siftDown(index) {
    let tempIndex = index
    const leftIndex = this.getLeftIndex(index)
    const rightIndex = this.getRightIndex(index)
    const length = this.length

    if (
      leftIndex < length &&
      this.compareFn(this.content[tempIndex], this.content[leftIndex]) > 0
    ) {
      tempIndex = leftIndex
    }

    if (
      rightIndex < length &&
      this.compareFn(this.content[tempIndex], this.content[rightIndex]) > 0
    ) {
      tempIndex = rightIndex
    }

    if (index !== tempIndex) {
      swap(this.content, index, tempIndex)
      this.siftDown(tempIndex)
    }
  }

  peek() {
    return this.length === 0 ? undefined : this.content[0]
  }

  getLeftIndex(index) {
    return 2 * index + 1
  }

  getRightIndex(index) {
    return 2 * index + 2
  }

  getParentIndex(index) {
    if (index === 0) return

    return Math.floor((index - 1) / 2)
  }
}

const swap = (array, a, b) => ([array[a], array[b]] = [array[b], array[a]])

export default Heap
