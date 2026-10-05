import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import JourneySection from '@/components/sections/JourneySection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AnimatedSection delay={0.1}>
          <AboutSection />
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <JourneySection />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <SkillsSection />
        </AnimatedSection>
        <AnimatedSection delay={0.25}>
          <ExperienceSection />
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <ProjectsSection />
        </AnimatedSection>
        <AnimatedSection delay={0.35}>
          <ContactSection />
        </AnimatedSection>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
