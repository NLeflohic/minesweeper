import React, { useState } from "react";
import RowField from "./RowField";

const Battlefield = (props) => {
	const [gameArea, setGameArea] = useState([]);
	const [init, setInit] = useState(0);
	const [gameOver, setGameOver] = useState(0);
	const [win, setWin] = useState(0);

	const tabRow = [];
	const initRow = (nbRow) => {
		for (let i = 0; i < nbRow; i++) {
			tabRow.push({
				key: i.toString(),
				value: <RowField matrix={props.matrix} id={i} gamearea={gameArea} setgamearea={setGameArea}
					gameover={gameOver} gameoverfunc={setGameOver}
					win={win} winfunc={setWin} tabrow={tabRow} bombmatrix={props.matrix}
				/>
			})
		}
	}

	if (init === 0) {
		setInit(1);
		setGameArea(props.gamearea);
	}

	const onClickEvent = () => {
		console.log(gameArea);
	}

	initRow(6);

	let gameOverDiv = "";
	let winDiv = "";

	if (gameOver === 1) {
		gameOverDiv = (
			<div className="game-end">
				<h1>Game Over</h1>
				<button className="newgame" onClick={() => window.location.reload()}>New game</button>
			</div>);
	};

	if (win === props.nbbombmax) {
		winDiv = (
			<div className="game-end">
				<h1>Victory !!!</h1>
				<button className="newgame" onClick={() => window.location.reload()}>New game</button>
			</div>);
	};


	return (
		<div className="battlefield">
			<div className="row-battlefield" onClick={onClickEvent} >
				{
					tabRow.map((row, idx) => {
						return (<div key={row.key}>{row.value}</div>)
					})
				}
			</div>
			{gameOverDiv}
		</div >
	)

}

export default Battlefield;