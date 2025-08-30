# FiveQ - Question Generator

A modern React TypeScript application for generating and displaying questions with timer functionality, designed to integrate with LLM MCP (Model Context Protocol) servers.

## Features

- **Question Generation**: Display 10 questions at once from an LLM MCP server
- **Dynamic Loading**: Generate new sets of questions with a single button click
- **Timer Functionality**: 5-second countdown timer with start, stop, and reset controls
- **Responsive Design**: Modern UI that works on desktop and mobile devices
- **TypeScript Support**: Full type safety and developer experience

## Project Structure

```
FiveQ/
├── src/
│   ├── components/
│   │   ├── QuestionDisplay.tsx  # Component for displaying questions
│   │   └── Timer.tsx           # Timer component with controls
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── index.css               # Global styles
│   └── main.tsx               # Application entry point
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # This file
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Question Generator

1. **Initial Load**: The application automatically generates the first set of 10 questions when it loads
2. **Generate New Questions**: Click the "Generate Next 10 Questions" button to fetch a new set
3. **Question Display**: Each question is displayed in a card with a number and category

### Timer

1. **Start Timer**: Click the "Start" button to begin the 5-second countdown
2. **Stop Timer**: Click "Stop" to pause the timer
3. **Reset Timer**: Click "Reset" to reset the timer back to 5 seconds
4. **Visual Feedback**: The timer turns red and pulses when 2 seconds or less remain

## MCP Integration

Currently, the application uses mock data for demonstration purposes. To integrate with an actual LLM MCP server:

1. **Install MCP Client**: Add the appropriate MCP client library
   ```bash
   npm install @modelcontextprotocol/client
   ```

2. **Replace Mock Function**: Update the `generateQuestions` function in `App.tsx` to call your MCP server

3. **Configure Server**: Set up your MCP server configuration and connection details

### Example MCP Integration

```typescript
const generateQuestions = async (): Promise<Question[]> => {
  try {
    // Replace with actual MCP server call
    const response = await mcpClient.call('generate_questions', {
      count: 10,
      difficulty: 'medium',
      category: 'general'
    });
    
    return response.questions;
  } catch (error) {
    console.error('Failed to generate questions:', error);
    throw error;
  }
};
```

## Customization

### Styling

- Modify `src/App.css` for component-specific styles
- Update `src/index.css` for global styles
- Colors and spacing can be adjusted via CSS custom properties

### Timer Duration

Change the timer duration by modifying the initial value in `Timer.tsx`:

```typescript
const [timeLeft, setTimeLeft] = useState(5) // Change 5 to desired seconds
```

### Question Count

Modify the question generation logic in `App.tsx` to change the number of questions per set.

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and development server
- **CSS Grid & Flexbox** - Responsive layout system
- **ESLint** - Code quality and consistency

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on the project repository.
