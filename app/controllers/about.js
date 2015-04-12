import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    abrirModalNuevo: function() {
      this.showModal('modal');
    },

  }
});
