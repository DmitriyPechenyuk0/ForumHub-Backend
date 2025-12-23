import express from "express";

import { PostRouter } from "./Post/post.routes";
import { TagRouter } from "./Tag/tag.routes";
import { UserRouter } from "./User/user.routes";
import cors from "cors";
import { logMiddleware } from "./middlewares/log.middleware";

const app: express.Express = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(logMiddleware);
app.use(PostRouter);
app.use(TagRouter);
app.use(UserRouter);

const PORT: number = 8000;
const HOST: string = "localhost";
const PROTOCOL: string = `http`;

app.listen(PORT, HOST, () => {
	console.log(`Server started on ${PROTOCOL}://${HOST}:${PORT}`);
});
