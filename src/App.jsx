import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';

// Layout
import Navbar     from './components/layout/Navbar';
import Footer     from './components/layout/Footer';

// UI
import LoadingScreen     from './components/ui/LoadingScreen';
import ScrollProgress    from './components/ui/ScrollProgress';
import CustomCursor      from './components/ui/CustomCursor';
import BackToTop         from './components/ui/BackToTop';
import OpenToWorkBanner  from './components/ui/OpenToWorkBanner';
import TechTicker        from './components/ui/TechTicker';
import AIAssistant       from './components/ui/AIAssistant';

// Sections
import Hero              from './components/sections/Hero';
import About             from './components/sections/About';
import Skills            from './components/sections/Skills';
import Projects          from './components/sections/Projects';
import Experience        from './components/sections/Experience';
import Education         from './components/sections/Education';
import Certifications    from './components/sections/Certifications';
import CurrentlyLearning from './components/sections/CurrentlyLearning';
import Blog              from './components/sections/Blog';
import Contact           from './components/sections/Contact';

// Hooks
import useKeyboardNav    from './hooks/useKeyboardNav';
import useEasterEgg      from './hooks/useEasterEgg';

function PortfolioApp() {
  const [loaded, setLoaded] = useState(false);

  // Global interactions
  useKeyboardNav();
  useEasterEgg();

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
          minHeight: '100vh',
        }}
      >
        {/* Global UI */}
        <CustomCursor />
        <ScrollProgress />
        <BackToTop />
        <AIAssistant />

        {/* Open to work banner above navbar */}
        <OpenToWorkBanner />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main>
          <Hero />
          <About />

          {/* Tech ticker between About and Skills */}
          <TechTicker />

          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <CurrentlyLearning />
          <Blog />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
