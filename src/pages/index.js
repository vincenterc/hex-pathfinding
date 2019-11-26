import React from 'react'
import styled from 'styled-components'

import P5Wrapper from '../components/p5-wrapper'
import HexPathfindingSketch from '../p5-sketches/hex-pathfinding'

const HomePage = () => {
  return (
    <Wrapper>
      <P5Wrapper sketch={HexPathfindingSketch} />
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default HomePage
