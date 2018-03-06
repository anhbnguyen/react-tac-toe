## Perform an Action Based on a Click Event

Add an `onClick` attribute to the `<li>` tags that ties a click event that happens on an `<li>` tag to a behavior that we will define using a function/method. We also want to add an `id` attribute to each `<li>` to be able to target them each individually.
```
<li
    key={squareId}
    className={this.state.squares[squareId].content}
    id={squareId}
    onClick={this.handleSquareClick}
></li>
```

Create a class method that will be triggered when the click event happens.
```
handleSquareClick = (e) => {
    const clickedSquareId = e.target.id;

    this.setState({
        squares: {
            ...this.state.squares,
            [clickedSquareId]: { content: 'x' }
        },
    });
}
```

For now, we will mark each Tic Tac Toe square we click on with an **'X'**. We accomplish this by updating the App component's `state` using React's built-in method `this.setState`.

[Continue to the next lesson](https://github.com/joeynguyen/react-tac-toe/blob/master/lessons/lesson-3-components-separation-of-concerns.md)
