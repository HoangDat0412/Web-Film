import React, { useEffect,useState } from 'react'
import './header.scss'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dangXuatAction, getUserInformationApi } from '../../redux/features/user/userSlice'
import { getFilmSearchApi } from '../../redux/features/film/filmSlice'
export default function Header() {
  const {userInformation} = useSelector(state => state.userSlice)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUserInformationApi())
  },[])

  const [search,setSearch] = useState()
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
                <input type="text" class="form-control" value={search} onChange={(e)=>{
                  setSearch(e.target.value)
                }}  placeholder=""  />
                  <NavLink className="btn btn-secondary"  onClick={()=>{
                    console.log("name",search);
                    dispatch(getFilmSearchApi({
                      name:search
                    }))
                  }} to='/search'>Search</NavLink>
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
