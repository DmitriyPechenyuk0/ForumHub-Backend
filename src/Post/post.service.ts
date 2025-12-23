import { UpdatePostData, PostServiceContract } from "./post.types";
import { PrismaClient } from "../generated/prisma";
import { PostRepo } from "./post.repository";
const client = new PrismaClient();

export const PostService: PostServiceContract = {
	async create(data) {
		return PostRepo.create(data);
	},
	getAll: async (take, skip) => {
		if (take && skip) {
			take = +take;
			skip = +skip;
			return PostRepo.getAll(take, skip);
		}
		if (take) {
			take = +take;
			if (!isNaN(take)) {
				return PostRepo.getAll(take);
			}
		}
		if (skip) {
			skip = +skip;

			if (!isNaN(skip)) {
				return PostRepo.getAll(skip);
			}
		} else {
			return PostRepo.getAll();
		}
	},
	getByID(id, includeComments, includeLikedBy) {
		try {
			return PostRepo.getByID(id, includeComments, includeLikedBy);
		} catch (error) {
			console.log(error);
			throw new Error("error");
		}
	},
	async update(id, data) {
		let updateData: UpdatePostData = {};

		if (data.title !== undefined) {
			updateData.title = data.title;
		}
		if (data.description !== undefined) {
			updateData.description = data.description;
		}
		if (data.image !== undefined) {
			updateData.image = data.image;
		}
		return PostRepo.update(id, updateData);
	},
	async delete(id) {
		return PostRepo.delete(id);
	},
	createComment: async (body, authorId, postId) => {
		try {
			return PostRepo.createComment(body, authorId, postId);
		} catch (error) {
			console.log(error);
			return "Comment creation error";
		}
	},
	addLike: async (userId, postId) => {
		try {
			return await PostRepo.addLike(userId, postId);
		} catch (error) {
			console.log(error);
			return "Server error";
		}
	},
	removeLike: async (userId, postId) => {
		try {
			return await PostRepo.removeLike(userId, postId);
		} catch (error) {
			console.log(error);
			return "Server error";
		}
	},
};
