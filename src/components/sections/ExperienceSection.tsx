'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, MapPin, Building2, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { experienceData } from '@/data/experienceData';

const ExperienceCard = ({ item }: { item: typeof experienceData[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleHighlights = isExpanded ? item.responsibilities : item.responsibilities.slice(0, 6);
  const remainingCount = item.responsibilities.length - 6;

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-border/70 bg-card">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <Building2 className="h-4 w-4 text-accent" />
              <span>{item.company}</span>
            </div>
            <CardTitle className="mt-1 font-headline text-2xl font-bold text-foreground">
              {item.role}
            </CardTitle>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 font-normal text-xs md:text-sm">
              <Calendar className="h-3.5 w-3.5 text-accent" />
              <span>{item.duration}</span>
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground/80" />
          <span>{item.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {item.tech.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="bg-accent/5 border-accent/30 text-foreground/90 font-medium text-xs hover:bg-accent/10 transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="border-t border-border/50 pt-4">
          <h4 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-3">
            Key Responsibilities & Highlights
          </h4>
          <ul className="space-y-2.5">
            {visibleHighlights.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>

          {remainingCount > 0 && (
            <div className="mt-4 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="gap-2 text-primary hover:text-accent hover:border-accent/40 font-medium transition-colors"
              >
                {isExpanded ? (
                  <>
                    Show Less <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show More ({remainingCount} More Highlights) <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="bg-muted/40 py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <Badge variant="outline">Work Experience</Badge>
          <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
            Professional Experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Practical industry experience building enterprise automation, business workflow systems, and data-driven applications.
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto space-y-8">
          {experienceData.map((item) => (
            <div key={item.id} className="relative">
              <ExperienceCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
