function List() {}

function App() {
  this.lists = [];
}

App.prototype.removeList = (index) => this.lists.splice(index, 1);
App.prototype.addList = (listName) => this.lists.push(new List(listName));
App.prototype.getHtmlElement = () => {
  const element = document.createElement('div');
  element.classList.add('app-container');
  return element;
};

module.exports = App;