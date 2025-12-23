import express from 'express'
import { PostController } from './post.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const PostRouter: express.Router = express.Router()

PostRouter.get("/posts", PostController.getAll)
PostRouter.get("/posts/:id", PostController.getByID)
PostRouter.post('/posts/:postId/comments', authMiddleware, PostController.createComment)
PostRouter.post("/posts", PostController.create)
PostRouter.patch('/posts/:id',PostController.update)
PostRouter.delete('/posts/:id',PostController.delete)
PostRouter.put('/posts/:postId/likes/:userId', PostController.addLike)
PostRouter.delete('/posts/:postId/likes/:userId', PostController.removeLike)
// Мидлвары пока что для тестов убрал


export { PostRouter }