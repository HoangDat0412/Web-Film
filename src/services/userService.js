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
    chechOut = ()=>{
        return this.post("/checkout/create",{moneyPay:200000})
    }
    
//   layThongTinNguoiDung = () => {
//     return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
//   };
//   postCapNhapThongTinNguoiDung = (user) => {
//     return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user);
//   };
}

export const userService = new UserService()