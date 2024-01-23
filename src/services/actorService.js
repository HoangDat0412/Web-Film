import { baseService } from "./baseServices";

export class ActorService extends baseService {
    constructor(){
        super()
    }

    deleteActor = (id) => {
        return this.delete(`/actor/${id}`);
    };
    createActor = (data)=>{
        return this.post(`/actor`,data)
    }
    
}

export const actorService = new ActorService()