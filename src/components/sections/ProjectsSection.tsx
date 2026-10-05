'use client';

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Info } from "lucide-react";

import { projectsData } from "@/data/portfolioData";


const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <Badge variant="outline">My Projects</Badge>
          <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
            Featured Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A selection of projects that demonstrate my skills and passion for development.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, index) => (
            <Card
              key={index}
              className="group/item relative flex flex-col overflow-hidden transition-all duration-300 md:hover:scale-105 md:hover:shadow-xl"
            >
              <CardHeader className="p-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="aspect-video w-full object-cover transition-transform duration-300 md:group-hover/item:scale-105"
                  data-ai-hint={project.aiHint}
                />
              </CardHeader>

              <CardContent className="flex-1 p-4">
                <CardTitle className="text-xl leading-snug">{project.title}</CardTitle>
                <CardDescription className="mt-2 min-h-[3rem] line-clamp-3">
                  {project.description}
                </CardDescription>

                {project.metrics && (
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-md border border-accent/30 bg-accent/5 px-2 py-1.5 text-center"
                      >
                        <span className="block text-xs font-bold text-accent">{m.value}</span>
                        <span className="block text-[10px] text-muted-foreground">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col items-start gap-4 p-4 pt-0">
                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="flex w-full gap-3">
                  <Button asChild variant="outline" className="flex-1">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>

                  {project.liveDemo ? (
                    <Button asChild className="flex-1">
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  ) : project.details ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1">
                          <Info className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-accent border-accent/30 bg-accent/10">
                              Architecture Deep-Dive
                            </Badge>
                          </div>
                          <DialogTitle className="font-headline text-xl md:text-2xl leading-snug">
                            {project.title}
                          </DialogTitle>
                          <DialogDescription className="text-sm pt-1 leading-relaxed">
                            {project.description}
                          </DialogDescription>
                        </DialogHeader>

                        {project.metrics && (
                          <div className="my-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {project.metrics.map((m) => (
                              <div
                                key={m.label}
                                className="rounded-lg border border-accent/30 bg-accent/5 p-2.5 text-center"
                              >
                                <div className="text-sm font-bold text-accent">{m.value}</div>
                                <div className="text-xs text-muted-foreground">{m.label}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="space-y-3 pt-2">
                          <h4 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                            Architecture Highlights & Benchmarks
                          </h4>
                          <ul className="space-y-2.5">
                            {project.details.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2 pt-2">
                          <h4 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                            Technologies & Tools
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech?.map((t) => (
                              <Badge key={t} variant="secondary">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <DialogFooter className="mt-4 pt-4 border-t">
                          <Button asChild className="w-full sm:w-auto">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              Explore on GitHub
                            </a>
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : null}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
