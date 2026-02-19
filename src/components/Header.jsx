import { useState } from 'react'
import { FiSearch, FiBell, FiLogOut } from 'react-icons/fi'
import './Header.css'

function Header({ onSearch, currentUser, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  window.addEventListener('scroll', () => {
    setIsScrolled(window.scrollY > 0)
  })

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery)
      setSearchQuery('')
      setSearchActive(false)
    }
  }

  const handleLogout = () => {
    setShowProfileMenu(false)
    onLogout()
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo">
          <span className="netflix-n">M</span>
          <span className="logo-text">ovieM</span>
          <span className="logo-text-accent">a</span>
          <span className="logo-text">ster</span>
        </div>
        <nav className="nav">
          <a href="#home" className="nav-link active">Home</a>
          <a href="#trending" className="nav-link">Trending</a>
          <a href="#toprated" className="nav-link">Top Rated</a>
          <a href="#mylist" className="nav-link">My List</a>
        </nav>
        <div className="header-icons">
          <form className={`search-form ${searchActive ? 'active' : ''}`} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search movies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchActive(true)}
              onBlur={() => !searchQuery && setSearchActive(false)}
            />
            <button type="submit" className="search-btn">
              <FiSearch size={20} />
            </button>
          </form>
          <button className="icon-btn notification-btn">
            <FiBell size={24} />
            <span className="notification-badge"></span>
          </button>
          
          {currentUser && (
            <div className="profile-dropdown">
              <button 
                className="profile-pic-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                title={currentUser.name}
              >
                <span className="profile-pic">{getInitials(currentUser.name)}</span>
              </button>
              
              {showProfileMenu && (
                <div className="profile-menu">
                  <div className="profile-header">
                    <div className="profile-info">
                      <p className="profile-name">{currentUser.name}</p>
                      <p className="profile-email">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="profile-menu-divider"></div>
                  <button className="logout-btn" onClick={handleLogout}>
                    <FiLogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
