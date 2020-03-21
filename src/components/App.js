const List = require('./List');

class App{
  constructor(container, lists = []) {
    this.lists = lists;
    this.parentContainer = container;
    this.listContainer = null;
    this.htmlElement = null;
  }

  removeList = (index) => {
    const removeList = this.lists[index];
    this.listContainer.removeChild(removeList.getHtmlElement());
    this.lists.splice(index, 1);

    return removeList;
  };

  addList = (listName) => {
    const newList = new List(listName, this.lists.length, this.listContainer, this.removeList);
    this.listContainer.appendChild(newList.getHtmlElement());
    return this.lists.push(newList);
  };

  getAddHtmlElement() {
    const element = document.createElement('div');
    element.classList.add('add-list-container');
    const iTag = document.createElement('i');
    iTag.className= "fas fa-plus-circle";
    element.appendChild(iTag);
    return element;
  }

  calculateHtmlElement() {
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
  }

  getHtmlElement() {
    if(!this.htmlElement){
      this.calculateHtmlElement();
    }

    return this.htmlElement;
  }
}

module.exports = App;