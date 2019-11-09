import React, { useState } from "react";
import RowField from "./RowField";

const Battlefield = (props) => {
	const [gameArea, setGameArea] = useState([]);
	const [init, setInit] = useState(0);


	if (init === 0) {
		setInit(1);
		setGameArea(props.gamearea);
	}

	const onClickEvent = () => {
		console.log(gameArea);
	}

	return (
		<div className="battlefield">
			<div className="row-battlefield" onClick={onClickEvent} >
				<RowField matrix={props.matrix} id={0} gamearea={gameArea} setgamearea={setGameArea} />
				<RowField matrix={props.matrix} id={1} gamearea={gameArea} setgamearea={setGameArea} />
				<RowField matrix={props.matrix} id={2} gamearea={gameArea} setgamearea={setGameArea} />
				<RowField matrix={props.matrix} id={3} gamearea={gameArea} setgamearea={setGameArea} />
				<RowField matrix={props.matrix} id={4} gamearea={gameArea} setgamearea={setGameArea} />
				<RowField matrix={props.matrix} id={5} gamearea={gameArea} setgamearea={setGameArea} />
			</div>
		</div >)
}

export default Battlefield;