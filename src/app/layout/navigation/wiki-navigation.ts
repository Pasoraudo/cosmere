export interface NavigationItem {
  id: string;
  title: string;
  type: string;
  icon?: string;
  link?: string;
  subtitle?: string;
}
export const wikiNavigation: NavigationItem[] = [
  {
    id: 'home',
    title: 'Home',
    type: 'basic',
    icon: 'heroicons_outline:home',
    link: '/wiki/home'
  },
  {
    id: 'network',
    title: 'Network',
    type: 'basic',
    icon: 'heroicons_outline:users',
    link: '/wiki/network'
  },
  {
    id: 'analysis',
    title: 'Analysis',
    type: 'basic',
    icon: 'heroicons_outline:chart-bar',
    link: '/wiki/analysis'
  },
  {
    id: 'guide',
    title: 'Guide',
    type: 'basic',
    icon: 'heroicons_outline:book-open',
    link: '/wiki/guide'
  },
  // {
  //   id: 'info',
  //   title: 'Info',
  //   type: 'basic',
  //   icon: 'heroicons_outline:information-circle',
  // },
]

