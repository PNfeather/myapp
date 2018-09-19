let render = require('json-templater/string');
let fs = require('fs');
let path = require('path');
let pageConfig = require('../src/router/pageConfig');
let config = [...pageConfig];

const COMPONENTS_TEMPLATE = '{path: \'{{path}}\', name: \'{{name}}\', component: () => import(/* webpackChunkName: \"{{name}}\")} */ \'@/pages{{filePath}}/{{name}}.vue\')}';
const routeTemplate = [];
config.map(route => {
  let name = route.name;
  let path = route.path;
  let filePath = route.filePath || route.path;
  routeTemplate.push(render(COMPONENTS_TEMPLATE, {path: path, name: name, filePath: filePath}));
});

const MAIN_TEMPLATE = `const config = [\n${routeTemplate.join(',\n')}];\nexport default config;\n`;
fs.writeFileSync(path.join(__dirname, '../src/router/routeConfig.js'),render(MAIN_TEMPLATE));
