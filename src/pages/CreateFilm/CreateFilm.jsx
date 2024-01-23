import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2"
import { createFilmApi } from '../../redux/features/film/filmSlice';
export default function CreateFilm() {

  const dispatch = useDispatch();
  const { createResult } = useSelector(state => state.filmSlice);
  const { userInformation } = useSelector(state => state.userSlice);
  const navigate = useNavigate()

  useEffect(() => {
    console.log("userType", userInformation?.userType);
    if (userInformation?.userType !== "ADMIN" && userInformation?.userType !== "STAFF") {
      Swal.fire({
        title: "No authorization",
        icon: "error"
      });
      navigate('/')
    }
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      hot: true,
      des: "",
      yRelease: "",
      director: "",
      src: "",
      status: true,
      img: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("* không được bỏ trống !"),
      des: Yup.string().required("* không được bỏ trống !"),
      yRelease: Yup.string().required("* không được bỏ trống !"),
      director: Yup.string().required("* không được bỏ trống !"),
      src: Yup.string().required("* không được bỏ trống !"),
      img: Yup.string().required("* không được bỏ trống !"),
    }),
    onSubmit: values => {
      dispatch(createFilmApi(values))
      if (createResult) {
        Swal.fire({
          title: "Bạn create thành công",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "create thất bại",
          icon: "error"
        });
      }
    },
  });
  return (
    <div>
      <h3>Create Film</h3>

      <form className='mt-4' onSubmit={formik.handleSubmit}>
        {/* 2 column grid layout with text inputs for the first and last names */}
        <div className="row mb-4">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <input type="text" id='name' name='name' onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name} className="form-control" />
              <label className="form-label" >Name</label>
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              ) : null}
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <select id='hot' name='hot' onChange={formik.handleChange} value={formik.values.hot} className='form-select'>
                <option value={true}>True</option>
                <option value={false}>Fasle</option>
              </select>
              <label className="form-label" >Hot</label>
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <select id='status' name='status' onChange={formik.handleChange} value={formik.values.status} className='form-select'>
                <option value={true}>True</option>
                <option value={false}>Fasle</option>
              </select>
              <label className="form-label" >Status</label>
            </div>
          </div>
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input type="text" id="img"
            name="img" onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.img} className="form-control" />
          <label className="form-label" >img</label>
          {formik.touched.img && formik.errors.img ? (
            <div style={{ color: "red" }}>{formik.errors.img}</div>
          ) : null}
        </div>

        <div className="row mb-4">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <input type="text" id="yRelease"
                name="yRelease"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.yRelease} className="form-control" />
              <label className="form-label" >Year Release</label>
              {formik.touched.yRelease && formik.errors.yRelease ? (
                <div style={{ color: "red" }}>{formik.errors.yRelease}</div>
              ) : null}
            </div>
          </div>
          <div className="col">
            <input type="text" id="director"
              name="director"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.director} className="form-control" />
            <label className="form-label" >Director</label>
            {formik.touched.director && formik.errors.director ? (
              <div style={{ color: "red" }}>{formik.errors.director}</div>
            ) : null}
          </div>
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input type="text" id="src"
            name="src"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.src} className="form-control" />
          <label className="form-label" >src</label>
          {formik.touched.src && formik.errors.src ? (
            <div style={{ color: "red" }}>{formik.errors.src}</div>
          ) : null}
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <textarea id="des"
            name="des"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.des} class="form-control" ></textarea>
          <label >Des</label>
          {formik.touched.des && formik.errors.des ? (
            <div style={{ color: "red" }}>{formik.errors.des}</div>
          ) : null}
        </div>


        {/* Submit button */}
        <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block mb-4">Create</button>
      </form>

    </div>
  )
}
