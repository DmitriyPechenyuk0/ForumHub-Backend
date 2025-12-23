import { Request, Response } from "express";
import { Prisma } from "../generated/prisma";

export type Tag = Prisma.TagGetPayload<{}>;

export interface TagServiceContract {
	getAll: (
		take: number | undefined,
		skip: number | undefined,
	) => Promise<Tag[] | undefined>;
	getByID: (id: number) => Promise<Tag | null>;
}

export interface TagControllerContract {
	getAll: (
		req: Request<
			object,
			Tag[] | string,
			object,
			{ take?: number; skip?: number }
		>,
		res: Response<Tag[] | string | object>,
	) => void;
	getByID: (
		req: Request<{ id: string }, Tag | string, object>,
		res: Response<Tag | string | object | null>,
	) => void;
}

export interface TagRepositoryContract {
	getAll: (
		take?: number | undefined,
		skip?: number | undefined,
	) => Promise<Tag[] | undefined>;
	getByID: (id: number) => Promise<Tag | null>;
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
