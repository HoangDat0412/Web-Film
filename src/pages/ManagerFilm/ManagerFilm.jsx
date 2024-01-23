import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { deleteFilmApi, getListFilmUserApi } from '../../redux/features/film/filmSlice'
import Swal from "sweetalert2"

export default function ManagerFilm() {

  const { listFilmUser,deleteResult } = useSelector(state => state.filmSlice)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListFilmUserApi())
  }, [])

  return (
    <div>

      <h2>Manage Film</h2>
      <div className='pt-4'>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#Id</th>
              <th scope="col">Name</th>
              <th scope="col">img</th>
              <th scope="col">Delete</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          <tbody>
            {listFilmUser?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item?.id }</th>
                <td>{item?.name }</td>
                <td><img src={item?.img} style={{
                  width:"50px",
                  height:"60px"
                }} alt="" /></td>
                <td>
                  <button className='btn btn-danger' onClick={()=>{
                    dispatch(deleteFilmApi(item?.id));
                    if(deleteResult){
                      Swal.fire({
                        title: "Bạn đã xóa thành công",
                        icon: "success"
                      });
                    }else{
                      Swal.fire({
                        title: "Xóa thất bại",
                        icon: "error"
                      });
                    }
                  }}>Delete</button>
                </td>
                <td>
                  <NavLink to={`updatefilm/${item?.id}`} className='btn btn-success'>Update</NavLink>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  )
}
