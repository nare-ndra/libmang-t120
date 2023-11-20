// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './stylesheets/alignments.css';
import './stylesheets/theme.css';
import './stylesheets/sizes.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';
import Profile from './pages/Profile';
import BookDescription from './pages/Profile/BookDescription';
import AvailableBooks from './pages/Profile/AvailableBooks.js';
import ContactLibrarian from './pages/Home/ContactLibrarian.js';

function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {loading && <Loader />}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/book/:id" element={<ProtectedRoute><BookDescription /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/available-books" element={<ProtectedRoute><AvailableBooks /></ProtectedRoute>} />
          <Route path='/contact-librarian' element={<ProtectedRoute><ContactLibrarian /></ProtectedRoute>} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
