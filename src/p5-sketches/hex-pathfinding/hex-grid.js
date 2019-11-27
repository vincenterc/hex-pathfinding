import HexCell from './hex-cell'

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
        col.push(new HexCell(x, y))
      }

      this.cells.push(col)
    }
  }

  display = p => {
    this.cells.forEach(col => col.forEach(cell => cell.display(p)))
  }
}

export default HexGrid
