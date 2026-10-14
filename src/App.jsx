import { useEffect, useState } from "react";
import "./App.css";

const EMAIL = ["tumogarrix7271", "gmail.com"].join("@");

const MODES = {
  dev: {
    label: "Developer",
    lead: "I build web apps that are",
    accent: "fast and dependable.",
    lede: "Front-end engineer working in React and TypeScript. I turn product ideas into accessible, well-tested interfaces.",
  },
  design: {
    label: "Designer",
    lead: "I design interfaces that are",
    accent: "clear and distinctive.",
    lede: "Product designer focused on systems, typography and interaction. I take work from first sketch to shipped screen.",
  },
};

// c1/c2 colour each project's thumbnail. Swap in real screenshots later.
const PROJECTS = [
  { mode: "dev", year: 2026, name: "Simple Storage Dashboard", desc: "Upload, sort and preview photos, videos and documents.", tags: ["HTML", "CSS", "JS"], c1: "#2F5BFF", c2: "#9FB5FF", shape: "bars", url: "https://garrix7271.github.io/Storage-dashboard2/" },
  { mode: "dev", year: 2025, name: "GarrixCore", desc: "GarrixCore connects players across your favorite titles: find a squad, track every match, and climb the ranks together.", tags: ["HTML", "CSS", "JS"], c1: "#0F9D8A", c2: "#A6E8DC", shape: "lines", url: "https://garrix7271.github.io/GarrixCore/" },
  { mode: "dev", year: 2026, name: "School Dashboard", desc: "Overview of school performance, enrollment and operations.", tags: ["HTML", "CSS", "JS"], c1: "#7A4DFF", c2: "#D2C2FF", shape: "dots", url: "https://garrix7271.github.io/school-management/" },
  { mode: "dev", year: 2026, name: "Hotel booking system", desc: "Fernwood Inn sits at the tree line above town: a small, family-run lodge with wood stoves, quiet mornings, and a front desk that knows your name by the second night.", tags: ["HTML", "CSS"], c1: "#D6246E", c2: "#FFB3D1", shape: "bars", url: "https://garrix7271.github.io/hotel-booking-system/" },
];

const SKILLS = [
  ["Build", "React, TypeScript, Node, testing"],
  ["Design", "Figma, design systems, prototyping"],
];

function Thumb({ c1, c2, shape }) {
  return (
    <div className={`thumb thumb-${shape}`} style={{ "--c1": c1, "--c2": c2 }} aria-hidden="true">
      <i /><i /><i />
    </div>
  );
}

function Nav({ theme, onTheme }) {
  return (
    <nav className="nav">
      <div className="wrap nav-in">
        <a className="logo" href="#top">
          <img src="/logo.png" alt="" />
          <span>Tumo Garrix</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button className="icon-btn" onClick={onTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ mode, setMode }) {
  const m = MODES[mode];
  return (
    <header className="hero" id="top">
      <div className="toggle" role="group" aria-label="Choose which work to show">
        {Object.entries(MODES).map(([key, v]) => (
          <button key={key} aria-pressed={mode === key} onClick={() => setMode(key)}>
            {v.label}
          </button>
        ))}
      </div>
      <h1>
        {m.lead} <span>{m.accent}</span>
      </h1>
      <p className="lede">{m.lede}</p>
      <div className="btns">
        <a className="btn primary" href="#work">See my work</a>
        <a className="btn" href="#contact">Get in touch</a>
      </div>
      <div className="orb" aria-hidden="true" />
    </header>
  );
}

function Work({ mode }) {
  const items = PROJECTS.filter((p) => p.mode === mode);
  return (
    <section id="work">
      <h2>Selected {MODES[mode].label.toLowerCase()} work</h2>
      <div className="list">
        {items.map((p) => (
          <article className="row" key={p.name}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.name}`}>
              <Thumb c1={p.c1} c2={p.c2} shape={p.shape} />
            </a>
            <div className="row-text">
              <h3><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a></h3>
              <p>{p.desc}</p>
            </div>
            <div className="row-meta">
              <span className="year">{p.year}</span>
              <div className="tags">
                {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <div className="cols">
        <div>
          <h2>About</h2>
          <p>
            I'm Tumo Garrix, an independent developer and designer. I work with startups and small teams. I like projects where design and code
            are decided together.
          </p>
          <p>Currently booking projects for next quarter.</p>
        </div>
        <ul className="skills">
          {SKILLS.map(([a, b]) => (
            <li key={a}><b>{a}</b><span>{b}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent("Project inquiry")}`;
  return (
    <section id="contact" className="contact">
      <h2>Let's work together</h2>
      <p>Tell me what you're building, your timeline and budget. I reply within two working days.</p>
      <div className="btns">
        <a className="btn primary" href={gmail} target="_blank" rel="noreferrer">
          Email me
        </a>
        <a
          className="btn"
          href={`https://wa.me/254713360017?text=${encodeURIComponent("Hi Tumo, I saw your portfolio and I'd like to talk about a project.")}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp me
        </a>
      </div>
    </section>
  );
}

export default function App() {
  const [mode, setMode] = useState("dev");
  const [theme, setTheme] = useState(() =>
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="app" data-mode={mode}>
      <Nav theme={theme} onTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <main className="wrap">
        <Hero mode={mode} setMode={setMode} />
        <Work mode={mode} />
        <About />
        <Contact />
      </main>
      <footer className="wrap foot">© {new Date().getFullYear()} Tumo Garrix.</footer>
    </div>
  );
}