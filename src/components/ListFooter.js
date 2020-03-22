class ListFooter {
  constructor(addItem) {
    this.addItem = addItem;
  }

  addItemToList = () => {
    const name = prompt('Enter new Task:');
    const description = prompt('Enter Task Description:');
    if(!name) {
      return;
    }
    this.addItem(name, description || '');
  };

  getAddHtmlElement = () => {
    const element = document.createElement('button');
    element.classList.add('list-add-container');
    const iTag = document.createElement('i');
    iTag.className= "fas fa-plus-circle list-add";
    element.appendChild(iTag);
    return element;
  };

  calculateHtmlElement = () => {
    const element = document.createElement('div');
    element.classList.add('list-footer');
    element.onclick = this.addItemToList;

    const listAddElement = this.getAddHtmlElement();
    element.appendChild(listAddElement);

    const listFooterNoteElement = document.createElement('div');
    listFooterNoteElement.classList.add('list-footer-note');
    listFooterNoteElement.innerHTML = 'Add Task ...';
    element.appendChild(listFooterNoteElement);

    this.htmlElement = element;
  };

  getHtmlElement = () => {
    if(!this.htmlElement){
      this.calculateHtmlElement();
    }

    return this.htmlElement;
  };
}

module.exports = ListFooter;