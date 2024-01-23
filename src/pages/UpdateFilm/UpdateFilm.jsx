import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailFilmApi, updateFilmApi } from '../../redux/features/film/filmSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2"
import { createActorApi, deleteActorApi } from '../../redux/features/actor/actorSlice';
import { createFilmTypeApi, deleteFilmTypeApi } from '../../redux/features/filmtype/filmtypeSlice';
export default function UpdateFilm() {
  const id = useRef(0);
  id.current = useParams().id
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { filmDetail, updateResult } = useSelector(state => state.filmSlice);
  console.log(filmDetail);
  useEffect(() => {
    dispatch(getDetailFilmApi(id.current))
  }, [])

  const { userInformation } = useSelector(state => state.userSlice);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: filmDetail?.name,
      hot: filmDetail?.hot,
      des: filmDetail?.des,
      yRelease: filmDetail?.yRelease,
      director: filmDetail?.director,
      src: filmDetail?.src,
      status: filmDetail?.status,
      img: filmDetail?.img
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
      dispatch(updateFilmApi(id.current, values))
      if (updateResult) {
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

  const actor = useRef("")
  const typeName = useRef("")
  return (
    <div>
      <h3>Update Film</h3>
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
        <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block mb-4">Update</button>
      </form>


      <h3 className='pt-4'>Update Actor</h3>
      <div className='pt-4'>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#Id</th>
              <th scope="col">Actor Name</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filmDetail?.actor?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.id}</th>
                <td>{item.actorName}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => {
                    dispatch(deleteActorApi(id.current,item?.id));
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form>
        <input type="text" onChange={(e)=>{
          actor.current = e.target.value
        }} name='actorName' className="form-control" />
        <label className="form-label" >Actor Name</label>
        <br />
        <button className='btn btn-success' type='button' onClick={()=>{
          dispatch(createActorApi({
            filmId:parseInt(id.current),
            actorName:actor.current
          }))
        }} >Add Actor</button>
      </form>


      <h3 className='pt-4'>Film Type Update</h3>
      <div className='pt-4'>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#Id</th>
              <th scope="col">Film Type</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filmDetail?.filmType?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.id}</th>
                <td>{item.typeName}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => {
                    dispatch(deleteFilmTypeApi(id.current,item?.id));
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form>
        <input type="text" onChange={(e)=>{
          typeName.current = e.target.value
        }} name='actorName' className="form-control" />
        <label className="form-label" >Film Type</label>
        <br />
        <button className='btn btn-success' type='button' onClick={()=>{
          dispatch(createFilmTypeApi({
            filmId:parseInt(id.current),
            typeName:typeName.current
          }))
        }} >Add Film Type</button>
      </form>

    </div>
  )
}
