import { GraduationCap, BookOpen, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const educationData = [
  {
    icon: <Briefcase />,
    title: "Full Stack Java Development Course",
    institution: "Online Platform",
    year: "Expected 2025",
    details: "Comprehensive course on full-stack Java development.",
    certificate: "https://drive.google.com/file/d/1YPB0Sr2KnE_FMWs9aZn1iMfDSqhUzqTQ/view?usp=drive_link",
  },
  {
    icon: <Briefcase />,
    title: "Java Full Stack Development Training",
    institution: "iTrainU Technologies, Indore",
    year: "Dec 2024",
    details: "Intensive training program focused on practical, hands-on project development with Java and related technologies.",
     certificate: "https://drive.google.com/file/d/1YPt7cdXp62X-8fw9hGuIVQtA45CAmSgg/view?usp=drive_link",
  },
  {
    icon: <GraduationCap />,
    title: "B.Sc. Computer Science",
    institution: "Jiwaji University, Gwalior",
    year: "Expected 2025",
    details: "Pursuing a Bachelor's degree with a focus on computer science fundamentals.",
  },
  {
    icon: <BookOpen />,
    title: "12th Grade",
    institution: "Sadhana Vidya Niketan, Bhind, M.P",
    year: "2019",
    details: "Achieved 66% in senior secondary education.",
  },
  {
    icon: <BookOpen />,
    title: "10th Grade",
    institution: "Scholars Public School, Bhind, M.P",
    year: "2017",
    details: "Secured a 7.0 CGPA in secondary school examinations.",
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="bg-muted/50 py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <Badge variant="outline">Education & Training</Badge>
          <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
            My Academic Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A timeline of my educational background and professional certifications.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          {educationData.map((item, index) => (
            <div
              key={index}
              className="group relative mb-8 flex items-center md:mb-12"
            >
              <div
                className={`flex w-full items-center justify-center ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <div className="w-full md:w-5/12">
                  <Card
                    className={`transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      index % 2 === 0
                        ? "md:text-right"
                        : "md:text-left"
                    }`}
                  >
                    <CardHeader
                      className={
                        index % 2 === 0
                          ? "items-center md:items-end"
                          : "items-center md:items-start"
                      }
                    >
                      <Badge variant="secondary" className="w-fit">{item.year}</Badge>
                      <CardTitle className="mt-2 text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.institution}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{item.details}</p>
                      {item.certificate && (
                        <Link href={item.certificate} target="_blank" rel="noopener noreferrer">
                          <div className="relative mt-4 h-24 w-full overflow-hidden rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Image src="https://picsum.photos/400/200" alt={`${item.title} certificate`} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="certificate document"/>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">View Certificate</div>
                          </div>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-background text-primary transition-all duration-300 group-hover:scale-125 group-hover:bg-primary group-hover:text-primary-foreground">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
