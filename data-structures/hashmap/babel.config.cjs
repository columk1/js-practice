module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: true,
      },
    ],
  ]
  const plugins = ['@babel/plugin-transform-modules-commonjs']

  return {
    plugins,
  }
}
