# 🌍 Arabic Learner - Interactive Language Learning App

A complete, beginner-friendly Arabic language learning web app built with React, featuring speech recognition, text-to-speech, interactive flashcards, and a tutor chat.

## ✨ Features

### 💬 Chat Tab
- **Speech Recognition** - Speak in Arabic and the app transcribes your input
- **Text-to-Speech** - Tutor responds with audio pronunciation
- **Role-Play Scenarios** - Learn in context:
  - 👋 Casual Chat
  - ☕ Order Coffee
  - ✈️ Airport Scenarios
- **Pronunciation Feedback** - Get corrections and tips
- **Claude API Integration** - Powered by Anthropic (optional)

### 🔤 Alphabet Tab
- All 28 Arabic letters with names and pronunciation
- Click any letter to hear it pronounced
- Visual flashcard style layout

### 📖 Vocabulary Tab
- **4 Preset Flashcard Decks:**
  - Greetings (10 cards)
  - Food (10 cards)
  - Travel (10 cards)
  - Numbers (10 cards)
- **Custom Deck Generator** - Type any topic to generate a 10-card deck
- **Interactive Flashcards** - Flip, hear, and mark words as learned
- **Progress Tracking** - See how many words you've learned

### 🔄 Translate Tab
- Bidirectional translation (English ↔ Arabic)
- Pronunciation display
- Word-by-word grammar breakdown
- Audio playback for translations

### 📊 Progress Tracking
- **Daily Streak Counter** - Build consistency!
- **Words Learned Counter** - Track your vocabulary progress
- **Persistent Storage** - Your progress is saved automatically

## 🚀 Deployment on GitHub Pages

### Prerequisites
- GitHub account
- Node.js installed locally (for first-time setup only)

### Quick Deploy

1. **Clone the repository:**
   ```bash
   git clone https://github.com/axxsiuu/arabic-learner.git
   cd arabic-learner
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

4. **Access your app:**
   Visit `https://axxsiuu.github.io/arabic-learner`

### Enable GitHub Pages in Settings

1. Go to your repository settings
2. Scroll to "Pages" section
3. Under "Source", select `gh-pages` branch
4. Save

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔌 Claude API Setup (Optional)

To enable real AI responses from the tutor:

1. Get your API key from [Anthropic Console](https://console.anthropic.com)
2. In the app, paste your key in the "API Setup" box in the Chat tab
3. The app will use Claude 3.5 Sonnet for intelligent responses

## 🎨 Design

- **Bold Color Scheme** - Indigo and blue gradients
- **Responsive Layout** - Works on desktop and mobile
- **Smooth Animations** - Hover effects and transitions
- **Tailwind CSS** - Modern utility-first styling

## 📱 Browser Support

✅ Chrome/Edge (Recommended)  
✅ Firefox  
✅ Safari  
⚠️ Speech Recognition requires browser support

## 🔧 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library
- **Web Speech API** - Speech recognition & synthesis
- **LocalStorage** - Data persistence

## 📝 License

MIT

## 🤝 Contributing

Feel free to fork, modify, and improve!

---

**Happy learning! 🚀** Build your streak and become fluent in Arabic! 🌟
