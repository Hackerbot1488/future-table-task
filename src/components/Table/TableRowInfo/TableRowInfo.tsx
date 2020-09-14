import React from "react";
import { TableRowInfoProps } from "../interfaces";
import "./tableRowInfo.sass";
export const TableRowInfo: React.FC<TableRowInfoProps> = ({
	person,
	isActive,
	hidePerson,
}) => {
	console.log(person);
	return (
		<>
			{isActive && (
				<div className="table-row-info">
					<div className="table-row-info__header">
						<button onClick={hidePerson}>&times;</button>
					</div>
					<div className="person">
						<p className="table-row-info__paragraph">
							Выбран пользователь:
							<b>{person!.firstName + " " + person!.lastName}</b>
						</p>
						<p className="table-row-info__paragraph">
							<span>Описание:</span>
							<br></br>
							<textarea value={person!.description} readOnly></textarea>
						</p>
						<p className="table-row-info__paragraph">
							Адрес проживания: <b>{person!.address?.streetAddress}</b>
						</p>
						<p className="table-row-info__paragraph">
							Город: <b>{person!.address?.city}</b>
						</p>
						<p className="table-row-info__paragraph">
							Провинция/штат: <b>{person!.address?.state}</b>
						</p>
						<p className="table-row-info__paragraph">
							Индекс: <b>{person?.address?.zip}</b>
						</p>
					</div>
				</div>
			)}
		</>
	);
};
TableRowInfo.defaultProps = {
	isActive: false,
	person: {
		id: 0,
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
	},
};
