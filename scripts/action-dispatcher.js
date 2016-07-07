goog.provide('todo.ActionDispatcher');

goog.require('todo.actions');

todo.ActionDispatcher = {

  dispatchAction(action, options) {
    console.log('ACTION: ' + action.toString());
    switch (action) {
      case todo.actions.ADD_TODO:
        this.push('state.todoList', {
          text: options.text,
          completed: false
        });
        this.emitAction({
          type: todo.actions.SELECTION_CHANGED,
        });
        break;
      case todo.actions.REMOVE_TODO:
        this.arrayDelete('state.todoList', options.model);
        break;
      case todo.actions.SELECTION_CHANGED:
        if (options.applyToAll) {
          this.set('state.allCompleted', options.value);
          if (this.get('state.todoList')) {
            this.get('state.todoList').forEach((item, index) => {
              this.set(['state.todoList', index, 'completed'],
                       options.value);
            });
          }
        } else {
          if (options.model) {
            let index = this.get('state.todoList').indexOf(options.model);
            this.set(['state.todoList', index, 'completed'], options.completed);
          }
          let allCompleted = true;
          if (this.get('state.todoList') && this.get('state.todoList').length) {
            this.get('state.todoList').forEach(item => {
              if (!item.completed) {
                allCompleted = false;
              }
            });
            this.set('state.allCompleted', allCompleted);
          } else {
            this.set('state.allCompleted', false);
          }
        }
        if (this.get('state.filterFunc')) {
          this.$['list'].render();
        }
        break;
      case todo.actions.CLEAR_COMPLETED:
        let completed = this.get('state.todoList').filter(
            elem => elem.completed);
        completed.forEach(elem => {
          this.arrayDelete('state.todoList', elem);
        })
    }
  }

}
