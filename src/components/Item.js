class Item {
  constructor(itemName, itemDescription, parentIndex, parentContainer) {
    this.itemName = itemName;
    this.itemDescription = itemDescription;
    this.parentIndex = parentIndex;
    this.parentContainer = parentContainer;
  }

  calculateHtmlElement() {
    const element = document.createElement('div');
    element.classList.add('list-container');

    const listHeader = new ListHeader(this.listName, this.removeItself);
    const listHeaderElement = listHeader.getHtmlElement();
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