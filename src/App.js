import React, { useState } from 'react';
import Battlefield from "./Components/Battlefield";
import './App.css';

function App() {
  const nbBombMax = 15;

  const initBombMatrix = (matrix, line, col) => {

    let nbBomb = 0;
    for (let i = 0; i < line; i++) {
      for (let j = 0; j < col; j++) {
        if (Math.round(Math.random()) === 1) {
          matrix[i][j] = 1;
          nbBomb++;
          if (nbBomb === nbBombMax) {
            return (matrix);
          }
        }
      }
    }
    return matrix;
  }

  let bombMatrix = new Array(6).fill(0).map(() => new Array(6).fill(0));
  bombMatrix = initBombMatrix(bombMatrix, 6, 6);
  let battlefield = new Array(6).fill(0).map(() => new Array(6).fill(0));

  console.log(battlefield);
  return (
    <div className="App">
      <h1 className="title">Minesweeper</h1>
      <Battlefield matrix={bombMatrix} gamearea={battlefield} nbbombmax={nbBombMax} />
    </div>
  );
}

export default App;
