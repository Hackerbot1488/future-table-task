export interface Person {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	adress?: {
		streetAddress: string;
		city: string;
		state: string;
		zip: string;
	};
	description?: string;
}
export interface TableRowColumn {
	title: string;
	sorted?: boolean;
	active?: string;
	index?: number;
}
export interface TableRowProps {
	isHeader?: boolean;
	changeSort?: (title: string, index: number) => void;
	columns?: TableRowColumn[];
}
export interface TableProps {
	people: Person[];
}
export interface TableHeaderProps {
	addPerson: (person: Person) => void;
	sortByString: (subString: string) => void;
}
export interface TableModalProps {
	isOpen: boolean;
	closeModal: () => void;
	addPerson: (person: Person) => void;
}
export interface TableFooterProps {
	current: number;
	max: number;
	onLeftClick: (page: number) => void;
	onRightClick: (page: number) => void;
}
