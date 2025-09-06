'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Bot, User, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi! I'm your personal assistant for Arjun Rajawat. I can tell you about his skills, education, projects, achievements, and background. What would you like to know?`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load contact info on component mount
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('/api/chatbot/search');
      const data = await response.json();
      if (data.contactInfo) {
        setContactInfo(data.contactInfo);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase().trim();
    
    // Check if the question is about Arjun
    const arjunKeywords = ['arjun', 'rajawat', 'he', 'his', 'him', 'about'];
    const isAboutArjun = arjunKeywords.some(keyword => message.includes(keyword));
    
    // Single word questions that should be answered
    const singleWordQuestions = ['hometown', 'home', 'email', 'contact', 'phone', 'skills', 'education', 'projects', 'about', 'location', 'address', 'github', 'project', 'qualifications', 'university',"College"," College Name","Linkedin"];
    const isSingleWordQuestion = singleWordQuestions.includes(message);
    
    // Keywords that indicate questions about Arjun (even without mentioning his name)
    const arjunRelatedKeywords = ['skills', 'education', 'projects', 'achievements', 'hobbies', 'background', 'passout', 'lived', 'where', 'email', 'contact', 'gmail', 'phone', 'github', 'hometown', 'qualifications', 'university', 'degree', 'stud', 'work', 'portfolio',"College"," College Name","Linkedin"];
    const isArjunRelated = arjunRelatedKeywords.some(keyword => message.includes(keyword));
    
    // Check for non-Arjun related questions
    if (!isAboutArjun && !isSingleWordQuestion && !isArjunRelated) {
      return "Sorry, I can only provide information about Arjun Rajawat.";
    }

    try {
      // Search in files for relevant information
      const response = await fetch('/api/chatbot/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        return "Sorry, I'm having trouble processing the response. Please try again.";
      }
      
      const searchResults = data.results || [];
      const contactInfo = data.contactInfo || {};

      // Handle single word questions first
      if (message === 'hometown' || message === 'home') {
        return "Arjun's hometown: Bhind, Madhya Pradesh, India";
      }

      if (message === 'email' || message === 'contact') {
        if (contactInfo.email) {
          return `Arjun's email: ${contactInfo.email}`;
        }
        return "Arjun's email: arjunrajawat28@gmail.com";
      }

      if (message === 'phone') {
        if (contactInfo.phone) {
          return `Arjun's phone: ${contactInfo.phone}`;
        }
        return "Arjun's phone: +91-7509245769";
      }

      if (message === 'github') {
        if (contactInfo.github) {
          return `Arjun's GitHub: ${contactInfo.github}`;
        }
        return "Arjun's GitHub: https://github.com/arjun-rajawat";
      }

      if (message === 'skills') {
        return "Arjun's key skills: Java, Spring Boot, React.js, JavaScript, MySQL, REST APIs, Git & GitHub";
      }

      if (message === 'education' || message === 'qualifications') {
        return "Arjun is pursuing B.Sc. Computer Science at Jiwaji University, Gwalior (Expected 2025) and completed Java Full Stack Development training at iTrainU Technologies";
      }

      if (message === 'projects' || message === 'project') {
        return "Arjun's main projects: AI Chatbot (Spring Boot + React), Job Portal Website (Spring Boot + MySQL), Weather App (JavaScript), and E-commerce Clone (HTML/CSS/JS)";
      }

      if (message === 'about') {
        return "Arjun Rajawat is a Java Full Stack Developer and Computer Science student. He's passionate about building scalable web applications and solving problems";
      }

      if (message === 'location' || message === 'address') {
        return "Arjun is from Bhind, Madhya Pradesh, India and currently in Indore, Madhya Pradesh";
      }

      if (message === 'university' || message === 'college' || message === 'college name') {
        return "Arjun is pursuing B.Sc. Computer Science at Jiwaji University, Gwalior (Expected 2025)";
      }

      if (message === 'linkedin') {
        if (contactInfo.linkedin) {
          return `Arjun's LinkedIn: ${contactInfo.linkedin}`;
        }
        return "Arjun's LinkedIn: https://linkedin.com/in/arjun-rajawat";
      }

      // Handle contact information questions
      if (message.includes('email') || message.includes('gmail') || message.includes('contact')) {
        if (contactInfo.email) {
          return `Arjun's email: ${contactInfo.email}`;
        }
        return "Arjun's email: arjunrajawat28@gmail.com";
      }

      if (message.includes('phone') || message.includes('number') || message.includes('call')) {
        if (contactInfo.phone) {
          return `Arjun's phone: ${contactInfo.phone}`;
        }
        return "Arjun's phone: +91-7509245769";
      }

      if (message.includes('linkedin')) {
        if (contactInfo.linkedin) {
          return `Arjun's LinkedIn: ${contactInfo.linkedin}`;
        }
        return "Arjun's LinkedIn: https://linkedin.com/in/arjun-rajawat";
      }

      if (message.includes('github')) {
        if (contactInfo.github) {
          return `Arjun's GitHub: ${contactInfo.github}`;
        }
        return "Arjun's GitHub: https://github.com/arjun-rajawat";
      }

      // If we have search results, return the most relevant one
      if (searchResults.length > 0) {
        // Return the first relevant result, truncated to 2 lines max
        const result = searchResults[0];
        const sentences = result.split(/[.!?]+/).slice(0, 2);
        return sentences.join('. ').trim() + (sentences.length > 1 ? '.' : '');
      }

      // Fallback responses based on keywords
      if (message.includes('passout') || message.includes('graduat') || message.includes('education') || 
          message.includes('degree') || message.includes('stud') || message.includes('university') || 
          message.includes('college') || message.includes('year')) {
        return `Arjun is pursuing B.Sc. Computer Science at Jiwaji University, Gwalior (Expected 2025) and completed Java Full Stack Development training at iTrainU Technologies`;
      }

      if (message.includes('where') || message.includes('lived') || message.includes('location') || 
          message.includes('from') || message.includes('address') || message.includes('hometown')) {
        return `Arjun is from Bhind, Madhya Pradesh, India and currently in Indore, Madhya Pradesh`;
      }

      if (message.includes('skill') || message.includes('technolog') || message.includes('programming')) {
        return `Arjun's key skills: Java, Spring Boot, React.js, JavaScript, MySQL, REST APIs, Git & GitHub`;
      }

      if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
        return `Arjun's main projects: AI Chatbot (Spring Boot + React), Job Portal Website (Spring Boot + MySQL), Weather App (JavaScript), and E-commerce Clone (HTML/CSS/JS)`;
      }

      if (message.includes('about') || message.includes('background') || message.includes('who')) {
        return `Arjun Rajawat is a Java Full Stack Developer and Computer Science student. He's passionate about building scalable web applications and solving problems`;
      }

      return `Arjun Rajawat is a Java Full Stack Developer and Computer Science student. He specializes in Java, Spring Boot, React.js, and has built several projects including AI Chatbot and Job Portal`;

    } catch (error) {
      console.error('Error generating response:', error);
      return "Sorry, I'm having trouble accessing the information right now. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Generate response using file-based search
      const response = await generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble accessing the information right now. Please try again.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 h-[600px] w-[400px] animate-in slide-in-from-bottom-2 duration-300">
          <Card className="flex h-full flex-col shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-accent/10 p-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                  <Bot className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">Arjun's Assistant</CardTitle>
                  <p className="text-xs text-muted-foreground">Ask about Arjun Rajawat</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="flex h-full flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-2",
                        message.isUser ? "justify-end" : "justify-start"
                      )}
                    >
                      {!message.isUser && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
                          <Bot className="h-4 w-4 text-accent" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                          message.isUser
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted"
                        )}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className="mt-1 text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                      {message.isUser && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
                        <Bot className="h-4 w-4 text-accent" />
                      </div>
                      <div className="rounded-lg bg-muted px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about Arjun Rajawat..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="icon"
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs cursor-pointer" onClick={() => setInputValue("What are Arjun's skills?")}>
                      Skills
                    </Badge>
                    <Badge variant="outline" className="text-xs cursor-pointer" onClick={() => setInputValue("Tell me about Arjun's education")}>
                      Education
                    </Badge>
                    <Badge variant="outline" className="text-xs cursor-pointer" onClick={() => setInputValue("What projects has Arjun worked on?")}>
                      Projects
                    </Badge>
                    <Badge variant="outline" className="text-xs cursor-pointer" onClick={() => setInputValue("Arjun's email")}>
                      Contact
                    </Badge>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    💡 Upload PDF/MD files to <code>src/data/chatbot-resources/</code> for more accurate responses
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;
