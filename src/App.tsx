import React, { useState } from "react";
import { Loader } from "./components/Loader/Loader";
import { Person } from "./components/Table/interfaces";
import { Table } from "./components/Table/Table";

export const App: React.FC<{}> = () => {
	const linkLong =
		"http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
	const linkShort =
		"http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
	const [loading, setLoading] = useState(false);
	const [menu, setMenu] = useState(true);
	const [people, setPeople] = useState<Person[]>([]);
	function fetchPersons(link: string) {
		setMenu(false);
		setLoading(true);
		fetch(link)
			.then((response) => response.json())
			.then((data) => {
				setPeople(data);
				setLoading(false);
			});
	}
	if (loading) {
		return <Loader />;
	}
	return (
		<div className="App">
			{menu && (
				<div className="container-menu">
					<h1 className="container-menu__title">Выберите объем данных.</h1>
					<div className="container-menu__buttons">
						<button
							className="container-menu__button"
							onClick={() => fetchPersons(linkShort)}
						>
							Маленький
						</button>
						<button
							className="container-menu__button"
							onClick={() => fetchPersons(linkLong)}
						>
							Большой
						</button>
					</div>
				</div>
			)}
			{!loading && !menu && people.length && <Table people={people} />}
		</div>
	);
};
