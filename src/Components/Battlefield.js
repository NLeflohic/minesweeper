import React, { useState } from "react";
import RowField from "./RowField";

const Battlefield = (props) => {
	const [gameArea, setGameArea] = useState([]);
	const [init, setInit] = useState(0);

	const tabRow = [];
	const initRow = (nbRow) => {
		for (let i = 0; i < nbRow; i++) {
			tabRow.push({
				key: i.toString(),
				value: <RowField matrix={props.matrix} id={i} gamearea={gameArea} setgamearea={setGameArea} />
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

	return (
		<div className="battlefield">
			<div className="row-battlefield" onClick={onClickEvent} >
				{
					tabRow.map((row, idx) => {
						return (<div key={row.key}>{row.value}</div>)
					})
				}
				{/* <RowField matrix={props.matrix} id={0} gamearea={gameArea} setgamearea={setGameArea} /> */}
				{/* <RowField matrix={props.matrix} id={1} gamearea={gameArea} setgamearea={setGameArea} /> */}
				{/* <RowField matrix={props.matrix} id={2} gamearea={gameArea} setgamearea={setGameArea} /> */}
				{/* <RowField matrix={props.matrix} id={3} gamearea={gameArea} setgamearea={setGameArea} /> */}
				{/* <RowField matrix={props.matrix} id={4} gamearea={gameArea} setgamearea={setGameArea} /> */}
				{/* <RowField matrix={props.matrix} id={5} gamearea={gameArea} setgamearea={setGameArea} /> */}
			</div>
		</div >)
}

export default Battlefield;