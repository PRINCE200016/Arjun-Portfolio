import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <div className="flex items-center justify-center md:col-span-1">
            <Card className="overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <CardContent className="p-0">
                <Image
                  src="/images/Profile.jpg"
                  alt="Arjun Rajawat"
                  width={400}
                  height={500}
                  className="aspect-[4/5] object-cover"
                  data-ai-hint="professional portrait"
                />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col justify-center md:col-span-2">
            <Badge variant="outline" className="w-fit">About Me</Badge>
            <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
              A Glimpse Into My World
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Curious and motivated Computer Science undergraduate aspiring to build scalable web applications and intelligent solutions. Skilled in Java, Spring Boot, React.js, and SQL, with strong problem-solving ability. I am dedicated to continuous learning and aim to contribute to innovative projects that impact millions of users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
