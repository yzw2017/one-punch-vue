import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "One Punch Vue",
  
  themeConfig: {
    sidebar: [
      {
        text: '布局',
        items: [
          { text: 'Space', link: '/components/space' },
        ]
      },
      {
        text: '通用',
        items: [
          { text: 'Button', link: '/components/button' },
        ]
      },
      {
        text: '数据录入',
        items: [
          { text: 'Input', link: '/components/input' },
        ]
      },
      {
        text: '人机验证',
        items: [
          { text: 'Validate', link: '/components/validate' },
        ]
      },
      {
        text: '指令',
        items: [
          { text: 'v-loading', link: '/directive/loading' },
        ]
      },
    ],
    nav: [
      { text: '组件', link: '/components/button' }
    ]
  },

  outDir: '../dist',
  markdown: {
    lineNumbers: false
  },
})
