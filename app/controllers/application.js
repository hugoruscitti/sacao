import Ember from 'ember';

export default Ember.Controller.extend({
  notification: Ember.inject.service('notification'),


  startApplication: function() {
    this.get('notification').setStore(this.store);
  }.on('init'),
});
