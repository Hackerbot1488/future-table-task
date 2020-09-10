export interface TableRowColumn {
	title: string;
	sorted?: boolean;
	active?: string | boolean;
}
export interface TableRowProps {
	isHeader?: boolean;
	columns?: TableRowColumn[];
}
