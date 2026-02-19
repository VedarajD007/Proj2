import { useState } from 'react'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'
import { getImageUrl } from '../services/tmdbService'
import './Hero.css'

function Hero({ movie }) {
  const [backdropError, setBackdropError] = useState(false)
  const backdropUrl = getImageUrl(movie.backdrop_path)
  const posterUrl = getImageUrl(movie.poster_path)
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : ''
  
  // Enhanced fallback with gradient
  const fallbackGradient = 'linear-gradient(135deg, #1a2a4e 0%, #2d1b4e 50%, #1a0033 100%)'
  const imageUrl = backdropError || !backdropUrl ? '' : backdropUrl
  const heroStyle = {
    backgroundImage: imageUrl ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${imageUrl}')` : fallbackGradient,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  
  console.log('Hero - Title:', movie.title, 'Backdrop URL:', backdropUrl)

  const handleBackdropError = () => {
    console.error('Backdrop failed to load:', backdropUrl)
    setBackdropError(true)
  }

  return (
    <div className="hero" style={heroStyle}>
      <div className="hero-gradient"></div>
      <div className="hero-content">
        <div className="hero-badges">
          <span className="badge badge-rating">⭐ {rating}</span>
          <span className="badge badge-year">📅 {releaseYear}</span>
        </div>
        <h1 className="hero-title">{movie.title || movie.name}</h1>
        <p className="hero-description">{movie.overview || 'A compelling cinematic experience'}</p>
        <div className="hero-buttons">
          <button className="btn btn-play">
            <FaPlay /> Play Now
          </button>
          <button className="btn btn-info">
            <FaInfoCircle /> More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
