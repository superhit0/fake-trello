const Header = require('./Header');
const ListFooter = require('./ListFooter');
const Item = require('./Item');
const { reRender } = require('../framework');
const { dragStore } = require('../store');

class List {
  constructor(listName, parentContainer, removeList, listItems = []) {
    this.listName = listName;
    this.items = listItems;
    this.parentContainer = parentContainer;
    this.itemsContainer = null;
    this.htmlElement = null;
    this.removeList = removeList;
  }

  editList = () => {
    const name = prompt('Enter new Name of List: ' + this.listName + ": ");
    if(!name) return;
    this.listName = name;
    reRender.call(this);
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
    const newItem = new Item(name, description, this.itemsContainer, this.removeItem, this);
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

  moveItemToListAt = (item, index = Number.MAX_SAFE_INTEGER) => {
    item.removeItemAt = this.removeItem;
    item.parentContainer = this.itemsContainer;
    item.parentRef = this;
    if (this.items.length <= index || index<0) {
      this.items.push(item);
    } else {
      this.items.splice(index, 0, item);
    }
  };

  getDragIndex = (event) => {
    const mouseY = event.clientY;
    let index = this.items.length;
    return this.items.reduce((closest, item, index) => {
      const itemElement = item.getHtmlElement();
      const box = itemElement.getBoundingClientRect();
      const offSet = mouseY - box.top - (box.height/2);
      if(offSet < 0 && offSet > closest.offSet){
        return {
          offSet,
          index
        }
      } else {
        return closest;
      }
    }, { offSet: Number.MIN_SAFE_INTEGER, index }).index;
  };

  dragOverFunc = (event) => {
    const itemIndex = this.getDragIndex(event);
    const item = dragStore.data.start.item;
    dragStore.data.end = {
      parent: this,
      itemIndex
    };
    if (this.items.length <= itemIndex || itemIndex<0) {
      this.itemsContainer.appendChild(item.getHtmlElement());
    } else {
      this.itemsContainer.insertBefore(item.getHtmlElement(), this.items[itemIndex].getHtmlElement());
    }
  };

  calculateHtmlElement = () => {
    const element = document.createElement('div');
    element.classList.add('list-container');
    element.ondragover = this.dragOverFunc;

    const listHeaderElement = this.getHeaderElement(this.listName, this.removeItself);
    element.appendChild(listHeaderElement);

    const listItemsContainerElement = document.createElement('div');
    listItemsContainerElement.classList.add('list-items-container');
    element.appendChild(listItemsContainerElement);
    this.items.forEach(item => listItemsContainerElement.appendChild(item.getHtmlElement()));
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