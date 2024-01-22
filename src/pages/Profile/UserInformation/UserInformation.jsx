import React, { memo, useEffect, useRef } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2"
import { useSelector, useDispatch } from "react-redux";
import { updateUserApi } from '../../../redux/features/user/userSlice';
function UserInformation() {
    const {userInformation,updateSuccess,updateFasle,userCheckoutList} = useSelector(state => state.userSlice)
    const {listFavouriteFilm} = useSelector(state => state.favouritefilmSlice)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            userName: userInformation?.userName,
            email: userInformation?.email,
            passWord: ""
        },
        validationSchema: Yup.object({
            userName: Yup.string().required("userName không được bỏ trống"),
            passWord: Yup.string().required("passWord không được bỏ trống"),
            email: Yup.string().email().required("email không được bỏ trống")
        }),
        onSubmit: values => {
              dispatch(updateUserApi(userInformation?.id,values))
              if (updateSuccess) {
                Swal.fire({
                  title: "Bạn đã cập nhật thành công",
                  icon: "success"
                });
              }
              if (updateFasle) {
                Swal.fire({
                  title: "Bạn đã cập nhật thất bại",
                  icon: "error"
                });
              }
        },
    });

    let tongTien = 0;
    userCheckoutList?.map((item)=>(
        tongTien += parseInt(item?.moneyPay)
    ))
  
    return (
        <div className='container pt-5 pb-5'>
            <div className='row'>
                <div className="col-7">
                    <form onSubmit={formik.handleSubmit}>
                        <div className='form-group position-relative mb-2'>
                            <label htmlFor="taikhoan" style={{ fontSize: "18px" }}>Tài Khoản</label>
                            <input
                                id="userName"
                                name="userName"
                                className="form-control"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userName}
                            />
                            {formik.touched.userName && formik.errors.userName ? (
                                <div style={{ color: "red" }}>{formik.errors.userName}</div>
                            ) : null}
                        </div>
                        <div className='form-group position-relative mb-2'>
                            <label htmlFor="matKhau" style={{ fontSize: "18px" }}>Mật Khẩu</label>
                            <input
                                id="passWord"
                                name="passWord"
                                className="form-control"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.passWord}
                            />
                            {formik.touched.passWord && formik.errors.passWord ? (
                                <div style={{ color: "red" }}>{formik.errors.passWord}</div>
                            ) : null}
                        </div>
                        <div className='form-group position-relative mb-2'>
                            <label htmlFor="email" style={{ fontSize: "18px" }}>Email</label>
                            <input
                                id="email"
                                name="email"
                                className="form-control"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: "red" }}>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <button
                            style={{
                                backgroundColor: "#3E63b6",
                                borderColor: "#3E63b6",
                                cursor: "pointer",
                            }}
                            type="submit"
                            className="btn btn-success mt-3 container"
                        >
                            Cập Nhật
                        </button>
                    </form>
                </div>
                <div className="col-5">
                <ul className="list-group mt-2">
            <li className="list-group-item text-muted">Hoạt động</li>

            <li className="list-group-item text-right">
              <span className="float-left">
                <strong>Phim yêu thích: </strong> {listFavouriteFilm?.length}
              </span>
              
            </li>
            <li className="list-group-item text-right">
              <span className="float-left">
                <strong>Thanh toán: </strong> {userCheckoutList?.length}
              </span>
          
            </li>
            <li className="list-group-item text-right">
              <span className="float-left">
                <strong>Tổng tiền: </strong> {tongTien}
              </span>
             
            </li>
          </ul>
                </div>
            </div>

        </div>
    )
}
export default memo(UserInformation)