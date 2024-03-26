import React, { useState, useEffect } from "react";
import "./App.css";
import userImage from './user-image.png';
import animation1 from './animation1.mp4';
import codeText from './code-in-text.mp4';
import exampleBg from './example-background.png';

function App() {

  useEffect(() => {
    // Scroll to top when refreshed logic
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    // Fixed navbar logic
    const handleScroll = () => {
      const navbar = document.querySelector(".Navbar");
      const logoContainer = document.querySelector(".logo-container");
      const logoContainerBottom = logoContainer.offsetTop + logoContainer.offsetHeight;

      if (document.documentElement.scrollTop >= logoContainerBottom) {
        navbar.classList.add("fixed-navbar");
      } else {
        navbar.classList.remove("fixed-navbar");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up function to remove event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [showImage, setShowImage] = useState(true);
  const [buttonText, setButtonText] = useState("SnapCode! →");

  const toggleMedia = () => {
    setShowImage(!showImage);
    setButtonText(showImage ? "Original Image →" : "SnapCode! →");
  
    const videoElement = document.querySelector(".media-container video");
    if (videoElement) {
      if (!showImage) {
        videoElement.play();
      } else {
        videoElement.pause();
        videoElement.currentTime = 0; // Optionally reset video to start
      }
    }
  }

  const scrollToNewSection = () => {
    const section = document.querySelector(".new-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  // 제출할때 이렇게 동작하면되 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    // 내가 받은정보 = email => 보낸다!
    try {
      const response = await fetch('http://localhost:5001/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: email }),
      });
      if (response.ok) {
        alert('Email submitted successfully!');
      } else {
        alert('Failed to submit email.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting email.');
    }
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
          <button className="button" onClick={scrollToNewSection}>Try Now</button>
        </div>
      </main>
      <section className="new-section">
        <h1>You know all those great images you have? Just leave the coding part for us. We got you covered.</h1>
        <div className="media-container" 
          style={{ 
            backgroundImage: `url(${exampleBg})`, 
            backgroundSize: "101%", 
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat"
          }}>
          <div className="media">
            {showImage ? <img src={userImage} alt="User's creation" /> : 
              <video autoPlay loop muted>
                <source src={codeText} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            }
          </div>
          <button onClick={toggleMedia} className="button" 
            style={{ 
              backgroundColor: "black", 
              color: "white", 
              fontFamily: "inherit",
              marginTop: "20px" 
            }}>
            {buttonText}
          </button>
        </div>
      </section>
      <section className="waitlist-section">
        <h2>Join the waitlist if you would like to use SnapCode and get the latest news!</h2>
        <form className="waitlist-form" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Your Email Address" />
          <button type="submit"><span>Submit</span></button>
        </form>
      </section>
    </div>
  );
}

export default App;
