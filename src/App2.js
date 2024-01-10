import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [playerMark, setPlayerMark] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [boardState, setBoardState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  const handlePlayerPick = (playerMark) => {
    setPlayerMark(playerMark);

    // Generate an invite link and set it to the state
    const inviteLink = `https://example.com/tic-tac-toe/?playerMark=${playerMark}`;
    setInviteLink(inviteLink);

    // Start the game by allowing the player to make the first move
    setIsComputerTurn(false);
  };

  useEffect(() => {
    // Make a computer move after the player has made a move
    if (isComputerTurn) {
      const computerMove = getComputerMove();
      makeMove(computerMove);
    }
  }, [isComputerTurn]);

  const getComputerMove = () => {
    const emptyCells = getEmptyCells();
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  };

  const getEmptyCells = () => {
    const emptyCells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (boardState[i][j] === "") {
          emptyCells.push({ row: i, col: j });
        }
      }
    }
    return emptyCells;
  };

  const makeMove = ({ row, col }) => {
    // Set the clicked cell to the computer's mark
    const updatedBoardState = [...boardState];
    updatedBoardState[row][col] = "O";
    setBoardState(updatedBoardState);

    // Switch to the player's turn
    setIsComputerTurn(false);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>

      <InviteLink inviteLink={inviteLink} />

      <PlayerPicker handlePlayerPick={handlePlayerPick} />

      {playerMark && <GameBoard playerMark={playerMark} boardState={boardState} setIsComputerTurn={setIsComputerTurn} />}
    </div>
  );
};

const GameBoard = ({ playerMark, boardState, setIsComputerTurn }) => {
  const handleClick = (rowIndex, columnIndex) => {
    // Check if the cell is already filled or if there's a winner
    if (boardState[rowIndex][columnIndex] || checkForWinner(boardState)) {
      return;
    }

    // Set the clicked cell to the player's mark
    const updatedBoardState = [...boardState];
    updatedBoardState[rowIndex][columnIndex] = playerMark;
    //setBoardState(updatedBoardState);

    // Switch to the computer's turn
    setIsComputerTurn(true);
  };

  // Check for a winner
  const winner = checkForWinner(boardState);

  return (
    <div>
      <table className="game-board">
        <tbody>
          {boardState.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td key={columnIndex} onClick={() => handleClick(rowIndex, columnIndex)}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {winner && <div className="winner"><h2>{winner} wins!</h2></div>}
    </div>
  );
};

const PlayerPicker = ({ handlePlayerPick }) => {
  return (
    <div>
      <h2>Pick Your Symbol</h2>

      <button onClick={() => handlePlayerPick("X")}>X</button>
      <button onClick={() => handlePlayerPick("O")}>O</button>
    </div>
  );
};

const InviteLink = ({ inviteLink }) => {
  return (
    <div>
      <h3>Invite Link</h3>
      <input type="text" value={inviteLink} readOnly />
    </div>
  );
};

function checkForWinner(boardState) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (boardState[i][0] === boardState[i][1] && boardState[i][1] === boardState[i][2] && boardState[i][0] !== "") {
      return boardState[i][0];
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (boardState[0][i] === boardState[1][i] && boardState[1][i] === boardState[2][i] && boardState[0][i] !== "") {
      return boardState[0][i];
    }
  }

  // Check diagonals
  if (
    (boardState[0][0] === boardState[1][1] && boardState[1][1] === boardState[2][2] && boardState[0][0] !== "") ||
    (boardState[0][2] === boardState[1][1] && boardState[1][1] === boardState[2][0] && boardState[0][2] !== "")
  ) {
    return boardState[1][1];
  }

  // No winner yet
  return null;
}






function getEmptyCells(boardState) {
  const emptyCells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (boardState[i][j] === "") {
        emptyCells.push({ row: i, col: j });
      }
    }
  }
  return emptyCells;
}

export default App;
