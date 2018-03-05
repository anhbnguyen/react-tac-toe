export const initialState = {
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
  playerOneSquares: [],
  playerTwoSquares: [],
  playerOneScore: 0,
  playerTwoScore: 0,
};

export const winningCombinations = [
  ['1', '2', '3'],
  ['1', '4', '7'],
  ['1', '5', '9'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['3', '5', '7'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];
