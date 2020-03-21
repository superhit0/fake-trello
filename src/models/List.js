class List {
  constructor(listName, parentIndex, parentContainer) {
    this.listName = listName;
    this.parentIndex = parentIndex;
    this.parentContainer = parentContainer;
    this.htmlElement = null;
  }

  calculateHtmlElement() {
    const element = document.createElement('div');
    element.classList.add('list-container');

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