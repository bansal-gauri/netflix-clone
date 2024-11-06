import { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

function Player() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmE4Y2FkODhjMjA3NDZkNzY0MTlkZmZiYTE2MzBkMiIsIm5iZiI6MTczMDQ2MDA1OC4zODQyMzM3LCJzdWIiOiI2NzI0YjhlMjM5ODVmM2Y0MWFkMWJkNDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.b28lowuYezsXkTxNvz7MLOR4LqaR-Xg44fEK4VKJfEQ'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => {
      const trailer = res.results.find(video => video.type === 'Trailer');
      if (trailer) {
        setApiData(trailer);
      }
    })
    .catch(err => console.error(err));
  },[])

  return (
    <div className='player'>
        <img src={back_arrow_icon} alt="" onClick={() =>{navigate('/')}}/>
        <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
        <div className="player-info">
          <p>{apiData.published_at.slice(0,10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
    </div>
  )
}

export default Player