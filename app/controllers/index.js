import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['name', 'id'],
  sortAscending: true,

  actions: {
  }
});
