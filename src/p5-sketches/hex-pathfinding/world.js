import HexGrid from './hex-grid'
import HexMetrics from './hex-metrics'
import HexCoordinates from './hex-coordinates'
import HexCellType from './hex-cell-type'
import { delay } from '../../utils/delayUtils'
import Queue from './queue'
import PriorityQueue from './priority-queue'

class World {
  constructor() {
    this.map = new HexGrid()
  }

  getCell = mousePosition => {
    mousePosition = {
      x: mousePosition.x - HexMetrics.innerRadius,
      y: mousePosition.y - HexMetrics.outerRadius,
    }
    let hexCoordinates = HexCoordinates.fromPosition(mousePosition)
    let { x, y } = HexCoordinates.toOffsetCoordinates(hexCoordinates)

    return this.map.cells[x][y]
  }

  setCell = mousePosition => {
    let cell = this.getCell(mousePosition)
    let cellType = cell.type
    let cellTypeIndex = HexCellType.order.indexOf(cellType)
    cellTypeIndex++
    cell.type = HexCellType.order[cellTypeIndex % HexCellType.order.length]
  }

  selectCell = (function() {
    let previousSelectedCell = null
    let originalCellColor = ''

    return function(mousePosition) {
      let selectedCell = this.getCell(mousePosition)

      if (selectedCell) {
        if (selectedCell.type === HexCellType.wall.key) return

        if (previousSelectedCell) previousSelectedCell.color = originalCellColor

        previousSelectedCell = selectedCell
        originalCellColor = selectedCell.color
        selectedCell.color = '#00f'
        this.findDistanceTo(selectedCell)
      }
    }
  })()

  findDistanceTo = cell => {
    this.map.cells.forEach(col =>
      col.forEach(c => {
        c.distance = Infinity
      })
    )

    this.dijkstraAlgorithm(cell)
  }

  breadthFirstSearch = async cell => {
    let frontier = new Queue()

    cell.distance = 0
    frontier.enqueue(cell)

    while (!frontier.isEmpty()) {
      await delay(1 / 60)
      let current = frontier.dequeue()

      for (let neighbor of current.neighbors) {
        if (!neighbor || neighbor.distance !== Infinity) continue

        if (neighbor.movementCost === Infinity) continue

        neighbor.distance = current.distance + neighbor.movementCost
        frontier.enqueue(neighbor)
      }
    }
  }

  dijkstraAlgorithm = async cell => {
    let frontier = new PriorityQueue()

    cell.distance = 0
    frontier.enqueue(cell, cell.distance)

    while (!frontier.isEmpty()) {
      await delay(1 / 60)
      let current = frontier.dequeue()

      for (let neighbor of current.neighbors) {
        if (!neighbor) continue

        if (neighbor.movementCost === Infinity) continue

        let distance = current.distance + neighbor.movementCost
        if (neighbor.distance === Infinity || distance < neighbor.distance) {
          neighbor.distance = distance
          frontier.enqueue(neighbor, distance)
        }
      }
    }
  }

  display = () => {
    this.map.display()
  }
}

export default World
