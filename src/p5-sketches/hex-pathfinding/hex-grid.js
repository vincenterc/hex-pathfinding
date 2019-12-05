import HexCell from './hex-cell'
import HexDirections from './hex-directions'

class HexGrid {
  static width = 15
  static height = 15

  constructor() {
    this.cells = []

    this.generate()
  }

  generate = () => {
    for (let x = 0; x < HexGrid.width; x++) {
      let col = []

      for (let y = 0; y < HexGrid.height; y++) {
        // x, y offset coordinates
        col.push(new HexCell(x, y))
      }

      this.cells.push(col)
    }

    // Set neighbors
    this.cells.forEach((col, x) =>
      col.forEach((cell, y) => {
        if (x > 0) this.setNeighbor(cell, { x, y }, HexDirections.W, 0)

        if (y < HexGrid.height - 1) {
          if ((y & 1) === 0) {
            this.setNeighbor(cell, { x, y }, HexDirections.SE, 0)

            if (x > 0) this.setNeighbor(cell, { x, y }, HexDirections.SW, 0)
          } else {
            this.setNeighbor(cell, { x, y }, HexDirections.SW, 1)

            if (x < HexGrid.width - 1)
              this.setNeighbor(cell, { x, y }, HexDirections.SE, 1)
          }
        }
      })
    )
  }

  setNeighbor = (cell, offsetCoord, direction, parity) => {
    let offsetCoordDiff = direction.offsetCoordDiff[parity]

    cell.setNeighbor(
      direction,
      this.cells[offsetCoord.x + offsetCoordDiff.x][
        offsetCoord.y + offsetCoordDiff.y
      ]
    )
  }

  display = () => {
    this.cells.forEach(col => col.forEach(cell => cell.display()))
  }
}

export default HexGrid
