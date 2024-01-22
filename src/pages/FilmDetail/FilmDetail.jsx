import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getDetailFilmApi } from '../../redux/features/film/filmSlice';
import TrendingItem from '../../components/TrendingItem/TrendingItem';
import Swal from "sweetalert2"
import Comment from '../../components/Comment/Comment';
import { createAndDeleteFavouriteFilmApi } from '../../redux/features/favouritefilm/favouritefilmSlice';
import { Rating } from 'react-simple-star-rating'
import { getTotalRateApi, getYourRateApi, setRateApi } from '../../redux/features/rate/rateSlice';
export default function FilmDetail() {
  const id = useRef(0);
  id.current = useParams().id
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailFilmApi(id.current))
  }, [])
  const { checkFilmIsFavourite } = useSelector(state => state.favouritefilmSlice)
  const { filmDetail, listFilmUser } = useSelector(state => state.filmSlice);
  const { userInformation } = useSelector(state => state.userSlice);
  const { totalPoint, yourPoint } = useSelector(state => state.rateSlice)
  useEffect(() => {
    if (userInformation?.userType === "USER") {
      Swal.fire({
        title: "You need to payment for watching film",
        icon: "error"
      });
      navigate('/checkout')
    }
  }, [])

  useEffect(() => {
    dispatch(getYourRateApi(id.current))
    dispatch(getTotalRateApi(id.current))
  }, [])

  const [rating, setRating] = useState(yourPoint)
  
  const handleRating = (rate) => {
    setRating(rate)
    dispatch(setRateApi({
      filmId:id.current,
      rate:rate
    }))
  }

  return (
    <div className='bg-light'>
      <div className='filmdetail container '>
        <div className="row pt-5 pb-5">
          <div className="col-8">
            <span>
              <Link to={`/`}>Trang Chủ</Link> <Link>\</Link> <Link>{filmDetail?.name}</Link>
            </span>
            <div className='pt-3'></div>
            <iframe class="metaframe rptss" src={filmDetail?.src} frameborder="0" scrolling="no" allow="autoplay; encrypted-media" allowfullscreen="true" width={"90%"} height={"350px"}></iframe>

            <div className='row pt-5'>
              <div className="col-3">
                <img height={"250px"} style={{
                  borderRadius: "5px"
                }} src={filmDetail?.img} alt="" />
              </div>
              <div className="col-9 ">
                <h4>
                  {filmDetail?.name}
                </h4>
                <h6>Năm phát hành : {filmDetail?.yRelease}</h6>
                <h6>Rate : {totalPoint}</h6>
                <h6>Thể loại : </h6>
                {filmDetail?.filmType.map((type, index) => (
                  <button key={index} className='btn btn-dark ' style={{ marginRight: "10px" }}>{type.typeName}</button>
                ))}

                <h6 className='pt-3'>Đạo diễn: {filmDetail?.director}</h6>
                <h6 className=''>Diễn Viên </h6>
                {filmDetail?.actor.map((item, index) => (
                  <span key={index} style={{ marginRight: "15px" }}>{item.actorName}</span>
                ))}

                <div className='rating pt-3'>
                  <Rating
                    onClick={handleRating}
                  /* Available Props */
                  />
                </div>

                <hr />
                <button className='btn' onClick={() => {
                  dispatch(createAndDeleteFavouriteFilmApi({
                    filmId: parseInt(id.current)
                  }))
                }}>
                  {checkFilmIsFavourite ? <i style={{ color: "red", fontSize: "20px" }} class="fa fa-heart"></i> : <i style={{ fontSize: "20px" }} class="fa fa-heart"></i>}
                </button>

              </div>
            </div>

            <div className='pt-4'>
              <h4>Thông tin phim </h4>
              <p>{filmDetail?.des}</p>
            </div>

            <Comment id={id.current} />
          </div>

          <div className="col-4" style={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
          }}>
            <h4 className='pt-4'>TRENDING </h4>
            <div className='pt-2'>
              {listFilmUser?.map((film, index) => (
                <TrendingItem film={film} />
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
