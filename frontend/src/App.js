// src/App.jsx - Main App Component
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import CreateBlog from './pages/CreateBlog';
import AuthorBlogs from './pages/AuthorBlogs';
import PublicBlogs from './pages/PublicBlogs';
import BlogDetail from './pages/BlogDetail';
import Analytics from './pages/Analytics';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (!currentUser) {
      if (currentPage === 'login') return <Login API_URL={API_URL} onLogin={handleLogin} />;
      if (currentPage === 'register') return <Register API_URL={API_URL} />;
      return <PublicBlogs API_URL={API_URL} onPageChange={setCurrentPage} />;
    }

    if (currentPage === 'dashboard') return <Dashboard user={currentUser} />;
    if (currentPage === 'users') return <UserManagement API_URL={API_URL} user={currentUser} />;
    if (currentPage === 'create-blog') return <CreateBlog API_URL={API_URL} user={currentUser} onPageChange={setCurrentPage} />;
    if (currentPage === 'my-blogs') return <AuthorBlogs API_URL={API_URL} user={currentUser} onPageChange={setCurrentPage} />;
    if (currentPage === 'all-blogs') return <PublicBlogs API_URL={API_URL} onPageChange={setCurrentPage} />;
    if (currentPage === 'blog-detail') return <BlogDetail API_URL={API_URL} user={currentUser} onPageChange={setCurrentPage} />;
    if (currentPage === 'analytics') return <Analytics API_URL={API_URL} user={currentUser} />;
    
    return <Dashboard user={currentUser} />;
  };

  return (
    <div className="app">
      <Navbar 
        user={currentUser} 
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
        onPageChange={setCurrentPage}
      />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;