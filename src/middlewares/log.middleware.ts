import { Request, Response, NextFunction } from "express";

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
	console.log(
		`[ REQUEST ] [ 📆 ${new Date().toDateString()} at ${new Date().toTimeString().split(" ")[0]} ] [ 🌐 ${req.method} ${req.url} ]`,
	);
	next();
}
