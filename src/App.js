import React, { Component } from 'react';
import GameBoard from './GameBoard.js';
import './App.css';

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
        isPlayerOnesTurn: true,
        playerOne: {
            squares: [],
        },
        playerTwo: {
            squares: [],
        },
    }

    handleSquareClick = (e) => {
        const clickedSquareId = e.target.id;

        // if the square has already been used, don't do anything
        if (this.state.squares[clickedSquareId].played) {
            return;
        }

        const letterToAdd = this.state.isPlayerOnesTurn ? 'x' : 'o';
        const currentPlayer = this.state.isPlayerOnesTurn ? 'playerOne' : 'playerTwo'

        this.setState({
            isPlayerOnesTurn: !this.state.isPlayerOnesTurn,
            [currentPlayer]: {
                squares: this.state[currentPlayer].squares.concat(clickedSquareId),
            },
            squares: {
                ...this.state.squares,
                [clickedSquareId]: { content: letterToAdd, played: true }
            },
        });
    }

    render() {
        const currentPlayer = this.state.isPlayerOnesTurn ? '1' : '2';

        return (
            <div className="app">

                <header className="app-header">
                    <h1 className="app-title">React Tac Toe</h1>
                </header>

                <section className="game-message">
                    <h2>Turn: Player {currentPlayer}</h2>
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
