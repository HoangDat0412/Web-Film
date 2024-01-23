import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserApi, getListUser } from '../../redux/features/user/userSlice'
import { NavLink } from 'react-router-dom'

export default function ManagerUser() {
  const dispatch = useDispatch()
  const {userList} = useSelector(state => state.userSlice)

  useEffect(()=>{
    dispatch(getListUser())
  },[])
  return (
    <div>
      
      <h2>Manage User</h2>
      <div className='pt-4'>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">UserType</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>
{
  userList?.map((item,index)=>(
    <tr key={index}>
    <th scope="row">{item.id}</th>
    <td>{item.userName}</td>
    <td>{item.email}</td>
    <td>{item.userType}</td>
    <td>
      <button className='btn btn-danger' onClick={()=>{
        dispatch(deleteUserApi(item.id))
      }}>Delete</button>
    </td>
    <td>
      <NavLink className='btn btn-success' to={`update/${item.id}`} >Update</NavLink>
    </td>
  </tr>
  ))
}

        </tbody>
      </table>
      </div>
    </div>
  )
}
