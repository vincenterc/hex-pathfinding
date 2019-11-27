import Vector2 from './vector2'

class HexMetrics {
  static outerRadius = 30
  static innerRadius = HexMetrics.outerRadius * 0.866025404
  static corners = [
    new Vector2(0, -HexMetrics.outerRadius),
    new Vector2(HexMetrics.innerRadius, -HexMetrics.outerRadius / 2),
    new Vector2(HexMetrics.innerRadius, HexMetrics.outerRadius / 2),
    new Vector2(0, HexMetrics.outerRadius),
    new Vector2(-HexMetrics.innerRadius, HexMetrics.outerRadius / 2),
    new Vector2(-HexMetrics.innerRadius, -HexMetrics.outerRadius / 2),
  ]
}

export default HexMetrics
