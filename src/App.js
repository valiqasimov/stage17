import React, { useState, useEffect, useRef } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frame = 0;
    const handlePointer = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        hero.style.setProperty("--pointer-x", x.toFixed(3));
        hero.style.setProperty("--pointer-y", y.toFixed(3));
      });
    };

    window.addEventListener("pointermove", handlePointer);
    return () => {
      window.removeEventListener("pointermove", handlePointer);
      cancelAnimationFrame(frame);
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
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="App" id="top">
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
        <a href="#top" className="logo-link" aria-label="STAGE homepage">
          <img src="/logo.png" alt="17stage Logo" className="logo-img" />
        </a>

        <button
          type="button"
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="menu-toggle-line" />
          <span className="menu-toggle-line" />
          <span className="menu-toggle-line" />
        </button>

        <div
          id="primary-navigation"
          className={`nav-links ${isMenuOpen ? "open" : ""}`}
        >
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

      <header className="hero" ref={heroRef}>
        <div className="hero-orbs" aria-hidden="true">
          <span className="hero-orb hero-orb-1" />
          <span className="hero-orb hero-orb-2" />
          <span className="hero-orb hero-orb-3" />
        </div>
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
          <h2 className="reveal">BİZ KİMİK?</h2>
          <div className="about-text-block">
            <p className="reveal">
              Stage17 — sadəcə arxa sıralarda əyləşib kimisə dinləyəcəyin
              sıradan bir tədbir deyil.
            </p>
            <p className="reveal">
              Biz, gənclərin şəxsi və peşəkar inkişafını dəstəkləyən, fərqli
              baxış bucaqlarının kəsişdiyi canlı bir çıxış və müzakirə
              platformasıyıq.
            </p>
            <p className="reveal">
              Əsas məqsədimiz sənin yalnız dinləyici kimi qalmağını deyil, öz
              fikirlərini cəsarətlə ifadə edən, səhnədə parlayan və cəmiyyətdə
              fərqlənən birinə çevrilməyini təmin etməkdir.
            </p>
            <ul>
              <li className="reveal" style={{ "--reveal-delay": "0.05s" }}>
                <strong>Real Təcrübələr və Fərqli Vizyon:</strong> Sahəsinin
                peşəkarları ilə bir araya gəlib, mühazirələrdən kənar,
                dünyagörüşünü genişləndirəcək interaktiv panellər və çıxışlar.
              </li>
              <li className="reveal" style={{ "--reveal-delay": "0.18s" }}>
                <strong>Güclü Networkinq Mühiti:</strong> Sənin kimi inkişafa
                meyilli gənclərlə əhatə olunacaq, bəlkə də gələcək layihələrin
                üçün ən yaxşı komanda yoldaşlarını məhz burada tapacaqsan.
              </li>
              <li className="reveal" style={{ "--reveal-delay": "0.31s" }}>
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
          <h2 className="reveal">KOMANDA VƏ SPİKERLƏR</h2>
          <div className="grid-container">
            <div className="card reveal" style={{ "--reveal-delay": "0.05s" }}>
              <div className="card-image-wrap">
                <img
                  src="/yaqub.jpeg"
                  alt="Yaqub Əmiraslanov"
                  className="card-image"
                  loading="lazy"
                />
              </div>
              <h3>Yaqub Əmiraslanov</h3>
              <p>Təsisçi</p>
            </div>
            <div className="card reveal" style={{ "--reveal-delay": "0.16s" }}>
              <div className="card-image-wrap">
                <img
                  src="/fatime.jpeg"
                  alt="Fatimə Əliyeva"
                  className="card-image"
                  loading="lazy"
                />
              </div>
              <h3>Fatimə Əliyeva</h3>
              <p>Baş kordinator</p>
            </div>
            <div className="card reveal" style={{ "--reveal-delay": "0.27s" }}>
              <div className="card-image-wrap">
                <img
                  src="/leman.jpeg"
                  alt="Ləman Abdullayeva"
                  className="card-image"
                  loading="lazy"
                />
              </div>
              <h3>Ləman Abdullayeva</h3>
              <p>Event kordinator</p>
            </div>
            <div className="card reveal" style={{ "--reveal-delay": "0.38s" }}>
              <div className="card-image-wrap">
                <img
                  src="/huseyn.png"
                  alt="Hüseyn Hüseynov"
                  className="card-image"
                  loading="lazy"
                />
              </div>
              <h3>Hüseyn Hüseynov</h3>
              <p>Web Developer</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="partners-footer" id="partners">
        <div className="partners-footer-inner">
          <div className="partners-label reveal">TƏRƏFDAŞLAR</div>
          <div className="partners-grid">
            <div className="partner-logo reveal" style={{ "--reveal-delay": "0.05s" }}>
              Mereza Parfum
            </div>
            <div className="partner-logo reveal" style={{ "--reveal-delay": "0.15s" }}>
              DevJoint
            </div>
            <div className="partner-logo reveal" style={{ "--reveal-delay": "0.25s" }}>
              AZMİU
            </div>
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
      <Analytics />
    </div>
  );
}

export default App;
