import { baseService } from "./baseServices";

export class UserService extends baseService {
    constructor(){
        super()
    }

    dangKy = (thongTinDangKy) => {
        return this.post(`/user`, thongTinDangKy);
    };
    dangNhap = (thongTinDangNhap) => {
        return this.post(`/user/login`, thongTinDangNhap);
    };
    getUserInformation = ()=>{
        return this.get("/user/information")
    };
    chechOut = (data)=>{
        return this.post("/checkout/create",data)
    };
    updateUser = (id,data)=>{
        return this.post(`/user/update/${id}`,data)
    };
    getUserCheckout = ()=>{
        return this.get(`/checkout`)
    };
    getUserFromId = (id)=>{
        return this.get(`/user/detail/${id}`)
    }
    
//   layThongTinNguoiDung = () => {
//     return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
//   };
//   postCapNhapThongTinNguoiDung = (user) => {
//     return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user);
//   };
}

export const userService = new UserService()