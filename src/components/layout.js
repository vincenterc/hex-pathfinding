import React from 'react'
import { Helmet } from 'react-helmet'

// import favicon from '../../assets/img/favicon.ico'
import './layout.css'

const Layout = ({ children }) => (
  <>
    <Helmet>
      <title>Hex Pathfinding</title>
      <meta name="description" content="Hex Pathfinding" />
      {/* <link rel="icon" href={favicon} /> */}
    </Helmet>
    {children}
  </>
)

export default Layout
