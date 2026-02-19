import { useState, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import MovieCard from './MovieCard'
import './MovieCarousel.css'

function MovieCarousel({ title, movies }) {
  const scrollRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction) => {
    const { current } = scrollRef
    const scrollAmount = 300

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount
    } else {
      current.scrollLeft += scrollAmount
    }

    // Update arrow visibility
    setShowLeftArrow(current.scrollLeft > 0)
    setShowRightArrow(
      current.scrollLeft < current.scrollWidth - current.clientWidth - 10
    )
  }

  const handleScroll = () => {
    const { current } = scrollRef
    setShowLeftArrow(current.scrollLeft > 0)
    setShowRightArrow(
      current.scrollLeft < current.scrollWidth - current.clientWidth - 10
    )
  }

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-wrapper">
        {showLeftArrow && (
          <button className="arrow arrow-left" onClick={() => scroll('left')}>
            <FaChevronLeft />
          </button>
        )}
        <div className="carousel" ref={scrollRef} onScroll={handleScroll}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {showRightArrow && (
          <button className="arrow arrow-right" onClick={() => scroll('right')}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  )
}

export default MovieCarousel
