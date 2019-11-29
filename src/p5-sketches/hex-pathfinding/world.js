import HexGrid from './hex-grid'
import HexMetrics from './hex-metrics'
import HexCoordinates from './hex-coordinates'

class World {
  constructor() {
    this.map = new HexGrid()
  }

  selectCell = (function() {
    let cellSelected = null

    return function(mousePosition) {
      if (cellSelected) cellSelected.color = '#fff'

      mousePosition = {
        x: mousePosition.x - HexMetrics.innerRadius,
        y: mousePosition.y - HexMetrics.outerRadius,
      }
      let hexCoordinates = HexCoordinates.fromPosition(mousePosition)

      cellSelected = this.map.cells[hexCoordinates.x][hexCoordinates.y]
      if (cellSelected) cellSelected.color = '#decc9c'
    }
  })()

  display = () => {
    this.map.display()
  }
}

export default World
