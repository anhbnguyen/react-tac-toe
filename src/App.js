import React, { Component } from 'react';
import GameBoard from './GameBoard.js';
import { initialState, winningCombinations } from './constants.js'
import './App.css';

class App extends Component {
  state = initialState

  switchCurrentPlayer = () => {
    this.setState({ isPlayerOnesTurn: !this.state.isPlayerOnesTurn });
  }

  updateGameStatus = (clickedSquareId) => {
    const currentPlayerSquares = this.state.isPlayerOnesTurn
      ? this.state.playerOneSquares
      : this.state.playerTwoSquares;

    const possibleWinningCombinations = winningCombinations.filter(combination => combination.includes(clickedSquareId));
    const playerHasWon = possibleWinningCombinations.find(combination => {
      return combination.every(number => currentPlayerSquares.includes(number));
    });

    if (playerHasWon) {
      if (this.state.isPlayerOnesTurn) {
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
    // don't allow anymore actions if game is already over
    if (this.state.gameStatus !== 'play') {
      return;
    }

    const clickedSquareId = e.target.id;
    // if the square has already been used, don't do anything
    if (this.state.squares[clickedSquareId].played) {
      return;
    }

    const letterToAdd = this.state.isPlayerOnesTurn ? 'x' : 'o'
    const currentPlayerSquares = this.state.isPlayerOnesTurn ? 'playerOneSquares' : 'playerTwoSquares'

    this.setState(
      {
        squares: {
          ...this.state.squares,
          [clickedSquareId]: { content: letterToAdd, played: true }
        },
        [currentPlayerSquares]: this.state[currentPlayerSquares].concat(clickedSquareId),
      },
      () => this.updateGameStatus(clickedSquareId)
    );
  }

  resetGame = () => {
    this.setState({
      ...initialState,
      // preserve scores
      playerOneScore: this.state.playerOneScore,
      playerTwoScore: this.state.playerTwoScore,
    });
  }

  render() {
    const currentPlayer = this.state.isPlayerOnesTurn ? '1' : '2';

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
        <GameBoard
          squares={this.state.squares}
          handleSquareClick={this.handleSquareClick}
        />
        <button
          className="reset-game"
          onClick={this.resetGame}
        >
          Reset Game
        </button>
        <section className="scores">
            <h2>Score Card</h2>
            Player 1: <span id="player-one-score">{this.state.playerOneScore}</span> <br />
            Player 2: <span id="player-two-score">{this.state.playerTwoScore}</span> <br />
        </section>
      </div>
    );
  }
}

export default App;
