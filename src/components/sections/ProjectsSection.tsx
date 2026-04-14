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
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "AI Chatbot",
    description: "A full-stack application featuring text and voice input, using REST APIs for smooth communication with OpenAI.",
    image: "/images/AI-chatbot.png",
    tech: ["Spring Boot", "Supabase", "Database", "React.js", "OpenAI API"],
    github: "https://github.com/PRINCE200016/chatbot-avis.git",
    liveDemo: "https://huggingface.co/spaces/Arjunrajawat/Jarvis",
    aiHint: "AI robot"
  },
  {
    title: "AI-Powered Travel Planner",
    description: "An intelligent travel planning web application that generates personalized trip recommendations based on budget, duration, and user preferences. Includes smart constraint validation, cost estimation, and dynamic destination filtering for accurate results.",
    image: "/images/AI-travel-Planner.png",
    tech: ["Java", "Spring Boot", "Supabase", "Database", "REST APIs", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/PRINCE200016/travelai.git",
    liveDemo: "https://tripmind-ai.vercel.app",
    aiHint: "travel planning AI"
  },
  {
    title: "Weather Web Application",
    description: "A web app that provides real-time weather data, featuring asynchronous data fetching and error handling.",
    image: "/images/Weather web.png",
    tech: ["JavaScript", "OpenWeather API"],
    github: "https://github.com/PRINCE200016/Weather-web.git",
    liveDemo: "https://huggingface.co/spaces/Arjunrajawat/Weather",
    aiHint: "weather forecast"
  },
  {
    title: "Garden View Resort Website",
    description: "A responsive and visually appealing resort website showcasing amenities, services, and booking details. Designed with modern UI principles and smooth navigation for an engaging user experience.",
    image: "/images/Garden view Resort.png",
    tech: ["Java", "React", "Supabase", "Database", "JavaScript", "Spring Boot", "HTML", "CSS", "Bootstrap"],
    github: "https://github.com/PRINCE200016/Garden-View.git",
    liveDemo: "https://garden-view-resort.vercel.app",
    aiHint: "resort website"
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
                  <Button asChild className="flex-1">
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
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
