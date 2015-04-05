import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  game: DS.attr('string'),
  status: DS.attr('string'),
  process: DS.attr(),
});
