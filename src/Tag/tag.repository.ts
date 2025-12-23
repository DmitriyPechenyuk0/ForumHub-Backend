import { client } from "../config/client";
import { TagRepositoryContract } from "./tag.types";

export const TagRepo: TagRepositoryContract = {
	async getAll(take, skip) {
		try {
			const options: any = {};

			if (typeof take === "number") options.take = take;
			if (typeof skip === "number") options.skip = skip;

			let sliced = await client.tag.findMany(options);

			return sliced;
		} catch (error) {
			client.$disconnect();
			return undefined;
		}
	},
	async getByID(id) {
		try {
			const post = client.tag.findUniqueOrThrow({ where: { id: id } });
			return post;
		} catch (error) {
			client.$disconnect();
			return null;
		}
	},
};
