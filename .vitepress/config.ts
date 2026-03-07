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
              {
                text: 'Seeing the World as the Shell Sees It',
                link: '/cmd-101/seeing-the-world-as-the-shell-sees-it',
              },
              { text: 'Redirection', link: '/cmd-101/redirection' },
              { text: 'Permissions', link: '/cmd-101/permissions' },
              { text: 'Processes', link: '/cmd-101/processes' },
              { text: 'The Environment', link: '/cmd-101/the-environment' },
              {
                text: 'Advanced Keyboard Tricks',
                link: '/cmd-101/advanced-keyboard-tricks',
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
