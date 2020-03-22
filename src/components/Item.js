const Header = require('./Header');

class Item {
  constructor(itemName, itemDescription, parentIndex, parentContainer, removeItem, items = []) {
    this.itemName = itemName;
    this.itemDescription = itemDescription;
    this.parentIndex = parentIndex;
    this.parentContainer = parentContainer;
    this.removeItem = removeItem;
    this.items = items;
  }

  removeItem = () => {

  };

  editItem = () => {

  };

  getHeaderElement = () => {
    const classNames = {
      deleteContainer: 'list-delete-container',
      del: 'list-delete',
      editContainer: 'list-edit-container',
      edit: 'list-edit',
      element: 'list-header',
      label: 'list-name'
    };
    const listHeader = new Header(this.itemName, this.removeItem, classNames, this.editItem);
    return listHeader.getHtmlElement();
  };

  calculateHtmlElement() {
    const element = document.createElement('div');
    element.classList.add('list-item-container');

    const listHeaderElement = this.getHeaderElement();
    element.appendChild(listHeaderElement);

    // const element = document.createElement('div');
    // element.classList.add('list-container');
    //
    // const element = document.createElement('div');
    // element.classList.add('list-container');

    this.htmlElement = element;
  }

  getHtmlElement() {
    if(!this.htmlElement){
      this.calculateHtmlElement();
    }

    return this.htmlElement;
  }
}

module.exports = Item;