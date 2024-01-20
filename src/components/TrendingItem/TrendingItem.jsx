import React from 'react'
import { Link } from 'react-router-dom'
import "./trendingitem.scss"

export default function TrendingItem(props) {
    const {film} = props
  return (
    <div className='trendingItem container-fluid mt-2'>
        <Link to="/" className='row' style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }}>
            <div className="col-3" >
            <img width={"100%"} height={"100px"} src={film?.img} alt="" />
            </div>
            <div className='col-9 d-flex' style={{
                alignItems:"center"
            }}>
                <div style={{color:"black"}}>
                    <h6>{film?.name}</h6>
                    <h6>Năm phát hành: 2023</h6>
                </div>
            </div>
        </Link>
    </div>
  )
}
