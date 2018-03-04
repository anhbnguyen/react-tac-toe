import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React-Tac-Toe</h1>
        </header>
        <section className="game-message">
          <h2>Turn: Player 1</h2>
        </section>
        <ul id="game">
          {/* first row */}
          <li className="o">O</li>
          <li className="x">X</li>
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
            Player 1: <span id="player-one-score">0</span> <br />
            Player 2: <span id="player-two-score">0</span> <br />
        </div>
      </div>
    );
  }
}

export default App;
