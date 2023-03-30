import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "One Punch Vue",
  themeConfig: {
    sidebar: [
      {
        text: 'Layout',
        items: [
          { text: 'Space', link: '/components/space' },
        ]
      },
      {
        text: 'General',
        items: [
          { text: 'Button', link: '/components/button' },
        ]
      },
      {
        text: 'Data Entry',
        items: [
          { text: 'Input', link: '/components/input' },
        ]
      },
    ],
    nav: [
      { text: '组件', link: '/components/button' }
    ]
  }
})
