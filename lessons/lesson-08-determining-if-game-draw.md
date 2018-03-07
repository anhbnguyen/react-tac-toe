## Determining if the Game is a Draw

```
const allSquaresUsed = Object.keys(this.state.squares).every(squareId => {
    return this.state.squares[squareId].played === true;
});

if (allSquaresUsed && !playerHasWon) {
    this.setState({gameStatus: 'draw'})
    return;
}
```

```
case 'winnerPlayerTwo':
    gameStatusText = 'Player Two Wins!';
    break;
case 'draw':
    gameStatusText = 'Draw!';
    break;
default:
    gameStatusText = `Turn: Player ${currentPlayer}`;
```

[Continue to the next lesson](https://github.com/joeynguyen/react-tac-toe/blob/master/lessons/lesson-9-resetting-the-game.md)
