import { useState } from "react";
import "./About.css";

function About() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const faqData = [
    {
      question: "Do I need to be experienced in yoga to use AtmaYoga?",
      answer:
        "Not at all! AtmaYoga is designed for practitioners of all levels, from complete beginners to advanced yogis. Our recommendations take into account your experience level and provide appropriate asanas accordingly.",
    },
    {
      question: "How often should I complete the questionnaire?",
      answer:
        "We recommend completing the questionnaire whenever you notice a significant change in your emotional state or physical condition. Many users find it helpful to complete it weekly or bi-weekly to adjust their practice to their current needs.",
    },
    {
      question: "Can I use AtmaYoga alongside my existing yoga practice?",
      answer:
        "Absolutely! AtmaYoga is designed to complement any existing practice. You can incorporate our recommended asanas into your routine or use them as a standalone practice when you need emotional support.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "We take data privacy very seriously. All your personal information and questionnaire responses are encrypted and stored securely. We never share your individual data with third parties. You can read more in our Privacy Policy.",
    },
    {
      question: "How are the asanas selected for different emotional states?",
      answer:
        "Our asana recommendations are based on a combination of traditional yoga knowledge, modern research on the mind-body connection, and input from certified yoga instructors. We've mapped specific asanas to emotional states based on their effects on the nervous system, breath, and body positioning.",
    },
  ];

  return (
    <>
      <header className="page-header about-header">
        <div className="container">
          <h1>About AtmaYoga</h1>
          <p>Discover our journey, mission, and approach to personalized yoga</p>
        </div>
      </header>

      <section className="about-story">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img src="/images/pic1.avif" alt="Yoga meditation" />
            </div>
            <div className="about-text">
              <h2>Our Story</h2>
              <p>AtmaYoga was born from a simple yet profound insight: yoga is not a one-size-fits-all practice. Each person's emotional and physical needs are unique, and their yoga practice should reflect that individuality.</p>
              <p>Founded in 2023 by a team of yoga practitioners, psychologists, and technology enthusiasts, AtmaYoga set out to bridge the gap between traditional yoga wisdom and modern technology. We recognized that many people struggle to find the right yoga practices for their specific emotional needs, especially in a world where mental well-being is increasingly challenged.</p>
              <p>After two years of research, collaboration with yoga experts, and development of our innovative recommendation algorithm, AtmaYoga launched with a mission to make personalized yoga accessible to everyone.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="container">
          <div className="section-header">
            <h2>Our Mission</h2>
            <p>What drives us every day</p>
          </div>
          <div className="mission-content">
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Personalized Wellness</h3>
              <p>
                To provide tailored yoga practices that address the unique
                emotional and physical needs of each individual.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3>Accessible Practice</h3>
              <p>
                To make the benefits of yoga accessible to people of all
                backgrounds, ages, and experience levels.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>Emotional Balance</h3>
              <p>
                To help people find emotional equilibrium through targeted yoga
                practices designed for specific mood states.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Holistic Approach</h3>
              <p>
                To blend ancient yoga wisdom with modern understanding of
                psychology and physiology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="approach">
        <div className="container">
          <div className="section-header">
            <h2>Our Approach</h2>
            <p>How we create personalized yoga recommendations</p>
          </div>
          <div className="approach-content">
            <div className="approach-steps">
              {[1, 2, 3, 4].map((step) => {
                const titles = ["Comprehensive Assessment", "Data Analysis", "Expert-Backed Recommendations", "Personalized Practice"];
                const descs = [
                  "Our detailed questionnaire captures your current emotional state, physical condition, lifestyle factors, and yoga experience.",
                  "Our algorithm analyzes your responses, identifying patterns and needs that correspond to specific yoga practices.",
                  "We match your profile with yoga asanas that have been carefully mapped to different emotional and physical states by certified yoga instructors.",
                  "You receive a customized list of recommended asanas with detailed instructions and benefits tailored to your current needs."
                ];
                return (
                  <div className="approach-step" key={step}>
                    <div className="step-number">{step}</div>
                    <div className="step-content">
                      <h3>{titles[step - 1]}</h3>
                      <p>{descs[step - 1]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="science">
        <div className="container">
          <div className="section-header">
            <h2>The Science Behind AtmaYoga</h2>
            <p>Our evidence-based approach to yoga recommendations</p>
          </div>
          <div className="science-content">
            <div className="science-text">
              <p>AtmaYoga's recommendation system is built on a foundation of both traditional yoga wisdom and modern scientific research. Our approach combines:</p>
              <ul>
                <li><strong>Traditional Knowledge:</strong> Centuries-old understanding of how specific asanas affect different aspects of physical and mental well-being.</li>
                <li><strong>Psychological Research:</strong> Contemporary studies on the effects of movement and breath on emotional states.</li>
                <li><strong>Machine Learning:</strong> Advanced algorithms that improve recommendations based on user feedback and outcomes.</li>
                <li><strong>Expert Validation:</strong> Input from certified yoga instructors and wellness professionals who verify our mappings of asanas to emotional states.</li>
              </ul>
              <p>Our system continues to evolve as we gather more data and incorporate the latest research, ensuring that our recommendations remain at the cutting edge of yoga science.</p>
            </div>
            <div className="science-image">
              <img src="/images/pic2.avif" alt="Yoga science illustration" />
            </div>
          </div>
        </div>
      </section>

    <section className="faq">
      <div className="container">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Common questions about AtmaYoga</p>
        </div>
        <div className="faq-container">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "active" : ""}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{item.question}</h3>
                <span className="faq-toggle">
                  <i className={`fas ${openIndex === index ? "fa-minus" : "fa-plus"}`}></i>
                </span>
              </div>
              <div
                className="faq-answer"
                style={{
                  maxHeight: openIndex === index ? "200px" : "0",
                  opacity: openIndex === index ? 1 : 0,
                  transition: "all 0.4s ease",
                }}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Personalized Yoga Journey?</h2>
            <p>Fill out our comprehensive questionnaire and receive your tailored asana recommendations today.</p>
            <a href="/form" className="btn btn-primary">Get Started Now</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
