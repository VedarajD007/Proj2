import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import MovieCarousel from './components/MovieCarousel'
import Login from './components/Login'
import Register from './components/Register'
import { getMovies, getTrendingMovies, getTopRatedMovies, getNowPlayingMovies, searchMovies } from './services/tmdbService'
import { mockMovies } from './services/mockData'
import authService from './services/authService'

function App() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [showRegister, setShowRegister] = useState(false)

  // Movie data states
  const [movies, setMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [heroMovie, setHeroMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [usingMockData, setUsingMockData] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    const user = authService.getCurrentUser()
    if (user && authService.isAuthenticated()) {
      setCurrentUser(user)
      setIsAuthenticated(true)
    } else {
      setLoading(false)
    }
  }, [])

  // Fetch movies only when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchMovieData()
    }
  }, [isAuthenticated])

  const fetchMovieData = async () => {
    try {
      setError(null)
      console.log('Fetching movies from TMDB API...')

      // Fetch all data in parallel
      const [popular, trending, topRated, nowPlaying] = await Promise.all([
        getMovies('popular'),
        getTrendingMovies(),
        getTopRatedMovies(),
        getNowPlayingMovies()
      ])
      
      console.log('Popular:', popular?.length || 0)
      console.log('Trending:', trending?.length || 0)
      console.log('Top Rated:', topRated?.length || 0)
      console.log('Now Playing:', nowPlaying?.length || 0)

      setMovies(popular && popular.length > 0 ? popular : mockMovies)
      setTrendingMovies(trending && trending.length > 0 ? trending : mockMovies)
      setTopRatedMovies(topRated && topRated.length > 0 ? topRated : mockMovies)
      setNowPlayingMovies(nowPlaying && nowPlaying.length > 0 ? nowPlaying : mockMovies)
      
      // Check if we're using mock data by checking if data is empty
      const isMockData = !popular || popular.length === 0
      setUsingMockData(isMockData)
      if (isMockData) {
        console.warn('Using mock data - TMDB API is currently unavailable')
      }
      
      // Set random hero movie from available data
      const heroPool = (nowPlaying && nowPlaying.length > 0) ? nowPlaying : (popular && popular.length > 0 ? popular : mockMovies)
      if (heroPool && heroPool.length > 0) {
        const randomIndex = Math.floor(Math.random() * Math.min(heroPool.length, 10))
        setHeroMovie(heroPool[randomIndex])
      }
    } catch (err) {
      console.error('Error fetching movies:', err)
      setError('Failed to load movies. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }


  const handleSearch = async (query) => {
    setIsSearching(true)
    setSearchResults([])
    const results = await searchMovies(query)
    setSearchResults(results)
  }

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
    setIsAuthenticated(true)
    setLoading(true) // Show loading spinner while fetching movies
  }

  const handleLogout = () => {
    authService.logout()
    setCurrentUser(null)
    setIsAuthenticated(false)
    setShowRegister(false)
    setMovies([])
    setTrendingMovies([])
    setTopRatedMovies([])
    setNowPlayingMovies([])
  }

  // Show login/register page if not authenticated
  if (!isAuthenticated) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login 
        onSwitchToRegister={() => setShowRegister(true)}
        onLoginSuccess={handleLoginSuccess}
      />
    )
  }

  // Show loading for authenticated users
  if (loading) {
    return (
      <div className="App">
        <Header onSearch={handleSearch} currentUser={currentUser} onLogout={handleLogout} />
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading Netflix collection...</p>
        </div>
      </div>
    )
  }

  if (error && movies.length === 0) {
    return (
      <div className="App">
        <Header onSearch={handleSearch} currentUser={currentUser} onLogout={handleLogout} />
        <div className="error-container">
          <h2>⚠️ {error}</h2>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    )
  }

return (
    <div className="App">
      <Header onSearch={handleSearch} currentUser={currentUser} onLogout={handleLogout} />
      {usingMockData && (
        <div className="mock-data-banner">
          <p>⚠️ Using demo movies - TMDB API is temporarily unavailable</p>
        </div>
      )}
      {heroMovie && !isSearching && <Hero movie={heroMovie} />}
      <div className="content-wrapper">
        {isSearching && searchResults.length > 0 && (
          <MovieCarousel title={`🔍 Search Results (${searchResults.length})`} movies={searchResults} />
        )}
        {isSearching && searchResults.length === 0 && (
          <div className="no-results">
            <h2>No search results found</h2>
            <p>Try searching for different movies or shows</p>
          </div>
        )}
        {!isSearching && (
          <>
            {nowPlayingMovies.length > 0 && (
              <MovieCarousel title="🎬 Now Playing" movies={nowPlayingMovies} />
            )}
            {trendingMovies.length > 0 && (
              <MovieCarousel title="🔥 Trending Today" movies={trendingMovies} />
            )}
            {movies.length > 0 && (
              <MovieCarousel title="⭐ Popular" movies={movies} />
            )}
            {topRatedMovies.length > 0 && (
              <MovieCarousel title="👑 Top Rated" movies={topRatedMovies} />
            )}
          </>
        )}
      </div>
      <footer className="app-footer">
        <p>&copy; 2026 MovieMaster | Powered by TMDB API</p>
      </footer>
    </div>
  )
}

export default App
