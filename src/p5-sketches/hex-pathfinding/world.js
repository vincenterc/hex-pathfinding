import HexGrid from './hex-grid'
import HexMetrics from './hex-metrics'
import HexCoordinates from './hex-coordinates'
import HexCellType from './hex-cell-type'
import { delay } from '../../utils/delayUtils'

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

  findDistanceTo = async cell => {
    this.map.cells.forEach(col =>
      col.forEach(c => {
        c.distance = Infinity
      })
    )

    for (let i = 0; i < this.map.cells.length; i++) {
      let col = this.map.cells[i]
      for (let j = 0; j < col.length; j++) {
        await delay(1 / 1000)
        col[j].distance = col[j].coordinates.distanceTo(cell.coordinates)
      }
    }
  }

  display = () => {
    this.map.display()
  }
}

export default World
