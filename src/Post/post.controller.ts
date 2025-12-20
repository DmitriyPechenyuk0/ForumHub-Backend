import { Request, Response } from "express"
import { PostService } from "./post.service";
import { PostControllerContract } from "./post.types";

export const PostController: PostControllerContract = {
    getAll: async (req, res) =>{
        let skip: any = req.query.skip
        let take: any = req.query.take
        const answer = await PostService.getAll(take, skip)
        res.json(answer)
        console.log(answer)
        
    },
    getByID: (req, res)=>{
        if (!req.params.id){
            res.status(400).json("id is required");
            return
        } 
        const id = +req.params.id
        console.log(id)
        if (isNaN(id)){
            res.status(400).json("id must be an integer");
            return;
        }
      
        res.json(PostService.getByID(id))
    },
    create: async (req, res) => {
        let body = req.body
        if (!body) {
            res.status(422).json("Body is required.")
            return
        }

        if (!body.title){
            res.status(422).json('title is required.')
            return
        }
        
        if (!body.description){
            res.status(422).json('description is required.')
            return
        }
        if (!body.image){
            res.status(422).json('image is required.')
            return
        }

        
        
        const post = await PostService.create(body)
        if (!post) {
            res.status(500).json("Product creation error")
            return
        }
        res.status(201).json(post)
    },
    update: async(req, res) => {
        const id = req.params.id
        if (!id){
            res.status(400).json("id is required");
            return
        }
        if (isNaN(+id)){
            res.status(400).json("id must be an integer");
            return;
        }
        const body = req.body
        if (body.id){
            res.status(422).json("body must not consist id");
            return
        }
        const post = await PostService.update(+id, body)
        if (!post) {
            res.status(500).json("Post update error")
            return
        }
        res.status(200).json(post)
    },
    delete: async (req, res) => {
        try {
            let iid = Number(req.params.id)
            if (iid){
                res.json(await PostService.delete(iid))
            }
        } catch (error) {
            res.json('Error while trying delete post')
        }
    },
}