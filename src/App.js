import { render } from "@testing-library/react";
import { React, useState } from "react";
import "./App.css";
import { Board } from "./components/Board";

const App = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setstepNumber] = useState(0);
  const current = history[stepNumber];

  const winner = calculateWinner(current.squares);

  const jumpTo = (move) => {
    setstepNumber(move)
    setXIsNext((move % 2) === 0)
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to Move #' + move : 'Go to game Start';
    render(
      <li key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  let status;
  if (winner) {
    status = `Winner` + winner;
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1)
    const newCurrent = newHistory[newHistory.length - 1]
    const newSquares = newCurrent.squares.slice();
    // 누가 이겼거나 비겼거나 클릭이 됐거나
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext((previousValue) => !previousValue);

    setstepNumber(newHistory.length)
  };

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={(i) => handleClick(i)} squares={current.squares} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol style={listStyle: 'none'}>
          {moves}
        </ol>
      </div>
    </div>
  );
};

export default App;