const { reRender } = require('../framework');

const listStore = {};
const dragStore = {
  initializeStartDrag(item, parent) {
    const listIndex = listStore.lists.indexOf(parent);
    const itemIndex = listStore.lists[listIndex].items.indexOf(item);
    this.data = {
      start: {
        listIndex,
        itemIndex,
        parent,
        item
      }
    };
  },
  initializeEndDrag() {
    listStore.lists[this.data.start.listIndex].items.splice(this.data.start.itemIndex, 1);
    const endList = this.data.end.parent;
    endList.moveItemToListAt(this.data.start.item);

    reRender.call(endList);
    reRender.call(listStore.lists[this.data.start.listIndex]);
    delete this.data;
  },
};
module.exports = {
  dragStore,
  listStore
};