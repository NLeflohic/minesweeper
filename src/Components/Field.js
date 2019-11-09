import React, { useState } from "react";

const Field = (props) => {
	const [status, setStatus] = useState(0);
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

	return (
		<button className="field" onClick={() => {
			const res = checkFieldStatus();
			setStatus(res);
			const newgamearea = [...props.game];
			newgamearea[props.row][props.col] = res;
			props.setgame(newgamearea);
		}
		}>
			{status}
		</button>
	);
};

export default Field;