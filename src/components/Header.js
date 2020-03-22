class Header {
  constructor(name, removeItself, classNames, editItself) {
    this.name = name;
    this.removeItself = removeItself;
    this.classNames = classNames;
    this.editItself = editItself;
  }

  getDeleteHtmlElement(deleteContainerClassName, deleteClassName, removeItself) {
    const element = document.createElement('button');
    element.classList.add(deleteContainerClassName);
    element.onclick = removeItself;
    const iTag = document.createElement('i');
    iTag.className= "fas fa-times "+deleteClassName;
    element.appendChild(iTag);
    return element;
  }

  getEditHtmlElement(editContainerClassName, editClassName, editItself) {
    const element = document.createElement('button');
    element.classList.add(editContainerClassName);
    element.onclick = editItself;
    const iTag = document.createElement('i');
    iTag.className= "fas fa-pen "+editClassName;
    element.appendChild(iTag);
    return element;
  }

  calculateHtmlElement() {
    const element = document.createElement('div');
    element.classList.add(this.classNames.element);

    const listNameElement = document.createElement('div');
    listNameElement.classList.add(this.classNames.label);
    listNameElement.innerHTML = `${this.name}`;
    element.appendChild(listNameElement);

    const listEditElement = this.getEditHtmlElement(this.classNames.editContainer, this.classNames.edit, this.editItself);
    element.appendChild(listEditElement);

    const listDeleteElement = this.getDeleteHtmlElement(this.classNames.deleteContainer, this.classNames.del, this.removeItself);
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

 module.exports = Header;