import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaUsers,
  FaLightbulb,
  FaMicrophoneAlt,
  FaChevronDown,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCamera,
} from "react-icons/fa";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

/* --- Animated count-up number, triggers once when scrolled into view --- */
function StatCounter({ target, suffix = "", label }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setValue(target);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          const duration = 1600;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat-card reveal" ref={ref}>
      <div className="stat-number">
        {value}
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* --- Accordion FAQ item --- */
function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button
        type="button"
        className="faq-question"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{question}</span>
        <FaChevronDown className="faq-chevron" />
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
}

const FAQS = [
  {
    q: "Stage17 nədir?",
    a: "Stage17 — gənclərin şəxsi və peşəkar inkişafını dəstəkləyən canlı çıxış və müzakirə platformasıdır. Burada sahəsinin peşəkarları ilə bir araya gəlir, networking qurur və öz səhnə şansını qazanırsan.",
  },
  {
    q: "İştirak ödənişlidir?",
    a: "Xeyr, hazırda iştirak tamamilə pulsuzdur. Sadəcə onlayn qeydiyyatdan keçmək kifayətdir.",
  },
  {
    q: "Tədbirlər harada keçirilir?",
    a: "Tədbirlərimiz Bakıda keçirilir. Dəqiq məkan və tarix hər tədbirdən əvvəl qeydiyyatdan keçən iştirakçılara və sosial media hesablarımızda elan olunur.",
  },
  {
    q: "Tədbirə necə qeydiyyatdan keçə bilərəm?",
    a: "Yuxarıdakı “Üzvlük Qeydiyyatı” və “İnkişaf Forum Qeydiyyatı” düymələri vasitəsilə onlayn formu doldurmaqla bir neçə dəqiqəyə qeydiyyatdan keçə bilərsən.",
  },
  {
    q: "Kimlər iştirak edə bilər?",
    a: "İnkişafa meyilli bütün gənclər — tələbələr, yeni başlayanlar və öz sahəsində irəliləmək istəyənlər. Təcrübə tələb olunmur, sadəcə iştirak etmək istəyin kifayətdir.",
  },
];

/* Keçmiş tədbirlərdən şəkillər — faylları public/gallery/ qovluğuna əlavə et */
const GALLERY = [
  { src: "/gallery/event-1.jpg", alt: "Stage17 tədbirindən an" },
  { src: "/gallery/event-2.jpg", alt: "Stage17 tədbirindən an" },
  { src: "/gallery/event-3.jpg", alt: "Stage17 tədbirindən an" },
  { src: "/gallery/event-4.jpg", alt: "Stage17 tədbirindən an" },
  { src: "/gallery/event-5.jpg", alt: "Stage17 tədbirindən an" },
  { src: "/gallery/event-6.jpg", alt: "Stage17 tədbirindən an" },
];

/* Single gallery tile — falls back to a styled placeholder if the image is missing */
function GalleryTile({ image, index, onOpen }) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      className={`gallery-item reveal ${failed ? "is-placeholder" : ""}`}
      style={{ "--reveal-delay": `${(index % 3) * 0.1}s` }}
      onClick={() => !failed && onOpen(index)}
      aria-label={image.alt}
    >
      {failed ? (
        <span className="gallery-placeholder">
          <FaCamera />
        </span>
      ) : (
        <>
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            onError={() => setFailed(true)}
          />
          <span className="gallery-overlay">
            <FaInstagram />
          </span>
        </>
      )}
    </button>
  );
}

