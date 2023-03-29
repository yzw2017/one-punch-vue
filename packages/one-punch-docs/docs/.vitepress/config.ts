import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "One Punch Vue",
  themeConfig: {
    sidebar: [
      {
        text: '组件',
        items: [
          { text: 'Button', link: '/button' },
        ]
      }
    ]
  }
})
