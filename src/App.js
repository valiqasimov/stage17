import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import "./App.css";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="App" id="top">
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
        <a href="#top" className="logo-link" aria-label="STAGE homepage">
          <img src="/logo.png" alt="17stage Logo" className="logo-img" />
        </a>

        <div className="nav-links">
          <a href="#about" onClick={(e) => scrollToSection(e, "about")}>
            HAQQIMIZDA
          </a>
          <a href="#speakers" onClick={(e) => scrollToSection(e, "speakers")}>
            SPİKERLƏR VƏ KOMANDA
          </a>
          <a href="#partners" onClick={(e) => scrollToSection(e, "partners")}>
            TƏRƏFDAŞLAR
          </a>
          <div className="social-links" aria-label="Social media links">
            <a
              href="https://www.instagram.com/stage17.az/?hl=tr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="https://www.linkedin.com/company/stage17/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={14} />
            </a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1 className="animate-slide-up">GƏNCLƏRİN İNKİŞAF FORUMU</h1>
          <p className="animate-slide-up delay-1">
            Potensialını kəşf et, şəbəkə qur və gələcəyə addım at.
          </p>

          <div className="hero-cta animate-slide-up delay-2">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScTNoA7VjGEu5KfIumDuwqDT4HU5VK3EdxZdXgkpesp1YWOmQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary cta-button"
            >
              <span className="cta-icon">👤</span>
              ÜZVLÜK QEYDİYYATI
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeLyhjK85OBhkkXbZEp7zMRfGzsFMP98uFn0hUohs88C2-gfA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary cta-button"
            >
              <span className="cta-icon">📷</span>
              Visual Creator Proqramı
            </a>
          </div>
        </div>
      </header>

      <section id="about" className="content-section content-section-dark">
        <div className="content-section-inner">
          <h2>BİZ KİMİK?</h2>
          <p>
            17stage platforması gənclərin şəxsi, peşəkar və sosial inkişafını
            dəstəkləmək məqsədilə yaradılmışdır. Təlimlər, netvörkinq və
            mentorluq proqramları ilə müasir dövrün tələblərinə uyğun,
            rəqabətədavamlı gəncliyi bir araya gətiririk.
          </p>
        </div>
      </section>

      <section id="speakers" className="content-section content-section-light">
        <div className="content-section-inner">
          <h2>KOMANDA VƏ SPİKERLƏR</h2>
          <div className="grid-container">
            <div className="card">
              <h3>Yaqub Əmiraslanov</h3>
              <p>Təsisçi</p>
            </div>
            <div className="card">
              <h3>Fatimə Əliyeva</h3>
              <p>Baş kordinator</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="partners-footer" id="partners">
        <div className="partners-footer-inner">
          <div className="partners-label">TƏRƏFDAŞLAR</div>
          <div className="partners-grid">
            <div className="partner-logo">Mareza Parfum</div>
            <div className="partner-logo">AZMİU</div>
          </div>
        </div>
        <p className="copyright-line">&copy; 2026 17stage. Bütün hüquqlar qorunur.</p>
      </footer>
    </div>
  );
}

export default App;
