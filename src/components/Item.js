const Header = require('./Header');
const { reRender } = require('../framework');
const { dragStore } = require('../store');

class Item {
  constructor(itemName, itemDescription, parentContainer, removeItemAt, parentRef) {
    this.itemName = itemName;
    this.itemDescription = itemDescription;
    this.parentContainer = parentContainer;
    this.removeItemAt = removeItemAt;
    this.parentRef = parentRef;
  }

  removeItem = () => {
    this.removeItemAt(this);
  };

  editItem = () => {
    const name = prompt('Enter new Task:');
    const description = prompt('Enter Task Description:');
    if(!name) return;
    this.itemName = name;
    this.itemDescription = description;
    reRender.call(this);
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

  dragStartFunc = () => {
    this.htmlElement.classList.add('draggable');
    dragStore.initializeStartDrag(this, this.parentRef);
  };

  dragEndFunc = () => {
    this.htmlElement.classList.remove('draggable');
    dragStore.initializeEndDrag();
  };

  calculateHtmlElement() {
    const element = document.createElement('div');
    element.classList.add('list-item-container');
    element.draggable = true;
    element.ondragstart = this.dragStartFunc;
    element.ondragend = this.dragEndFunc;

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