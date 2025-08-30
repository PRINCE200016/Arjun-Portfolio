import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const projects = [
  {
    title: "AI Chatbot",
    description: "A full-stack application featuring text and voice input, using REST APIs for smooth communication with OpenAI.",
    image: "https://cdn.pixabay.com/photo/2023/02/13/06/24/ai-7786589_1280.png",
    tech: ["Spring Boot", "React.js", "OpenAI API"],
    github: "https://github.com/PRINCE200016/chatbot-avis.git",
    aiHint: "AI robot"
  },
  {
    title: "Job Portal Website",
    description: "A full-stack project with authentication, job postings, and an admin panel, built with a modular architecture.",
    image: "https://cdn.pixabay.com/photo/2016/12/18/10/20/application-1915343_1280.jpg",
    tech: ["Spring Boot", "MySQL", "Postman"],
    github: "https://github.com/PRINCE200016/Job_Portal.git",
    aiHint: "job board"
  },
  {
    title: "Weather Web Application",
    description: "A web app that provides real-time weather data, featuring asynchronous data fetching and error handling.",
    image: "https://cdn.pixabay.com/photo/2024/06/12/11/11/sketch-8825072_1280.jpg",
    tech: ["JavaScript", "OpenWeather API"],
    github: "https://github.com/PRINCE200016/Weather-web.git",
    aiHint: "weather forecast"
  },
   {
    title: "E-commerce Homepage Clone",
    description: "An Amazon-inspired responsive homepage clone.",
    image: "https://cdn.pixabay.com/photo/2022/08/24/16/26/business-7408289_1280.jpg",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/PRINCE200016/E-commerce-web.git",
    aiHint: "online shopping"
  },
];

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
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group/item relative overflow-hidden transition-all duration-300 md:hover:scale-105 md:hover:shadow-xl"
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
              <CardContent className="p-4">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="mt-2 min-h-[3rem]">
                    {project.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4 p-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
                 <Button asChild variant="outline" className="w-full">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                    </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
