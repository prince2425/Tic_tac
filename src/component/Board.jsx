import React, { useState } from "react";
import "./Board.css";

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningPattern, setWinningPattern] = useState("");

  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  const renderSquare = (index) => (
    <button
      className="square"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setXTurn(!isXTurn);

    const result = checkWinner(newBoard);

    if (result) {
      setWinner(newBoard[result[0]]);

      const key = result.join(",");

      const patterns = {
        "0,1,2": "row-0",
        "3,4,5": "row-1",
        "6,7,8": "row-2",

        "0,3,6": "col-0",
        "1,4,7": "col-1",
        "2,5,8": "col-2",

        "0,4,8": "diag-1",
        "2,4,6": "diag-2",
      };

      setWinningPattern(patterns[key]);
    }
  };

  const checkWinner = (newBoard) => {
    for (let combo of combinations) {
      const [a, b, c] = combo;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        return combo;
      }
    }
    return null;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningPattern("");
    setXTurn(true);
  };

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>

      <div className="board-container">
        <div className="board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>

          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>

          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>

        {winner && (
          <div className={`win-line ${winningPattern}`}></div>
        )}
      </div>

      <div className="controls">
        <h2>
          {winner
            ? `${winner} Wins 🎉`
            : `Turn : ${isXTurn ? "X" : "O"}`}
        </h2>

        <button
          className="reset-btn"
          onClick={handleReset}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Board;