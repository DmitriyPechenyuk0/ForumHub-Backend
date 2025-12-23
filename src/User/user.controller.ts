// import { UserService } from "./user.service";
import { UserControllerContract } from "./user.types";
import { userService } from "./user.service";

export const UserController: UserControllerContract = {
	login: async (req, res) => {
		let body = req.body;
		if (!body) {
			res.status(422).json("Body is required.");
			return;
		}
		if (!body.email) {
			res.status(422).json("email is required.");
			return;
		}
		if (!body.password) {
			res.status(422).json("password is required.");
			return;
		}
		const usr = await userService.login(body.email, body.password);

		if (usr === "not found") {
			res.status(404).json("User not found");
			return;
		} else {
			res.status(200).json(usr);
			return;
		}
	},
	register: async (req, res) => {
		let body = req.body;
		if (!body) {
			res.status(422).json("Body is required.");
			return;
		}
		if (!body.firstName) {
			res.status(422).json("firstName is required.");
			return;
		}
		if (!body.secondName) {
			res.status(422).json("secondName is required.");
			return;
		}
		if (!body.email) {
			res.status(422).json("email is required.");
			return;
		}
		if (!body.password) {
			res.status(422).json("password is required.");
			return;
		}
		if (!body.avatar) {
			res.status(422).json("avatar is required.");
			return;
		}
		const JWTOrAlready = await userService.register(body);
		let status = 0;

		switch (JWTOrAlready) {
			case "Same user already registered":
				status = 404;
			default:
				status = 201;
		}

		res.status(status).json(JWTOrAlready);
	},
	me: async (req, res) => {
		const user = await userService.me(res.locals.userId);
		if (user) {
			res.status(200).json(user);
		}
	},
};
