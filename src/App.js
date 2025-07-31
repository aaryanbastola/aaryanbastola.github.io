import React, { useRef } from "react";
import "./App.css";
import logo from "./ab-logo.png";
import project1Img from "./project1.png";
import project2Img from "./project2.png";
import cvPdf from "./cv.pdf";

const projects = [
  {
    title: "Claude AI Project 1",
    description: "My first project hosted on Claude AI.",
    image: project1Img,
    link: "https://claude.ai/public/artifacts/85836101-4137-4987-ad2c-9fbf0fd2001d",
  },
  {
    title: "Claude AI Project 2",
    description: "My second project hosted on Claude AI.",
    image: project2Img,
    link: "https://claude.ai/public/artifacts/74d78379-9a18-4217-b4f3-7a98e2abe23d",
  },
];

function App() {
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Smooth scroll to section
  const scrollTo = (ref) => ref.current.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="main-bg">
      {/* NAVBAR */}
      <nav className="topnav">
        <div className="nav-left">
          <img src={logo} alt="Aaryan Bastola Logo" className="nav-logo" />
        </div>
        <ul className="nav-links">
          <li>
            <button onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>Home</button>
          </li>
          <li>
            <button onClick={() => scrollTo(projectsRef)}>Projects</button>
          </li>
          <li>
            <button onClick={() => scrollTo(contactRef)}>Contact</button>
          </li>
          <li>
            <a
              href={cvPdf}
              className="cv-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              CV
            </a>
          </li>
        </ul>
      </nav>

      {/* PROJECTS SECTION */}
      <section className="section" ref={projectsRef} id="projects">
        <h1 className="section-title">My Projects</h1>
        <div className="projects-grid">
          {projects.map((p, idx) => (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-img-wrap">
                <img src={p.image} alt={p.title} className="project-img" />
              </div>
              <div className="project-desc">
                <h2>{p.title}</h2>
                <p>{p.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section contact-section" ref={contactRef} id="contact">
        <h1 className="section-title">Contact Me</h1>
        <div className="contact-card">
          <p>
            <span>Email:</span>{" "}
            <a href="mailto:aaryanbastola221@gmail.com">
              aaryanbastola221@gmail.com
            </a>
          </p>
          <p>
            <span>LinkedIn:</span>{" "}
            <a
              href="https://linkedin.com/in/aaryanbastola"
              target="_blank"
              rel="noopener noreferrer"
            >
              aaryanbastola
            </a>
          </p>
          <p>
            <span>GitHub:</span>{" "}
            <a
              href="https://github.com/aaryanbastola"
              target="_blank"
              rel="noopener noreferrer"
            >
              aaryanbastola
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} Aaryan Bastola. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
