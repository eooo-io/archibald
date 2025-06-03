import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Achibald",
  description: "Cloud Architecture Diagram Editor",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Providers', link: '/providers/' }
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
      ],
      '/providers/': [
        {
          text: 'Cloud Providers',
          items: [
            { text: 'AWS', link: '/providers/aws' },
            { text: 'Azure', link: '/providers/azure' },
            { text: 'GCP', link: '/providers/gcp' },
            { text: 'OpenShift', link: '/providers/openshift' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/eooo-io/achibald' }
    ]
  }
})
