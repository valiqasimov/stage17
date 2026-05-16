import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

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
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1 className="animate-slide-up">GƏNCLƏRİN İNKİŞAF PLATFORMASI</h1>
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
            <a
              href="https://forms.gle/4dM9FWwncHNx5Np36"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary cta-button"
            >
              <span className="cta-icon">📚</span>
              "İnkişaf" Forum Qeydiyyatı
            </a>
          </div>
        </div>
      </header>

      <section id="about" className="content-section content-section-dark">
        <div className="content-section-inner">
          <h2>BİZ KİMİK?</h2>
          <div className="about-text-block">
            <p>
              Stage17 — sadəcə arxa sıralarda əyləşib kimisə dinləyəcəyin
              sıradan bir tədbir deyil.
            </p>
            <p>
              Biz, gənclərin şəxsi və peşəkar inkişafını dəstəkləyən, fərqli
              baxış bucaqlarının kəsişdiyi canlı bir çıxış və müzakirə
              platformasıyıq.
            </p>
            <p>
              Əsas məqsədimiz sənin yalnız dinləyici kimi qalmağını deyil, öz
              fikirlərini cəsarətlə ifadə edən, səhnədə parlayan və cəmiyyətdə
              fərqlənən birinə çevrilməyini təmin etməkdir.
            </p>
            <ul>
              <li>
                <strong>Real Təcrübələr və Fərqli Vizyon:</strong> Sahəsinin
                peşəkarları ilə bir araya gəlib, mühazirələrdən kənar,
                dünyagörüşünü genişləndirəcək interaktiv panellər və çıxışlar.
              </li>
              <li>
                <strong>Güclü Networkinq Mühiti:</strong> Sənin kimi inkişafa
                meyilli gənclərlə əhatə olunacaq, bəlkə də gələcək layihələrin
                üçün ən yaxşı komanda yoldaşlarını məhz burada tapacaqsan.
              </li>
              <li>
                <strong>Səhnə Şansı:</strong> Stage17 sadəcə izləmək üçün deyil;
                burada qazandığın bilik və əlaqələrlə gələcəkdə o səhnədə çıxış
                edən sən özün ola bilərsən.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="speakers" className="content-section content-section-light">
        <div className="content-section-inner">
          <h2>KOMANDA VƏ SPİKERLƏR</h2>
          <div className="grid-container">
            <div className="card">
              <img
                src="/yaqub.jpeg"
                alt="Yaqub Əmiraslanov"
                className="card-image"
              />
              <h3>Yaqub Əmiraslanov</h3>
              <p>Təsisçi</p>
            </div>
            <div className="card">
              <img
                src="/fatime.jpeg"
                alt="Fatimə Əliyeva"
                className="card-image"
              />
              <h3>Fatimə Əliyeva</h3>
              <p>Baş kordinator</p>
            </div>
            <div className="card">
              <img
                src="/leman.jpeg"
                alt="Ləman Abdullayeva"
                className="card-image"
              />
              <h3>Ləman Abdullayeva</h3>
              <p>Event kordinator</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="partners-footer" id="partners">
        <div className="partners-footer-inner">
          <div className="partners-label">TƏRƏFDAŞLAR</div>
          <div className="partners-grid">
            <div className="partner-logo">Mereza Parfum</div>
            <div className="partner-logo">DevJoint</div>
            <div className="partner-logo">AZMİU</div>
          </div>
        </div>

        <div className="site-footer">
          <div className="social-links" aria-label="Social media links">
            <a
              href="https://www.instagram.com/stage17.az/?hl=tr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram-link"
              aria-label="Instagram"
            >
              <FaInstagram size={32} />
            </a>
            <a
              href="https://www.linkedin.com/company/stage17/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={32} />
            </a>
          </div>
        </div>

        <p className="copyright-line">
          &copy; 2026 DevJoint - Bütün hüquqlar qorunur.
        </p>
      </footer>
    </div>
  );
}

export default App;
