import { baseService } from "./baseServices";

export class CommentService extends baseService {
    constructor(){
        super()
    }

    getListComment = (id) => {
        return this.get(`/comment/${id}`);
    };
    postComment = (data) => {
        return this.post(`/comment`,data);
    };
    
}

export const commentService = new CommentService()