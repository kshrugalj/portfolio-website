import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Projects from './components/Projects';
import ExperienceEducation from './components/ExperienceEducation';
import AnimatedSection from './components/AnimatedSection';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />

      <div id="projects">
        <AnimatedSection>
          <Projects />
        </AnimatedSection>
      </div>
      <div id="experience-education">
        <AnimatedSection>
          <ExperienceEducation />
        </AnimatedSection>
      </div>
    </div>
  )
}

export default App
