module.exports = {
  presets: [
    ...process.env.NODE_ENV === 'test'
      ? []
      : [require('@babel/preset-env').default],
    [require('@babel/preset-typescript').default, {
      allExtensions: true,
      isTSX: true,
    }],
  ],

  plugins:
    process.env.NODE_ENV !== 'production'
      ? [
        require('./scripts/babelTransformForOfArray'),
        require('@babel/plugin-proposal-class-properties').default,
        require('@babel/plugin-transform-modules-commonjs').default,
        require('@babel/plugin-proposal-optional-catch-binding').default,
      ]
      : [
        require('@babel/plugin-proposal-optional-catch-binding').default,
        [require('@babel/plugin-transform-runtime').default, {
          helpers: false,
          regenerator: false,
        }],
        require('@babel/plugin-proposal-class-properties'),
        [require('babel-plugin-transform-inline-environment-variables'), {
          include: ['NODE_ENV', 'npm_package_version'],
        }],
      ],

  ignore: [/\/node_modules\/(?!@interactjs\/)/],
}
