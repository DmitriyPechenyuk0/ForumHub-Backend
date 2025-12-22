import express from 'express'
import { PostController } from './post.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const PostRouter: express.Router = express.Router()

PostRouter.get("/posts", PostController.getAll)
PostRouter.get("/posts/:id", PostController.getByID)
PostRouter.post('/posts/:postId/comments', PostController.createComment)
PostRouter.post("/posts", authMiddleware, PostController.create)
PostRouter.patch('/posts/:id', authMiddleware,PostController.update)
PostRouter.delete('/posts/:id', authMiddleware,PostController.delete)

export { PostRouter }