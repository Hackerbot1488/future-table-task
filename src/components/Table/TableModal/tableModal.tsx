import React, { ChangeEvent, useState } from "react";
import { Modal } from "../../Modal/Modal";
import { Person, TableModalProps } from "../interfaces";

export const TableModal: React.FC<TableModalProps> = ({
	isOpen,
	closeModal,
	addPerson,
}) => {
	const [id, setId] = useState<string | number>("");
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	function clearData() {
		setId("");
		setName("");
		setSurname("");
		setPhone("");
		setEmail("");
	}
	function onCancel() {
		clearData();
		closeModal();
	}
	function onSubmit() {
		const person: Person = {
			id: Number(id),
			firstName: name,
			lastName: surname,
			phone,
			email,
		};
		addPerson(person);
		onCancel();
	}
	return (
		<Modal
			title="Add new user"
			isOpen={isOpen}
			onCancel={onCancel}
			onSubmit={onSubmit}
		>
			<div className="container">
				<div className="container__column">
					<div className="container__row">
						<label htmlFor="id" className="container__label">
							Id
						</label>
						<input
							type="number"
							id="id"
							className="container__input"
							value={id}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setId(Number(e.target.value))
							}
						/>
					</div>
					<div className="container__row">
						<label htmlFor="firstName" className="container__label">
							FirstName
						</label>
						<input
							type="text"
							id="firstName"
							className="container__input"
							value={name}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setName(e.target.value)
							}
						/>
					</div>
					<div className="container__row">
						<label htmlFor="lastName" className="container__label">
							LastName
						</label>
						<input
							type="text"
							id="lastName"
							className="container__input"
							value={surname}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setSurname(e.target.value)
							}
						/>
					</div>
				</div>
				<div className="container__column">
					<div className="container__row">
						<label htmlFor="email" className="container__label">
							Email
						</label>
						<input
							type="text"
							id="email"
							className="container__input"
							value={email}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setEmail(e.target.value)
							}
						/>
					</div>
					<div className="container__row">
						<label htmlFor="phone" className="container__label">
							Phone
						</label>
						<input
							type="text"
							id="phone"
							className="container__input"
							value={phone}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setPhone(e.target.value)
							}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};
