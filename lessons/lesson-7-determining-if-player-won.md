Store possible winning combinations to a variable.
```
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
```

Add a new `gameStatus` property to `state` to track the status of the game:
```
gameStatus: 'play',
```

Add a new `updateGameStatus` class method for checking/updating the status of the game after a square is clicked:
```
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
}
```

At the end of `handleSquareClick`, call this new method when a square is clicked:
```
this.updateGameStatus(clickedSquareId)
```

Update the UI to tell the players when one of them has won.
```
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
        default:
            gameStatusText = `Turn: Player ${currentPlayer}`;
    }
...
```
```
<section className="game-message">
    <h2>{gameStatusText}</h2>
</section>
```

## this.setState's callback function
Our code doesn't seem to work even though it looks like it should. That's because this.setState is asynchronous and therefore, when we call `this.updateGameStatus(clickedSquareId)`, this part of the `this.setState` code hasn't finished running:
```
[currentPlayer]: {
    squares: this.state[currentPlayer].squares.concat(clickedSquareId),
},
```
so we don't have the latest `clickedSquareId` inside of our current player's `squares` state by the time `updateGameStatus` runs.

For cases, like this we need to use this.setState's callback function.
```
this.setState(
    {
        isPlayerOnesTurn: !this.state.isPlayerOnesTurn,
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
```

However, this alone will not work. We also need to move the update of the state of which player's turn it is to happen AFTER we check for a winner.
```
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
```

```
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

// if game isn't over, switch to other player
this.setState({ isPlayerOnesTurn: !this.state.isPlayerOnesTurn });
```

One more thing: the players can still click on the remaining untouched squares and fill them in even after a player has won. We can prevent that by adding code to the top of the `handleSquareClick` method:
```
handleSquareClick = (e) => {
    // don't allow anymore actions if game is already over
    if (this.state.gameStatus !== 'play') {
        return;
    }
...
```
