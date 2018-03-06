import React, { Component } from 'react';
import GameBoard from './GameBoard.js';
import './App.css';

class App extends Component {
    state = {
        squares: {
            1: { content: '' },
            2: { content: '' },
            3: { content: '' },
            4: { content: '' },
            5: { content: '' },
            6: { content: '' },
            7: { content: '' },
            8: { content: '' },
            9: { content: '' },
        },
        isPlayerOnesTurn: true,
    }

    handleSquareClick = (e) => {
        const clickedSquareId = e.target.id;
		const letterToAdd = this.state.isPlayerOnesTurn ? 'x' : 'o';

        this.setState({
			isPlayerOnesTurn: !this.state.isPlayerOnesTurn,
			squares: {
				...this.state.squares,
				[clickedSquareId]: { content: letterToAdd }
			},
        });
    }

    render() {
        return (
            <div className="app">

                <header className="app-header">
                    <h1 className="app-title">React Tac Toe</h1>
                </header>

                <section className="game-message">
                    <h2>Turn: Player 1</h2>
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
