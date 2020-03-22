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
    // const listIndex = listStore.lists.indexOf(this.data.start.parent);
    // const itemIndex = listStore.lists[listIndex].items.indexOf();
    // listStore.lists[this.data.start].items.splice(itemIndex, 1);
    delete this.data;
  },
};
module.exports = {
  dragStore,
  listStore
};