import { UserRepositoryContract } from "./user.types";
import { client } from "../config/client";
import { compare, hash } from "bcryptjs";

export const UserRepository: UserRepositoryContract = {
	async login(email, password) {
		try {
			const usr = await client.user.findUnique({
				where: {
					email: email,
				},
			});
			if (!usr) {
				return null;
			}
			const isMatch = await compare(password, usr.password);
			if (!isMatch) {
				return null;
			}
			return usr;
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
	async register(body) {
		try {
			const hashedPassword = await hash(body.password, 10);

			const hashedCredentials = {
				...body,
				password: hashedPassword,
			};
			const { email, password, firstName, secondName, avatar } =
				hashedCredentials;

			let isRegistered = !!(await client.user.findUnique({
				where: {
					email: email,
				},
			}));

			if (!isRegistered) {
				const user = await client.user.create({
					data: {
						firstName: firstName,
						secondName: secondName,
						email: email,
						avatar: avatar,
						password: password,
					},
				});
				return user.id;
			} else {
				return "Same user already registered";
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
	async me(userId) {
		try {
			return await client.user.findUnique({
				where: {
					id: userId,
				},
				omit: {
					password: true,
				},
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};
