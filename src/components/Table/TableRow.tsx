import React from "react";
import { TableRowProps, TableRowColumn } from "./interfaces";
import classNames from "class-names";
import "./tableRow.sass";
import icon from "../../img/arrow.svg";
export const TableRow: React.FC<TableRowProps> = ({
	isHeader,
	columns,
	changeSort,
}) => {
	const rowClasses = classNames("table__row", { table__row_header: isHeader });
	let columnClasses = "";
	let iconClasses = "";
	return (
		<div className={rowClasses}>
			{columns!.map((column: TableRowColumn) => {
				columnClasses = classNames("table__column", {
					table__column_sorted: column.sorted,
				});
				iconClasses = classNames(
					"arrow",
					{ arrow_up: column.active === "up" },
					{ arrow_down: column.active === "down" }
				);
				return (
					<div className={columnClasses} key={column.title + Math.random()}>
						<span
							onClick={() =>
								column.sorted && changeSort!(column.title, column.index!)
							}
						>
							{column.title}
							{column.sorted && (
								<img className={iconClasses} src={icon} alt="^"></img>
							)}
						</span>
					</div>
				);
			})}
		</div>
	);
};
