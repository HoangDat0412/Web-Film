import { baseService } from "./baseServices";

export class FavouriteFilmService extends baseService {
    constructor(){
        super()
    }

    getListFilm = () => {
        return this.get(`/favouriteFilm`);
    };
    setFavouriteFilm = (data) => {
        return this.post(`/favouriteFilm`,data);
    };
    
}

export const favouriteFilmService = new FavouriteFilmService()