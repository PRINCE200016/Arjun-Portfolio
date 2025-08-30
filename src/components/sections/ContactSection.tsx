'use client';

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, Phone, Instagram } from "lucide-react";

const socialLinks = [
    { name: "LinkedIn", icon: <Linkedin className="h-6 w-6"/>, url: "https://www.linkedin.com/in/arjunrajawat16" },
    { name: "GitHub", icon: <Github className="h-6 w-6"/>, url: "https://github.com/PRINCE200016" },
    { name: "Email", icon: <Mail className="h-6 w-6"/>, url: "mailto:arjunrajawat28@gmail.com" },
    { name: "Phone", icon: <Phone className="h-6 w-6"/>, url: "tel:+917509245769" },
    { name: "Instagram", icon: <Instagram className="h-6 w-6"/>, url: "https://www.instagram.com/the_prince_rajawat/" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="bg-muted/50 py-16 md:py-24">
      <div className="container">
        <div className="text-center">
            <Badge variant="outline">Contact Me</Badge>
            <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
                Let&apos;s Get In Touch
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Have a question or a project in mind? Feel free to reach out. I&apos;m always open to discussing new opportunities in Indore, Madhya Pradesh.
            </p>
        </div>

        <div className="mt-12 flex justify-center">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {socialLinks.map(link => (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name} className="group">
                        <Card className="flex h-full flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:scale-110 hover:shadow-xl">
                            <div className="mb-4 text-primary transition-colors duration-300 group-hover:text-accent">{link.icon}</div>
                            <h3 className="font-semibold">{link.name}</h3>
                            <p className="text-sm text-muted-foreground">Connect with me</p>
                        </Card>
                    </a>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
