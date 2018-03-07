## Assigning Captured Squares to Players

Whenever a player clicks on a square, we want the app to know that that player owns that square.  We will use this later on to figure out when a player has captured a combination of squares that makes them the winner. Add this to `state`:
```
playerOne: {
    squares: [],
},
playerTwo: {
    squares: [],
},
```

Update `handleSquareClick` with this code:
```
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
```

[Continue to the next lesson](lesson-07-determining-if-player-won.md)
