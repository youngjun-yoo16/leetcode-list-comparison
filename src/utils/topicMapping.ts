// Topic categories based on NeetCode structure
export type Topic =
  | 'Arrays & Hashing'
  | 'Two Pointers'
  | 'Sliding Window'
  | 'Stack'
  | 'Binary Search'
  | 'Linked List'
  | 'Trees'
  | 'Heap / Priority Queue'
  | 'Backtracking'
  | 'Tries'
  | 'Graphs'
  | 'Advanced Graphs'
  | '1-D Dynamic Programming'
  | '2-D Dynamic Programming'
  | 'Greedy'
  | 'Intervals'
  | 'Math & Geometry'
  | 'Bit Manipulation'
  | 'Other';

// Topic keywords mapping - maps question name patterns to topics
const topicKeywords: Record<Topic, string[]> = {
  'Arrays & Hashing': [
    'two sum',
    'contains duplicate',
    'valid anagram',
    'group anagrams',
    'top k frequent',
    'product of array',
    'encode decode',
    'longest consecutive',
    'valid sudoku',
    'encode and decode',
  ],
  'Two Pointers': [
    'two sum ii',
    '3sum',
    'container with most water',
    'trapping rain water',
    'valid palindrome',
    'palindrome',
  ],
  'Sliding Window': [
    'longest substring',
    'minimum window',
    'sliding window',
    'longest repeating character',
    'permutation in string',
    'find all anagrams',
  ],
  'Stack': [
    'valid parentheses',
    'min stack',
    'evaluate reverse polish',
    'daily temperatures',
    'largest rectangle',
    'car fleet',
    'decode string',
    'basic calculator',
  ],
  'Binary Search': [
    'binary search',
    'search rotated',
    'find minimum rotated',
    'search 2d matrix',
    'koko eating bananas',
    'find k closest',
    'time based key',
  ],
  'Linked List': [
    'reverse linked list',
    'merge two sorted lists',
    'linked list cycle',
    'remove nth node',
    'add two numbers',
    'copy list with random',
    'merge k sorted',
    'reverse nodes in k-group',
    'rotate list',
    'swap nodes in pairs',
    'reorder list',
    'remove duplicates',
    'partition list',
    'sort list',
    'odd even linked list',
    'palindrome linked list',
    'middle of the linked list',
  ],
  'Trees': [
    'maximum depth',
    'same tree',
    'invert binary tree',
    'balanced binary tree',
    'diameter of binary tree',
    'subtree of another tree',
    'lowest common ancestor',
    'binary tree level order',
    'binary tree right side',
    'count good nodes',
    'validate binary search tree',
    'kth smallest element',
    'construct binary tree',
    'path sum',
    'binary tree maximum path',
    'serialize deserialize',
    'maximum width',
    'all nodes distance k',
  ],
  'Heap / Priority Queue': [
    'kth largest',
    'last stone weight',
    'k closest points',
    'task scheduler',
    'design twitter',
    'find median',
    'merge k sorted',
    'top k frequent',
    'maximum frequency stack',
  ],
  'Backtracking': [
    'combination sum',
    'permutations',
    'subsets',
    'word search',
    'n-queens',
    'palindrome partitioning',
    'letter combinations',
    'generate parentheses',
  ],
  'Tries': [
    'implement trie',
    'design add and search words',
    'word search ii',
  ],
  'Graphs': [
    'clone graph',
    'number of islands',
    'rotting oranges',
    'max area of island',
    'pacific atlantic',
    'surrounded regions',
    'course schedule',
    'graph valid tree',
    'number of connected components',
    'redundant connection',
    'accounts merge',
    'cheapest flights',
    'alien dictionary',
    'walls and gates',
    'shortest path to get food',
    'bus routes',
    'minimum height trees',
  ],
  'Advanced Graphs': [
    'longest increasing path',
    'maximum profit in job scheduling',
    'network delay time',
    'reconstruct itinerary',
    'min cost to connect',
    'swim in rising water',
  ],
  '1-D Dynamic Programming': [
    'climbing stairs',
    'min cost climbing stairs',
    'house robber',
    'house robber ii',
    'longest palindromic substring',
    'palindromic substrings',
    'decode ways',
    'coin change',
    'maximum product subarray',
    'word break',
    'longest increasing subsequence',
    'partition equal subset sum',
    'best time to buy and sell stock',
  ],
  '2-D Dynamic Programming': [
    'unique paths',
    'longest common subsequence',
    'edit distance',
    'interleaving string',
    'distinct subsequences',
    'regular expression matching',
    'maximal square',
    'best time to buy and sell stock with cooldown',
    'target sum',
    'coin change ii',
    'burst balloons',
  ],
  'Greedy': [
    'maximum subarray',
    'jump game',
    'jump game ii',
    'gas station',
    'merge intervals',
    'insert interval',
    'non-overlapping intervals',
    'partition labels',
    'hand of straights',
    'merge triplets to form target triplet',
    'valid parenthesis string',
  ],
  'Intervals': [
    'merge intervals',
    'insert interval',
    'non-overlapping intervals',
    'meeting rooms',
    'meeting rooms ii',
    'employee free time',
    'minimum interval to include each query',
  ],
  'Math & Geometry': [
    'rotate image',
    'spiral matrix',
    'set matrix zeroes',
    'happy number',
    'plus one',
    'pow(x, n)',
    'multiply strings',
    'detect squares',
    'random pick with weight',
    'squares of a sorted array',
  ],
  'Bit Manipulation': [
    'single number',
    'number of 1 bits',
    'counting bits',
    'reverse bits',
    'missing number',
    'sum of two integers',
  ],
  'Other': [],
};

export function getTopic(question: string): Topic {
  const lowerQuestion = question.toLowerCase();
  
  // Collect all matches with their keyword lengths
  const matches: Array<{ topic: Topic; keywordLength: number }> = [];
  
  // Check each topic's keywords
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (topic === 'Other') continue;
    
    for (const keyword of keywords) {
      if (lowerQuestion.includes(keyword)) {
        matches.push({ topic: topic as Topic, keywordLength: keyword.length });
      }
    }
  }
  
  // Return the topic with the longest matching keyword (most specific match)
  if (matches.length > 0) {
    matches.sort((a, b) => b.keywordLength - a.keywordLength);
    return matches[0].topic;
  }
  
  return 'Other';
}

export const topicOrder: Topic[] = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stack',
  'Binary Search',
  'Linked List',
  'Trees',
  'Heap / Priority Queue',
  'Backtracking',
  'Tries',
  'Graphs',
  'Advanced Graphs',
  '1-D Dynamic Programming',
  '2-D Dynamic Programming',
  'Greedy',
  'Intervals',
  'Math & Geometry',
  'Bit Manipulation',
  'Other',
];
