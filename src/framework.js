const framework = {
  reRender() {
    const oldElement = this.getHtmlElement();
    this.destroyElementRef();
    this.parentContainer.insertBefore(this.getHtmlElement(), oldElement);
    this.parentContainer.removeChild(oldElement);
  }
};

module.exports = framework;