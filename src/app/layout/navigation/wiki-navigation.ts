import {FuseNavigationItem} from '../../../@fuse/components/navigation/navigation.types';

export const wikiNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Wiki',
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
    title: 'Análisis',
    type: 'basic',
    icon: 'heroicons_outline:chart-bar',
    link: '/wiki/analysis'
  },
  {
    id: 'info',
    title: 'Info',
    type: 'basic',
    icon: 'heroicons_outline:information-circle',
  },
]

