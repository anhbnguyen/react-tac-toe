export const WINNING_COMBINATIONS = [
    ['1', '2', '3'],
    ['1', '4', '7'],
    ['1', '5', '9'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['3', '5', '7'],
    ['4', '5', '6'],
    ['7', '8', '9'],
];

export const INITIAL_STATE = {
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
        score: 0,
    },
    playerTwo: {
        squares: [],
        score: 0,
    },
};
