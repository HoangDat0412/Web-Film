import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FilmItem from '../../../components/FilmItem/FilmItem'
import { getFavouriteFilmApi } from '../../../redux/features/favouritefilm/favouritefilmSlice';

 function FavouriteFilm() {
  const {listFavouriteFilm} = useSelector(state => state.favouritefilmSlice)
  console.log("favourite film",listFavouriteFilm);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getFavouriteFilmApi())
  },[])
  return (
    <div className='container'>
    <div className='pt-3 pb-5'>
    <h3 className='mb-3'>Phim Yêu Thích</h3>
    <div className="row">
        {listFavouriteFilm?.map((film, index) => (
        <div className="col-2"  key={index}>
          <FilmItem  film={film} newfilm={"newfilm"} />
        </div>
      ))}
    </div>
  </div>
    </div>
  )
}
export default memo(FavouriteFilm)