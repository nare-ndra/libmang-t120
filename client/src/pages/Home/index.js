import React from "react";
import { useNavigate } from "react-router-dom";


import videoSource from '../../assets/books.mp4';
import bookImage from '../../assets/book.jpg';

import './Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  const handleViewAvailableBooks = () => {
    navigate("/available-books");
  };
  const handleContactLibrarian = () => {
    navigate("/contact-librarian");
  };

  return (
    <div className="Container">
      <video autoPlay loop muted className="Video">
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="Content">
        <div className="SubContent">
          <h1>Book Catalog</h1>
          <p>Manage your Books with Ease</p>
          
          <button type='button'  
  style={{
    backgroundColor: "#E84545",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    marginTop:"50px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
  }} 
  onClick={handleViewAvailableBooks}>
  View Available Books
</button>
          <img src={bookImage} alt="profile" className="ProfileImage" />

          <footer className="Footer">
        <button
          type="button"
          onClick={handleContactLibrarian}
          style={{
            backgroundColor: "#2196F3",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            margin: "4px 2px",
            marginBottom:"100px",
            cursor: "pointer",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
          }}
        >
          Contact Librarian
        </button>
      </footer>
        </div>

    
    </div>
    </div>
  );
};

export default Home;
