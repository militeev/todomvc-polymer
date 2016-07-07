goog.require('PolymerFlow.ListView');

Polymer({

  is: 'todo-items',

  behaviors: [
    PolymerFlow.ListView,
    PolymerFlow.StateAware,
  ],

  properties: {},

  filterList(elem) {
    let filter = this.get('state.filterFunc');
    return !filter || filter(elem);
  },

  render() {
    this.$['list-template'].render();
  }

});
