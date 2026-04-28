

import React, { useState } from "react";
const Board = () => {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const renderSquare = (index) => {
    return (
      <button
        style={{ height: "50px", width: "50px", margin: "1px", fontSize: "24px" }}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const handleClick = (index) => {
    if (board[index] !== null || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setXTurn(!isXTurn);

    const winnerCombination = checkWinner(newBoard);

    if (winnerCombination) {
      setWinner(newBoard[winnerCombination[0]]);
    }
  };

  const checkWinner = (newBoard) => {
    const combination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < combination.length; i++) {
      const [a, b, c] = combination[i];

      // ✅ FIX: use newBoard instead of board
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        return combination[i];
      }
    }
    return null;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXTurn(true); // ✅ reset turn also
  };

  return (
    <div className="game-container">
      <div className="board ">
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

<div style={{display: "flex", justifyContent:"center",alignItems:"center" , marginTop:"20px", flexDirection: "column", gap: "10px"}}>

      <button onClick={handleReset}>Reset</button>

      {winner && <div>{winner} is Winner of this Game.</div>}

      </div>
    </div>
  );
};

export default Board;


