class ListHeader {
  constructor(listName, removeItself) {
    this.listName = listName;
    this.removeItself = removeItself;
  }

  getDeleteHtmlElement() {
    const element = document.createElement('button');
    element.classList.add('list-delete-container');
    element.onclick = this.removeItself;
    const iTag = document.createElement('i');
    iTag.className= "fas fa-times list-delete";
    element.appendChild(iTag);
    return element;
  }

  calculateHtmlElement() {
    const element = document.createElement('div');
    element.classList.add('list-header');

    const listNameElement = document.createElement('div');
    listNameElement.classList.add('list-name');
    listNameElement.innerHTML = `${this.listName}`;
    element.appendChild(listNameElement);

    const listDeleteElement = this.getDeleteHtmlElement();
    element.appendChild(listDeleteElement);

    this.htmlElement = element;
  }

  getHtmlElement() {
    if(!this.htmlElement){
      this.calculateHtmlElement();
    }

    return this.htmlElement;
  }
}

 module.exports = ListHeader;