function List() {}

function App() {
  this.lists = [];
  this.container = null;
}

const getAddHtmlElement = () => {
  const element = document.createElement('div');
  element.classList.add('add-list-container');
  const iTag = document.createElement('i');
  iTag.className= "fas fa-plus-circle";
  element.appendChild(iTag);
  return element;
};

App.prototype.removeList = (index) => this.lists.splice(index, 1);
App.prototype.addList = (listName) => this.lists.push(new List(listName));
App.prototype.setContainer = (element) => this.container = element;
App.prototype.getHtmlElement = () => {
  const element = document.createElement('div');
  element.classList.add('app-container');
  // this.lists.forEach(list => element.appendChild(list.getHtmlElement()));
  const addHtmlElement = getAddHtmlElement();
  element.appendChild(addHtmlElement);
  return element;
};

module.exports = App;