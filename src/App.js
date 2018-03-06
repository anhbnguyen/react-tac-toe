import React, { Component } from 'react';
import GameBoard from './GameBoard.js';
import { INITIAL_STATE, WINNING_COMBINATIONS } from './constants.js'
import './App.css';

class App extends Component {
    state = INITIAL_STATE

    resetGame = () => {
        this.setState({
            ...INITIAL_STATE,
            playerOne: {
                squares: [],
                score: this.state.playerOne.score,
            },
            playerTwo: {
                squares: [],
                score: this.state.playerTwo.score,
            },
        });
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
                    playerOne: {
                        squares: this.state.playerOne.squares,
                        score: this.state.playerOne.score + 1,
                    },
                });
            } else {
                this.setState({
                    gameStatus: 'winnerPlayerTwo',
                    playerTwo: {
                        squares: this.state.playerTwo.squares,
                        score: this.state.playerTwo.score + 1,
                    },
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
                    score: this.state[currentPlayer].score,
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

                <button
                    className="reset-game"
                    onClick={this.resetGame}
                >
                    Reset Game
                </button>


                <div className="scores">
                    <h2>Score Card</h2>
                    <p>Player 1: {this.state.playerOne.score}</p>
                    <p>Player 2: {this.state.playerTwo.score}</p>
                </div>

            </div>
        );
    }
}

export default App;
