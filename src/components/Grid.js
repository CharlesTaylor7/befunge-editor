import React, { useEffect } from 'react'
import './Grid.css'
import Cell from './Cell'
import { connect } from 'react-redux'

const Grid = ({ dispatch }) => {
  useEffect(() => {
    dispatch({ type: 'SET_GRID_DIMENSIONS', height: 9, width: 9 })
  }, [dispatch])

  return (
    <div className="grid">
      {Array(81)
        .fill()
        .map((_, i) => {
          const y = Math.floor(i / 9)
          const x = i % 9
          return <Cell key={`cell-${i}`} position={{ x, y }} />
        })}
    </div>
  )
}

export default connect()(Grid)
