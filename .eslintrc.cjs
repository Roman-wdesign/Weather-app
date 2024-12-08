/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],

  plugins: ['boundaries'],
  env: {
    browser: true,
    es2020: true,
    amd: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    },
    'boundaries/include': ['src/**/*'],
    'boundaries/elements': [
      {
        type: 'app',
        pattern: 'app'
      },
      {
        type: 'pages',
        pattern: 'src/pages/*',
        capture: ['page']
      },
      {
        type: 'widgets',
        pattern: 'src/widgets/*',
        capture: ['widget']
      },
      {
        type: 'features',
        pattern: 'src/features/*',
        capture: ['feature']
      },
      {
        type: 'entities',
        pattern: 'src/entities/*',
        capture: ['entity']
      },
      {
        type: 'shared',
        pattern: 'src/shared/*',
        capture: ['segment']
      }
    ]
  },
  rules: {
    'boundaries/entry-point': [
      2,
      {
        default: 'disallow',
        rules: [
          {
            target: [
              [
                'shared',
                {
                  segment: 'assets'
                }
              ]
            ],
            allow: '**'
          },
          {
            target: [
              [
                'shared',
                {
                  segment: 'composables'
                }
              ]
            ],
            allow: '**'
          },
          {
            target: [
              [
                'shared',
                {
                  segment: 'ui'
                }
              ]
            ],
            allow: '**'
          },
          {
            target: [
              [
                'shared',
                {
                  segment: 'config'
                }
              ]
            ],
            allow: '**'
          },
          {
            target: [
              [
                'shared',
                {
                  segment: 'api'
                }
              ]
            ],
            allow: '**'
          },
          {
            target: ['features'],
            allow: '**/index.(ts|tsx)'
          },
          {
            target: ['app', 'pages', 'widgets', 'features', 'entities'],
            allow: 'index.(ts|tsx)'
          }
        ]
      }
    ],
    //no cross imports
    'boundaries/element-types': [
      2,
      {
        default: 'allow',
        message: '${file.type} is not allowed to import (${dependency.type})',
        rules: [
          {
            from: ['shared'],
            disallow: ['app', 'pages', 'widgets', 'features', 'entities'],
            message: 'Shared module must not import upper layers (${dependency.type})'
          },
          {
            from: ['entities'],
            message: 'Entity must not import upper layers (${dependency.type})',
            disallow: ['app', 'pages', 'widgets', 'features']
          },
          {
            from: ['entities'],
            message: 'Entity must not import other entity',
            disallow: [
              [
                'entities',
                {
                  entity: '!${entity}'
                }
              ]
            ]
          },
          {
            from: ['features'],
            message: 'Feature must not import upper layers (${dependency.type})',
            disallow: ['app', 'pages', 'widgets']
          },
          {
            from: ['features'],
            message: 'Feature must not import other feature',
            disallow: [
              [
                'features',
                {
                  feature: '!${feature}'
                }
              ]
            ]
          },
          {
            from: ['widgets'],
            message: 'Feature must not import upper layers (${dependency.type})',
            disallow: ['app', 'pages']
          },
          {
            from: ['widgets'],
            message: 'Widget must not import other widget',
            disallow: [
              [
                'widgets',
                {
                  widget: '!${widget}'
                }
              ]
            ]
          },
          {
            from: ['pages'],
            message: 'Page must not import upper layers (${dependency.type})',
            disallow: ['app']
          },
          {
            from: ['pages'],
            message: 'Page must not import other page',
            disallow: [
              [
                'pages',
                {
                  page: '!${page}'
                }
              ]
            ]
          }
        ]
      }
    ]
  }
}
