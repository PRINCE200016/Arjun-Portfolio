import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Database, GitBranch, Leaf, Workflow, Code, TestTube, Bug } from "lucide-react";
import { ReactIcon } from "../icons/ReactIcon";
import { JavascriptIcon } from "../icons/JavascriptIcon";

const skills = [
    { name: "Java", icon: <Coffee className="h-10 w-10" /> },
    { name: "JavaScript", icon: <JavascriptIcon className="h-10 w-10" /> },
    { name: "Spring Boot", icon: <Leaf className="h-10 w-10" /> },
    { name: "React.js", icon: <ReactIcon className="h-10 w-10" /> },
    { name: "Hibernate", icon: <Database className="h-10 w-10" /> },
    { name: "REST APIs", icon: <Workflow className="h-10 w-10" /> },
    { name: "Postman", icon: <TestTube className="h-10 w-10" /> },
    { name: "Git & GitHub", icon: <GitBranch className="h-10 w-10" /> },
    { name: "MySQL", icon: <Database className="h-10 w-10" /> },
    { name: "Data Structures", icon: <Code className="h-10 w-10" /> },
    { name: "Problem Solving", icon: <Bug className="h-10 w-10" /> },
];

const SkillsSection = () => {
    return (
        <section id="skills" className="py-16 md:py-24">
            <div className="container">
                <div className="text-center">
                    <Badge variant="outline">My Skills</Badge>
                    <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
                        Technologies I Work With
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        A collection of tools and technologies I use to bring projects to life.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {skills.map((skill) => (
                        <Card key={skill.name} className="group relative overflow-hidden text-center transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl">
                            <CardHeader>
                                <div className="mx-auto flex h-20 w-20 items-center justify-center text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-accent">
                                    {skill.icon}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-lg font-medium">{skill.name}</CardTitle>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SkillsSection;
