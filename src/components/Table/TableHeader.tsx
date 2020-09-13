import React, { ChangeEvent, useState } from "react";
import { TableHeaderProps } from "./interfaces";
import "./tableHeader.sass";
import { TableModal } from "./tableModal";
export const TableHeader: React.FC<TableHeaderProps> = ({
	addPerson,
	sortByString,
}) => {
	const [open, setOpen] = useState(false);
	const [sortString, setSortString] = useState("");
	const [prevSubString, setPrevSubString] = useState("");
	function openModal() {
		setOpen(true);
	}
	function closeModal() {
		setOpen(false);
	}
	function filter() {
		if (!(prevSubString === sortString)) {
			setPrevSubString(sortString);
			sortByString(sortString);
		}
	}
	return (
		<div className="table-header">
			<div className="table-header__container">
				<button
					className="table-header__button table-header__button_add"
					onClick={openModal}
				>
					Add
				</button>
			</div>
			<div className="table-header__container">
				<input
					type="text"
					className="table-header__input"
					placeholder="Write Something..."
					value={sortString}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setSortString(e.target.value.trim())
					}
				/>
				<button
					className="table-header__button table-header__button_find"
					onClick={() => filter()}
				>
					Find
				</button>
			</div>
			<TableModal isOpen={open} closeModal={closeModal} addPerson={addPerson} />
		</div>
	);
};
