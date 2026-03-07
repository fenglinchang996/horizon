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
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
