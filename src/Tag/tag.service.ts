import { TagServiceContract } from "./tag.types";
import { TagRepo } from "./tag.repository";

export const TagService: TagServiceContract = {
	async getAll(take, skip) {
		if (take && skip) {
			take = +take;
			skip = +skip;
			return TagRepo.getAll(take, skip);
		}
		if (take) {
			take = +take;
			if (!isNaN(take)) {
				return TagRepo.getAll(take);
			}
		}
		if (skip) {
			skip = +skip;

			if (!isNaN(skip)) {
				return TagRepo.getAll(skip);
			}
		} else {
			return TagRepo.getAll();
		}
	},
	async getByID(id) {
		return TagRepo.getByID(id);
	},
};
