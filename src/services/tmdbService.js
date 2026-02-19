import axios from 'axios'
import { mockMovies } from './mockData'

// TMDB API Configuration
// Get API key from: https://github.com/rickylawson/freekeys (TMDB section)
const API_KEY = '75109d62886804cdb4f8dc9775fb5666'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000, // 8 seconds timeout
  headers: {
    'Accept': 'application/json',
  }
})

// Add API key to all requests
api.interceptors.request.use(
  (config) => {
    config.params = config.params || {}
    config.params.api_key = API_KEY
    return config
  },
  (error) => Promise.reject(error)
)

// Better error handling with mock data fallback
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('TMDB API Error:', {
        status: error.response.status,
        message: error.response.data?.status_message || error.message
      })
    } else if (error.request) {
      console.warn('No response from TMDB API - using mock data')
    } else {
      console.error('Error setting up request:', error.message)
    }
    return Promise.reject(error)
  }
)

export const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/now_playing', {
      params: { page, language: 'en-US' }
    })
    return response.data.results || mockMovies
  } catch (error) {
    console.warn('TMDB API unavailable for now playing, using mock data')
    return mockMovies
  }
}

export const getMovies = async (endpoint = 'popular', page = 1) => {
  try {
    const response = await api.get(`/movie/${endpoint}`, {
      params: { page, language: 'en-US' }
    })
    return response.data.results || mockMovies
  } catch (error) {
    console.warn(`TMDB API unavailable for ${endpoint} movies, using mock data`)
    // Shuffle and return mock movies for variety
    return mockMovies.sort(() => Math.random() - 0.5)
  }
}

export const getTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/day', {
      params: { language: 'en-US' }
    })
    return response.data.results || mockMovies
  } catch (error) {
    console.warn('TMDB API unavailable for trending movies, using mock data')
    return mockMovies.sort(() => Math.random() - 0.5)
  }
}

export const getTopRatedMovies = async () => {
  try {
    const response = await api.get('/movie/top_rated', {
      params: { language: 'en-US' }
    })
    return response.data.results || mockMovies
  } catch (error) {
    console.warn('TMDB API unavailable for top rated movies, using mock data')
    return mockMovies.sort((a, b) => b.vote_average - a.vote_average)
  }
}

export const searchMovies = async (query) => {
  try {
    const response = await api.get('/search/movie', {
      params: { query, language: 'en-US' }
    })
    return response.data.results || mockMovies
  } catch (error) {
    console.warn('TMDB API unavailable for search, using mock data')
    // Search in mock data
    const lowerQuery = query.toLowerCase()
    return mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.overview.toLowerCase().includes(lowerQuery)
    ) || mockMovies
  }
}

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: { language: 'en-US' }
    })
    return response.data
  } catch (error) {
    console.warn('TMDB API unavailable for movie details, using mock data')
    return mockMovies.find(m => m.id === movieId) || mockMovies[0]
  }
}

export const getImageUrl = (path, width = 'original') => {
  if (!path) return null
  // If path is already a full URL (starts with http), return as-is
  if (path.startsWith('http')) {
    return path
  }
  // Build TMDB image URL
  const widthMap = {
    original: 'original',
    w1280: 'w1280',
    w780: 'w780',
    w500: 'w500',
    w342: 'w342',
    w154: 'w154',
    w92: 'w92'
  }
  const selectedWidth = widthMap[width] || 'original'
  const imageUrl = `${IMAGE_BASE_URL}/${selectedWidth}${path}`
  return imageUrl
}

// Check if API is accessible
export const healthCheck = async () => {
  try {
    const response = await api.get('/movie/popular', { params: { language: 'en-US' } })
    return { status: 'online', statusCode: response.status }
  } catch (error) {
    return { status: 'offline', using: 'mock_data' }
  }
}
