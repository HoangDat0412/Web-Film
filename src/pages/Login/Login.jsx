import React from 'react'
import "./login.scss"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from "react-redux"
import { loginActionApi } from '../../redux/features/user/userSlice';

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { userLogin } = useSelector(state => state.userSlice)
    const formik = useFormik({
        initialValues: {
            email: "",
            passWord: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required("*email không được bỏ trống !"),
            passWord: Yup.string().required("*Mật khẩu không được bỏ trống !"),
        }),
        onSubmit: values => {
            dispatch(loginActionApi(values));
            if (userLogin) {
                navigate('/')
            }
        },
    });

    return (
        <div className='jss2526'>
            <div className="signin">

                <NavLink to="/">
                    <h2  className='text-center logo-film-login pb-3'>ĐẬU PHIM</h2>
                </NavLink>

                <div className="mb-3 mt-2">
                    <p className="text" style={{
                        fontWeight: "600"
                    }}>
                        Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!
                    </p>
                </div>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='form-group position-relative mb-2'>
                            <label htmlFor="email" style={{ fontSize: "18px" }}>Tài Khoản</label>
                            <input
                                id="email"
                                name="email"
                                className="form-control"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: "red" }}>{formik.errors.email}</div>
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
                        <button
                            style={{
                                backgroundColor: "#3E63b6",
                                borderColor: "#3E63b6",
                                cursor: "pointer",
                            }}
                            type="submit"
                            className="btn btn-success mt-3 container"
                        >
                            Log in
                        </button>

                        <p className="mt-2">
                            Or
                            <span
                                className="text-primary"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate('/register')}
                            >
                                {" "}
                                register now!
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
