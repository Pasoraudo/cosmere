import {FuseNavigationItem} from '@fuse/components/navigation';

export const wikiNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Wiki',
    type: 'basic',
    icon: 'heroicons_outline:home',
    link: '/wiki/home'
  },
  {
    id: 'relationships',
    title: 'Relaciones',
    type: 'basic',
    icon: 'heroicons_outline:users',
    link: '/wiki/relationship'
  },
  {
    id: 'popularity',
    title: 'Estadísticas',
    type: 'basic',
    icon: 'heroicons_outline:chart-bar',
    link: '/wiki/statistics'
  },
  {
    id: 'info',
    title: 'info',
    type: 'basic',
    icon: 'heroicons_outline:information-circle',
  },
]

