import React, { useState } from "react";
import Field from "./Field";

const RowField = (props) => {
	let tabBattlefield = [];
	const initRow = () => {
		for (let i = 0; i < 6; i++) {
			tabBattlefield.push({
				key: i.toString(),
				value: <Field matrix={props.matrix} row={props.id} col={i} game={props.gamearea}
					setgame={props.setgamearea} gameover={props.gameover} gameoverfunc={props.gameoverfunc}
					win={props.win} winfunc={props.winfunc} tabrow={props.tabrow} tabbattle={tabBattlefield}
				/>
			});
		}
	};

	initRow();
	return (
		<div className="row-field">
			{tabBattlefield.map((field, idx) => {
				return (
					<div className="row" key={field.key}>
						{field.value}
					</div>
				);
			})}
		</div>
	)
};

export default RowField;