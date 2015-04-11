import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sacao-updates'],
  notification: Ember.inject.service('notification'),

  hasTask: function() {
    return this.get('notification.task') > 0;
  }.property('notification.task')
});
