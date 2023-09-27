import React, { useEffect, useState } from 'react'
import '../css/Info.css'
import { useParams } from 'react-router-dom'

const Info = () => {
    const{id}= useParams()
    const arr=[]
    const[data,setData]=useState([])
    if(data.length!==0){
        let i;
       for(i=0;i<2;i++){
        arr.push(data[i])
       }
    }
    const[obj,setObj]=useState(null)
    const getdata = async(id)=>{
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=ea98c51f7fbeb1c31b0d29eb704698fc`)
        const res = await data.json()
        if(res){
            console.log(res);
            setObj(res)
            setData(res.genres)
        }
    }
    useEffect(()=>{
      if(id){
        getdata(id)
      }
    },[id])
    if(!obj){
        return <h1 style={{color:'white'}}>loading....</h1>
    }
    else{
        return (
            <>
                <div className='infocon'>
                    <div className='infoinner'>
                        <div className="posterimg">
                            <img src={`https://image.tmdb.org/t/p/original/${obj.backdrop_path}`}    alt="" />
                        </div>
                    </div>
                </div>
                <div className='secondconinfo'>
                    <div className='infodescinner'>
                        <div className="smallposter">
                            <img src={`https://image.tmdb.org/t/p/original/${obj.poster_path}`} alt="" />
                        </div>
                        <div className="pointdesc">
                            <div className='pointsecond'>
                                <div>
                                    <h1 className='title'>{obj.original_title}</h1>
                                </div>
                                <div>
                                    <p>{obj.tagline}</p>
                                </div>
                                <div className="reviews">
                                    <div>{obj.vote_average}</div>
                                    <div>{obj.vote_count} votes</div>
                                </div>
                                <div>
                                    <p>{obj.runtime} mins</p>
                                </div>
                                <div>
                                    <p>Release Date: {obj.release_date}</p>
                                </div>
                                <div className="genres">
                                    {
                                        arr.map((val)=>{
                                            return(
                                                <div>{val.name}</div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="descoverview">
                                    <p>{obj.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="infothirdcon">
                    <div className='link'>
                        <div className='linkname'>
                             Useful Links
                        </div>
                        <div>
                             <a href={`https://www.imdb.com/title/${obj.imdb_id}/`}>
                             <button><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="" /></button>
                                </a>
                        </div>
                    </div>
                </div>
                <div className="fourthcon">
                   <h1>Production Companies</h1>
                    <div className='companies'>
                        {
                            obj.production_companies.map((val)=>{
                              return(
                                <div>
                                <img src={`https://image.tmdb.org/t/p/original/${val.logo_path}`} alt={val.name} />
                            </div>
                              )
                            })
                        }
                      
                        
                    </div>
                </div>
            </>
        )
    }
   
}

export default Info
