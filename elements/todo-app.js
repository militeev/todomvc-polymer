goog.require('PolymerFlow.ActionEmitter');
goog.require('PolymerFlow.ApplicationState')

goog.require('todo.ActionDispatcher');
goog.require('todo.actions');

Polymer({

  is: 'todo-app',

  behaviors: [
    PolymerFlow.ApplicationState,
    PolymerFlow.ActionEmitter,
    PolymerFlow.ApplicationRouter,
  ],

  observers: [
    'routeChanged(state.route)'
  ],

  properties: {
  },

  routeChanged(route) {
    let filterFunc = null;
    switch (route && route.valueAt && route.valueAt(1)) {
      case 'active': filterFunc = elem => !elem.completed; break;
      case 'completed': filterFunc = elem => elem.completed; break;
    }
    this.set('state.filterFunc', filterFunc);
    this.$['list'].render();
  },

  get actionDispatchers() {
    return [todo.ActionDispatcher];
  },

  ready() {
    this.set('state', {
      todoList: [],
      allCompleted: false
    });
  }

});
