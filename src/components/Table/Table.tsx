import React, { useCallback, useEffect, useState } from "react";
import { TableRow } from "./TableRow";
import { Person, TableProps, TableRowColumn } from "./interfaces";
import "./table.sass";
import { title } from "process";
export const Table: React.FC<TableProps> = ({ people }) => {
	let headerColumns: TableRowColumn[] = [
		{ title: "id", sorted: true, active: "default", index: 0 },
		{ title: "firstName", sorted: true, active: "default", index: 1 },
		{ title: "lastName", sorted: true, active: "default", index: 2 },
		{ title: "email", sorted: false },
		{ title: "phone", sorted: false },
	];
	const [header, setHeader] = useState(headerColumns);
	const [persons, setPersons] = useState<Person[]>([]);
	const [sortType, setSortType] = useState({ title: "", to: "" });
	function changeActive(newIndex, toNew, oldIndex?, toOld?) {
		setHeader(() => {
			let columns: TableRowColumn[] = [];
			for (const el of header) {
				if (el.index === oldIndex) {
					columns.push({
						title: el.title,
						sorted: el.sorted,
						active: toOld,
						index: el.index,
					});
				} else if (el.index === newIndex) {
					columns.push({
						title: el.title,
						sorted: el.sorted,
						active: toNew,
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
			changeActive(index, "up");
			setSortType({ title: title, to: "up" });
		} else if (sortType.title === title) {
			if (sortType.to === "up") {
				changeActive(index, "down");
				setSortType({ title: title, to: "down" });
			} else {
				changeActive(index, "default");
				setSortType({ title: "", to: "" });
			}
		} else {
			const oldIndex = header.findIndex((el) => el.title === sortType.title);
			changeActive(index, "up", oldIndex, "default");
			setSortType({ title: title, to: "up" });
		}
	}
	const compareUp = useCallback(
		(a: Person, b: Person) => {
			const prop = sortType.title;
			if (a[prop] > b[prop]) {
				return 1;
			}
			if (a[prop] < b[prop]) {
				return -1;
			}
			return 0;
		},
		[sortType.title]
	);
	const compareDown = useCallback(
		(a: Person, b: Person) => {
			const prop = sortType.title;
			if (a[prop] > b[prop]) {
				return -1;
			}
			if (a[prop] < b[prop]) {
				return 1;
			}
			return 0;
		},
		[sortType.title]
	);
	useEffect(() => {
		setPersons(people);
	}, [people]);
	useEffect(() => {
		console.log(sortType);
		if (sortType.title === "") {
			setPersons(people);
		} else {
			if (sortType.to === "up") {
				console.log("up");
				persons.sort(compareUp);
			} else if (sortType.to === "down") {
				persons.sort(compareDown);
			}
		}
	}, [sortType, people, persons, compareDown, compareUp]);
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
