goog.require('PolymerFlow.ModelView');

goog.require('todo.actions');

Polymer({

  is: 'todo-item',

  behaviors: [
    PolymerFlow.ModelView
  ],

  properties: {
    isEditing: {
      type: Boolean,
      value: false
    },
    valueBeforeEdit: String,
  },

  onDestroyTap(e) {
    this.emitAction({
      type: todo.actions.REMOVE_TODO,
      model: this.model
    });
    this.emitAction({
      type: todo.actions.SELECTION_CHANGED,
    });
  },

  onViewDblClick(e) {
    this.valueBeforeEdit = this.model.text;
    this.isEditing = true;
    this.$['text-input'].focus();
  },

  onInputBlur(e) {
    this.confirmEdit();
  },

  confirmEdit() {
    this.isEditing = false;
    if (!this.model.text.trim()) {
      this.emitAction({
        type: todo.actions.REMOVE_TODO,
        model: this.model
      });
    }
  },

  onInputKeyDown(e) {
    if (e.keyCode == 13) {
      this.confirmEdit();
    } else if (e.keyCode == 27) {
      this.set('model.text', this.valueBeforeEdit);
      this.isEditing = false;
    }
  },

  onCompletedChange(e) {
    // this.model.completed = e.target.checked;
    this.emitAction({
      type: todo.actions.SELECTION_CHANGED,
      model: this.model,
      completed: e.target.checked
    });
  }

});
