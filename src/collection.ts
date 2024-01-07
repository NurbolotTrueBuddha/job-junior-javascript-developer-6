// collection.ts
import type { UsersCollectionType, UsersType } from "./types";

interface Query {
	name?: string;
	age?: number;
	city?: string;
	[key: string]: any;
}

interface Options {
	sort?: { [key: string]: number };
	limit?: number;
}

export class Collection {
	data: UsersCollectionType;

	constructor(data: UsersCollectionType = []) {
		this.data = data;
	}

	async find(query: Query = {}, options: Options = {}): Promise<UsersCollectionType> {
		const filterFn = (entry: any): boolean => {
			for (const key in query) {
				if (query.hasOwnProperty(key)) {
					if (query[key].hasOwnProperty('$gte')) {
						if (!(entry[key] >= query[key].$gte)) return false;
					} else {
						if (entry[key] !== query[key]) return false;
					}
				}
			}
			return true;
		};

		let result = this.data.filter(filterFn);

		if (options.sort) {
			for (const key in options.sort) {
				if (options.sort.hasOwnProperty(key)) {
					const direction = options.sort[key];
					//@ts-ignore
					result.sort((a, b) => (a[key] - b[key]) * direction);
				}
			}
		}

		if (options.limit) {
			result = result.slice(0, options.limit);
		}

		return result;
	}
}
