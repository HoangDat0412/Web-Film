import React from 'react'
import "./filmitem.scss"
import { Link } from 'react-router-dom';
export default function FilmItem(props) {
    const {film,newfilm} = props
    if(newfilm){
        return (
            <div class="film_item" style={{
                width:"100%",
                height:"150px",
                paddingBottom:"20px"
            }}>
                <Link to={`/filmdetail/${film?.id}`} class="myui-vodlist__thumb" style={{
                    background:`url(${film?.img})`,

                }}>
                    <span class="play hidden-xs"></span>
                    <span class="pic-tag pic-tag-top">
                        Full HD
                    </span>
                    <div class="myui-vodlist__detail">

                        <h3 class="title text-overflow pb-2">{film?.name}</h3>


                    </div>
                </Link>
            </div>
        )
    }else{
        return (
            <div class="film_item">
                <Link to={`/filmdetail/${film?.id}`} class="myui-vodlist__thumb" style={{
                    background:`url(${film?.img})`,
                    width:"80%",
                    height:"250px"
                }}>
                    <span class="play hidden-xs"></span>
                    <span class="pic-tag pic-tag-top">
                        Full HD
                    </span>
                    <div class="myui-vodlist__detail">

                        <h3 class="title text-overflow pb-2">{film?.name}</h3>


                    </div>
                </Link>
            </div>
        )
    }
               
            
}
