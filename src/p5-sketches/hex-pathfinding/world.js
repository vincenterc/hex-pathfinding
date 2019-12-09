import HexGrid from './hex-grid'
import HexMetrics from './hex-metrics'
import HexCoordinates from './hex-coordinates'
import HexCellType from './hex-cell-type'
import { delay } from '../../utils/delayUtils'
import Queue from './queue'

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
    let cellSelected = null

    return function(mousePosition) {
      cellSelected = this.getCell(mousePosition)

      if (cellSelected && cellSelected.type !== HexCellType.wall.key) {
        this.findDistanceTo(cellSelected)
      }
    }
  })()

  findDistanceTo = cell => {
    this.map.cells.forEach(col =>
      col.forEach(c => {
        c.distance = Infinity
      })
    )

    this.breadthFirstSearch(cell)
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

  display = () => {
    this.map.display()
  }
}

export default World
