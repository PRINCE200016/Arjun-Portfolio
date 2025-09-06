# 🚀 Portfolio Deployment Guide

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- Portfolio project built successfully

## 🎯 Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy automatically

3. **Environment Variables (if needed):**
   - No environment variables required for basic deployment

### Option 2: Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect your GitHub repository

### Option 3: Other Platforms

- **GitHub Pages:** Use GitHub Actions
- **AWS Amplify:** Connect your repository
- **Railway:** Deploy directly from GitHub

## 🔧 Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start

# Development server
npm run dev
```

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   │   ├── Chatbot.tsx     # AI Chatbot component
│   │   └── sections/       # Portfolio sections
│   ├── data/
│   │   └── chatbot-resources/  # Chatbot data files
│   └── lib/
│       └── fileParser.ts   # File parsing utilities
├── public/                  # Static assets
├── vercel.json             # Vercel configuration
├── netlify.toml            # Netlify configuration
└── package.json
```

## 🤖 Chatbot Features

- **File-based responses** from `src/data/chatbot-resources/`
- **Single-word questions** support
- **Contact information** extraction
- **Real-time search** through uploaded files
- **Professional responses** about Arjun Rajawat

## 📝 Adding Content

1. **Upload files** to `src/data/chatbot-resources/`
2. **Supported formats:** `.md`, `.txt`
3. **Restart server** to load new content
4. **Test chatbot** with new information

## 🎨 Customization

- **Update information** in `src/data/chatbot-resources/arjun-info.md`
- **Modify responses** in `src/components/Chatbot.tsx`
- **Add new sections** in `src/components/sections/`
- **Update styling** in `src/app/globals.css`

## 🚀 Live Demo

Once deployed, your portfolio will be available at:
- **Vercel:** `https://your-project.vercel.app`
- **Netlify:** `https://your-project.netlify.app`

## 📞 Support

For deployment issues:
1. Check build logs
2. Verify all dependencies are installed
3. Ensure all files are committed to Git
4. Check platform-specific documentation

---

**Ready to deploy! 🎉**
