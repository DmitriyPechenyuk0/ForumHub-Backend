import { Request, Response } from "express";
import { Prisma, User } from "../generated/prisma";

export type Usr = Prisma.UserGetPayload<{}>;
export type UserWithoutPassword = Omit<Usr, "password">;
export type ForReg = {
	email: string;
	password: string;
	firstName: string;
	secondName: string;
	avatar: string;
};

export interface UserControllerContract {
	login: (
		req: Request<object, string, { email: string; password: string }>,
		res: Response<string>,
	) => void;
	register: (
		req: Request<object, string, ForReg>,
		res: Response<string>,
	) => void;
	me: (req: Request<object, string>, res: Response<string | object>) => void;
}

export interface UserRepositoryContract {
	login: (email: string, password: string) => Promise<User | null>;
	register: (body: ForReg) => Promise<string | number>;
	me: (id: number) => Promise<UserWithoutPassword | string | null>;
}
export interface UserServiceContract {
	login: (email: string, password: string) => Promise<string>;
	register: (body: ForReg) => Promise<string>;
	me: (
		userId: number,
	) => Promise<UserWithoutPassword | string | null | undefined>;
}
// Request<P, ResBody, ReqBody, ReqQuery, Locals>
// P - динамічний параметри (req.params)
// ResBody - відповідь контроллера, те, що робимо у res.json
// ReqBody - тіло запиту (при POST/PATCH) в req.body
// ReqQuery - query параметри запиту, те, що в req.body
// Locals поки не чіпаємо

// Response<ResBody, Locals>
// ResBody - відповідь контроллера, те, що робимо у res.json
// Locals поки не чіпаємо
