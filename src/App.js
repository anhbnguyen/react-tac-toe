import React, { Component } from 'react';
import './App.css';

const initialState = {
  boxes: {
    1: { content: '', played: false },
    2: { content: '', played: false },
    3: { content: '', played: false },
    4: { content: '', played: false },
    5: { content: '', played: false },
    6: { content: '', played: false },
    7: { content: '', played: false },
    8: { content: '', played: false },
    9: { content: '', played: false },
  },
  gameStatus: 'play',
  playerOneTurn: true,
  playerTwoTurn: false,
}

class App extends Component {
  state = initialState

  checkGameStatus = () => {
    const isGameDone = () => Object.keys(this.state.boxes).every(boxId => {
      return this.state.boxes[boxId].played === true;
    });
    if (isGameDone()) {
      this.setState({gameStatus: 'done'})
    }
  }

  handleBoxClick = (e) => {
    // if the box has already been used, don't do anything
    if (this.state.boxes[e.target.id].played) {
      return;
    }

    const letterToAdd = this.state.playerOneTurn ? 'x' : 'o'
    this.setState({
      boxes: {
        ...this.state.boxes,
        [e.target.id]: { content: letterToAdd, played: true }
      },
      playerOneTurn: !this.state.playerOneTurn,
      playerTwoTurn: !this.state.playerTwoTurn,
    }, () => this.checkGameStatus());
  }
  resetGame = () => {
    this.setState(initialState);
  }
  render() {
    const currentPlayer = this.state.playerOneTurn ? '1' : '2';
    let gameStatusText;
    switch(this.state.gameStatus) {
      case 'done':
        gameStatusText = 'Draw!';
        break;
      default:
        gameStatusText = `Turn: Player ${currentPlayer}`;
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React-Tac-Toe</h1>
        </header>
        <section className="game-message">
          <h2>{gameStatusText}</h2>
        </section>
        <ul className="game">
          {Object.keys(this.state.boxes).map(boxId => (
            <li
              key={boxId}
              className={this.state.boxes[boxId].content}
              id={boxId}
              onClick={this.handleBoxClick}
            ></li>
          ))}
        </ul>
        <button
          className="reset-game"
          onClick={this.resetGame}
        >
          Reset Game
        </button>
        <div className="scores">
            <h2>Score Card</h2>
            Player 1: <span id="player-one-score">0</span> <br />
            Player 2: <span id="player-two-score">0</span> <br />
        </div>
      </div>
    );
  }
}

export default App;
