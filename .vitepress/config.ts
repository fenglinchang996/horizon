import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',

  title: 'FLC 的工程師生存筆記',
  description: '對這個世界發出吶喊，即使所有人都無動於衷。',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: [
      {
        items: [
          { text: ' 首頁', link: '/' },
          {
            text: 'Command Line 101',
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
                ],
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
