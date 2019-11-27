import HexGrid from './hex-grid'

class World {
  constructor() {
    this.map = new HexGrid()
  }

  display = p => {
    this.map.display(p)
  }
}

export default World
