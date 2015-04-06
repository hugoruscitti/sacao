import Ember from 'ember';

export default Ember.Controller.extend({
  notification: Ember.inject.service('notification'),

  actions: {
    abrirModalNuevo: function() {
      this.showModal('modal');
    },
  },

  startApplication: function() {
    this.get('notification').setStore(this.store);
  }.on('init'),
});
