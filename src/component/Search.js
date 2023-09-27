import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate()
  const {search} = useParams()
  if(search){
    document.title=`MovieApp | ${search}`
  }
  const[loading,setLoading]=useState(false)
  const[data,setData]=useState([])
  const getdata = async(search)=>{
    setLoading(true)
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=ea98c51f7fbeb1c31b0d29eb704698fc`)
    const res = await data.json()
    if(res){
        setLoading(false)
        setData(res.results)
    }
  }
  useEffect(()=>{
    if(search){
       getdata(search)
    }
  },[search])
  if(loading){
    return <h1 style={{color:'white'}}>loading....</h1>
  }
  else{
    return (
      <>
      <div className='popularcon'>
        <h1 className='results'>{`Results for "${search}"`}</h1>
        <div className='innercon'>
          {
            data.map((val) => {
              return (
                <>
                  <div className='box' onClick={()=>navigate(`/info/${val.id}`)}>
                    <img src={`https://image.tmdb.org/t/p/original/${val.poster_path}`} alt={val.original_title} />
                    <div className="popularshow">
                       <div className='innerpopular'>
                        <h1>{val.original_title}</h1>
                        <p>{val.vote_average}</p>
                       </div>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
      </>
    )
  }
}

export default Search
