import React, { useEffect, useState } from "react";
import { TableRow } from "./TableRow";
import { TableRowColumn } from "./interfaces";
import "./table.sass";
import { title } from "process";
export const Table: React.FC<{}> = () => {
	const link =
		"http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
	let headerColumns: TableRowColumn[] = [
		{ title: "id", sorted: true, active: "default", index: 0 },
		{ title: "firstName", sorted: true, active: "default", index: 1 },
		{ title: "lastName", sorted: true, active: "default", index: 2 },
		{ title: "email", sorted: false },
		{ title: "phone", sorted: false },
	];
	const [data, setData] = useState([]);
	const [header, setHeader] = useState(headerColumns);
	const [persons, setPersons] = useState([]);
	const [loading, setLoading] = useState(false);
	const [sortType, setSortType] = useState({ title: "", to: "" });
	function changeActive(index, to) {
		setHeader(() => {
			let columns: TableRowColumn[] = [];
			for (const el of header) {
				if (el.index === index) {
					columns.push({
						title: el.title,
						sorted: el.sorted,
						active: to,
						index: el.index,
					});
				} else {
					columns.push(el);
				}
			}
			return columns;
		});
	}
	function changeSort(title: string, index: number) {
		if (sortType.title === "") {
			headerColumns[index].active = "up";
			setSortType({ title: title, to: "up" });
		} else if (sortType.title === title) {
			if (sortType.to === "up") {
				headerColumns[index].active = "down";
				setSortType({ title: title, to: "down" });
			} else {
				headerColumns[index].active = "default";
				setSortType({ title: "", to: "" });
			}
		} else {
			headerColumns[
				headerColumns.findIndex((col) => col.title === sortType.title)
			].active = "default";
			headerColumns[index].active = "up";
			setSortType({ title: title, to: "up" });
		}
	}
	useEffect(() => {
		setLoading(true);
		fetch(link)
			.then((response) => response.json())
			.then((data) => {
				setPersons(data);
				setData(data);
			});
		setLoading(false);
	}, []);
	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<div className="table">
			<TableRow isHeader columns={header} changeSort={changeSort} />
			{persons.map((pers: any, index) => {
				const columns = [
					{ title: pers.id },
					{ title: pers.firstName },
					{ title: pers.lastName },
					{ title: pers.email },
					{ title: pers.phone },
				];
				return <TableRow columns={columns} key={title + index} />;
			})}
		</div>
	);
};
