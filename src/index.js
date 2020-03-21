const App = require('./models/App');
const app = new App();
document.getElementById('root').appendChild(app.getHtmlElement());