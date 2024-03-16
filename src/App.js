import React, { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.Navbar');
      const logoContainer = document.querySelector('.logo-container');
      const logoContainerBottom = logoContainer.offsetTop + logoContainer.offsetHeight;
      if (window.pageYOffset >= logoContainerBottom) {
        navbar.classList.add('fixed-navbar');
      } else {
        navbar.classList.remove('fixed-navbar');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <source src="animation1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="right-column">
          <h1>Image to Code in Seconds</h1>
          <p>Transform your images into executable code with just a few clicks. Experience the magic of automation.</p>
          <button>Try Now</button>
        </div>
      </main>
      <section className="waitlist-section">
        <h2>Join the waitlist if you would like to use Snap Code and get the latest news!</h2>
        <div className="waitlist-form">
          <input type="email" placeholder="Your Email Address" />
          <button type="submit"><span>Submit</span></button>
        </div>
      </section>
    </div>
  );
}

export default App;
