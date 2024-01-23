import { baseService } from "./baseServices";

export class FilmTypeService extends baseService {
    constructor(){
        super()
    }

    deleteFilmtype = (id) => {
        return this.delete(`/filmtype/${id}`);
    };
    createFilmtype = (data)=>{
        return this.post(`/filmtype`,data)
    }
    
}

export const filmtypeService = new FilmTypeService()