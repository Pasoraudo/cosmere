const chroma = require('chroma-js');
const _ = require('lodash');
const path = require('path');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;
const generateContrasts = require(path.resolve(__dirname, ('../utils/generate-contrasts')));

const normalizeTheme = (theme) => {
  return _.fromPairs(_.map(_.omitBy(theme, (palette, paletteName) => paletteName.startsWith('on') || _.isEmpty(palette)),
    (palette, paletteName) => [
      paletteName,
      {
        ...palette,
        DEFAULT: palette['DEFAULT'] || palette[500]
      }
    ]
  ));
};

const generateVariableColors = (theme) => {
  const customPropertiesWithOpacity = (name) => ({
                                                   opacityVariable,
                                                   opacityValue
                                                 }) => {
    if (opacityValue) {
      return `rgba(var(--fuse-${name}-rgb), ${opacityValue})`;
    }
    if (opacityVariable) {
      return `rgba(var(--fuse-${name}-rgb), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(--fuse-${name}-rgb))`;
  };

  return _.fromPairs(_.flatten(_.map(_.keys(flattenColorPalette(normalizeTheme(theme))), (name) => [
    [name, customPropertiesWithOpacity(name)],
    [`on-${name}`, customPropertiesWithOpacity(`on-${name}`)]
  ])));
};

function generateThemesObject(themes) {
  const normalizedDefaultTheme = normalizeTheme(themes.default);
  return _.map(_.cloneDeep(themes), (value, key) => {
    const theme = normalizeTheme(value);
    const primary = (theme && theme.primary && theme.primary.DEFAULT) ? theme.primary.DEFAULT : normalizedDefaultTheme.primary.DEFAULT;
    const accent = (theme && theme.accent && theme.accent.DEFAULT) ? theme.accent.DEFAULT : normalizedDefaultTheme.accent.DEFAULT;
    const warn = (theme && theme.warn && theme.warn.DEFAULT) ? theme.warn.DEFAULT : normalizedDefaultTheme.warn.DEFAULT;

    return _.fromPairs([
      [
        key,
        {
          primary,
          accent,
          warn
        }
      ]
    ]);
  });
}

const theming = plugin.withOptions((options) => ({
                                                   addComponents,
                                                   e,
                                                   theme
                                                 }) => {
    const mapVariableColors = _.fromPairs(_.map(options.themes, (theme, themeName) => [
      themeName === 'default' ? 'body, .theme-default' : `.theme-${e(themeName)}`,
      _.fromPairs(_.flatten(_.map(flattenColorPalette(_.fromPairs(_.flatten(_.map(normalizeTheme(theme), (palette, paletteName) => [
          [
            e(paletteName),
            palette
          ],
          [
            `on-${e(paletteName)}`,
            _.fromPairs(_.map(generateContrasts(palette), (color, hue) => [hue, _.get(theme, [`on-${paletteName}`, hue]) || color]))
          ]
        ])
      ))), (value, key) => [[`--fuse-${e(key)}`, value], [`--fuse-${e(key)}-rgb`, chroma(value).rgb().join(',')]])))
    ]));

    addComponents(mapVariableColors);

    const schemeCustomProps = _.map(['light', 'dark', 'cosmere'], (colorScheme) => {
      const isDark = colorScheme === 'dark';
      const background = theme(`fuse.customProps.background.${colorScheme}`);
      const foreground = theme(`fuse.customProps.foreground.${colorScheme}`);
      const lightSchemeSelectors = 'body.light, .light, .dark .light';
      const darkSchemeSelectors = 'body.dark, .dark, .light .dark';
      const cosmereSchemeSelectors = 'body.cosmere, .cosmere, .light .cosmere';

      let schemeSelector = lightSchemeSelectors;
      if (colorScheme === 'dark')
        schemeSelector = darkSchemeSelectors;
      if (colorScheme === 'cosmere')
        schemeSelector = cosmereSchemeSelectors;

      return {
        [schemeSelector]: {
          ...(!isDark ? {'--is-dark': 'false'} : {}),

          // Generate custom properties from customProps
          ..._.fromPairs(_.flatten(_.map(background, (value, key) => [[`--fuse-${e(key)}`, value], [`--fuse-${e(key)}-rgb`, chroma(value).rgb().join(',')]]))),
          ..._.fromPairs(_.flatten(_.map(foreground, (value, key) => [[`--fuse-${e(key)}`, value], [`--fuse-${e(key)}-rgb`, chroma(value).rgb().join(',')]])))
        }
      };
    });

    const schemeUtilities = (() => {
      return {};
    })();

    addComponents(schemeCustomProps);
    addComponents(schemeUtilities);
  },
  (options) => {
    return {
      theme: {
        extend: {
          colors: generateVariableColors(options.themes.default)
        },
        fuse: {
          customProps: {
            background: {
              light: {
                'bg-app-bar': '#FFFFFF',
                'bg-card': '#FFFFFF',
                'bg-default': colors.slate[100],
                'bg-dialog': '#FFFFFF',
                'bg-hover': chroma(colors.slate[400]).alpha(0.12).css(),
                'bg-status-bar': colors.slate[300]
              },
              dark: {
                'bg-app-bar': colors.slate[900],
                'bg-card': colors.slate[800],
                'bg-default': colors.slate[900],
                'bg-dialog': colors.slate[800],
                'bg-hover': 'rgba(255, 255, 255, 0.05)',
                'bg-status-bar': colors.slate[900]
              },
              cosmere: {
                'bg-app-bar': '#FF9500',
                'bg-card': '#0C0C0C',
                'bg-default': '#000000',
                'bg-dialog': '#FFFFFF',
                'bg-hover': chroma(colors.slate[400]).alpha(0.12).css(),
                'bg-status-bar': colors.slate[300]
              }
            },
            foreground: {
              light: {
                'text-default': colors.slate[800],
                'text-secondary': colors.slate[500],
                'text-hint': colors.slate[400],
                'text-disabled': colors.slate[400],
                'border': colors.slate[200],
                'divider': colors.slate[200],
                'icon': colors.slate[500],
                'mat-icon': colors.slate[500]
              },
              dark: {
                'text-default': '#FFFFFF',
                'text-secondary': colors.slate[400],
                'text-hint': colors.slate[500],
                'text-disabled': colors.slate[600],
                'border': chroma(colors.slate[100]).alpha(0.12).css(),
                'divider': chroma(colors.slate[100]).alpha(0.12).css(),
                'icon': colors.slate[400],
                'mat-icon': colors.slate[400]
              },
              cosmere: {
                'text-default': '#CCCCCC',
                'text-secondary': colors.slate[400],
                'text-hint': colors.slate[500],
                'text-disabled': colors.slate[600],
                'border': chroma(colors.slate[100]).alpha(0.12).css(),
                'divider': chroma(colors.slate[100]).alpha(0.12).css(),
                'icon': colors.slate[400],
                'mat-icon': colors.slate[400]
              }
            }
          },
          themes: generateThemesObject(options.themes)
        }
      }
    };
  }
);

module.exports = theming;
