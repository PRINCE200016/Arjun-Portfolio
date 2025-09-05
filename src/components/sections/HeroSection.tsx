import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, MoveRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative bg-primary text-primary-foreground">
       <div className="absolute inset-0 bg-grid-white/[0.07] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
      <div className="container relative flex min-h-[calc(100vh-56px)] flex-col items-center justify-center text-center">
        <h1 className="font-headline text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl fade-in-up">
          Hi, I&apos;m <span className="text-accent">Arjun Rajawat</span>
        </h1>
        <p className="mt-4 max-w-3xl font-light text-primary-foreground/80 md:text-xl fade-in-up" style={{ animationDelay: '0.2s' }}>
          A Java Full Stack Developer, Problem Solver, and Tech Enthusiast, turning ideas into scalable and intelligent solutions.
          <span className="blinking-cursor border-r-2 border-accent"></span>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="bg-accent text-accent-foreground transition-transform duration-300 hover:scale-105">
            <Link href="https://drive.google.com/file/d/185DZ5accSjChJJVNLlV5fLkk85lAnAqg/view?usp=drive_link" target="_blank">
              Download Resume
              <ArrowDown className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="transition-transform duration-300 hover:scale-105">
            <Link href="#contact">
              Contact Me
              <MoveRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
