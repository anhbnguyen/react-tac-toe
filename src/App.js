import React, { Component } from 'react';
import GameBoard from './GameBoard.js';
import './App.css';

const WINNING_COMBINATIONS = [
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
    state = {
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
        isPlayerOnesTurn: true,
        playerOne: {
            squares: [],
        },
        playerTwo: {
            squares: [],
        },
    }

    updateGameStatus = (clickedSquareId) => {
        const currentPlayerSquares = this.state.isPlayerOnesTurn
            ? this.state.playerOne.squares
            : this.state.playerTwo.squares;

        const possibleWinningCombinations = WINNING_COMBINATIONS.filter(combination => combination.includes(clickedSquareId));
        const playerHasWon = possibleWinningCombinations.find(combination => {
          return combination.every(number => currentPlayerSquares.includes(number));
        });

        if (playerHasWon) {
            if (this.state.isPlayerOnesTurn) {
                this.setState({
                    gameStatus: 'winnerPlayerOne',
                });
            } else {
                this.setState({
                    gameStatus: 'winnerPlayerTwo',
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
        this.setState({ isPlayerOnesTurn: !this.state.isPlayerOnesTurn });
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

        const letterToAdd = this.state.isPlayerOnesTurn ? 'x' : 'o';
        const currentPlayer = this.state.isPlayerOnesTurn ? 'playerOne' : 'playerTwo'

        this.setState(
            {
                [currentPlayer]: {
                    squares: this.state[currentPlayer].squares.concat(clickedSquareId),
                },
                squares: {
                    ...this.state.squares,
                    [clickedSquareId]: { content: letterToAdd, played: true }
                },
            },
            () => this.updateGameStatus(clickedSquareId)
        );
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
            <div className="app">

                <header className="app-header">
                    <h1 className="app-title">React Tac Toe</h1>
                </header>

                <section className="game-message">
                    <h2>{gameStatusText}</h2>
                </section>

                <GameBoard
                    squares={this.state.squares}
                    handleSquareClick={this.handleSquareClick}
                />

                <button className="reset-game">Reset Game</button>

                <div className="scores">
                    <h2>Score Card</h2>
                    <p>Player 1: 0</p>
                    <p>Player 2: 0</p>
                </div>

            </div>
        );
    }
}

export default App;
