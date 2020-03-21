class ListFooter {
  constructor(lists) {
    this.lists = lists;
  }

  getAddHtmlElement() {
    const element = document.createElement('button');
    element.classList.add('list-add-container');
    element.onclick = this.removeItself;
    const iTag = document.createElement('i');
    iTag.className= "fas fa-plus-circle list-add";
    element.appendChild(iTag);
    return element;
  }

  calculateHtmlElement() {
    const element = document.createElement('div');
    element.classList.add('list-footer');

    const listAddElement = this.getAddHtmlElement();
    element.appendChild(listAddElement);

    const listFooterNoteElement = document.createElement('div');
    listFooterNoteElement.classList.add('list-footer-note');
    listFooterNoteElement.innerHTML = 'Add Task ...';
    element.appendChild(listFooterNoteElement);

    this.htmlElement = element;
  }

  getHtmlElement() {
    if(!this.htmlElement){
      this.calculateHtmlElement();
    }

    return this.htmlElement;
  }
}

module.exports = ListFooter;