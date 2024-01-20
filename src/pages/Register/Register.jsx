import React, { useEffect } from 'react'
import "./register.scss"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"
import { registerActionApi } from '../../redux/features/user/userSlice';
export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { responseRegister, errorRegister } = useSelector(state => state.userSlice)
  const formik = useFormik({
    initialValues: {
      userName: "",
      passWord: "",
      email: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("*Tài khoản không được bỏ trống !"),
      passWord: Yup.string().required("*Mật khẩu không được bỏ trống !"),
      email: Yup.string().email().required("email không được bỏ trống")
    }),
    onSubmit: values => {
      console.log("values",values);
      dispatch(registerActionApi(values))
      if(responseRegister){
          Swal.fire({
              title: "Bạn đã đăng ký thành công",
              icon: "success"
            });
          navigate("/login",)
      }
      if(errorRegister){
          Swal.fire({
              title: errorRegister,
              icon: "error"
            });
      }
    },
  });
  return (
    <div className='jss2526'>
      <div className="register">
        <NavLink to="/">
          <h2 className='text-center logo-film-login pb-3'>ĐẬU PHIM</h2>
        </NavLink>
        <div className="mb-3 mt-2">
          <p className="text" style={{
            fontWeight: "600"
          }}>
            Đăng Ký để được nhiều ưu đãi, mua vé và bảo mật thông tin!
          </p>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className='form-group position-relative mb-2'>
              <label htmlFor="userName" style={{ fontSize: "18px" }}>Tài Khoản</label>
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
              <label htmlFor="passWord" style={{ fontSize: "18px" }}>Mật Khẩu</label>
              <input
                id="passWord"
                name="passWord"
                className="form-control"
                type="password"
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
