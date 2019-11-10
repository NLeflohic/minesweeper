import React, { useState } from "react";

const Field = (props) => {
	const [status, setStatus] = useState(-1);
	const [icon, setIcon] = useState();
	const fieldInfo = {};

	const checkBombAround = (row, col) => {
		let nbBombAround = 0;

		if (row === 0) {
			fieldInfo.rowMin = 0;
		} else {
			fieldInfo.rowMin = row - 1;
		};
		if (row === 5) {
			fieldInfo.rowMax = 5
		} else {
			fieldInfo.rowMax = row + 1;
		};
		if (col === 0) {
			fieldInfo.colMin = 0
		} else {
			fieldInfo.colMin = col - 1;
		};
		if (col === 5) {
			fieldInfo.colMax = 5
		} else {
			fieldInfo.colMax = col + 1;
		}
		for (let i = fieldInfo.rowMin; i <= fieldInfo.rowMax; i++) {
			for (let j = fieldInfo.colMin; j <= fieldInfo.colMax; j++) {
				if (props.matrix[i][j] === 1) {
					nbBombAround++;
				}
			}
		}
		return nbBombAround;
	}

	const checkFieldsAround = (line, col) => {
		return checkBombAround(line, col);
	}

	const checkFieldStatus = () => {
		const statusMatrix = props.matrix[props.row][props.col];
		if (statusMatrix === 1) {
			return 9
		} else {
			return checkFieldsAround(props.row, props.col);
		}
	}

	const getIcon = (fieldStatus) => {
		if (fieldStatus === 9) {
			props.gameoverfunc(1);
			return "☠️";
		} else if (fieldStatus === 0) {
			console.log(fieldStatus);
			return "✅";
		} else if (fieldStatus === -1) {
			return "⚠️"
		}
		else {
			return fieldStatus;
		}
	}

	return (
		<button className="field" onClick={(event) => {
			if (props.gameover === 0) {
				console.log("click")
				const result = checkFieldStatus();
				setStatus(result);
				const newgamearea = [...props.game];
				newgamearea[props.row][props.col] = result;
				props.setgame(newgamearea);
				const icon = getIcon(result);
				setIcon(icon);
			}
		}
		} onContextMenu={(e) => {
			e.preventDefault();
			if (props.gameover === 0) {
				console.log(status);
				if (status === -1) {
					setStatus(-2);
					const icon = getIcon(status);
					setIcon(icon);
					const result = checkFieldStatus();
					if (result === 9) {
						props.winfunc(props.win + 1);
					}
				} else if (status === -2) {
					setStatus(-1);
					setIcon("");
					const result = checkFieldStatus();
					if (result === 9) {
						props.winfunc(props.win - 1);
					}
				}
			}
		}}
		>
			{icon}
		</button >
	);
};

export default Field;