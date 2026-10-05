'use client';

import { GraduationCap, BookOpen, Briefcase, Award, ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { journeyData, JourneyItem } from "@/data/portfolioData";

const getItemIcon = (type: JourneyItem['type']) => {
  switch (type) {
    case 'Work':
      return <Briefcase className="h-5 w-5" />;
    case 'Training':
      return <Award className="h-5 w-5" />;
    case 'Education':
      return <GraduationCap className="h-5 w-5" />;
    default:
      return <BookOpen className="h-5 w-5" />;
  }
};

const getTypeBadgeVariant = (type: JourneyItem['type']) => {
  switch (type) {
    case 'Work':
      return "bg-accent/15 text-accent border-accent/30";
    case 'Training':
      return "bg-primary/10 text-primary border-primary/20";
    case 'Education':
      return "bg-secondary text-secondary-foreground border-border";
    default:
      return "";
  }
};

const JourneySection = () => {
  return (
    <section id="journey" className="relative bg-muted/50 py-16 md:py-24">
      {/* Anchor alias to maintain backwards compatibility with #education links */}
      <div id="education" className="absolute -top-24 pointer-events-none opacity-0" aria-hidden="true" />

      <div className="container">
        <div className="text-center">
          <Badge variant="outline">Career & Academics</Badge>
          <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
            My Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A chronological timeline of my professional career, technical training, and academic background.
          </p>
        </div>

        <div className="relative mt-12">
          {/* Vertical center timeline spine */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>

          {journeyData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className="group relative mb-8 flex items-center md:mb-12"
              >
                <div
                  className={`flex w-full items-center justify-center ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div className="w-full md:w-5/12">
                    <Card
                      className={`transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                        isEven ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <CardHeader
                        className={
                          isEven
                            ? "items-center md:items-end"
                            : "items-center md:items-start"
                        }
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs font-semibold uppercase tracking-wider ${getTypeBadgeVariant(
                              item.type
                            )}`}
                          >
                            {item.type}
                          </Badge>
                          <Badge variant="secondary" className="w-fit text-xs">
                            {item.year}
                          </Badge>
                        </div>
                        <CardTitle className="mt-2 text-lg font-bold">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-sm font-medium text-foreground/80">
                          {item.institution}
                        </CardDescription>
                      </CardHeader>

                      <CardContent
                        className={`space-y-3 ${
                          isEven ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.details}
                        </p>

                        {/* Tags for Work Experience entry */}
                        {item.tags && item.tags.length > 0 && (
                          <div
                            className={`flex flex-wrap gap-1.5 pt-1 ${
                              isEven
                                ? "justify-center md:justify-end"
                                : "justify-center md:justify-start"
                            }`}
                          >
                            {item.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="bg-background/80 text-[11px] font-normal"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Action link for Work entry to Experience section */}
                        {item.actionLink && (
                          <div
                            className={`pt-2 flex ${
                              isEven
                                ? "justify-center md:justify-end"
                                : "justify-center md:justify-start"
                            }`}
                          >
                            <Button asChild size="sm" variant="default" className="gap-1.5 text-xs">
                              <a href={item.actionLink.href}>
                                {item.actionLink.label}
                                <ArrowRight className="h-3.5 w-3.5" />
                              </a>
                            </Button>
                          </div>
                        )}

                        {/* Certificate link for training entries */}
                        {item.certificate && (
                          <div
                            className={`pt-1 flex ${
                              isEven
                                ? "justify-center md:justify-end"
                                : "justify-center md:justify-start"
                            }`}
                          >
                            <Button asChild size="sm" variant="outline" className="gap-1.5 text-xs">
                              <Link
                                href={item.certificate}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Certificate
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Central circular icon indicator */}
                <div
                  className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-background text-primary transition-all duration-300 group-hover:scale-125 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm"
                  aria-hidden="true"
                >
                  {getItemIcon(item.type)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
export { JourneySection as EducationSection };
