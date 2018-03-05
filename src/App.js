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
  playerOneSquares: [],
  playerTwoSquares: [],
  playerOneScore: 0,
  playerTwoScore: 0,
}

const winningCombinations = [
  ['1', '2', '3'],
  ['1', '4', '7'],
  ['1', '5', '9'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['3', '5', '7'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

class App extends Component {
  state = initialState

  switchCurrentPlayer = () => {
    this.setState({ playerOneTurn: !this.state.playerOneTurn });
  }

  updateGameStatus = (clickedSquareId) => {
    const currentPlayerSquares = this.state.playerOneTurn
      ? this.state.playerOneSquares
      : this.state.playerTwoSquares;

    const possibleWinningCombinations = winningCombinations.filter(combination => combination.includes(clickedSquareId));
    const playerHasWon = possibleWinningCombinations.find(combination => {
      return combination.every(number => currentPlayerSquares.includes(number));
    });

    if (playerHasWon) {
      if (this.state.playerOneTurn) {
        this.setState({
          gameStatus: 'winnerPlayerOne',
          playerOneScore: this.state.playerOneScore + 1,
        });
      } else {
        this.setState({
          gameStatus: 'winnerPlayerTwo',
          playerTwoScore: this.state.playerTwoScore + 1,
        });
      }
      return;
    }

    const allSquaresUsed = Object.keys(this.state.squares).every(squareId => {
      return this.state.squares[squareId].played === true;
    });

    if (allSquaresUsed && !playerHasWon) {
      this.setState({gameStatus: 'draw'})
      return;
    }

    // if game isn't over, switch to other player
    this.switchCurrentPlayer();
  }

  handleSquareClick = (e) => {
    // don't allow anymore actions is game already is over
    if (this.state.gameStatus !== 'play') {
      return;
    }

    const clickedSquareId = e.target.id;
    // if the square has already been used, don't do anything
    if (this.state.squares[clickedSquareId].played) {
      return;
    }

    const letterToAdd = this.state.playerOneTurn ? 'x' : 'o'
    const currentPlayerSquares = this.state.playerOneTurn ? 'playerOneSquares' : 'playerTwoSquares'
    this.setState({
      squares: {
        ...this.state.squares,
        [clickedSquareId]: { content: letterToAdd, played: true }
      },
      [currentPlayerSquares]: this.state[currentPlayerSquares].concat(clickedSquareId),
    }, () => this.updateGameStatus(clickedSquareId));
  }

  resetGame = () => {
    this.setState({
      ...initialState,
      playerOneScore: this.state.playerOneScore,
      playerTwoScore: this.state.playerTwoScore,
    });
  }

  render() {
    const currentPlayer = this.state.playerOneTurn ? '1' : '2';

    let gameStatusText;
    switch(this.state.gameStatus) {
      case 'winnerPlayerOne':
        gameStatusText = 'Player One Wins!';
        break;
      case 'winnerPlayerTwo':
        gameStatusText = 'Player Two Wins!';
        break;
      case 'draw':
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
            Player 1: <span id="player-one-score">{this.state.playerOneScore}</span> <br />
            Player 2: <span id="player-two-score">{this.state.playerTwoScore}</span> <br />
        </div>
      </div>
    );
  }
}

export default App;
