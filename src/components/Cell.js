import React, { useRef, useEffect } from 'react'
import './Cell.css'
import { connect } from 'react-redux'
import * as R from 'ramda'
import move from '../utilities/move'

const Cell = ({ position, value, inFocus, isCurrentInstruction, gridDimensions, dispatch }) => {
  const inputElement = useRef(null);
  const { x, y } = position;

  useEffect(() => {
    if (inFocus) inputElement.current.focus();
  }, [inFocus]);

  const editCell = value => {
    dispatch({ type: 'EDIT_CELL', position, value });
    if (value === '') return;

    const { width, height } = gridDimensions;
    const nextX = (x + 1) % width;
    const nextY = nextX === 0 ? (y + 1) % height : y;
    dispatch({
      type: 'SET_EDITOR_FOCUS',
      position: { x: nextX, y: nextY },
    });
  }

  const onKeyDown = key => {
    const direction = R.match(/^Arrow(.*)$/, key)[1];
    if (direction) {
      dispatch({
        type: 'SET_EDITOR_FOCUS',
        position: move({
          direction,
          dimensions: gridDimensions,
        })(position),
      })
    } else if (
      key === 'Backspace' &&
      ( value === '' ||
        value === null ||
        value === undefined)
      ) {
      dispatch({
        type: 'SET_EDITOR_FOCUS',
        position: move({
          direction: 'Left',
          dimensions: gridDimensions,
        })(position),
      });
    }
  }

  return (
    <div
      data-testid={`cell-div-${x}-${y}`}
      className={isCurrentInstruction ? 'highlighted cell': 'cell'}
      onClick={() => dispatch({type: 'SET_EDITOR_FOCUS', position})}
      onKeyDown={e => onKeyDown(e.key)}
    >
      <input
        data-testid={`cell-input-${x}-${y}`}
        className="input"
        type="text"
        maxLength="1"
        ref={inputElement}
        value={value}
        onChange={e => editCell(e.target.value)}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  value: state.grid[ownProps.id],
  inFocus: R.equals(ownProps.position, state.editorFocus),
  isExecuting: R.equals(ownProps.position, state.executionPointer),
  gridDimensions: state.dimensions,
});

export default connect(mapStateToProps)(Cell);
