import React, { Component } from 'react';
import './App.css';

const initialState = {
  squares: {
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
}

class App extends Component {
  state = initialState

  checkGameStatus = () => {
    const isGameDone = () => Object.keys(this.state.squares).every(squareId => {
      return this.state.squares[squareId].played === true;
    });
    if (isGameDone()) {
      this.setState({gameStatus: 'done'})
    }
  }

  handleSquareClick = (e) => {
    // if the square has already been used, don't do anything
    if (this.state.squares[e.target.id].played) {
      return;
    }

    const letterToAdd = this.state.playerOneTurn ? 'x' : 'o'
    this.setState({
      squares: {
        ...this.state.squares,
        [e.target.id]: { content: letterToAdd, played: true }
      },
      playerOneTurn: !this.state.playerOneTurn,
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
          {Object.keys(this.state.squares).map(squareId => (
            <li
              key={squareId}
              className={this.state.squares[squareId].content}
              id={squareId}
              onClick={this.handleSquareClick}
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
