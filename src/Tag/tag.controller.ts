import { TagService } from "./tag.service";
import { TagControllerContract } from "./tag.types";

export const TagController: TagControllerContract = {
    getAll: async (req, res) => {
        let skip: any = req.query.skip
        let take: any = req.query.take
        const response = await TagService.getAll(take, skip)
        res.json(response)
        console.log(response)
    },
    getByID: async(req, res) => {
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
        
        res.json(TagService.getByID(id))
    },

}