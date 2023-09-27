import React ,{useState , useEffect} from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const Upcoming = () => {
  document.title='MovieApp | Upcoming'
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const getdata = async () => {
    setLoading(true)
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=ea98c51f7fbeb1c31b0d29eb704698fc')
    const res = await data.json()
    if (res) {
      setLoading(false)
      setData(res.results)
    }
  }
  useEffect(() => {
    getdata()
  }, [])
  if(loading){
    return <h1 style={{color:'white'}}>loading....</h1>
  }
  else{
    return (
      <>
      <Navbar/>
      <div className='popularcon'>
        <h1 className='results'>Results for "Upcoming"</h1>
        <div className='innercon'>
          {
            data.map((val) => {
              return (
                <>
                  <div className='box' onClick={()=>navigate(`/info/${val.id}`)}>
                    <img src={`https://image.tmdb.org/t/p/original/${val.poster_path}`} alt="" />
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

export default Upcoming
