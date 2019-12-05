class HexDirections {
  static NE = {
    value: 0,
    offsetCoordDiff: { 0: { x: 0, y: -1 }, 1: { x: 1, y: -1 } },
  }
  static E = {
    value: 1,
    offsetCoordDiff: { 0: { x: 1, y: 0 }, 1: { x: 1, y: 0 } },
  }
  static SE = {
    value: 2,
    offsetCoordDiff: { 0: { x: 0, y: 1 }, 1: { x: 1, y: 1 } },
  }
  static SW = {
    value: 3,
    offsetCoordDiff: { 0: { x: -1, y: 1 }, 1: { x: 0, y: 1 } },
  }
  static W = {
    value: 4,
    offsetCoordDiff: { 0: { x: -1, y: 0 }, 1: { x: -1, y: 0 } },
  }
  static NW = {
    value: 5,
    offsetCoordDiff: { 0: { x: -1, y: -1 }, 1: { x: 0, y: -1 } },
  }

  static opposite(direction) {
    const NumberToDirection = Object.keys(HexDirections).reduce(
      (acc, key) => ({
        ...acc,
        [HexDirections[key].value]: key,
      }),
      {}
    )
    let value = direction.value

    return value < 3
      ? HexDirections[NumberToDirection[value + 3]]
      : HexDirections[NumberToDirection[value - 3]]
  }
}

export default HexDirections
