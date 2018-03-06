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
