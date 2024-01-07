export interface UsersType {
	_id: string
	name: string
	age: number
	city: string
}

export type UsersCollectionType = UsersType[]

export interface Query {
	[key: string]: any;
}

export interface Options {
	sort?: { [key: string]: number };
	limit?: number;
}