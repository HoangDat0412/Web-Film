import React from 'react'
import FilmItem from '../../components/FilmItem/FilmItem'
import { useSelector } from 'react-redux'

export default function SearchFilm() {

  const {listFilmSearch} = useSelector(state => state.filmSlice)
  return (
    <div className='container'>
    <div className='pt-3 pb-5'>
    <h3 className='mb-3'>Search Result :</h3>
    <div className="row">
       
      {
        listFilmSearch?.map((film,index)=>(
          <div className="col-2" key={index} >
          <FilmItem  film={film} newfilm={"newfilm"} />
        </div>
        ))
      }
      
    </div>
  </div>
    </div>
  )
}
