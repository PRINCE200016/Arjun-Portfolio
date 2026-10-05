'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { suggestedQuestions } from '@/data/portfolioData';
import { getBotResponse, ChatMessage } from '@/lib/chatbotEngine';

interface ContactInfo {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
}

// Simple formatter to render bold and markdown links safely
const FormattedMessage = ({ content }: { content: string }) => {
  const renderFormattedText = (text: string) => {
    // Split by markdown link pattern [label](url)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(renderBoldText(text.substring(lastIndex, match.index)));
      }
      const label = match[1];
      const url = match[2];
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
        >
          {label}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(renderBoldText(text.substring(lastIndex)));
    }

    return parts;
  };

  const renderBoldText = (text: string) => {
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {match[1]}
        </strong>
      );
      lastIndex = boldRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div className="whitespace-pre-wrap leading-relaxed text-sm">
      {content.split('\n').map((line, idx) => (
        <span key={idx}>
          {renderFormattedText(line)}
          {idx < content.split('\n').length - 1 && <br />}
        </span>
      ))}
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: `Hello! I'm Arjun Rajawat's AI Portfolio Assistant.

I can answer any questions about Arjun's **experience at D-Table Analytics**, his **HydraPay project**, skills, career journey, or how to contact him.

Feel free to ask a question or click any of the suggestions below!`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});
  const [activeChips, setActiveChips] = useState<string[]>(suggestedQuestions);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
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

  const getContextualFollowUps = (lastQuery: string): string[] => {
    const q = lastQuery.toLowerCase();
    if (q.includes('hydrapay') || q.includes('ledger')) {
      return [
        "What does Arjun do at D-Table Analytics?",
        "What are Arjun's top skills?",
        "Show me his projects",
        "How can I contact Arjun?"
      ];
    }
    if (q.includes('d-table') || q.includes('analytics') || q.includes('apps script')) {
      return [
        "Tell me about HydraPay",
        "What are Arjun's top skills?",
        "What is his educational background?",
        "How can I contact Arjun?"
      ];
    }
    if (q.includes('skill')) {
      return [
        "Tell me about HydraPay",
        "What does Arjun do at D-Table Analytics?",
        "Show me his projects",
        "How can I contact Arjun?"
      ];
    }
    if (q.includes('project')) {
      return [
        "Tell me about HydraPay",
        "What does Arjun do at D-Table Analytics?",
        "What are Arjun's top skills?",
        "How can I contact Arjun?"
      ];
    }
    return [
      "Tell me about HydraPay",
      "What does Arjun do at D-Table Analytics?",
      "What are Arjun's top skills?",
      "How can I contact Arjun?"
    ];
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      let botReply = '';

      try {
        const response = await fetch('/api/chatbot/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: text,
            history: messages.slice(-4),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.answer) {
            botReply = data.answer;
          }
        }
      } catch (networkError) {
        console.warn('Network call failed, using client engine fallback:', networkError);
      }

      // Robust fallback if API didn't return an answer
      if (!botReply) {
        botReply = getBotResponse(text, messages);
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botReply,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setActiveChips(getContextualFollowUps(text));
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble retrieving that information right now. Please feel free to email Arjun directly at arjunrajawat28@gmail.com!",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
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
      {/* Floating Chat Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none"
        size="icon"
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[620px] max-h-[85vh] w-[92vw] max-w-[430px] flex-col animate-in slide-in-from-bottom-2 duration-300 sm:w-[420px]">
          <Card className="flex h-full flex-col overflow-hidden border border-border/80 shadow-2xl bg-card">
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-muted/40 p-4">
              <div className="flex items-center space-x-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-sm font-headline font-bold">Arjun's Assistant</CardTitle>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Online • Powered by Portfolio Data
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-muted"
                aria-label="Close Assistant"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            {/* Conversation Content Area */}
            <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2.5 items-start",
                      message.isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    {!message.isUser && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent mt-0.5">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm",
                        message.isUser
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted/80 text-foreground border border-border/50 rounded-bl-none"
                      )}
                    >
                      <FormattedMessage content={message.content} />
                      <div
                        className={cn(
                          "mt-1 text-[10px] opacity-60 text-right",
                          message.isUser ? "text-primary-foreground" : "text-muted-foreground"
                        )}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                    {message.isUser && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary mt-0.5">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2.5 items-center">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl bg-muted/80 px-3.5 py-2.5 border border-border/50">
                      <div className="flex space-x-1.5">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-accent"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Chips */}
              <div className="border-t border-border/40 bg-muted/20 px-3 pt-2.5 pb-2">
                <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-medium text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-accent" />
                  <span>Suggested questions:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar pb-1">
                  {activeChips.map((chip, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(chip)}
                      disabled={isTyping}
                      className="h-auto py-1 px-2.5 text-xs font-normal bg-background/80 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors rounded-full"
                    >
                      {chip}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="border-t border-border/60 p-3 bg-card">
                <div className="flex gap-2 items-center">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about HydraPay, D-Table, skills..."
                    className="flex-1 text-sm bg-muted/30 focus-visible:ring-accent"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                    className="h-9 w-9 bg-accent text-accent-foreground hover:bg-accent/90 shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
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
