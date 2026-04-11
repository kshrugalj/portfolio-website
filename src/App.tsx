import Navbar from './components/Navbar';
import Hero from './components/Hero';

import CurrentProjects from './components/CurrentProjects';
import Projects from './components/Projects';
import ExperienceEducation from './components/ExperienceEducation';
import AnimatedSection from './components/AnimatedSection';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div>
      <CustomCursor />
      <Navbar />
      <Hero />

      <div id="current-projects">
        <AnimatedSection>
          <CurrentProjects />
        </AnimatedSection>
      </div>

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
