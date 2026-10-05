import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, GraduationCap, Gauge } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const highlights = [
  {
    icon: Briefcase,
    value: 'Apps Script Developer',
    label: 'D-Table Analytics, since July 2026',
  },
  {
    icon: Gauge,
    value: '10,482 TPS',
    label: 'HydraPay settlement engine, load tested',
  },
  {
    icon: GraduationCap,
    value: 'Best Project Award',
    label: 'Java Full Stack, among 80+ trainees',
  },
];

const focusAreas = [
  'Google Apps Script',
  'Java & Spring Boot',
  'Google Sheets APIs',
  'PostgreSQL',
  'Redis & Kafka',
  'ERP & Workflow Automation',
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Portrait */}
          <div className="flex items-start justify-center md:col-span-1">
            <Card className="overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <CardContent className="p-0">
                <Image
                  src="/images/About_img.png"
                  alt="Arjun Rajawat"
                  width={400}
                  height={500}
                  className="aspect-[4/5] object-cover"
                  data-ai-hint="professional portrait"
                  priority
                />
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center md:col-span-2">
            <Badge variant="outline" className="w-fit">
              About Me
            </Badge>

            <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
              I build the systems businesses run on every day
            </h2>

            <div className="mt-4 space-y-4 text-lg text-muted-foreground">
              <p>
                I&apos;m Arjun, an Apps Script Developer at D-Table Analytics in
                Bhopal. I build enterprise applications on Google Apps Script and
                Google Sheets, including HRMS, attendance, order-to-dispatch,
                purchase and sales FMS, inventory management, and ERP
                dashboards. They come with role-based access, approval workflows,
                and automated reports, so teams can run their operations from one
                place.
              </p>
              <p>
                Outside client work, I build backend systems in Java. HydraPay,
                my financial settlement engine with a double-entry ledger,
                reached 10,482 TPS in load tests with zero double debits and zero
                deadlocks. It grew out of my Java Full Stack training at Itrainu
                Technologies, Indore, where my project won the Best Project Award.
                I also hold a B.Sc. in Computer Science from Jiwaji University,
                Gwalior (2025).
              </p>
              <p>
                I started my career in marketing and sales, so I&apos;m
                comfortable sitting with clients, understanding how their work
                actually flows, and turning that into software that is fast,
                reliable, and simple to use.
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, value, label }) => (
                <div
                  key={value}
                  className="rounded-xl border bg-card p-4 text-card-foreground"
                >
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <p className="mt-3 font-headline text-lg font-semibold leading-tight">
                    {value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Focus areas */}
            <div className="mt-6 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <Badge key={area} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="#projects">View my projects</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#contact">Get in touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;