import { NextRequest, NextResponse } from 'next/server';
import { FileParser } from '@/lib/fileParser';
import { getBotResponse } from '@/lib/chatbotEngine';
import { personalInfo } from '@/data/portfolioData';

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error('JSON parsing error in API:', jsonError);
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    const { query, history } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Try AI generation if API key is present, otherwise use our deterministic chatbot engine
    let answer = '';
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;

    if (apiKey) {
      try {
        const { ai } = await import('@/ai/genkit');
        const { getContextForChatbot } = await import('@/data/portfolioData');
        
        const response = await ai.generate({
          system: getContextForChatbot(),
          prompt: query,
        });
        
        if (response && response.text) {
          answer = response.text;
        }
      } catch (aiError) {
        console.warn('AI generation error, falling back to local engine:', aiError);
      }
    }

    // Fallback to high-fidelity single source of truth chatbot engine
    if (!answer) {
      answer = getBotResponse(query, history || []);
    }

    // Search in files
    const searchResults = await FileParser.searchInFiles(query);
    
    // Get contact info
    const contactInfo = {
      email: personalInfo.email,
      phone: personalInfo.phone,
      linkedin: personalInfo.linkedin,
      github: personalInfo.github
    };

    return NextResponse.json({
      answer,
      results: searchResults,
      contactInfo,
      query
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      answer: getBotResponse('about'),
      results: [],
      contactInfo: {
        email: personalInfo.email,
        phone: personalInfo.phone,
        linkedin: personalInfo.linkedin,
        github: personalInfo.github
      }
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allContent = await FileParser.parseAllFiles();
    const contactInfo = {
      email: personalInfo.email,
      phone: personalInfo.phone,
      linkedin: personalInfo.linkedin,
      github: personalInfo.github
    };

    return NextResponse.json({
      content: allContent,
      contactInfo
    });
  } catch (error) {
    console.error('Get content error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
