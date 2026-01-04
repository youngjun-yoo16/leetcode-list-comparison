# LeetCode List Comparison Tool

A web-based tool to compare questions across different LeetCode lists (like NeetCode 150, Grind 169, etc.) and identify which questions are unique to each list.

**🌐 Live Demo:** [https://youngjun-yoo16.github.io/leetcode-list-comparison/](https://youngjun-yoo16.github.io/leetcode-list-comparison/)

Built with React, TypeScript, and Vite.

## Features

- **Pre-loaded Lists**: NeetCode 150 and Grind 169 lists are included by default
- **Unique Questions Detection**: Automatically identifies questions unique to each list
- **Shared Questions Display**: Shows questions that appear in all lists
- **Sorting Options**:
  - Sort by difficulty (Easy → Medium → Hard)
  - Sort by topic (18 categories including Arrays & Hashing, Two Pointers, Dynamic Programming, etc.)
  - Topic sorting includes difficulty ordering within each category
- **Difficulty Color Coding**: 
  - 🟢 Green for Easy questions
  - 🟡 Yellow for Medium questions
  - 🔴 Red for Hard questions
- **Statistics Dashboard**: 
  - Total number of lists
  - Total distinct questions across all lists
  - Number of shared questions
  - Difficulty breakdown for unique questions
- **Side-by-Side Comparison**: View results in a responsive grid layout
- **Modern UI**: Clean, intuitive interface with smooth interactions

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/youngjun-yoo16/leetcode-list-comparison.git
cd leetcode-list-comparison
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

## Usage

1. The app comes pre-loaded with **NeetCode 150** and **Grind 169** lists
2. Click **"Compare Lists"** to see the comparison results
3. Use the **"Sort by"** dropdown to organize questions:
   - **None**: Original order
   - **Difficulty**: Sorted by Easy → Medium → Hard
   - **Topic**: Grouped by topic categories with difficulty sorting within each topic
4. View the statistics at the top:
   - Total distinct questions across all lists
   - Number of shared questions
   - Difficulty breakdown for each list's unique questions

## Example Output

When comparing NeetCode 150 and Grind 169:

- **Shared Questions**: Questions that appear in both lists (e.g., "Two Sum", "Valid Parentheses")
- **NeetCode 150 Unique**: Questions only in NeetCode 150 (e.g., "Coin Change II", "Count Good Nodes in Binary Tree")
- **Grind 169 Unique**: Questions only in Grind 169 (e.g., "Roman to Integer", "Longest Common Prefix")

## Project Structure

```
src/
  components/
    ListItem.tsx              - Individual list item component (read-only)
    ComparisonResults.tsx     - Results display with sorting and grouping
  data/
    neetcode150.ts            - NeetCode 150 questions data
    grind169.ts               - Grind 169 questions data
  utils/
    topicMapping.ts           - Topic categorization and mapping logic
  types.ts                    - TypeScript type definitions
  utils.ts                    - Utility functions (parsing, ID generation)
  App.tsx                     - Main application component
  main.tsx                    - Application entry point
  styles.css                  - Global styles
```

## Build & Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deployment

The project is configured for GitHub Pages deployment via GitHub Actions. The workflow automatically builds and deploys on push to the main branch.

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features

## Topic Categories

The tool categorizes questions into 18 topics:

1. Arrays & Hashing
2. Two Pointers
3. Sliding Window
4. Stack
5. Binary Search
6. Linked List
7. Trees
8. Heap / Priority Queue
9. Backtracking
10. Tries
11. Graphs
12. Advanced Graphs
13. 1-D Dynamic Programming
14. 2-D Dynamic Programming
15. Greedy
16. Intervals
17. Math & Geometry
18. Bit Manipulation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
