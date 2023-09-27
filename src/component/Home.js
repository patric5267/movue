import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import '../css/Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import arr from './Obj';
import arrow from '../images/arrow.png'

const Home = () => {
    const navigate = useNavigate()
    const arr2 = []
    const arr1 = []
    const arr3 = []
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    if (data.length !== 0) {
        let i
        for (i = 0; i < 8; i++) {
            arr2.push(data[i])
        }
    }
    if (data2.length !== 0) {
        let i
        for (i = 0; i < 8; i++) {
            arr1.push(data2[i])
        }
    }
    if (data3.length !== 0) {
        let i
        for (i = 0; i < 8; i++) {
            arr3.push(data3[i])
        }
    }
       const getdata = async(type)=>{
        setLoading(true)
            const data = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=ea98c51f7fbeb1c31b0d29eb704698fc`)
            const res = await data.json()
            if(res){
                setLoading(false)
                if(type==='popular'){
                    setData(res.results)
                }
                else if(type==='upcoming'){
                    setData2(res.results)
                }
                else{
                    setData3(res.results)
                }
            }
       }
       useEffect(()=>{
            getdata('popular')
            getdata('upcoming')
            getdata('top_rated')
       },[])
    if (loading) {
        return <h1 style={{color:'white'}}>loading....</h1>
    }
    else {
        return (
            <>
                <Navbar/>
                <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} >
                    {
                        arr.map((val) => {
                            return (
                                <>
                                    <div className="coursel" >
                                        <div className="inner" onClick={()=>navigate(`/info/${val.id}`)}>
                                            <img src={val.backimg} alt="" />
                                        </div>
                                    </div>
                                    <div className="shadowcon">
                                        <div className='shadow' onClick={()=>navigate(`/info/${val.id}`)}>
                                            <div className="shadowinner">
                                                <div>
                                                    <h1>{val.title}</h1>
                                                </div>
                                                <div className="date">
                                                    <p>{val.release}</p>
                                                    <p>{val.vote}</p>
                                                </div>
                                                <div>
                                                    <p className='desc'>
                                                        {val.overview}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                </Carousel>
                <div className="secondcon">
                    <div className='head'>
                        <h1>Popular</h1>
                         <img src={arrow} alt="" className='arrow' onClick={()=>navigate('/popular')}/>
                    </div>
                    <div className='popular'>
                        {
                            arr2.map((val) => {
                                return (
                                    <>
                                        <div>
                                            <img src={`https://image.tmdb.org/t/p/original/${val.poster_path}`} alt=""  onClick={()=>navigate(`/info/${val.id}`)}/>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="secondcon">
                    <div className='head'>
                        <h1>Upcoming</h1>
                        <img src={arrow} alt="" className='arrow' onClick={()=>navigate('/upcoming')}/>
                    </div>
                    <div className='popular'>
                        {
                            arr1.map((val) => {
                                return (
                                    <div>
                                        <img src={`https://image.tmdb.org/t/p/original/${val.poster_path}`} alt="" onClick={()=>navigate(`/info/${val.id}`)}/>
                                    </div>

                                )
                            })
                        }

                    </div>
                </div>
                <div className="secondcon">
                    <div className='head'>
                        <h1>Top Rated</h1>
                        <img src={arrow} alt="" className='arrow' onClick={()=>navigate('/top')}/>
                    </div>
                    <div className='popular'>
                        {
                            arr3.map((val) => {
                                return (
                                    <div>
                                        <img src={`https://image.tmdb.org/t/p/original/${val.poster_path}`} alt="" onClick={()=>navigate(`/info/${val.id}`)}/>
                                    </div>

                                )
                            })
                        }

                    </div>
                </div>
            </>)

    }



}

export default Home
