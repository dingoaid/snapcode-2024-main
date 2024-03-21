import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import userImage from './user-image.png';
import animation1 from './animation1.mp4';
import codeText from './code-in-text.mp4';


function App() {

  useEffect(() => {
    // Scroll to top when refreshed logic
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    // Fixed navbar logic
    const handleScroll = () => {
      const navbar = document.querySelector('.Navbar');
      const logoContainer = document.querySelector('.logo-container');
      const logoContainerBottom = logoContainer.offsetTop + logoContainer.offsetHeight;

      if (document.documentElement.scrollTop >= logoContainerBottom) {
        navbar.classList.add('fixed-navbar');
      } else {
        navbar.classList.remove('fixed-navbar');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up function to remove event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  // Function to toggle video play/pause
  const toggleVideoPlay = () => {
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsVideoPlaying(!isVideoPlaying);
  };


  return (
    <div className="App">
      <header className="App-header">
      <div className="logo-container"></div>
        <nav className="Navbar">
          <div className="leftNav">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#discover">Discover</a>
          </div>
          <a href="#login" className="login">Login</a>
          <a href="#joinWaitlist" className="joinWaitlist">Join Waitlist</a>
        </nav>
      </header>
      <main className="main-content">
        <div className="left-column">
          <video autoPlay loop muted>
            <source src={animation1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="right-column">
          <h1>Image to Code in Seconds</h1>
          <p>Transform your images into executable code with just a few clicks. Experience the magic of automation.</p>
          <button>Try Now</button>
        </div>
      </main>
      <section className="new-section">
        <h1>You know all those great images you have? Just leave the coding part for us. We got you covered.</h1>
        <div className="media-container">
          <img src={userImage} alt="User's creation" />
          <button onClick={toggleVideoPlay}>SnapCode!</button>
          <video ref={videoRef} autoPlay loop muted>
            <source src={codeText} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      <section className="waitlist-section">
        <h2>Join the waitlist if you would like to use SnapCode and get the latest news!</h2>
        <div className="waitlist-form">
          <input type="email" placeholder="Your Email Address" />
          <button type="submit"><span>Submit</span></button>
        </div>
      </section>
    </div>
  );
}

export default App;
