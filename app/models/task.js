import DS from 'ember-data';

var Task = DS.Model.extend({
  title: DS.attr('string'),
  game: DS.attr('string'),
  status: DS.attr('string'), // error, done, running
  process: DS.attr(),
});


export default Task;
