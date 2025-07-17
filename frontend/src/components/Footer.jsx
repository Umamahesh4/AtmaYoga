import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>AtmaYoga</h3>
            <p>Find your inner balance through personalized yoga practices.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/asanas">Asanas</a></li>
              <li><a href="/form">Get Recommendations</a></li>
              <li><a href="/team">Our Team</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Yoga for Beginners</a></li>
              <li><a href="#">Meditation Guides</a></li>
              <li><a href="#">Breathing Techniques</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><i className="fas fa-map-marker-alt"></i> Amrita Vishwa Vidyapeetam</p>
            <p><i className="fas fa-phone"></i> +91 1234567890</p>
            <p><i className="fas fa-envelope"></i> info@atmayoga.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 AtmaYoga. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
