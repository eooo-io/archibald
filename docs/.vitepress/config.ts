import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Achibald",
  description: "Cloud Architecture Diagram Editor",
  base: '/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Editor', link: 'http://localhost:5173/editor' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Quick Start', link: '/guide/quick-start' },
          ]
        },
        {
          text: 'Features',
          items: [
            { text: 'Diagram Editor', link: '/guide/diagram-editor' },
            { text: 'Cloud Providers', link: '/guide/cloud-providers' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/eooo-io/archibald' }
    ]
  }
})
