import React, { useState } from "react";

const Field = React.memo((props) => {
	const setIcon = (icon) => {
		return icon;
	}

	const getFieldInfo = (row, col) => {
		let fieldInfo = {};
		fieldInfo.currentRow = row;
		fieldInfo.currentCol = col;
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
		return fieldInfo;
	}

	const checkBombAround = (fieldInfo) => {
		let nbBombAround = 0;
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

	const showFieldsAround = (fieldInfo) => {
		const newgamearea = [...props.game];
		console.log(fieldInfo);
		for (let i = fieldInfo.rowMin; i <= fieldInfo.rowMax; i++) {
			for (let j = fieldInfo.colMin; j <= fieldInfo.colMax; j++) {
				if (props.matrix[i][j] === 0) {
					const fieldInfo = getFieldInfo(i, j);
					const nbBomb = checkBombAround(fieldInfo);
					if (nbBomb === 0) {
						newgamearea[i][j] = 0;
					} else {
						newgamearea[i][j] = nbBomb;
					}
				}
			}
			props.setgame(newgamearea);

			// if ((fieldInfo.currentRow > 0) && (fieldInfo.currentCol > 0)) {
			// 	const newFieldInfo = getFieldInfo(fieldInfo.currentRow - 1, fieldInfo.currentCol - 1);
			// 	showFieldsAround(newFieldInfo);
			// }
			// if (fieldInfo.currentRow > 0) {
			// 	const newFieldInfo = getFieldInfo(fieldInfo.currentRow - 1, fieldInfo.currentCol);
			// 	showFieldsAround(newFieldInfo);
			// }
			// if ((fieldInfo.currentRow > 0) && (fieldInfo.currentCol < 6)) {
			// 	const newFieldInfo = getFieldInfo(fieldInfo.currentRow - 1, fieldInfo.currentCol + 1);
			// 	showFieldsAround(newFieldInfo);
			// }
			// if (fieldInfo.currentCol > 0) {
			// 	const newFieldInfo = getFieldInfo(fieldInfo.currentRow, fieldInfo.currentCol - 1);
			// 	showFieldsAround(newFieldInfo);
			// }
			// if (fieldInfo.currentCol < 6) {
			// 	const newFieldInfo = getFieldInfo(fieldInfo.currentRow, fieldInfo.currentCol + 1);
			// 	showFieldsAround(newFieldInfo);
			// }
			// if ((fieldInfo.currentRow < 6) && (fieldInfo.currentCol > 0)) {
			// 	const newFieldInfo = getFieldInfo(fieldInfo.currentRow + 1, fieldInfo.currentCol - 1);
			// 	showFieldsAround(newFieldInfo);
			// }
			// if (fieldInfo.currentRow < 6) {
			// 	const newFieldInfo = getFieldInfo(fieldInfo.currentRow + 1, fieldInfo.currentCol);
			// 	showFieldsAround(newFieldInfo);
			// }
			// if ((fieldInfo.currentRow < 6) && (fieldInfo.currentCol < 6)) {
			// 	const newFieldInfo = getFieldInfo(fieldInfo.currentRow + 1, fieldInfo.currentCol + 1);
			// 	showFieldsAround(newFieldInfo);
			// }
		}
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
		} else if (fieldStatus === -2) {
			return ""
		}
		else {
			return fieldStatus;
		}
	}

	let status = props.game[props.row][props.col];
	console.log("satus " + status);
	const defaultIcon = getIcon(status);
	let icon = defaultIcon;
	console.log("icon " + icon);

	return (
		<button className="field" onClick={(event) => {
			if (props.gameover === 0) {
				const result = checkFieldStatus();
				const newgamearea = [...props.game];
				newgamearea[props.row][props.col] = result;
				props.setgame(newgamearea);
				const icon = getIcon(result);
				setIcon(icon);
				const fieldInfo = getFieldInfo(props.row, props.col);
				if (result !== 9) {
					showFieldsAround(fieldInfo);
				}
			}
		}
		} onContextMenu={(e) => {
			e.preventDefault();
			if (props.gameover === 0) {
				console.log(status);
				if (status === -1) {
					const newgamearea = [...props.game];
					newgamearea[props.row][props.col] = -2;
					const icon = getIcon(status);
					setIcon(icon);
					const result = checkFieldStatus();
					if (result === 9) {
						props.winfunc(props.win + 1);
					}
					props.setgame(newgamearea);
				} else if (status === -2) {
					//setStatus(-1);
					const newgamearea = [...props.game];
					newgamearea[props.row][props.col] = -1;
					setIcon("");
					const result = checkFieldStatus();
					if (result === 9) {
						props.winfunc(props.win - 1);
					}
					props.setgame(newgamearea);
				}
			}
		}}
		>
			{icon}
		</button >
	);
});

export default Field;