const List = require('./List');
const { listStore } = require('../store');

class App{
  constructor(container, lists = []) {
    this.lists = lists;
    this.parentContainer = container;
    this.listContainer = null;
    this.htmlElement = null;
    listStore.lists = lists;
  }

  removeList = (element) => {
    const index = this.lists.indexOf(element);
    const removeList = this.lists[index];
    this.listContainer.removeChild(removeList.getHtmlElement());
    this.lists.splice(index, 1);

    return removeList;
  };

  addList = (listName) => {
    if(!listName) return;
    const newList = new List(listName, this.listContainer, this.removeList);
    this.listContainer.appendChild(newList.getHtmlElement());
    return this.lists.push(newList);
  };

  getAddHtmlElement = () => {
    const element = document.createElement('div');
    element.classList.add('add-list-container');
    element.onclick = () => { this.addList(prompt('Enter new list name:')); }
    const iTag = document.createElement('i');
    iTag.className= "fas fa-plus-circle";
    element.appendChild(iTag);
    return element;
  };

  calculateHtmlElement = () => {
    const element = document.createElement('div');
    element.classList.add('app-container');

    const appListContainer = document.createElement('div');
    appListContainer.classList.add('app-list-container');
    this.listContainer = appListContainer;
    this.lists.forEach(list => appListContainer.appendChild(list.getHtmlElement()));
    element.appendChild(appListContainer);

    const addHtmlElement = this.getAddHtmlElement();
    element.appendChild(addHtmlElement);
    this.htmlElement = element;
  };

  getHtmlElement = () => {
    if(!this.htmlElement){
      this.calculateHtmlElement();
    }

    return this.htmlElement;
  };
}

module.exports = App;