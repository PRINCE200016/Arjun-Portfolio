import { NextRequest, NextResponse } from 'next/server';
import { FileParser } from '@/lib/fileParser';

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error('JSON parsing error in API:', jsonError);
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    const { query } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Search in files
    const searchResults = await FileParser.searchInFiles(query);
    
    // Get contact info
    const contactInfo = await FileParser.getContactInfo();

    return NextResponse.json({
      results: searchResults,
      contactInfo,
      query
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      results: [],
      contactInfo: {}
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Get all parsed content
    const allContent = await FileParser.parseAllFiles();
    const contactInfo = await FileParser.getContactInfo();

    return NextResponse.json({
      content: allContent,
      contactInfo
    });
  } catch (error) {
    console.error('Get content error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
