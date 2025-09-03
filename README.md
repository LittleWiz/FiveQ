# FiveQ - AI-Powered Question Generator

🎯 A modern React TypeScript application that generates batches of 10 questions using Claude API with an integrated 5-second timer. Built with responsive design for seamless use across desktop and mobile devices.

## Features

- **AI Question Generation**: Generate 10 contextual questions using Anthropic's Claude API
- **Batch Processing**: Get new sets of questions with a single button click
- **5-Second Timer**: Precision countdown timer with start, stop, and reset controls
- **Responsive Design**: Modern UI that works perfectly on all devices
- **Real-time API Integration**: Direct integration with Claude API through Express.js backend
- **TypeScript Support**: Full type safety and excellent developer experience

## Project Structure

```
FiveQ/
├── src/
│   ├── components/
│   │   ├── QuestionDisplay.tsx  # Component for displaying questions
│   │   ├── Timer.tsx           # Timer component with controls
│   │   └── DebugPanel.tsx      # Debug panel for development
│   ├── services/
│   │   ├── llmService.ts       # Claude API integration
│   │   └── mcpService.ts       # MCP service layer
│   ├── config/
│   │   └── questionConfig.ts   # Question generation configuration
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── index.css               # Global styles
│   └── main.tsx               # Application entry point
├── public/                     # Static assets
├── server.js                   # Express.js backend server
├── .env.local                  # Environment variables (API keys)
├── package.json               # Dependencies and scripts
├── server-package.json        # Backend dependencies
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # This file
```

## Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** package manager
- **Anthropic API Key** (get one from [Anthropic Console](https://console.anthropic.com/))

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LittleWiz/FiveQ.git
   cd FiveQ
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.local` file (should already exist)
   - Replace the API key with your actual Anthropic API key:
   ```bash
   VITE_ANTHROPIC_API_KEY="your-actual-api-key-here"
   ```

### Running the Application

**You need to run BOTH servers for the app to work:**

#### Step 1: Start the Backend Server
```bash
node server.js
```
You should see: `🚀 Server running on http://localhost:3001`

#### Step 2: Start the Frontend Development Server
In a new terminal:
```bash
npm run dev
```
You should see: `VITE v5.x.x ready in xxx ms` with local URL

#### Step 3: Open the Application
Navigate to: `http://localhost:5173/`

### Quick Health Check

Test if everything is working:
```bash
# Test backend
curl http://localhost:3001/api/test

# Should return: {"status":"Server is working","timestamp":"..."}
```

### Available Scripts

#### Frontend Scripts
- `npm run dev` - Start frontend development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Backend Scripts
- `node server.js` - Start backend server (port 3001)

### Network Access (Mobile Testing)

To access the app from other devices on your network:

1. **Start frontend with network access**:
   ```bash
   npm run dev -- --host
   ```

2. **Find your network IP** and use:
   ```
   http://YOUR-IP-ADDRESS:5173/
   ```

## Usage

### Question Generation

1. **Generate Questions**: Click "Generate Questions" button
2. **View Results**: 10 AI-generated questions will appear in a grid layout
3. **Get More**: Click "Generate Next 10" for additional questions
4. **Loading States**: Visual feedback during API calls

### Timer Functionality

1. **Start Timer**: Click "Start Timer" to begin 5-second countdown
2. **Stop Timer**: Click "Stop Timer" to pause
3. **Reset Timer**: Click "Reset Timer" to return to 5 seconds
4. **Visual Feedback**: Timer turns red and pulses when ≤2 seconds remain

## API Integration

### Current Implementation

The app uses **Anthropic's Claude API** for question generation:

- **Model**: `claude-3-haiku-20240307`
- **Backend**: Express.js server on port 3001
- **CORS**: Configured for cross-origin requests
- **Error Handling**: Comprehensive error handling and fallbacks

### API Flow

1. Frontend sends request to local backend (`http://localhost:3001/api/anthropic`)
2. Backend forwards request to Claude API with your API key
3. Backend returns processed questions to frontend
4. Frontend displays questions in responsive grid

### Environment Configuration

```bash
# .env.local
VITE_ANTHROPIC_API_KEY="your-api-key-here"
VITE_BACKEND_URL=http://localhost:3001/api/anthropic
VITE_QUESTIONS_PER_SET=10
VITE_QUESTION_CATEGORIES=Personal,Relationship,Dreams,Fun,Life
```

## Troubleshooting

### Common Issues

**Backend not responding:**
```bash
# Check if backend is running
curl http://localhost:3001/api/test
```

**Frontend build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API errors:**
- Verify your Anthropic API key in `.env.local`
- Check backend terminal for error messages
- Ensure both servers are running

**Port conflicts:**
- Backend: 3001 (change in `server.js`)
- Frontend: 5173 (Vite auto-selects if busy)

### Network Access Issues

If mobile access doesn't work:
1. Ensure both devices are on same network
2. Check Windows Firewall settings
3. Use network IP instead of localhost

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Express.js, Node.js
- **AI Integration**: Anthropic Claude API (claude-3-haiku-20240307)
- **Styling**: CSS Grid, Flexbox, responsive design
- **Development**: ESLint, TypeScript, Hot reload
- **Architecture**: MCP (Model Context Protocol) ready

## Customization

### Timer Duration

Change timer duration in `src/components/Timer.tsx`:
```typescript
const [timeLeft, setTimeLeft] = useState(5) // Change to desired seconds
```

### Question Categories

Modify categories in `.env.local`:
```bash
VITE_QUESTION_CATEGORIES=Personal,Work,Travel,Hobbies,Goals
```

### Questions Per Set

Change question count in `.env.local`:
```bash
VITE_QUESTIONS_PER_SET=15  # Default is 10
```

### Styling

- **Component styles**: `src/App.css`
- **Global styles**: `src/index.css`
- **Responsive breakpoints**: CSS custom properties

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Anthropic** for Claude API
- **Vite** for excellent development experience
- **React** community for amazing ecosystem

## Support

- 📧 **Issues**: [GitHub Issues](https://github.com/LittleWiz/FiveQ/issues)
- 📖 **Documentation**: This README
- 🔧 **Troubleshooting**: See troubleshooting section above

---

**Made with ❤️ using React, TypeScript, and Claude AI**
