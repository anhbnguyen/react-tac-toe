## Separating the Code for the Game Board UI Into a Component

React apps are very maintainable because of React's component model. To prevent there being a very large file with many lines of code handling many different pieces of logic, parts of an app can be split off into separate components that are responsible for their own layouts, styles, and behaviors.

To show how that works, let's create a new component that's responsible for building the Tic Tac Toe board part of the UI.

**GameBoard.js**
```
import React from 'react';
import PropTypes from 'prop-types'
import './GameBoard.css';

const GameBoard = (props) => {
    const { handleSquareClick, squares } = props;
    return (
        <ul className="game">
            {Object.keys(squares).map(squareId => (
                <li
                    key={squareId}
                    className={squares[squareId].content}
                    id={squareId}
                    onClick={handleSquareClick}
                ></li>
            ))}
        </ul>
    )
};

GameBoard.propTypes = {
    handleSquareClick: PropTypes.func.isRequired,
    squares: PropTypes.object.isRequired,
}

export default GameBoard;
```

After separating out the JavaScript portion of the code, we can also remove the CSS styles specific to the game board from **App.css** and move them into a new **GameBoard.css** file, which we'll import into **GameBoard.js**.

Once we're done setting up **GameBoard.js**, we'll import it into **App.js** and replace the previous code with this new component.

**App.js**
```
import GameBoard from './GameBoard.js';
```

```
<GameBoard
    squares={this.state.squares}
    handleSquareClick={this.handleSquareClick}
/>
```

## PropTypes
PropTypes are React's way of implementing a simple type-checking system to prevent bugs from happening. It's like a contract between a parent component and a child component where a child component states what type of value it expects from each `prop` that it gets from the parent.
