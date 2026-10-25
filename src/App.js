import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

const FORM_MEMBERSHIP =
  "https://docs.google.com/forms/d/e/1FAIpQLScTNoA7VjGEu5KfIumDuwqDT4HU5VK3EdxZdXgkpesp1YWOmQ/viewform";
const FORM_VISUAL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeLyhjK85OBhkkXbZEp7zMRfGzsFMP98uFn0hUohs88C2-gfA/viewform";
const FORM_FORUM = "https://forms.gle/4dM9FWwncHNx5Np36";
const IG_URL = "https://www.instagram.com/stage17.az/?hl=tr";
const LINKEDIN_URL =
  "https://www.linkedin.com/company/stage17/posts/?feedView=all";

const NAV_LINKS = [
  { n: "01", label: "HAQQIMIZDA", id: "about" },
  { n: "02", label: "KOMANDA", id: "speakers" },
  { n: "03", label: "QALEREYA", id: "gallery" },
  { n: "04", label: "FAQ", id: "faq" },
  { n: "05", label: "TƏRƏFDAŞLAR", id: "partners" },
];

const STATS = [
  { tag: "A1 — ZAL", target: 500, label: "İştirakçı" },
  { tag: "A2 — SƏHNƏ", target: 20, label: "Spiker & Mentor" },
  { tag: "A3 — MİKROFON", target: 15, label: "Panel & Çıxış" },
  { tag: "A4 — LOJA", target: 10, label: "Tərəfdaş" },
];

const FEATURES = [
  {
    n: "01",
    title: "Real Təcrübələr və Fərqli Vizyon",
    text: "Sahəsinin peşəkarları ilə bir araya gəlib, mühazirələrdən kənar, dünyagörüşünü genişləndirəcək interaktiv panellər və çıxışlar.",
  },
  {
    n: "02",
    title: "Güclü Networkinq Mühiti",
    text: "Sənin kimi inkişafa meyilli gənclərlə əhatə olunacaq, bəlkə də gələcək layihələrin üçün ən yaxşı komanda yoldaşlarını məhz burada tapacaqsan.",
  },
  {
    n: "03",
    title: "Səhnə Şansı",
    text: "Stage17 sadəcə izləmək üçün deyil; burada qazandığın bilik və əlaqələrlə gələcəkdə o səhnədə çıxış edən sən özün ola bilərsən.",
  },
];

const ROUTE = [
  { row: "SIRA 17", step: "Dinlə" },
  { row: "SIRA 09", step: "Müzakirə et" },
  { row: "SIRA 01", step: "Əlaqə qur" },
];

const TEAM = [
  { mono: "YƏ", role: "Təsisçi", name: "Yaqub Əmiraslanov" },
  { mono: "FƏ", role: "Baş Koordinator", name: "Fatimə Əliyeva" },
  { mono: "LA", role: "Event Koordinator", name: "Ləman Abdullayeva" },
  { mono: "HH", role: "Web Developer", name: "Hüseyn Hüseynov" },
];

const GALLERY = [
  { src: "/gallery/event-1.jpg", alt: "Stage17 tədbirindən an" },
  { src: "/gallery/event-2.jpg", alt: "Stage17 tədbirindən an" },
  { src: "/gallery/event-3.jpg", alt: "Stage17 tədbirindən an" },
  { src: "/gallery/event-4.jpg", alt: "Stage17 tədbirindən an" },
  { src: "/gallery/event-5.jpg", alt: "Stage17 tədbirindən an" },
  { src: "/gallery/event-6.jpg", alt: "Stage17 tədbirindən an" },
];

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

const PARTNERS = ["Mereza Parfum", "DevJoint", "AZMİU"];
const MARQUEE_WORDS = [
  "POTENSİALINI KƏŞF ET",
  "ŞƏBƏKƏ QUR",
  "GƏLƏCƏYƏ ADDIM AT",
  "SƏHNƏYƏ ÇIX",
];

