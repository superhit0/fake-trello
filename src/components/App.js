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

  rerenderListAtIdx = (index) => {
    const oldElement = this.lists[index].getHtmlElement();
    this.lists[index].destroyElementRef();
    this.listContainer.insertBefore(this.lists[index].getHtmlElement(), oldElement);
    this.listContainer.removeChild(oldElement);
  };

  editListName = (index) => {
    const name = prompt('Enter new Name of List: ' + this.lists[index].listName + ": ");
    if(!name) return;
    this.lists[index].setListName(name);
    this.rerenderListAtIdx(index);
  };

  addList = (listName) => {
    if(!listName) return;
    const newList = new List(listName, this.lists.length, this.listContainer, this.removeList, this.editListName);
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
  }
};

module.exports = App;