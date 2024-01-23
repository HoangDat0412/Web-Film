import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "./admin.scss"
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2"
import { getUserInformationApi } from '../../redux/features/user/userSlice';
export default function AdminTemplate() {




  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInformationApi())
  }, [])

  const { userInformation } = useSelector(state => state.userSlice);



  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item">
                <NavLink to='/admin/user' className="nav-link align-middle px-0">
                  <i class="fa fa-home"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                </NavLink>
              </li>

              <li>
                <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                  <i class="fa fa-film"></i> <span className="ms-1 d-none d-sm-inline">Film</span> </a>
                <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                  <li className="w-100">
                    <NavLink to='/admin/film' className="nav-link px-0"> <span className="d-none d-sm-inline">Manager Film</span>  </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/createfilm' className="nav-link px-0"> <span className="d-none d-sm-inline">Create Film</span> </NavLink>
                  </li>
                </ul>
              </li>

              <li>
                <NavLink to='/admin/checkout' className="nav-link px-0 align-middle">
                  <i class="fa fa-money-check"></i> <span className="ms-1 d-none d-sm-inline">Checkout</span></NavLink>
              </li>


            </ul>
            <hr />
            <div className="dropdown pb-4">
              <a>{userInformation?.userName}</a>
            </div>
          </div>
        </div>
        <div className="col py-3">
          <Outlet />
        </div>
      </div>
    </div>

  )
}
