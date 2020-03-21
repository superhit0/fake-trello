const App = require('./components/App');
const appContainer = document.getElementById('root');
const app = new App(appContainer);
appContainer.appendChild(app.getHtmlElement());