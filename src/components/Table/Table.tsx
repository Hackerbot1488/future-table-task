import React, { useEffect, useState } from "react";
import { TableRow } from "./TableRow/TableRow";
import { Person, TableProps, TableRowColumn } from "./interfaces";
import "./table.sass";
import { TableHeader } from "./TableHeader/TableHeader";
import { TableFooter } from "./TableFooter/TableFooter";
import { TableRowInfo } from "./TableRowInfo/TableRowInfo";
export const Table: React.FC<TableProps> = ({ people }) => {
	let headerColumns: TableRowColumn[] = [
		{ title: "id", sorted: true, active: "default", index: 0 },
		{ title: "firstName", sorted: true, active: "default", index: 1 },
		{ title: "lastName", sorted: true, active: "default", index: 2 },
		{ title: "email", sorted: false },
		{ title: "phone", sorted: false },
	];
	let type = "";
	const [header, setHeader] = useState(headerColumns);
	const [person, setPerson] = useState<Person>();
	const [showInfo, setShowInfo] = useState(false);
	const [initialPersons, setInitialPersons] = useState<Person[]>([]);
	const [persons, setPersons] = useState<Person[]>([]);
	const [personsBeforeSort, setPersonsBeforeSort] = useState<Person[]>([]);
	const [sortType, setSortType] = useState({ title: "", to: "" });
	const [page, setPage] = useState(0);
	const [maxPage, setMaxPage] = useState(0);
	function compareUp(a: Person, b: Person) {
		const prop = type;
		if (a[prop] > b[prop]) {
			return 1;
		}
		if (a[prop] < b[prop]) {
			return -1;
		}
		return 0;
	}
	function compareDown(a: Person, b: Person) {
		const prop = type;
		if (a[prop] > b[prop]) {
			return -1;
		}
		if (a[prop] < b[prop]) {
			return 1;
		}
		return 0;
	}
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
			type = title;
			setPersons((prev: Person[]) => prev.sort(compareUp));
		} else if (sortType.title === title) {
			if (sortType.to === "up") {
				changeActive(index, "down");
				setSortType({ title: title, to: "down" });
				type = title;
				setPersons((prev: Person[]) => prev.sort(compareDown));
			} else {
				changeActive(index, "default");
				setSortType({ title: "", to: "" });
				type = "";
				setPersons(personsBeforeSort.slice());
			}
		} else {
			const oldIndex = header.findIndex((el) => el.title === sortType.title);
			changeActive(index, "up", oldIndex, "default");
			setSortType({ title: title, to: "up" });
			type = title;
			setPersons((prev: Person[]) => prev.sort(compareUp));
		}
	}
	function addPerson(person: Person) {
		setInitialPersons((prev: Person[]) => [person, ...prev]);
		setPersonsBeforeSort((prev: Person[]) => [person, ...prev]);
		setPersons([person, ...personsBeforeSort.slice()]);
	}
	function sortByString(subString: string) {
		if (subString === "") {
			setPersonsBeforeSort(initialPersons.slice());
			setPersons(initialPersons.slice());
			setMaxPage(
				Math.floor((initialPersons.length - 1) / 50) < 0
					? 0
					: Math.floor((initialPersons.length - 1) / 50)
			);
		} else {
			const reg = new RegExp(`${subString}`);
			let i = 0;
			const filtered = initialPersons.filter(
				(pers: Person) =>
					(reg.test(String(pers.id)) ||
						reg.test(pers.firstName) ||
						reg.test(pers.lastName) ||
						reg.test(pers.phone) ||
						reg.test(pers.email)) &&
					i++
			);
			setPersonsBeforeSort(filtered.slice());
			setPersons(() => filtered);
			setMaxPage(Math.floor((i - 1) / 50) < 0 ? 0 : Math.floor((i - 1) / 50));
			page > (Math.floor((i - 1) / 50) < 0 ? 0 : Math.floor((i - 1) / 50)) &&
				setPage(Math.floor((i - 1) / 50) < 0 ? 0 : Math.floor((i - 1) / 50));
		}
	}
	function leftClick(current: number) {
		setPage(current - 1);
	}
	function rightClick(current: number) {
		setPage(current + 1);
	}
	function showPerson(person: Person) {
		setPerson(person);
		setShowInfo(true);
	}
	function hidePerson() {
		setPerson(undefined);
		setShowInfo(false);
	}
	useEffect(() => {
		setPersons(people.slice());
		setInitialPersons(people.slice());
		setPersonsBeforeSort(people.slice());
		console.log("updated");
		setMaxPage(
			Math.floor((people.length - 1) / 50) < 0
				? 0
				: Math.floor((people.length - 1) / 50)
		);
	}, [people]);

	return (
		<>
			<div className="table">
				<TableHeader addPerson={addPerson} sortByString={sortByString} />
				<TableRow isHeader columns={header} changeSort={changeSort} />
				{persons
					.slice(
						page * 50,
						page * 50 + 50 > persons.length ? persons.length : page * 50 + 50
					)
					.map((pers: any, index) => {
						const columns = [
							{ title: pers.id },
							{ title: pers.firstName },
							{ title: pers.lastName },
							{ title: pers.email },
							{ title: pers.phone },
						];
						return (
							<TableRow
								columns={columns}
								key={Math.random() + index}
								person={pers}
								showPerson={showPerson}
							/>
						);
					})}
				<TableFooter
					current={page}
					max={maxPage}
					onLeftClick={leftClick}
					onRightClick={rightClick}
				/>
			</div>
			<TableRowInfo
				person={person}
				isActive={showInfo}
				hidePerson={hidePerson}
			/>
		</>
	);
};
