// src/components/Navbar.jsx
import React from 'react';

export function Navbar({ user, onLogout, onPageChange }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 onClick={() => onPageChange('home')} style={{ cursor: 'pointer' }}>📝 BlogHub</h1>
      </div>
      <div className="nav-center">
        <button onClick={() => onPageChange('all-blogs')}>All Blogs</button>
        {user && user.userType === 'author' && (
          <>
            <button onClick={() => onPageChange('create-blog')}>Create Blog</button>
            <button onClick={() => onPageChange('my-blogs')}>My Blogs</button>
            <button onClick={() => onPageChange('analytics')}>Analytics</button>
          </>
        )}
        {user && user.userType === 'admin' && (
          <>
            <button onClick={() => onPageChange('users')}>Users</button>
            <button onClick={() => onPageChange('analytics')}>Analytics</button>
          </>
        )}
      </div>
      <div className="nav-right">
        {!user ? (
          <>
            <button onClick={() => onPageChange('login')}>Login</button>
            <button onClick={() => onPageChange('register')}>Register</button>
          </>
        ) : (
          <>
            <span className="user-name">{user.firstName} ({user.userType})</span>
            <button onClick={() => { onLogout(); onPageChange('home'); }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;