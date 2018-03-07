## Resetting the Game

```
const INITIAL_STATE = {
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
    gameStatus: 'play',
    isPlayerOnesTurn: true,
    playerOne: {
        squares: [],
    },
    playerTwo: {
        squares: [],
    },
};
```

```
class App extends Component {
    state = INITIAL_STATE

    resetGame = () => {
        this.setState(INITIAL_STATE);
    }
...
```

```
<button
    className="reset-game"
    onClick={this.resetGame}
>
    Reset Game
</button>
```

[Continue to the next lesson](lesson-10-updating-player-scores.md)
