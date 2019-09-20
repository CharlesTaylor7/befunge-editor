import React from 'react';
import { connect } from 'react-redux'

import Grid from '../grid/Grid';
import Foward from '../../store/actions/executeAndAdvance'
import './App.css';

const App = ({ dispatch }) => (
  <div className="app">
    <div className="header">
      Welcome to Befunge!
      <div
        className="button"
        onClick={() => console.log("Undo: To Be implemented.")}
      >
        {"<"}
      </div>
      <div
        className="button"
        onClick={() => Foward(dispatch)}
      >
        {">"}
      </div>
    </div>
    <Grid />
  </div>
);

export default connect()(App);
