import fs from 'fs';
import path from 'path';
import { getContextForChatbot, personalInfo } from '@/data/portfolioData';

export interface ParsedContent {
  filename: string;
  content: string;
  type: 'markdown' | 'txt';
}

export class FileParser {
  private static resourcesPath = path.join(process.cwd(), 'src', 'data', 'chatbot-resources');
  
  // Fallback data dynamically built from portfolioData single source of truth
  private static fallbackData = {
    content: getContextForChatbot(),
    contactInfo: {
      email: personalInfo.email,
      phone: personalInfo.phone,
      linkedin: personalInfo.linkedin,
      github: personalInfo.github
    }
  };

  static async parseAllFiles(): Promise<ParsedContent[]> {
    try {
      const files = await this.getAllFiles();
      const parsedContents: ParsedContent[] = [];

      for (const file of files) {
        try {
          const content = await this.parseFile(file);
          if (content) {
            parsedContents.push(content);
          }
        } catch (error) {
          console.error(`Error parsing file ${file}:`, error);
        }
      }

      // If no files were parsed successfully, use fallback data
      if (parsedContents.length === 0) {
        console.log('Using fallback data for deployment');
        return [{
          filename: 'arjun-info.md',
          content: this.fallbackData.content,
          type: 'markdown'
        }];
      }

      return parsedContents;
    } catch (error) {
      console.error('Error in parseAllFiles, using fallback data:', error);
      return [{
        filename: 'arjun-info.md',
        content: this.fallbackData.content,
        type: 'markdown'
      }];
    }
  }

  private static async getAllFiles(): Promise<string[]> {
    const files: string[] = [];
    
    try {
      const entries = await fs.promises.readdir(this.resourcesPath, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isFile()) {
          const filePath = path.join(this.resourcesPath, entry.name);
          const ext = path.extname(entry.name).toLowerCase();
          
          if (['.md', '.txt'].includes(ext)) {
            files.push(filePath);
          }
        }
      }
    } catch (error) {
      console.error('Error reading resources directory:', error);
    }

    return files;
  }

  private static async parseFile(filePath: string): Promise<ParsedContent | null> {
    const filename = path.basename(filePath);
    const ext = path.extname(filePath).toLowerCase();

    try {
      let content = '';
      let type: 'markdown' | 'pdf' | 'docx' | 'txt';

      switch (ext) {
        case '.md':
          content = await fs.promises.readFile(filePath, 'utf-8');
          type = 'markdown';
          break;

        case '.txt':
          content = await fs.promises.readFile(filePath, 'utf-8');
          type = 'txt';
          break;


        default:
          return null;
      }

      return {
        filename,
        content: content.trim(),
        type
      };
    } catch (error) {
      console.error(`Error parsing file ${filePath}:`, error);
      return null;
    }
  }

  static async searchInFiles(query: string): Promise<string[]> {
    try {
      const files = await this.parseAllFiles();
      const results: string[] = [];

      for (const file of files) {
        const content = file.content.toLowerCase();
        const searchQuery = query.toLowerCase();

        // Simple keyword matching
        if (content.includes(searchQuery)) {
          // Extract relevant sentences containing the query
          const sentences = file.content.split(/[.!?]+/);
          const relevantSentences = sentences.filter(sentence => 
            sentence.toLowerCase().includes(searchQuery)
          );

          if (relevantSentences.length > 0) {
            results.push(...relevantSentences.map(s => s.trim()).filter(s => s.length > 0));
          }
        }
      }

      return results;
    } catch (error) {
      console.error('Error searching files:', error);
      return [];
    }
  }

  static async getContactInfo(): Promise<{ [key: string]: string }> {
    try {
      const files = await this.parseAllFiles();
      const contactInfo: { [key: string]: string } = {};

      for (const file of files) {
        const content = file.content;
        
        // Extract email
        const emailMatch = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
        if (emailMatch) {
          // Get the first valid email (not example.com)
          const validEmail = emailMatch.find(email => !email.includes('example.com'));
          contactInfo.email = validEmail || emailMatch[0];
        }

        // Extract phone
        const phoneMatch = content.match(/\+?[\d\s\-\(\)]{10,}/g);
        if (phoneMatch) {
          contactInfo.phone = phoneMatch[0];
        }

        // Extract LinkedIn
        const linkedinMatch = content.match(/https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-]+/g);
        if (linkedinMatch) {
          contactInfo.linkedin = linkedinMatch[0];
        }

        // Extract GitHub
        const githubMatch = content.match(/https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9\-]+/g);
        if (githubMatch) {
          contactInfo.github = githubMatch[0];
        }
      }

      // If no contact info found, use fallback
      if (Object.keys(contactInfo).length === 0) {
        return this.fallbackData.contactInfo;
      }

      return contactInfo;
    } catch (error) {
      console.error('Error getting contact info, using fallback:', error);
      return this.fallbackData.contactInfo;
    }
  }
}
