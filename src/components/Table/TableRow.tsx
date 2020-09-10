import React from "react";
import { TableRowProps, TableRowColumn } from "./interfaces";
import classNames from "class-names";

export const TableRow: React.FC<TableRowProps> = ({ isHeader, columns }) => {
	const rowClasses = classNames("table__row", { table__row_header: isHeader });
	let columnClasses = "";
	return (
		<div className={rowClasses}>
			{columns!.map((column: TableRowColumn) => {
				columnClasses = classNames("table__column", {
					table__column_sorted: column.sorted,
					arrow_up: column.active === "up",
					arrow_down: column.active === "down",
				});
				return <div className={columnClasses}>{column.title}</div>;
			})}
		</div>
	);
};
