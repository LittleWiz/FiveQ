<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# FiveQ Question Generator Project

This is a React TypeScript application built with Vite for generating and displaying questions with a timer functionality.

## Key Features
- Question generator that displays 10 questions at a time
- Integration with LLM MCP (Model Context Protocol) server
- 5-second timer with start, stop, and reset functionality
- Responsive design with modern UI

## Technologies Used
- React 18 with TypeScript
- Vite for build tooling
- CSS Grid and Flexbox for layout
- Modern ES6+ features

## Code Style Guidelines
- Use functional components with hooks
- Prefer TypeScript interfaces for type definitions
- Use descriptive variable and function names
- Follow React best practices for state management
- Use CSS modules or styled-components for styling
- Implement proper error handling and loading states

## MCP Integration
- The question generation function should be replaced with actual MCP server calls
- Currently uses mock data for demonstration purposes
- Consider using libraries like `@modelcontextprotocol/client` for MCP integration
