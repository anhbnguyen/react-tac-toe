## Updating Player Scores

Add player scores to initial state.
```
playerOne: {
    squares: [],
    score: 0,
},
playerTwo: {
    squares: [],
    score: 0,
},
```

Update the UI with the score.
```
<p>Player 1: {this.state.playerOne.score}</p>
<p>Player 2: {this.state.playerTwo.score}</p>
```

Update player score when they win.
```
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
```

Update `handleSquareClick` to not overwrite playerOne score
```
[currentPlayer]: {
    squares: this.state[currentPlayer].squares.concat(clickedSquareId),
    score: this.state[currentPlayer].score,
},
```

Persist player scores when game is reset.
```
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
```

[Continue to the next lesson](https://github.com/joeynguyen/react-tac-toe/blob/master/lessons/lesson-11-refactoring-code-clean-up.md)
