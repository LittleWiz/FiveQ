// Question Generation Configuration
// Customize this file to change how questions are generated

export interface QuestionConfig {
  questionTypes: string[];
  questionStyle: string;
  avoidTopics: string[];
  examples: string[];
}

export const questionConfig: QuestionConfig = {
  // Types of questions to generate
  questionTypes: [
    "favorite things",
    "travel and places", 
    "food and dining",
    "entertainment (movies, music, books)",
    "memories and experiences",
    "dreams and goals",
    "relationship and feelings",
    "fun activities",
    "personal preferences",
    "gratitude and appreciation"
  ],

  // Style and tone for questions
  questionStyle: `
    - Personal but not too intimate
    - Fun and conversation-starting  
    - Suitable for couples or close friends
    - Easy to answer and discuss
    - Positive and uplifting tone
    - Encouraging sharing and bonding
  `,

  // Topics to avoid
  avoidTopics: [
    "overly intimate or sexual topics",
    "controversial political issues", 
    "negative or depressing subjects",
    "deeply personal trauma",
    "financial details",
    "work stress or problems"
  ],

  // Example questions to guide the AI
  examples: [
    "Name 3 favorite childhood snacks",
    "Name 3 places you want to visit together", 
    "Name 3 songs that make you happy",
    "Name 3 things you're grateful for today",
    "Name 3 perfect date night activities",
    "Name 3 movies you could watch over and over",
    "Name 3 favorite ways to spend a Sunday",
    "Name 3 foods that remind you of home",
    "Name 3 adventures you'd love to try",
    "Name 3 things that always make you laugh"
  ]
};

// You can customize the prompt template here
export const createPrompt = (count: number): string => {
  return `You are creating conversation starter questions for couples or close friends to get to know each other better.

QUESTION TYPES TO INCLUDE:
${questionConfig.questionTypes.map(type => `- ${type}`).join('\n')}

STYLE REQUIREMENTS:
${questionConfig.questionStyle}

AVOID THESE TOPICS:
${questionConfig.avoidTopics.map(topic => `- ${topic}`).join('\n')}

GOOD EXAMPLES:
${questionConfig.examples.map(example => `- ${example}`).join('\n')}

TASK: Generate exactly ${count} unique "Name 3" questions that follow these guidelines.

FORMAT: Return ONLY the questions, one per line, each starting with "Name 3"

Generate ${count} unique questions now:`;
};
