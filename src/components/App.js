import React from 'react'
import './App.css'
import Grid from './Grid'
import Foward from '../store/actions/executeAndAdvance'
import { connect } from 'react-redux'

const App = ({ dispatch }) => {
  return (
    <div className="app">
      <div className="header">
        Welcome to Befunge!
        <div className="button" onClick={() => console.log('Undo: To Be implemented.')}>
          {'<'}
        </div>
        <div className="button" onClick={() => Foward(dispatch)}>
          {'>'}
        </div>
      </div>
      <Grid />
    </div>
  )
}

export default connect()(App)
