import { baseService } from "./baseServices";

export class FilmService extends baseService {
    constructor(){
        super()
    }

    getListFilmUser = () => {
        return this.get(`/film`);
    };
    getFilmDetail = (id) => {
        return this.get(`/film/detail/${id}`);
    };
    getSearchFilm = (data) => {
        return this.post(`/film/search`,data);
    };
    
    
//   layThongTinNguoiDung = () => {
//     return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
//   };
//   postCapNhapThongTinNguoiDung = (user) => {
//     return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user);
//   };
}

export const filmService = new FilmService()