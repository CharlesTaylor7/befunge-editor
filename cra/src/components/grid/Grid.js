import React from 'react'
import { connect } from 'react-redux'

import Row from '../row/Row'
import './Grid.css'

const Grid = ({ height }) => (
  <div className="grid">
    {
      Array(height)
      .fill()
      .map((_, i) => (<Row key={i} />))
    }
  </div>
);

const mapStateToProps = ({ dimensions: { height } }) => ({
  height,
});

export default connect(mapStateToProps)(Grid)
