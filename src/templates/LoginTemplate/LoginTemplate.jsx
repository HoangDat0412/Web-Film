import React from 'react'
import { Outlet } from 'react-router-dom'
import "./logintemplate.scss"
export default function LoginTemplate() {
  return (
    <div className='' style={{
      display:"flex"
  }}>
       <div className="background_usertemplate">
        <Outlet/>
       </div>

  </div>
  )
}
