import React from "react"
import { connect } from 'react-redux'

import "./Row.css"

const Row = ({ width }) => (
  <input
   className="row"
   type="text"
   maxLength={width}
   onChange={e => console.log(e.target.value)}
 />
);

const mapStateToProps = ({ dimensions: { width } }) => ({
  width,
});

export default connect(mapStateToProps)(Row)
