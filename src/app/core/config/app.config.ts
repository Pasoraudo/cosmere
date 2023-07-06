
// Types
import {Layout} from '../../layout/layout.types';

export type Scheme = 'auto' | 'dark' | 'light' | 'cosmere';
export type Screens = { [key: string]: string };
export type Theme = 'theme-default' | string;
export type Themes = { id: string; name: string }[];

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface AppConfig
{
    layout: Layout;
    scheme: Scheme;
    screens: Screens;
    theme: Theme;
    themes: Themes;
}

export const appConfig: AppConfig = {
    layout : 'classy',
    scheme : 'cosmere',
    screens: {
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1440px'
    },
    theme  : 'theme-default',
    themes : [
        {
            id  : 'theme-default',
            name: 'Default'
        },
        {
            id  : 'theme-component',
            name: 'Brand'
        },
        {
            id  : 'theme-teal',
            name: 'Teal'
        },
        {
            id  : 'theme-rose',
            name: 'Rose'
        },
        {
            id  : 'theme-purple',
            name: 'Purple'
        },
        {
            id  : 'theme-amber',
            name: 'Amber'
        }
    ]
};
