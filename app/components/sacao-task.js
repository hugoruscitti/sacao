import Ember from 'ember';

export default Ember.Component.extend({
  isRunning: function() {
    return (this.get('model.status') === 'running');
  }.property('model.status'),

  isDone: function() {
    return (this.get('model.status') === 'done');
  }.property('model.status'),

  isError: function() {
    return (this.get('model.status') === 'error');
  }.property('model.status'),
});
