import { client } from "../config/client";
import { PostRepositoryContract } from "./post.types";

export const PostRepo: PostRepositoryContract = {
	async getAll(take, skip) {
		try {
			const options: any = {};

			if (typeof take === "number") options.take = take;
			if (typeof skip === "number") options.skip = skip;

			let sliced = await client.post.findMany({
				...options,
				include: {
					tags: {
						include: {
							tag: true,
						},
					},
				},
			});
			console.log("succes repo");
			return sliced;
		} catch (error) {
			console.log(error);
			client.$disconnect();
			return undefined;
		}
	},
	async getByID(id) {
		try {
			const post = client.post.findUniqueOrThrow({ where: { id: id } });
			return post;
		} catch (error) {
			client.$disconnect();
			return null;
		}
	},
	async update(id, data) {
		try {
			let updatedPost = await client.post.update({
				where: {
					id: id,
				},
				data: data,
			});

			return updatedPost;
		} catch (error) {
			client.$disconnect();
			console.log(error);
			return null;
		}
	},
	async create(data) {
		try {
			const userID = 1;
			const newPost = await client.post.create({
				data: {
					title: data.title,
					description: data.description,
					image: data.image,
					createdBy: {
						connect: {
							id: userID,
						},
					},
				},
			});
			return newPost;
		} catch (err) {
			client.$disconnect();
			return `Post creation error: ${err}`;
		}
	},
	async delete(id) {
		try {
			await client.post.delete({
				where: {
					id: id,
				},
			});
		} catch (error) {
			client.$disconnect();
			return null;
		}
	},
	createComment: async (body, authorId, postId) => {
		try {
			return await client.postComment.create({
				data: {
					body,
					authorId,
					postId,
				},
			});
		} catch (error) {
			client.$disconnect();
			console.log(error);
			return "Comment creation error";
		}
	},
	addLike: async (userId, postId) => {
		try {
			await client.postLike.create({
				data: {
					userId,
					postId,
				},
			});
			return "Like was successfully stamped";
		} catch (error) {
			client.$disconnect();
			console.log(error);
			return "Server Error";
		}
	},
	removeLike: async (userId, postId) => {
		try {
			let like = await client.postLike.delete({
				where: {
					userId_postId: {
						userId,
						postId,
					},
				},
			});
			console.log(like);
			return "Like was successfully removed";
		} catch (error) {
			client.$disconnect();
			console.log(error);
			return "Server Error";
		}
	},
};
