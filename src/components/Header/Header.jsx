import React, { useEffect } from 'react'
import './header.scss'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dangXuatAction, getUserInformationApi } from '../../redux/features/user/userSlice'
export default function Header() {
  const {userInformation} = useSelector(state => state.userSlice)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUserInformationApi())
  },[])
  console.log("userInformation",userInformation);
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">ĐẬU PHIM</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink class="nav-link active" aria-current="page" href="#">Home</NavLink>
              </li>
              <li class="nav-item">
                <NavLink class="nav-link" to='search' href="#">Film Hot</NavLink>
              </li>
              <li class="nav-item">
                <NavLink class="nav-link" to='checkout' href="#">Checkout</NavLink>
              </li>
            </ul>
            <div className="navbar-nav">
              <div class="input-group">
                <input type="text" class="form-control" placeholder=""  />
                  <button class="input-group-text">Search</button>
              </div>
            </div>
            {
              userInformation ? (
                <div class="navbar-nav">
                <NavLink to='/profile' style={{marginRight:"5px"}} className='btn btn-light'>{userInformation?.userName}</NavLink>

                <button onClick={()=>{
                  dispatch(dangXuatAction())
                }} className='btn btn-light'>Logout</button>
            </div>
              ): (
                <div class="navbar-nav">
                <NavLink to='/login' style={{marginRight:"5px"}} className='btn btn-light'>Login</NavLink>
                <NavLink to='/register' className='btn btn-light'>Register</NavLink>
            </div>
              ) 
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
