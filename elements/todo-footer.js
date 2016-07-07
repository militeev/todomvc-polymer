goog.require('PolymerFlow.ActionEmitter');
goog.require('PolymerFlow.StateAware');

goog.require('todo.actions');

Polymer({

  is: 'todo-footer',

  behaviors: [
    PolymerFlow.ActionEmitter,
    PolymerFlow.StateAware,
  ],

  properties: {},

  onClearCompletedButtonTap() {
    this.emitAction({
      type: todo.actions.CLEAR_COMPLETED
    })
  },

  hasCompleted(change) {
    return !!this.get('state.todoList').filter(elem => elem.completed).length;
  },

  numberOfActive(change) {
    return this.get('state.todoList').filter(elem => !elem.completed).length;
  },

  isSelected(what, route) {
    return what == route.valueAt(1);
  }

});
