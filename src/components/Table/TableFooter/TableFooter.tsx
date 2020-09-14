import React from "react";
import "./tableFooter.sass";
import Right from "../../../img/right.svg";
import Left from "../../../img/left.svg";
import { TableFooterProps } from "../interfaces";
import classNames from "class-names";
export const TableFooter: React.FC<TableFooterProps> = ({
	current,
	max,
	onLeftClick,
	onRightClick,
}) => {
	const leftArrow = classNames("pagination-button", "pagination-button_left", {
		"pagination-button_disabled": current === 0,
	});
	const rightArrow = classNames(
		"pagination-button",
		"pagination-button_right",
		{ "pagination-button_disabled": current === max }
	);
	console.log(`current ${current} maxPage ${max}`);
	return (
		<div className="table-footer">
			<div className="table-footer__container">
				<button
					className={leftArrow}
					onClick={() => !(current === 0) && onLeftClick(current)}
				>
					<img className="pagination-button__icon" src={Left} alt="left" />
				</button>
				<span className="pagination-page">{current + 1}</span>
				<button
					className={rightArrow}
					onClick={() => !(current === max) && onRightClick(current)}
				>
					<img className="pagination-button__icon" src={Right} alt="right" />
				</button>
			</div>
		</div>
	);
};
TableFooter.defaultProps = {
	current: 0,
	max: 0,
	onLeftClick: () => {},
	onRightClick: () => {},
};
