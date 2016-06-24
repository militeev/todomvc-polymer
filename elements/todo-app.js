goog.require('PolymerFlow.ActionEmitter');
goog.require('PolymerFlow.ApplicationState')

goog.require('todo.ActionDispatcher');
goog.require('todo.actions');

Polymer({

  is: 'todo-app',

  behaviors: [
    PolymerFlow.ApplicationState,
    PolymerFlow.ActionEmitter
  ],

  properties: {},

  get actionDispatchers() {
    return [todo.ActionDispatcher];
  },

  ready() {
    this.set('state', {
      todoList: [],
      allCompleted: false
    });
    this.emitAction({
      type: todo.actions.INIT_APPLICATION
    });
  }

});
