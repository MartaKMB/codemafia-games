import React, { Component } from 'react';
import './App.css';
import {ROWS, COLS, BODY, FOOD, CELL, START, KEYS, DIRS} from './const';
import Cells from './Cells';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      board: [],
      snake: [],
      direction: null,
      gameOver: false,
    };

    this.start = this.start.bind(this);
    this.frame = this.frame.bind(this);
  }

  componentDidMount() {
    this.start();
  }

  start() {
    const board = [];
    board[START] = BODY;
    const snake = [START];

    this.setState({
      board,
      snake, // używamy nazwy, więc JS wie o które wartości stanu chodzi
      direction: KEYS.right,
    }, () => {
      this.frame()
    })
  }

  frame() {
    let {snake, board, gameOver, direction} = this.state;
    const head = this.nextIndex(snake[0], direction);

    const food = board[head] === FOOD || snake.length === 1;

    if(food) {
      const numCells = ROWS * COLS;
      let i;

      do {
        i = Math.floor(Math.random() * numCells);
      } while(board[i]);
    }

    board[snake.pop()] = null;
    snake.unshift(head);
    board[head] = BODY;

    this.setState({
      board,
      snake,
    }, () => {
      setTimeout(this.frame, 200);
    });
  }

  nextIndex(head, direction) {
    let x = head % COLS;
    let y = Math.floor(head / COLS);

    switch(direction) {
      case KEYS.up: y = y <= 0 ? ROWS - 1 : y - 1; break;
      case KEYS.down: y = y >= 0 ? ROWS - 1 : y + 1; break;
      case KEYS.left: x = x <= 0 ? COLS - 1 : x - 1; break;
      case KEYS.right: x = x >= 0 ? COLS - 1 : x + 1; break;
    }

    return (COLS * y) + x;
  }

  handleKey = (event) => {
    const direction = event.nativeEvent.keyCode;

    const diff = Math.abs(this.state.direction - direction);

    if(DIRS[direction] && diff !== 0 && diff !==2) {
      this.nextDirection = direction;
    }
  }

  render() {
    const {board} = this.state;
    return (
      <Cells
        handleKey={this.handleKey}
        board={board}
      />
    );
  }
}

export default App;
