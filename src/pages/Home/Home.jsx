import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from "react-slick";
import FilmItem from '../../components/FilmItem/FilmItem';
import "./home.scss"
import { getListFilmUserApi } from '../../redux/features/film/filmSlice';
import TrendingItem from '../../components/TrendingItem/TrendingItem';

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListFilmUserApi())
  }, [])

  const { listFilmUser } = useSelector(state => state.filmSlice)
  // console.log("listFilmUser", listFilmUser);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <div className='home container'>
      <div className='filmHot pt-5 pb-5'>
        <h3 className='mb-3'>Phim Hot</h3>
        <Slider {...settings}>
          {listFilmUser?.slice(0,6).map((film, index) => (
            <FilmItem key={index} film={film} />
          ))}
        </Slider>
      </div>

      <div className='pt-3 pb-5'>
        <h3 className='mb-3'>Phim Mới</h3>
        <div className="row">
          <div className="col-8">
            <div className="row">
            {listFilmUser?.map((film, index) => (
            <div className="col-3"  key={index}>
              <FilmItem  film={film} newfilm={"newfilm"} />
            </div>
          ))}
            </div>
          </div>
          <div className="col-4" style={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
          }}>
            <h4 className='pt-4'>TRENDING </h4>
            <div className='pt-2'>
            {listFilmUser?.slice(0,6).map((film,index)=>(
               <TrendingItem film={film}/>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
