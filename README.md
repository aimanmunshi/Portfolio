# Aiman Munshi — Portfolio

A personal developer portfolio built as a fully self-contained, single-page site with a futuristic **space / galaxy** theme — animated starfield, glassmorphism panels, orbiting hero portrait, constellation-style timelines, and scroll-driven reveal animations.

**Live site:** [aimanmunshi.github.io/Portfolio](https://aimanmunshi.github.io/Portfolio/)

![Made with HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![Made with CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Made with JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![No frameworks](https://img.shields.io/badge/dependencies-zero_JS_frameworks-9b6bff)

---

## ✨ Features

- **Animated canvas starfield** — twinkling stars and occasional shooting stars rendered on `<canvas>`, fully responsive to viewport size
- **Nebula glow backdrops** with a mouse-tracking cursor glow
- **Orbiting hero portrait** with rotating ring accents and a floating animation
- **Glassmorphism cards** for certifications and projects, with 3D tilt-on-hover
- **Constellation-style timelines** for DSA progress and skills
- **Scroll-reveal animations** via `IntersectionObserver`
- **Responsive navbar** with active-section highlighting and a mobile slide-in menu
- Respects `prefers-reduced-motion` for accessibility
- Zero build step, zero JS frameworks — plain HTML/CSS/JS

## 📁 Project structure

```
.
├── index.html          # Single-page markup — About, Certifications, DSA, Projects, Skills, Contact
├── css/
│   └── style.css       # Theme, layout, animations
├── js/
│   └── main.js         # Starfield canvas, scroll reveal, nav, parallax, tilt effects
└── images/
    └── project/        # Profile photo, certification images
```

## 🚀 Running locally

No build tools or dependencies required — it's static HTML/CSS/JS. Serve the folder with any static file server, for example:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then open `http://localhost:8080` in your browser.

## 🛠️ Sections

| Section | Content |
|---|---|
| About | Intro, tagline, and links to LinkedIn, GitHub, CodeChef, HackerRank |
| Certifications | Udemy (C Programming), Coursera (Programming, DBMS), NPTEL (Java) |
| DSA Progress | Arrays, Linked Lists, Stacks, Queues, Trees, Hashing, Graphs |
| Projects | SuperMarket Management System (Java), Heart Disease Prediction Model (Python) |
| Skills | C/C++, Java & Python, Data Structures & Algorithms |
| Contact | Phone and email |

## 📬 Contact

- Email: [munshiaiman2005@gmail.com](mailto:munshiaiman2005@gmail.com)
- LinkedIn: [aiman-munshi](https://www.linkedin.com/in/aiman-munshi-6ab0b5331/)
- GitHub: [@aimanmunshi](https://github.com/aimanmunshi)
- CodeChef: [aimanmunshi](https://www.codechef.com/users/aimanmunshi)
- HackerRank: [am5373](https://www.hackerrank.com/am5373)

---

Built with a lot of coffee and a love for dark-mode UI. 🌌
