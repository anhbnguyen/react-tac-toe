import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    boxes: {
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
    playerOneTurn: true,
    playerTwoTurn: false,
  }
  handleBoxClick = (e) => {
    const letterToAdd = this.state.playerOneTurn ? 'x' : 'o'
    this.setState({
      boxes: {
        ...this.state.boxes,
        [e.target.id]: { content: letterToAdd }
      },
      playerOneTurn: !this.state.playerOneTurn,
      playerTwoTurn: !this.state.playerTwoTurn,
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React-Tac-Toe</h1>
        </header>
        <section className="game-message">
          <h2>Turn: Player 1</h2>
        </section>
        <ul className="game">
          {Object.keys(this.state.boxes).map(boxId => (
            <li
              className={this.state.boxes[boxId].content}
              id={boxId}
              onClick={this.handleBoxClick}
            ></li>
          ))}
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
