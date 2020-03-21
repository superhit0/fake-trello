const ListHeader = require('./ListHeader');

class List {
  constructor(listName, parentIndex, parentContainer, removeList) {
    this.listName = listName;
    this.parentIndex = parentIndex;
    this.parentContainer = parentContainer;
    this.htmlElement = null;
    this.removeList = removeList;
  }

  removeItself = () => {
    this.removeList(this.parentIndex);
  };

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

module.exports = List;