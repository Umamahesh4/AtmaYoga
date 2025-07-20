import "./Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";

const testimonials = [
  {
    content:
      "AtmaYoga helped me find the perfect asanas to manage my anxiety. I've been practicing the recommended poses for a month, and I can feel a significant difference in my stress levels.",
    name: "Abhina Krishnan",
    practice: "Practicing for 3 months",
    image: "/images/user1.webp",
  },
  {
    content:
      "As someone struggling with low self-esteem, the personalized asana recommendations gave me a structured practice that helped me build confidence and strength.",
    name: "Karan Singhanai",
    practice: "Practicing for 6 months",
    image: "/images/user2.webp",
  },
  {
    content:
      "I was skeptical at first, but the mood-based recommendations really work! The asanas suggested for my restlessness have helped me find a sense of calm I didn't think was possible.",
    name: "John Rodriguez",
    practice: "Practicing for 2 months",
    image: "/images/user3.webp",
  },
];

function Home() {
  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <div className="hero-content-home">
            <h1>
              Find Your Balance with <span>AtmaYoga</span>
            </h1>
            <p>
              Discover personalized yoga asanas tailored to your emotional needs
              and physical well-being.
            </p>
            <div className="hero-buttons">
              <a href="/form" className="btn btn-primary">
                Get Recommendations
              </a>
              <a href="/about" className="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="/images/hero_section.avif"
              alt="Person doing Yoga Pose"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose AtmaYoga</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>Mood-Based Recommendations</h3>
              <p>
                Get yoga asanas customized to your current emotional state using
                our advanced algorithm.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-user-circle"></i>
              </div>
              <h3>Personalized Experience</h3>
              <p>
                Our detailed questionnaire helps create a yoga practice tailored
                to your unique needs.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-book"></i>
              </div>
              <h3>Comprehensive Asana Library</h3>
              <p>
                Access detailed descriptions and benefits of various yoga
                postures in our extensive database.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <span className="circle">1</span>
              <h3>Fill the Questionnaire</h3>
              <p>
                Answer questions about your mood, physical condition, and
                lifestyle.
              </p>
            </div>
            <div className="step">
              <span className="circle">2</span>
              <h3>Get Recommendations</h3>
              <p>
                Our system analyzes your responses and suggests the best asanas
                for you.
              </p>
            </div>
            <div className="step">
              <span className="circle">3</span>
              <h3>Practice & Improve</h3>
              <p>
                Follow the recommended practices and track your progress over
                time.
              </p>
            </div>
          </div>
          <div className="cta">
            <a href="/form" className="btn btn-primary">
              Start Your Journey
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Users Say</h2>
          <Slider {...sliderSettings} ref={sliderRef} className="testimonial-slider">
            {testimonials.map((t, index) => (
              <div className="testimonial" key={index}>
                <div className="testimonial-content">
                  <p>"{t.content}"</p>
                </div>
                <div className="testimonial-author">
                  <img src={t.image} alt="User" />
                  <div>
                    <h4>{t.name}</h4>
                    <p>{t.practice}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="testimonial-controls">
            <button
              id="prev-testimonial"
              className="testimonial-btn"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              id="next-testimonial"
              className="testimonial-btn"
              onClick={() => sliderRef.current.slickNext()}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated with AtmaYoga</h2>
            <p>
              Subscribe to our newsletter for tips, new asanas, and special
              offers.
            </p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
