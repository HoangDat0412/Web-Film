import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import FilmDetail from './pages/FilmDetail/FilmDetail';
import Checkout from './pages/Checkout/Checkout';
import LoginTemplate from './templates/LoginTemplate/LoginTemplate';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import ManagerUser from './pages/ManagerUser/ManagerUser';
import ManagerFilm from './pages/ManagerFilm/ManagerFilm';
import ManagerCheckout from './pages/ManagerCheckout/ManagerCheckout';
import SearchFilm from './pages/SearchFilm/SearchFilm';
import CreateFilm from './pages/CreateFilm/CreateFilm';
import UpdateFilm from './pages/UpdateFilm/UpdateFilm';
import UpdateUser from './pages/UpdateUser/UpdateUser';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeTemplate/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/filmdetail/:id",
        element:<FilmDetail/>
      },
      {
        path:"/checkout",
        element:<Checkout/>
      },
      {
        path:"/search",
        element:<SearchFilm/>
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
    ]
  },
  {
    path: "/",
    element: <LoginTemplate/>,
    children:[
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      }
    ]
  },
  {
    path: "/",
    element: <AdminTemplate/>,
    children:[
      {
        path:"admin/user",
        element:<ManagerUser/>
      },
      {
        path:"admin/film",
        element:<ManagerFilm/>
      },
      {
        path:"admin/checkout",
        element:<ManagerCheckout/>
      },
      {
        path:"admin/createfilm",
        element:<CreateFilm/>
      },
      {
        path:"admin/film/updatefilm/:id",
        element:<UpdateFilm/>
      },
      {
        path:"admin/user/update/:id",
        element:<UpdateUser/>
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
