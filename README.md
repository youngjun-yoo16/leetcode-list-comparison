# LeetCode List Comparison Tool

A web-based tool to compare questions across different LeetCode lists (like NeetCode 150, Grind 169, etc.) and identify which questions are unique to each list.

Built with React, TypeScript, and Vite.

## Features

- Add multiple LeetCode lists
- Compare lists to find unique questions
- View statistics about the lists
- Clean, modern UI
- Type-safe with TypeScript

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

## Usage

1. Click "+ Add List" to add a new list
2. Enter a list name (e.g., "NeetCode 150")
3. Enter question names or IDs, one per line in the textarea
4. Add more lists as needed
5. Click "Compare Lists" to see which questions are unique to each list

## Example

List 1: NeetCode 150
- Two Sum
- Best Time to Buy and Sell Stock
- Contains Duplicate

List 2: Grind 169
- Two Sum
- Valid Anagram
- Group Anagrams

After comparison:
- NeetCode 150 unique: "Best Time to Buy and Sell Stock", "Contains Duplicate"
- Grind 169 unique: "Valid Anagram", "Group Anagrams"

## Project Structure

```
src/
  components/
    ListItem.tsx          - Individual list item component
    ComparisonResults.tsx - Results display component
  types.ts                - TypeScript type definitions
  utils.ts                - Utility functions
  App.tsx                  - Main application component
  main.tsx                 - Application entry point
  styles.css               - Global styles
```

## Build

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Future Enhancements

- Import/export lists as JSON
- Save lists to localStorage
- Support for question IDs in addition to names
- More detailed comparison statistics
