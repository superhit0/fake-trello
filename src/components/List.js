const Header = require('./Header');
const ListFooter = require('./ListFooter');
const Item = require('./Item');

class List {
  constructor(listName, parentContainer, removeList, listItems = []) {
    this.listName = listName;
    this.items = listItems;
    this.parentContainer = parentContainer;
    this.itemsContainer = null;
    this.htmlElement = null;
    this.removeList = removeList;
  }

  reRender = () => {
    const oldElement = this.getHtmlElement();
    this.destroyElementRef();
    this.parentContainer.insertBefore(this.getHtmlElement(), oldElement);
    this.parentContainer.removeChild(oldElement);
  };

  editList = () => {
    const name = prompt('Enter new Name of List: ' + this.listName + ": ");
    if(!name) return;
    this.listName = name;
    this.reRender();
  };

  removeItself = () => {
    this.removeList(this);
  };

  removeItem = (element) => {
    const index = this.items.indexOf(element);
    const removeItem = this.items[index];
    this.itemsContainer.removeChild(removeItem.getHtmlElement());
    this.items.splice(index, 1);

    return removeItem;
  };

  addItem = (name, description) => {
    const newItem = new Item(name, description, this.itemsContainer, this.removeItem);
    this.itemsContainer.appendChild(newItem.getHtmlElement());
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

    const listHeader = new Header(listName, removeItself, classNames, this.editList);
    return listHeader.getHtmlElement();
  }

  destroyElementRef = () => {
    this.htmlElement = null;
  };

  calculateHtmlElement = () => {
    const element = document.createElement('div');
    element.classList.add('list-container');

    const listHeaderElement = this.getHeaderElement(this.listName, this.removeItself);
    element.appendChild(listHeaderElement);

    const listItemsContainerElement = document.createElement('div');
    listItemsContainerElement.classList.add('list-items-container');
    element.appendChild(listItemsContainerElement);
    this.itemsContainer = listItemsContainerElement;

    const listFooter = new ListFooter(this.addItem);
    const listFooterElement = listFooter.getHtmlElement();
    element.appendChild(listFooterElement);

    this.htmlElement = element;
  };

  getHtmlElement = () => {
    if(!this.htmlElement){
      this.calculateHtmlElement();
    }

    return this.htmlElement;
  }
};

module.exports = List;