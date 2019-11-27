import HexGrid from './hex-grid'

class World {
  constructor() {
    this.map = new HexGrid()
  }

  display = () => {
    this.map.display()
  }
}

export default World
