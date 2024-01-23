import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getUserFromIdApi, updateUserApi } from '../../redux/features/user/userSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2"

export default function UpdateUser() {
    const param = useParams()
    const id = param.id;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserFromIdApi(id))
    }, [])

    const { userUpdate ,updateSuccess} = useSelector(state => state.userSlice)
    console.log("user ", userUpdate);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            userName: userUpdate?.userName,
            email: userUpdate?.email,
            userType: userUpdate?.userType,
        },
        validationSchema: Yup.object({
            userName: Yup.string().required("* không được bỏ trống !"),
            email: Yup.string().email().required("* không được bỏ trống !"),
            userType: Yup.string().required("* không được bỏ trống !"),
        }),
        onSubmit: values => {
            console.log(values);
              dispatch(updateUserApi(id, values))
            if (updateSuccess) {
                Swal.fire({
                    title: "Bạn update thành công",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "update thất bại",
                    icon: "error"
                });
            }
        },
    });
    return (
        <div>
            <h3>Update Film</h3>
            <form className='mt-4' onSubmit={formik.handleSubmit}>
                {/* 2 column grid layout with text inputs for the first and last userNames */}
                <div className="row mb-4">
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <input type="text" id='userName' name='userName' onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userName} className="form-control" />
                            <label className="form-label" >User Name</label>
                            {formik.touched.userName && formik.errors.userName ? (
                                <div style={{ color: "red" }}>{formik.errors.userName}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <input type="text" id='email' name='email' onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email} className="form-control" />
                            <label className="form-label" >Email</label>
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: "red" }}>{formik.errors.email}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <select id='userType' name='userType' onChange={formik.handleChange} value={formik.values.userType} className='form-select'>
                                <option value="USER">USER</option>
                                <option value="CLIENT">CLIENT</option>
                                <option value="STAFF">STAFF</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                            <label className="form-label" >User Type</label>
                        </div>
                    </div>
                </div>



                {/* Submit button */}
                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block mb-4" >Update</button>
            </form>
        </div>
    )
}
