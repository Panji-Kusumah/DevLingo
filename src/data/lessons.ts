/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: string;
  text: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Communication' | 'Documentation' | 'Vocabulary' | 'Interview';
  xpReward: number;
  questions: Question[];
  relatedTerms?: string[];
}

export const lessons: Lesson[] = [
  {
    id: 'daily-scrum',
    title: 'The Daily Standup',
    description: 'Learn how to effectively communicate your progress and blockers in English.',
    icon: 'MessageSquare',
    difficulty: 'Beginner',
    category: 'Communication',
    xpReward: 100,
    questions: [
      {
        id: 'ds-1',
        text: 'What is the most appropriate phrase to start your turn in a standup?',
        options: [
          'I am living today...',
          'Happy morning everyone...',
          'Yesterday, I worked on...',
          'I want to talk now...'
        ],
        correctAnswer: 2,
        explanation: 'Starting with "Yesterday, I worked on..." is a standard way to report progress in a Daily Scrum.'
      },
      {
        id: 'ds-2',
        text: 'If you are stuck on a task, you should say you have a:',
        options: [
          'Wall',
          'Blocker',
          'Stop sign',
          'Interruption'
        ],
        correctAnswer: 1,
        explanation: 'In Agile environments, any obstacle preventing progress is commonly called a "blocker".'
      }
    ],
    relatedTerms: ['Blocker', 'Daily Standup', 'Backlog', 'Sprint']
  },
  {
    id: 'variable-naming',
    title: 'Clean Code Vocabulary',
    description: 'Master the nuances of naming conventions and descriptive English for code.',
    icon: 'Code2',
    difficulty: 'Intermediate',
    category: 'Vocabulary',
    xpReward: 150,
    questions: [
      {
        id: 'vn-1',
        text: 'Which verb is most appropriate for a function that retrieves a value?',
        options: [
          'Take',
          'Bring',
          'Fetch',
          'Catch'
        ],
        correctAnswer: 2,
        explanation: '"Fetch" (or "Get") is the industry-standard verb for retrieving data in programming.'
      },
      {
        id: 'vn-2',
        text: 'In boolean variables, which prefix is most common for questions?',
        code: 'const isActive = true;',
        options: [
          'Has',
          'Does',
          'Is',
          'If'
        ],
        correctAnswer: 2,
        explanation: '"Is" (e.g., isActive, isValid) is the most common prefix for boolean variables in English.'
      }
    ],
    relatedTerms: ['Boolean', 'Refactoring', 'Bug', 'Legacy Code']
  },
  {
    id: 'doc-reading',
    title: 'Documentation Deep Dive',
    description: 'Learn to skim and understand complex technical documentation efficiently.',
    icon: 'BookOpen',
    difficulty: 'Intermediate',
    category: 'Documentation',
    xpReward: 200,
    questions: [
      {
        id: 'dd-1',
        text: 'In a README file, the section describing how to start the project is usually titled:',
        options: [
          'Birth',
          'Initialization',
          'Getting Started',
          'Project Start'
        ],
        correctAnswer: 2,
        explanation: '"Getting Started" is the standard convention for installation and basic usage instructions.'
      }
    ],
    relatedTerms: ['Repository', 'Pull Request (PR)', 'Technical Debt']
  },
  {
    id: 'interview-prep',
    title: 'Technical Interviewing',
    description: 'Prepare for English-speaking interviews with key phrases and idioms.',
    icon: 'UserCheck',
    difficulty: 'Advanced',
    category: 'Interview',
    xpReward: 300,
    questions: [
      {
        id: 'it-1',
        text: 'How should you explain a complex project you led?',
        options: [
          'I was the boss of it...',
          'I spearheaded the development of...',
          'I made it by myself...',
          'It was my fault...'
        ],
        correctAnswer: 1,
        explanation: '"Spearheaded" is a strong professional verb used to describe leading an initiative.'
      }
    ],
    relatedTerms: ['Stakeholder', 'Onboarding', 'Microservices', 'Scalability']
  }
];
