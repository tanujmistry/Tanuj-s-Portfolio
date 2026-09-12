import { Layout } from './components/Layout';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { GridScanSection } from './sections/GridScanSection';
import { Skills } from './sections/Skills';
import { DitherOSSection } from './sections/DitherOSSection';
import { NeuroSyncSection } from './sections/NeuroSyncSection';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';

export default function App() {
  return (
    <Layout>
      {/* Hero Section */}
      <Hero />

      {/* Section 01: About */}
      <About />

      {/* React Bits GridScan Feature Section */}
      <GridScanSection />

      {/* Section 02: Skills */}
      <Skills />

      {/* DitherOS Algorithmic Interfaces Section */}
      <DitherOSSection />

      {/* NeuroSync Master Feature Section */}
      <NeuroSyncSection />

      {/* Section 03: Experience */}
      <Experience />

      {/* Section 04: Projects */}
      <Projects />

      {/* Section 05: Certifications */}
      <Certifications />

      {/* Section 06: Contact */}
      <Contact />
    </Layout>
  );
}
