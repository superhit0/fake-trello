const Header = require('./Header');
const ListFooter = require('./ListFooter');

class List {
  constructor(listName, parentIndex, parentContainer, removeList, listItems = []) {
    this.listName = listName;
    this.parentIndex = parentIndex;
    this.items = listItems;
    this.parentContainer = parentContainer;
    this.htmlElement = null;
    this.removeList = removeList;
  }

  removeItself = () => {
    this.removeList(this.parentIndex);
  };

  addItem = (name, description) => {
    const newItem = new Item(name, description, this.lists.length, this.htmlElement);
    this.htmlElement.appendChild(newItem.getHtmlElement());
    return this.items.push(newItem);
  };

  getHeaderElement(listName, removeItself) {
    const classNames = {
      deleteContainer: 'list-delete-container',
      del: 'list-delete',
      editContainer: 'list-edit-container',
      edit: 'list-edit',
      element: 'list-header',
      label: 'list-name'
    };

    const listHeader = new Header(listName, removeItself, classNames);
    return listHeader.getHtmlElement();
  }

  calculateHtmlElement() {
    const element = document.createElement('div');
    element.classList.add('list-container');

    const listHeaderElement = this.getHeaderElement(this.listName, this.removeItself);
    element.appendChild(listHeaderElement);

    // const element = document.createElement('div');
    // element.classList.add('list-container');
    //
    const listFooter = new ListFooter()
    const listFooterElement = listFooter.getHtmlElement();
    element.appendChild(listFooterElement);

    this.htmlElement = element;
  }

  getHtmlElement() {
    if(!this.htmlElement){
      this.calculateHtmlElement();
    }

    return this.htmlElement;
  }
}

module.exports = List;