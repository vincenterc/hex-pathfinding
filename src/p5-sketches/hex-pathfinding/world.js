import HexGrid from './hex-grid'
import HexMetrics from './hex-metrics'
import HexCoordinates from './hex-coordinates'
import HexCellType from './hex-cell-type'
import { delay } from '../../utils/delayUtils'
import Queue from './queue'
import PriorityQueue from './priority-queue'
import { p5 } from './index'
import HexCell from './hex-cell'

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
    let fromCell = null
    let previousFromCell = null
    let originalFromCellColor = ''
    let toCell = null
    let previousToCell = null
    let originalToCellColor = null

    return function(mousePosition) {
      let selectedCell = this.getCell(mousePosition)

      if (selectedCell) {
        if (selectedCell.type === HexCellType.wall.key) return

        if (p5.keyIsPressed && p5.keyCode === p5.SHIFT) {
          if (previousToCell) previousToCell.color = originalToCellColor

          toCell = selectedCell
          previousToCell = selectedCell
          originalToCellColor = selectedCell.color
          toCell.color = HexCell.toCellColor
        } else {
          if (previousFromCell) previousFromCell.color = originalFromCellColor

          fromCell = selectedCell
          previousFromCell = selectedCell
          originalFromCellColor = selectedCell.color
          fromCell.color = HexCell.fromCellColor
        }

        if (fromCell && toCell && fromCell !== toCell) {
          this.findPathAndDistance(fromCell, toCell)
        }
      }
    }
  })()

  findPathAndDistance = (fromCell, toCell) => {
    this.map.cells.forEach(col =>
      col.forEach(c => {
        c.distance = Infinity
        c.color = HexCellType[c.type].color
      })
    )
    fromCell.color = HexCell.fromCellColor
    toCell.color = HexCell.toCellColor

    this.dijkstraAlgorithm(fromCell, toCell)
  }

  breadthFirstSearch = async (fromCell, toCell) => {
    let frontier = new Queue()

    fromCell.distance = 0
    frontier.enqueue(fromCell)

    while (!frontier.isEmpty()) {
      await delay(1 / 60)
      let current = frontier.dequeue()

      if (current === toCell) {
        current = current.pathFrom
        while (current !== fromCell) {
          current.color = HexCell.pathCellColor
          current = current.pathFrom
        }
        break
      }

      for (let neighbor of current.neighbors) {
        if (!neighbor || neighbor.distance !== Infinity) continue

        if (neighbor.movementCost === Infinity) continue

        neighbor.distance = current.distance + neighbor.movementCost
        neighbor.pathFrom = current
        frontier.enqueue(neighbor)
      }
    }
  }

  dijkstraAlgorithm = async (fromCell, toCell) => {
    let frontier = new PriorityQueue()

    fromCell.distance = 0
    frontier.enqueue(fromCell, fromCell.distance)

    while (!frontier.isEmpty()) {
      await delay(1 / 60)
      let current = frontier.dequeue()

      if (current === toCell) {
        current = current.pathFrom
        while (current !== fromCell) {
          current.color = HexCell.pathCellColor
          current = current.pathFrom
        }
        break
      }

      for (let neighbor of current.neighbors) {
        if (!neighbor) continue

        if (neighbor.movementCost === Infinity) continue

        let distance = current.distance + neighbor.movementCost
        if (neighbor.distance === Infinity || distance < neighbor.distance) {
          neighbor.distance = distance
          neighbor.pathFrom = current
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
