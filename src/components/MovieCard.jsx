import { useState } from 'react'
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from 'react-icons/fa'
import { getImageUrl } from '../services/tmdbService'
import './MovieCard.css'

function MovieCard({ movie }) {
  const posterUrl = getImageUrl(movie.poster_path, 'w500')
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : ''
  
  // Placeholder image if image fails to load
  const placeholderGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

  return (
    <div className="movie-card">
      <img
        src={posterUrl}
        alt={movie.title || movie.name}
        className="movie-poster"
        crossOrigin="anonymous"
        onError={(e) => {
          console.error('Poster image failed:', movie.title, posterUrl)
          e.target.style.display = 'none'
          if (e.target.nextElementSibling) {
            e.target.nextElementSibling.style.display = 'flex'
          }
        }}
        onLoad={() => {
          console.log('Poster loaded successfully:', movie.title)
        }}
      />
      <div
        className="movie-poster-fallback"
        style={{ background: placeholderGradient, display: 'none' }}
      >
        <div className="placeholder-text">
          <h4>{movie.title || movie.name}</h4>
        </div>
      </div>
      <div className="movie-overlay">
        <div className="movie-info">
          <div className="movie-header">
            <h3>{movie.title || movie.name}</h3>
            <button className="expand-btn">
              <FaChevronDown />
            </button>
          </div>
          <div className="movie-meta">
            <span className="rating">⭐ {rating}</span>
            <span className="year">{releaseYear}</span>
          </div>
          <p className="overview">{movie.overview}</p>
          <div className="movie-actions">
            <button className="action-btn play-btn" title="Play">
              <FaPlay />
            </button>
            <button className="action-btn" title="Add to List">
              <FaPlus />
            </button>
            <button className="action-btn" title="Like">
              <FaThumbsUp />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
