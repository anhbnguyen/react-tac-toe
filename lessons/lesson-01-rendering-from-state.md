## Render `<li>` Tags Using State

Give your App component an initial `state`:
```
state = {
    squares: {
        1: { content: 'o' },
        2: { content: 'x' },
        3: { content: '' },
        4: { content: '' },
        5: { content: '' },
        6: { content: '' },
        7: { content: '' },
        8: { content: '' },
        9: { content: '' },
    },
}
```

Render the `<li>` HTML tags based on the component's `state` instead of hard-coding them:
```
{
Object.keys(this.state.squares).map(squareId => (
    <li
        key={squareId}
        className={this.state.squares[squareId].content}
    ></li>
))
}
```

Your App component should now look like this:
```
class App extends Component {
    state = {
        squares: {
            1: { content: 'o' },
            2: { content: 'x' },
            3: { content: '' },
            4: { content: '' },
            5: { content: '' },
            6: { content: '' },
            7: { content: '' },
            8: { content: '' },
            9: { content: '' },
        },
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

                <ul className="game">
                    {
                    Object.keys(this.state.squares).map(squareId => (
                        <li
                            className={this.state.squares[squareId].content}
                            id={squareId}
                        ></li>
                    ))
                    }
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
```

[Continue to the next lesson](https://github.com/joeynguyen/react-tac-toe/blob/master/lessons/lesson-02-handle-click-event.md)
