import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="app">

                <header className="app-header">
                    <h1 className="app-title">React Tac Toe</h1>
                </header>

                <section className="game-message">
                    <h2>Turn: Player 1</h2>
                </section>

                <ul className="game">
                    {/* first row */}
                    <li className="o"></li>
                    <li className="x"></li>
                    <li></li>
                    {/* second row */}
                    <li></li>
                    <li></li>
                    <li></li>
                    {/* third row */}
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>

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
