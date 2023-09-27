import React, { useState } from 'react'
import '../css/Navbar.css'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
  document.title='MovieApp'
  const [state, setState] = useState('Search')
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const postdata = () => {
    if (!search) {
      toast.error('plzz fill the fields properly')
    }
    else {
      getdata(search)
    }
  }
  const getdata = async (search) => {
    setState('Searching....')
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=ea98c51f7fbeb1c31b0d29eb704698fc`)
    const res = await data.json()
    if (res.results.length === 0) {
      setState('Search')
      toast.error(`No movie found for ${search}`)
    }
    else {
      navigate(`/search/${search}`)
    }
  }
  return (
    <>
      <div className='navbarcon'>
        <div className="navbox">
          <div className="rightcon">
            <div className='img'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="" onClick={()=>navigate('/')}/>
            </div>
            <div onClick={() => navigate('/popular')}>Popular</div>
            <div onClick={() => navigate('/upcoming')}>Upcoming</div>
          </div>
          <div className="leftcon">
            <div>
              <input type="text" placeholder='Type something....' onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div>
              <button onClick={postdata}>{state}</button>
            </div>

          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default Navbar
