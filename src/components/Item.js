const Header = require('./Header');

class Item {
  constructor(itemName, itemDescription, parentContainer, removeItemAt, items = []) {
    this.itemName = itemName;
    this.itemDescription = itemDescription;
    this.parentContainer = parentContainer;
    this.removeItemAt = removeItemAt;
    this.items = items;
  }

  removeItem = () => {
    this.removeItemAt(this);
  };

  reRender = () => {
    const oldElement = this.getHtmlElement();
    this.destroyElementRef();
    this.parentContainer.insertBefore(this.getHtmlElement(), oldElement);
    this.parentContainer.removeChild(oldElement);
  };

  editItem = () => {
    const name = prompt('Enter new Task:');
    const description = prompt('Enter Task Description:');
    if(!name) return;
    this.itemName = name;
    this.itemDescription = description;
    this.reRender();
  };

  getHeaderElement = () => {
    const classNames = {
      deleteContainer: 'list-item-delete-container',
      del: 'list-item-delete',
      editContainer: 'list-item-edit-container',
      edit: 'list-item-edit',
      element: 'list-item-header',
      label: 'list-item-name'
    };
    const listHeader = new Header(this.itemName, this.removeItem, classNames, this.editItem);
    return listHeader.getHtmlElement();
  };

  destroyElementRef = () => {
    this.htmlElement = null;
  };

  calculateHtmlElement() {
    const element = document.createElement('div');
    element.classList.add('list-item-container');

    const itemHeaderElement = this.getHeaderElement();
    element.appendChild(itemHeaderElement);

    const itemDescriptionElement = document.createElement('p');
    itemDescriptionElement.classList.add('list-item-description');
    itemDescriptionElement.innerHTML = this.itemDescription;
    element.appendChild(itemDescriptionElement);

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