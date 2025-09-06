# Chatbot Resources

This folder contains the data sources for the Arjun Rajawat chatbot. The chatbot will automatically read and search through all files in this directory to provide accurate responses.

## Supported File Types

- **Markdown (.md)** - Recommended for structured information
- **PDF (.pdf)** - For resumes, certificates, documents
- **Word (.docx)** - For documents and reports
- **Text (.txt)** - For simple text files

## How to Add Information

1. **Add your files** to this directory (`src/data/chatbot-resources/`)
2. **Restart the development server** (`npm run dev`)
3. **Test the chatbot** - it will automatically use the new information

## File Structure

```
src/data/chatbot-resources/
├── README.md (this file)
├── arjun-info.md (sample information file)
├── resume.pdf (your resume)
├── certificates.pdf (your certificates)
└── projects.md (detailed project information)
```

## Tips for Better Responses

1. **Use clear headings** in markdown files
2. **Include contact information** (email, phone, LinkedIn, GitHub)
3. **Structure information** with bullet points and sections
4. **Use keywords** that people might ask about
5. **Keep information up-to-date**

## Example Questions the Chatbot Can Answer

- "What is Arjun's email?"
- "Tell me about Arjun's education"
- "What projects has Arjun worked on?"
- "What are Arjun's skills?"
- "Where is Arjun from?"
- "What is Arjun's LinkedIn profile?"

The chatbot will search through all files and provide relevant, accurate information based on the uploaded documents.
