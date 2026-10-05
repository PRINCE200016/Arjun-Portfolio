'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Coffee,
  Database,
  GitBranch,
  Leaf,
  Workflow,
  Bug,
  Cpu,
  Gauge,
  Layout,
  Briefcase,
  Layers,
  Sparkles,
  Star,
} from "lucide-react";
import { ReactIcon } from "../icons/ReactIcon";
import { JavascriptIcon } from "../icons/JavascriptIcon";
import { skillCategories } from "@/data/portfolioData";

const featuredSkills = [
  { name: "Java 21", icon: <Coffee className="h-10 w-10" /> },
  { name: "Spring Boot", icon: <Leaf className="h-10 w-10" /> },
  { name: "Google Apps Script", icon: <Workflow className="h-10 w-10" /> },
  { name: "React.js", icon: <ReactIcon className="h-10 w-10" /> },
  { name: "PostgreSQL 16", icon: <Database className="h-10 w-10" /> },
  { name: "Apache Kafka", icon: <GitBranch className="h-10 w-10" /> },
  { name: "Redis", icon: <Database className="h-10 w-10" /> },
  { name: "REST APIs", icon: <Workflow className="h-10 w-10" /> },
  { name: "JavaScript", icon: <JavascriptIcon className="h-10 w-10" /> },
  { name: "Git & GitHub", icon: <GitBranch className="h-10 w-10" /> },
  { name: "MySQL", icon: <Database className="h-10 w-10" /> },
  { name: "Problem Solving", icon: <Bug className="h-10 w-10" /> },
];

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Workflow':
      return <Workflow className="h-5 w-5 text-accent" />;
    case 'Cpu':
      return <Cpu className="h-5 w-5 text-accent" />;
    case 'Coffee':
      return <Coffee className="h-5 w-5 text-accent" />;
    case 'Database':
      return <Database className="h-5 w-5 text-accent" />;
    case 'Gauge':
      return <Gauge className="h-5 w-5 text-accent" />;
    case 'Layout':
      return <Layout className="h-5 w-5 text-accent" />;
    case 'Briefcase':
      return <Briefcase className="h-5 w-5 text-accent" />;
    default:
      return <Layers className="h-5 w-5 text-accent" />;
  }
};

const SkillsSection = () => {
  const featuredCategory = skillCategories.find((c) => c.featured);
  const regularCategories = skillCategories.filter((c) => !c.featured);

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <Badge variant="outline">My Skills</Badge>
          <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
            Technologies &amp; Core Competencies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A comprehensive technical stack spanning enterprise automation, distributed systems, full-stack development, and architecture.
          </p>
        </div>

        {/* Featured Core Tech Grid */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-4 w-4 text-accent" />
            <h3 className="font-headline text-xl font-bold">Featured Technologies</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {featuredSkills.map((skill) => (
              <Card
                key={skill.name}
                className="group relative overflow-hidden text-center transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl"
              >
                <CardHeader className="p-4 pb-2">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-accent">
                    {skill.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-1">
                  <CardTitle className="text-sm font-semibold">{skill.name}</CardTitle>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categorized Skills Grid */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="h-4 w-4 text-accent" />
            <h3 className="font-headline text-xl font-bold">Technical Domains &amp; Architecture</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Featured Java card — spans full width on mobile, 2 cols on lg */}
            {featuredCategory && (
              <Card className="col-span-1 lg:col-span-2 transition-all duration-300 hover:shadow-xl border-accent/30 bg-accent/5 flex flex-col ring-1 ring-accent/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      {getCategoryIcon(featuredCategory.iconName)}
                      <div>
                        <CardTitle className="text-base font-semibold font-headline flex items-center gap-2">
                          {featuredCategory.title}
                          <Badge variant="outline" className="text-[10px] font-semibold uppercase tracking-wide border-accent/40 text-accent bg-accent/10 py-0.5">
                            <Star className="h-2.5 w-2.5 mr-1" />
                            Core Stack
                          </Badge>
                        </CardTitle>
                        <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
                          {featuredCategory.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[11px] font-normal shrink-0 ml-2">
                      {featuredCategory.skills.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {featuredCategory.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="transition-all duration-200 hover:bg-accent/15 hover:text-accent hover:border-accent/30 py-1 px-2.5 text-xs font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Regular category cards */}
            {regularCategories.map((category) => (
              <Card
                key={category.title}
                className="transition-all duration-300 hover:shadow-lg border-border/70 flex flex-col"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 shrink-0">
                        {getCategoryIcon(category.iconName)}
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold font-headline">
                          {category.title}
                        </CardTitle>
                        <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[11px] font-normal shrink-0 ml-2">
                      {category.skills.length}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="transition-all duration-200 hover:bg-accent/15 hover:text-accent hover:border-accent/30 py-1 px-2.5 text-xs font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
