# 🚀 Premium AI/ML Developer Portfolio

A premium, professional, responsive, and animated personal portfolio website built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Optimized for speed, visuals, and responsiveness.

---

## ✨ Features Implemented

*   **📊 Interactive Skills Dashboard**: A tabbed category sidebar that updates a central grid of technology badges, containing a bottom detail panel showing skill write-ups without layout shifts.
*   **🧲 Magnetic snappers Custom Cursor**: A desktop cursor ring that pulls elements slightly towards it, and morphs into a glowing button outline when hovering over interactive elements.
*   **🌓 Smooth Light/Dark Mode**: Fully styled dynamic theme switcher that preserves readability and tag contrast.
*   **✨ Particle AI Network Canvas**: A WebGL-style grid of moving nodes and connecting paths in the Hero background.
*   **📱 Sticky/Dynamic Header**: Top dismissible "Open to Work" banner + navbar blur transitions.
*   **🎴 3D Hover Tilt Cards**: Interactive category and project cards that tilt in response to mouse movement.
*   **⚡ Keyboard Navigation**: Pressing `1`–`8` jumps to corresponding sections instantly with custom toast indicators.
*   **🎉 easter egg Confetti**: Typing `hire` anywhere triggers a full-canvas confetti blast.
*   **📥 Native Resume Download**: Clean CTA buttons pointing to root-served PDF files.

---

## 🛠️ How to Customize Your Info

All of your portfolio data is decoupled from the UI. You only need to edit one file:
👉 **[`src/data/portfolio.js`](file:///c:/Users/ankit/OneDrive/Desktop/portfolio/src/data/portfolio.js)**

### 1. Personal & Contact Info (Lines 10–28)
```js
export const personal = {
  name: "Ankit Raj",
  initials: "AR",
  role: "AI/ML Developer",
  tagline: "Building intelligent applications...",
  email: "your.email@example.com",             // ← Your actual email
  profileImage: "/photo.jpg",                   // ← Your photo in public/
  formspreeId: "YOUR_FORMSPREE_FORM_ID",         // ← Register at formspree.io to get this
  socials: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
  },
  githubUsername: "your-username",              // ← For live stats integrations
  openToWork: true,                             // ← Set false to hide the green top banner
  resume: "/resume.pdf",                        // ← Your resume PDF in public/
};
```

### 2. Custom Assets (PDF & Images)
To configure your photo and resume, drop them into the **`public/`** folder:
*   Save your photo as: `public/photo.jpg` (or `photo.png`, etc.)
*   Save your resume as: `public/resume.pdf`

*Note: In Vite, files inside the `public/` folder are served directly from the root path, so set their paths in `portfolio.js` as `/photo.jpg` and `/resume.pdf`.*

### 3. Projects (Lines ~100–140)
Add or modify project objects in the `projects` array. The modal detail view automatically loads these:
```js
{
  id: "smart-resume-ranker",
  title: "Smart Resume Ranker",
  shortDesc: "ML-powered resume screening...",
  description: "An intelligent resume screening system...",
  tags: ["Python", "NLP", "Scikit-learn"],
  github: "https://github.com/...",
  demo: "https://demo-url.com",                  // ← Set null if no live demo yet
  featured: true,
  gradient: "from-blue-600/20 to-violet-600/20",  // ← Custom card glow gradients
  accentColor: "#3b82f6",
  details: [                                     // ← Extended points shown inside the modal
    "Parses and cleans resumes using NLP...",
    "TF-IDF vectorization...",
  ],
}
```

### 4. Timeline Achievements (Lines ~150–180)
Add workshops, hackathons, and competitions in the `experience` array. Specify the type (`hackathon` | `workshop` | `competition` | `certification` | `achievement`) to apply dynamic high-contrast colored badges automatically.

---

## 💻 How to Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the development server**:
   ```bash
   npm run dev
   ```
3. **Open the browser**:
   Go to `http://localhost:5173/` (Vite will select another port if 5173 is in use).

---

## 🚀 How to Deploy (Vercel)

The project is fully prepared for Vercel deployment:

1. Install Vercel globally:
   ```bash
   npm i -g vercel
   ```
2. Run deployment:
   ```bash
   vercel --prod
   ```
*Or connect this directory directly to your Github repository and deploy it via the [Vercel Dashboard](https://vercel.com).*
