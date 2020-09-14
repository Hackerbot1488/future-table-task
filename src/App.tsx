import React, { useEffect, useState } from "react";
import { Person } from "./components/Table/interfaces";
import { Table } from "./components/Table/Table";

export const App: React.FC<{}> = () => {
	const link =
		"http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
	const [loading, setLoading] = useState(false);
	const [people, setPeople] = useState<Person[]>([]);
	useEffect(() => {
		setLoading(true);
		fetch(link)
			.then((response) => response.json())
			.then((data) => {
				setPeople(data);
			});
		setLoading(false);
	}, []);
	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<div className="App">
			<Table people={people} />
		</div>
	);
};
