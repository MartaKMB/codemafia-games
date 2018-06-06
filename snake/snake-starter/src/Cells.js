import React from 'react';
import {ROWS, COLS, BODY, FOOD, CELL} from './const';

function Cells({board}) {
  const cells = [];
  for(let row = 0; row < ROWS; row++) {
    for(let col = 0; col < COLS; col++) {
       const value = board[COLS * row + col];
       const className = value === BODY ? 'body-cell' : value === FOOD ? 'food-cell' : 'cell';
       cells.push(<div className={className} />)
    }
  }
  return (
    <div
      tabIndex={0}
      onKeyDown={handleKey}
      className="board"
      style={{width: COLS * CELL, height: ROWS * CELL}}
      >
      {calls}
    </div>
  );
}

export default Cells;
