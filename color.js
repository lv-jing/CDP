const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const options = {
  stylesDir: path.join(__dirname, './src/style'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/style/theme.less'),
  mainLessFile: path.join(__dirname, "../src/style/App.less"),
  themeVariables: [
    '@primary-color',
    '@head-color',
    '@primary-1',
    '@border-radius-base'
  ],
  indexFileName: 'index.html',
  outputFilePath: path.join(__dirname, './public/color.less'),
}

generateTheme(options).then(less => {
  console.log('Theme generated successfully');
}).catch(error => {
  console.log('Error', error);
});
