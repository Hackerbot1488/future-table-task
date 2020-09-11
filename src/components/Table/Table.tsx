import React, { useEffect, useState } from "react";
import { TableRow } from "./TableRow";
import { TableRowColumn } from "./interfaces";
import "./table.sass";
export const Table: React.FC<{}> = () => {
	const link =
		"http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
	const headerColumns: TableRowColumn[] = [
		{ title: "id", sorted: true },
		{ title: "firstName", sorted: true },
		{ title: "lastName", sorted: true },
		{ title: "email", sorted: false },
		{ title: "phone", sorted: false },
	];
	const [data, setData] = useState([]);
	const [persons, setPersons] = useState([]);
	const [loading, setLoading] = useState(false);
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
			<TableRow isHeader columns={headerColumns} />
			{persons.map((pers: any, index) => {
				const columns = [
					{ title: pers.id },
					{ title: pers.firstName },
					{ title: pers.lastName },
					{ title: pers.email },
					{ title: pers.phone },
				];
				return <TableRow columns={columns} />;
			})}
		</div>
	);
};
