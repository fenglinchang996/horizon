import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',

  title: 'FLC 的工程師生存筆記',
  description: '對這個世界發出吶喊，即使所有人都無動於衷。',
  markdown: {
    math: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: [
      {
        items: [
          { text: ' 首頁', link: '/' },
          {
            text: 'Command Line 101',
            collapsed: false,
            items: [
              {
                text: 'Learning the Shell',
                collapsed: true,
                items: [
                  { text: 'Navigation', link: '/cmd-101/navigation' },
                  {
                    text: 'Exploring the System',
                    link: '/cmd-101/exploring-the-system',
                  },
                  {
                    text: 'Manipulating Files and Directories',
                    link: '/cmd-101/manipulating-files-and-directories',
                  },
                  { text: 'Redirection', link: '/cmd-101/redirection' },
                  {
                    text: 'Seeing the World as the Shell Sees It',
                    link: '/cmd-101/seeing-the-world-as-the-shell-sees-it',
                  },
                  {
                    text: 'Advanced Keyboard Tricks',
                    link: '/cmd-101/advanced-keyboard-tricks',
                  },
                  { text: 'Permissions', link: '/cmd-101/permissions' },
                  { text: 'Processes', link: '/cmd-101/processes' },
                  { text: 'The Environment', link: '/cmd-101/the-environment' },
                ],
              },
              {
                text: 'Common Tasks and Essential Tools',
                collapsed: true,
                items: [
                  {
                    text: 'Package Management',
                    link: '/cmd-101/package-management',
                  },
                  { text: 'Networking', link: '/cmd-101/networking' },
                  {
                    text: 'Searching for Files',
                    link: '/cmd-101/searching-for-files',
                  },
                  {
                    text: 'Regular Expressions',
                    link: '/cmd-101/regular-expressions',
                  },
                  { text: 'Text Processing', link: '/cmd-101/text-processing' },
                  {
                    text: 'Formatting Output',
                    link: '/cmd-101/formatting-output',
                  },
                ],
              },
              {
                text: 'Writing Shell Scripts',
                collapsed: true,
                items: [
                  {
                    text: 'Writing the First Script',
                    link: '/cmd-101/writing-the-first-script',
                  },
                  {
                    text: 'Starting a Project',
                    link: '/cmd-101/starting-a-project',
                  },
                  { text: 'Top-Down Design', link: '/cmd-101/top-down-design' },
                  {
                    text: 'Flow Control: Branching with if',
                    link: '/cmd-101/flow-control-branching-with-if',
                  },
                  {
                    text: 'Reading Keyboard Input',
                    link: '/cmd-101/reading-keyboard-input',
                  },
                  {
                    text: 'Flow Control: Looping with while/until',
                    link: '/cmd-101/flow-control-loop-with-while-and-until',
                  },
                  {
                    text: 'Flow Control: Branching with case',
                    link: '/cmd-101/flow-control-branching-with-case',
                  },
                  {
                    text: 'Positional Parameters',
                    link: '/cmd-101/positional-parameters',
                  },
                  {
                    text: 'Flow Control: Looping with for',
                    link: '/cmd-101/flow-control-looping-with-for',
                  },
                  {
                    text: 'Strings and Numbers',
                    link: '/cmd-101/strings-and-numbers',
                  },
                  {
                    text: 'Arrays',
                    link: '/cmd-101/arrays',
                  },
                  {
                    text: 'Exotica',
                    link: '/cmd-101/exotica',
                  },
                ],
              },
            ],
          },
          {
            text: 'Front-end Interview Q&A',
            collapsed: false,
            items: [
              {
                text: 'JavaScript',
                collapsed: true,
                items: [
                  {
                    text: 'Overview',
                    link: '/fe-qa/js-qa/',
                  },
                  {
                    text: 'Grammar',
                    link: '/fe-qa/js-qa/grammar',
                  },
                  {
                    text: 'Types & Objects',
                    link: '/fe-qa/js-qa/types-and-objects',
                  },
                  {
                    text: 'Function & Scope',
                    link: '/fe-qa/js-qa/functions-and-scope',
                  },
                  {
                    text: 'Arrays',
                    link: '/fe-qa/js-qa/arrays',
                  },
                  {
                    text: 'Async',
                    link: '/fe-qa/js-qa/async',
                  },
                  {
                    text: 'Logic and Algorithms',
                    link: '/fe-qa/js-qa/logic-and-algorithms',
                  },
                  {
                    text: 'Prototypes and Inheritance',
                    link: '/fe-qa/js-qa/prototypes-and-inheritance',
                  },
                ],
              },
            ],
          },
          {
            text: 'Linear Algebra',
            collapsed: true,
            items: [
              {
                text: 'Vector Spaces',
                link: '/linear-algebra/1-vector-spaces',
              },
              {
                text: 'Fields',
                link: '/linear-algebra/appendix-c-fields',
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
