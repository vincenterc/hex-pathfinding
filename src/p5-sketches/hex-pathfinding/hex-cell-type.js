class HexCellType {
  static normal = {
    key: 'normal',
    movementCost: 1,
    color: '#fff',
  }

  static water = {
    key: 'water',
    movementCost: 3,
    color: '#66FFE6',
  }

  static wall = {
    key: 'wall',
    movementCost: Infinity,
    color: '#000',
  }
}

HexCellType.order = Object.keys(HexCellType)

export default HexCellType