/* Animated count-up inside brackets, triggers once on scroll */
function StatCounter({ tag, target, label }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
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
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
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
      <span className="stat-tag">{tag}</span>
      <div className="stat-number">
        <span className="stat-bracket">[</span>
        {value}
        <span className="stat-bracket">]</span>
        <span className="stat-plus">+</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function FaqItem({ n, question, answer, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button
        type="button"
        className="faq-question"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="faq-n">{n}</span>
        <span className="faq-q-text">{question}</span>
        <span className="faq-toggle">{isOpen ? <FaTimes /> : "+"}</span>
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
}

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
      <span className="gallery-frame-no">{String(index + 1).padStart(2, "0")}</span>
      {failed ? (
        <span className="gallery-placeholder">Tədbir şəkli {index + 1}</span>
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

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return undefined;
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
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;
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
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </span>
    </div>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        hero.style.setProperty("--px", x.toFixed(3));
        hero.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToSection = useCallback((e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  }, []);

  const scrollTop = useCallback((e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      {/* NAVBAR */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <a href="#top" className="logo" aria-label="Stage17" onClick={scrollTop}>
          <span className="logo-stage">STAGE</span>
          <span className="logo-17">17</span>
        </a>

        <button
          type="button"
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          aria-label="Menyu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((p) => !p)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => scrollToSection(e, l.id)}
            >
              <span className="nav-n">{l.n}</span> {l.label}
            </a>
          ))}
          <a
            href={FORM_MEMBERSHIP}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            QEYDİYYAT
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero" ref={heroRef}>
        <div className="hero-fx" aria-hidden="true">
          <span className="spotlight" />
          <span className="stage-floor" />
          <span className="hero-17">17</span>
        </div>

        <div className="hero-inner">
          <div className="hero-labels">
            <span>BAKI · AZƏRBAYCAN</span>
            <span className="hero-live">
              <span className="live-dot" /> PƏRDƏ AÇILIR
            </span>
            <span>GƏNCLƏRİN İNKİŞAF FORUMU</span>
          </div>

          <h1 className="hero-title">
            <span className="line fill animate-up">GƏNCLƏRİN</span>
            <span className="line solid animate-up delay-1">İNKİŞAF</span>
            <span className="line outline animate-up delay-2">PLATFORMASI</span>
          </h1>

          <p className="hero-sub animate-up delay-2">
            Potensialını kəşf et, şəbəkə qur, gələcəyə addım at.
          </p>

          <div className="tickets animate-up delay-3">
            <a
              href={FORM_MEMBERSHIP}
              target="_blank"
              rel="noopener noreferrer"
              className="ticket ticket-primary"
            >
              <span className="ticket-meta">BİLET № 01 · PULSUZ</span>
              <span className="ticket-main">
                ÜZVLÜK QEYDİYYATI <FaArrowRight />
              </span>
            </a>
            <a
              href={FORM_FORUM}
              target="_blank"
              rel="noopener noreferrer"
              className="ticket ticket-ghost"
            >
              <span className="ticket-meta">BİLET № 02 · FORUM</span>
              <span className="ticket-main">
                "İNKİŞAF" FORUM QEYDİYYATI <FaArrowRight />
              </span>
            </a>
          </div>

          <a
            href={FORM_VISUAL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link animate-up delay-3"
          >
            📷 Visual Creator Proqramı üçün müraciət et →
          </a>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 3 }).map((_, r) => (
            <React.Fragment key={r}>
              {MARQUEE_WORDS.map((w, i) => (
                <span key={`${r}-${i}`} className="marquee-item">
                  {w} <span className="marquee-sep">/</span>
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="stats">
        <div className="section-wrap stats-grid">
          {STATS.map((s) => (
            <StatCounter key={s.tag} {...s} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section about">
        <div className="section-wrap">
          <span className="eyebrow reveal">PƏRDƏ I</span>
          <h2 className="section-title reveal">BİZ KİMİK?</h2>
          <p className="about-lead reveal">
            Arxa sırada oturub dinləmək üçün yox —{" "}
            <span className="hl">səhnəyə çıxmaq üçün</span> buradasan.
          </p>
          <div className="about-body">
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

          <div className="features">
            {FEATURES.map((f, i) => (
              <article
                className="feature reveal"
                key={f.n}
                style={{ "--reveal-delay": `${i * 0.1}s` }}
              >
                <span className="feature-n">{f.n}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTE */}
      <section className="section route">
        <div className="section-wrap">
          <div className="route-head">
            <span className="eyebrow reveal">SIRA</span>
            <h2 className="section-title reveal">
              17-ci sıradan <span className="hl">səhnəyə</span>
            </h2>
            <span className="route-note reveal">SƏNİN MARŞRUTUN →</span>
          </div>
          <div className="route-steps">
            {ROUTE.map((r, i) => (
              <div
                className="route-step reveal"
                key={r.row}
                style={{ "--reveal-delay": `${i * 0.1}s` }}
              >
                <span className="route-row">{r.row}</span>
                <span className="route-label">{r.step}</span>
              </div>
            ))}
            <div
              className="route-step route-final reveal"
              style={{ "--reveal-delay": "0.3s" }}
            >
              <span className="route-row">SƏHNƏ</span>
              <span className="route-label">Çıxış et</span>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="speakers" className="section team">
        <div className="section-wrap">
          <span className="eyebrow eyebrow-dark reveal">
            PƏRDƏ II · SƏHNƏ HEYƏTİ
          </span>
          <h2 className="section-title title-dark reveal">KOMANDA VƏ SPİKERLƏR</h2>
          <ul className="team-list">
            {TEAM.map((m, i) => (
              <li
                className="team-row reveal"
                key={m.name}
                style={{ "--reveal-delay": `${i * 0.08}s` }}
              >
                <span className="team-mono">{m.mono}</span>
                <span className="team-role">{m.role}</span>
                <span className="team-line" />
                <span className="team-name">{m.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section gallery">
        <div className="section-wrap">
          <div className="gallery-head">
            <div>
              <span className="eyebrow reveal">PƏRDƏ III · KEÇMİŞ TƏDBİRLƏRDƏN</span>
              <h2 className="section-title reveal">QALEREYA</h2>
              <p className="gallery-intro reveal">
                Əvvəlki tədbirlərimizdən anlar — enerji, networking və səhnə.
              </p>
            </div>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-ig reveal"
            >
              <FaInstagram /> Daha çox şəkil üçün Instagram-da izlə
            </a>
          </div>
          <div className="film">
            <span className="film-perf film-perf-top" aria-hidden="true" />
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
            <span className="film-perf film-perf-bottom" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section faq">
        <div className="section-wrap faq-wrap">
          <div className="faq-head">
            <span className="eyebrow reveal">ENCORE</span>
            <h2 className="section-title reveal">TEZ-TEZ VERİLƏN SUALLAR</h2>
            <p className="faq-sub reveal">Pərdə enmədən öncə ən çox soruşulanlar.</p>
          </div>
          <div className="faq-list">
            {FAQS.map((item, i) => (
              <div
                className="reveal"
                key={item.q}
                style={{ "--reveal-delay": `${i * 0.06}s` }}
              >
                <FaqItem
                  n={String(i + 1).padStart(2, "0")}
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

      {/* PARTNERS */}
      <section id="partners" className="section partners">
        <div className="section-wrap">
          <span className="eyebrow reveal">
            TƏRƏFDAŞLAR · BU SƏHNƏNİ MÜMKÜN EDƏNLƏR
          </span>
        </div>
        <div className="partners-marquee" aria-hidden="true">
          <div className="partners-track">
            {Array.from({ length: 4 }).map((_, r) =>
              PARTNERS.map((p, i) => (
                <span className="partner" key={`${r}-${i}`}>
                  {p} <span className="partner-sep">✕</span>
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section final-cta">
        <div className="section-wrap final-inner">
          <span className="eyebrow reveal">SON PƏRDƏ</span>
          <h2 className="final-title reveal">
            SƏHNƏ SƏNİ <span className="hl">GÖZLƏYİR</span>
          </h2>
          <p className="final-sub reveal">
            İştirak pulsuzdur. Qeydiyyat bir neçə dəqiqə çəkir.
          </p>
          <div className="final-buttons reveal">
            <a
              href={FORM_MEMBERSHIP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              ÜZVLÜK QEYDİYYATI <FaArrowRight />
            </a>
            <a
              href={FORM_FORUM}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              "İNKİŞAF" FORUMU
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="section-wrap footer-inner">
          <a href="#top" className="logo" onClick={scrollTop} aria-label="Stage17">
            <span className="logo-stage">STAGE</span>
            <span className="logo-17">17</span>
          </a>
          <div className="footer-social">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
          <a href="#top" className="footer-up" onClick={scrollTop}>
            YUXARI <FaArrowUp />
          </a>
        </div>
        <p className="copyright">&copy; 2026 DevJoint — Bütün hüquqlar qorunur.</p>
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
