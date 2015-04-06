import Ember from 'ember';

export default Ember.Controller.extend({
  notification: Ember.inject.service('notification'),

  isShowingModal: false,
  actions: {
    toggleModal: function(){
      this.toggleProperty('isShowingModal');
    }
  },

  startApplication: function() {
    this.get('notification').setStore(this.store);
  }.on('init'),
});