/* Lightbox modal with prev/next navigation */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  if (index === null) return null;
  const image = images[index];

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox-close" aria-label="Bağla" onClick={onClose}>
        <FaTimes />
      </button>
      <button
        className="lightbox-nav lightbox-prev"
        aria-label="Əvvəlki"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        <FaChevronLeft />
      </button>
      <img
        className="lightbox-img"
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="lightbox-nav lightbox-next"
        aria-label="Növbəti"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <FaChevronRight />
      </button>
      <span className="lightbox-counter">
        {index + 1} / {images.length}
      </span>
    </div>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Scroll reveal */
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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Pointer-reactive hero glow */
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

  const scrollToSection = useCallback((e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  }, []);

  const openLightbox = useCallback((i) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length),
    []
  );
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i + 1) % GALLERY.length),
    []
  );

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
            KOMANDA
          </a>
          <a href="#gallery" onClick={(e) => scrollToSection(e, "gallery")}>
            QALEREYA
          </a>
          <a href="#faq" onClick={(e) => scrollToSection(e, "faq")}>
            FAQ
          </a>
          <a href="#partners" onClick={(e) => scrollToSection(e, "partners")}>
            TƏRƏFDAŞLAR
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScTNoA7VjGEu5KfIumDuwqDT4HU5VK3EdxZdXgkpesp1YWOmQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            QEYDİYYAT
          </a>
        </div>
      </nav>

      <header className="hero" ref={heroRef}>
        <div className="hero-bg" aria-hidden="true">
          <span className="hero-grid" />
          <span className="hero-orb hero-orb-1" />
          <span className="hero-orb hero-orb-2" />
          <span className="hero-orb hero-orb-3" />
        </div>

        <div className="hero-content">
          <span className="hero-badge animate-slide-up">
            <span className="hero-badge-dot" />
            Gənclərin inkişaf forumu
          </span>
          <h1 className="hero-title">GƏNCLƏRİN İNKİŞAF PLATFORMASI</h1>
          <p className="animate-slide-up delay-2">
            Potensialını kəşf et, şəbəkə qur və gələcəyə addım at.
          </p>

          <div className="hero-cta animate-slide-up delay-3">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScTNoA7VjGEu5KfIumDuwqDT4HU5VK3EdxZdXgkpesp1YWOmQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary cta-button"
            >
              ÜZVLÜK QEYDİYYATI
              <FaArrowRight className="btn-arrow" />
            </a>
            <a
              href="https://forms.gle/4dM9FWwncHNx5Np36"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost cta-button"
            >
              "İnkişaf" Forum Qeydiyyatı
            </a>
          </div>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeLyhjK85OBhkkXbZEp7zMRfGzsFMP98uFn0hUohs88C2-gfA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-secondary-link animate-slide-up delay-3"
          >
            📷 Visual Creator Proqramı üçün müraciət et
          </a>
        </div>

        <a
          href="#stats"
          className="scroll-indicator"
          aria-label="Aşağı sürüşdür"
          onClick={(e) => scrollToSection(e, "stats")}
        >
          <span className="scroll-mouse">
            <span className="scroll-wheel" />
          </span>
        </a>
      </header>

      <section id="stats" className="stats-section">
        <div className="stats-grid">
          <StatCounter target={500} suffix="+" label="İştirakçı" />
          <StatCounter target={20} suffix="+" label="Spiker & Mentor" />
          <StatCounter target={15} suffix="+" label="Panel & Çıxış" />
          <StatCounter target={10} suffix="+" label="Tərəfdaş" />
        </div>
      </section>

      <section id="about" className="content-section content-section-dark">
        <div className="content-section-inner">
          <span className="section-eyebrow reveal">HAQQIMIZDA</span>
          <h2 className="reveal">BİZ KİMİK?</h2>
          <div className="about-text-block">
            <p className="reveal">
              Stage17 — sadəcə arxa sıralarda əyləşib kimisə dinləyəcəyin
              sıradan bir tədbir deyil. Biz, gənclərin şəxsi və peşəkar
              inkişafını dəstəkləyən, fərqli baxış bucaqlarının kəsişdiyi canlı
              bir çıxış və müzakirə platformasıyıq.
            </p>
            <p className="reveal">
              Əsas məqsədimiz sənin yalnız dinləyici kimi qalmağını deyil, öz
              fikirlərini cəsarətlə ifadə edən, səhnədə parlayan və cəmiyyətdə
              fərqlənən birinə çevrilməyini təmin etməkdir.
            </p>
          </div>

          <div className="feature-grid">
            <article
              className="feature-card reveal"
              style={{ "--reveal-delay": "0.05s" }}
            >
              <div className="feature-icon">
                <FaLightbulb />
              </div>
              <h3>Real Təcrübələr və Fərqli Vizyon</h3>
              <p>
                Sahəsinin peşəkarları ilə bir araya gəlib, mühazirələrdən kənar,
                dünyagörüşünü genişləndirəcək interaktiv panellər və çıxışlar.
              </p>
            </article>
            <article
              className="feature-card reveal"
              style={{ "--reveal-delay": "0.18s" }}
            >
              <div className="feature-icon">
                <FaUsers />
              </div>
              <h3>Güclü Networkinq Mühiti</h3>
              <p>
                Sənin kimi inkişafa meyilli gənclərlə əhatə olunacaq, bəlkə də
                gələcək layihələrin üçün ən yaxşı komanda yoldaşlarını məhz
                burada tapacaqsan.
              </p>
            </article>
            <article
              className="feature-card reveal"
              style={{ "--reveal-delay": "0.31s" }}
            >
              <div className="feature-icon">
                <FaMicrophoneAlt />
              </div>
              <h3>Səhnə Şansı</h3>
              <p>
                Stage17 sadəcə izləmək üçün deyil; burada qazandığın bilik və
                əlaqələrlə gələcəkdə o səhnədə çıxış edən sən özün ola bilərsən.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="speakers" className="content-section content-section-light">
        <div className="content-section-inner">
          <span className="section-eyebrow reveal">KOMANDA</span>
          <h2 className="reveal">KOMANDA VƏ SPİKERLƏR</h2>
          <div className="grid-container">
            {[
              { img: "/yaqub.jpeg", name: "Yaqub Əmiraslanov", role: "Təsisçi" },
              { img: "/fatime.jpeg", name: "Fatimə Əliyeva", role: "Baş kordinator" },
              { img: "/leman.jpeg", name: "Ləman Abdullayeva", role: "Event kordinator" },
              { img: "/huseyn.png", name: "Hüseyn Hüseynov", role: "Web Developer" },
            ].map((person, i) => (
              <div
                className="card reveal"
                key={person.name}
                style={{ "--reveal-delay": `${0.05 + i * 0.11}s` }}
              >
                <div className="card-image-wrap">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="card-image"
                    loading="lazy"
                  />
                </div>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="content-section content-section-light">
        <div className="content-section-inner">
          <span className="section-eyebrow reveal">QALEREYA</span>
          <h2 className="reveal">KEÇMİŞ TƏDBİRLƏRDƏN</h2>
          <p className="gallery-intro reveal">
            Əvvəlki tədbirlərimizdən anlar — enerji, networking və səhnə.
          </p>
          <div className="gallery-grid">
            {GALLERY.map((image, i) => (
              <GalleryTile
                key={image.src}
                image={image}
                index={i}
                onOpen={openLightbox}
              />
            ))}
          </div>
          <a
            href="https://www.instagram.com/stage17.az/?hl=tr"
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-ig-link reveal"
          >
            <FaInstagram />
            Daha çox şəkil üçün Instagram-da izlə
          </a>
        </div>
      </section>

      <section id="faq" className="content-section content-section-dark">
        <div className="content-section-inner">
          <span className="section-eyebrow reveal">FAQ</span>
          <h2 className="reveal">TEZ-TEZ VERİLƏN SUALLAR</h2>
          <div className="faq-list">
            {FAQS.map((item, i) => (
              <div
                className="reveal"
                key={item.q}
                style={{ "--reveal-delay": `${i * 0.08}s` }}
              >
                <FaqItem
                  question={item.q}
                  answer={item.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="partners-footer" id="partners">
        <div className="partners-footer-inner">
          <div className="partners-label reveal">TƏRƏFDAŞLAR</div>
          <div className="partners-grid">
            {["Mereza Parfum", "DevJoint", "AZMİU"].map((name, i) => (
              <div
                className="partner-logo reveal"
                key={name}
                style={{ "--reveal-delay": `${0.05 + i * 0.1}s` }}
              >
                {name}
              </div>
            ))}
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
              <FaInstagram size={22} />
            </a>
            <a
              href="https://www.linkedin.com/company/stage17/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={22} />
            </a>
          </div>
        </div>

        <p className="copyright-line">
          &copy; 2026 DevJoint - Bütün hüquqlar qorunur.
        </p>
      </footer>

      <Lightbox
        images={GALLERY}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
      <Analytics />
    </div>
  );
}

export default App;
