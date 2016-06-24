goog.require('PolymerFlow.ActionEmitter');
goog.require('PolymerFlow.StateAware');

goog.require('todo.actions');

Polymer({

  is: 'todo-header',

  behaviors: [
    PolymerFlow.ActionEmitter,
    PolymerFlow.StateAware
  ],

  properties: {
    todoText: {
      type: String,
      value: ''
    }
  },

  onInputKeyDown(e) {
    if (e.keyCode == 13 && this.todoText.trim().length) {
      this.emitAction({
        type: todo.actions.ADD_TODO,
        text: this.todoText
      });
      this.todoText = '';
    }
  },

  onAllCompletedChange(event) {
    this.emitAction({
      type: todo.actions.SELECTION_CHANGED,
      applyToAll: true,
      value: event.target.checked
    })
  },

});
