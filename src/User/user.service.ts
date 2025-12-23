import { UserServiceContract } from "./user.types";
import { UserRepository } from "./user.repository";
import { sign, verify } from "jsonwebtoken";
import { env } from "../config/env";

export const userService: UserServiceContract = {
	async login(email, password) {
		const user = await UserRepository.login(email, password);

		if (!user) {
			return "not found";
		} else {
			return sign({ userId: user.id }, env.SECRET_KEY, {
				expiresIn: "7d",
			});
		}
	},
	async register(body) {
		const user = await UserRepository.register(body);

		if (user) {
			throw new Error("USER_EXISTS");
		}
		if (typeof user === "number") {
			return sign({ userId: user }, env.SECRET_KEY, { expiresIn: "7d" });
		}
		return user;
	},
	async me(userId) {
		try {
			return await UserRepository.me(userId);
		} catch (error) {
			console.log(error);
			return "error";
		}
	},
};
