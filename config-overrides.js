const { override, fixBabelImports, addLessLoader, addWebpackResolve } = require('customize-cra');
const theme = require('./theme')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: theme
    }),
    addWebpackResolve({
        extensions: ['.ts', '.tsx', '.js', '.json']
    })
)