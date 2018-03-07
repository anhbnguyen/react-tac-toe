## Mark a Square with X or O Based On Whose Turn It Is

For it to be a Tic Tac Toe game, both X's and O's need to alternate marking the squares. In order to do this, we need to track which player's turn it is. We can do this by adding a new property to the component `state` and updating it when appropriate.
```
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
```
```
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
```

```
render() {
    const currentPlayer = this.state.isPlayerOnesTurn ? '1' : '2';
```

```
<section className="game-message">
    <h2>Turn: Player {currentPlayer}</h2>
</section>
```

[Continue to the next lesson](lesson-05-prevent-overwriting-squares.md)
