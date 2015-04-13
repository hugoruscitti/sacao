import Ember from 'ember';

var request = require('request');
var fs = require('fs');
var progress = require('request-progress');

export default Ember.Service.extend({

  download: function(url, on_progress, destination_path) {

    return new Ember.RSVP.Promise(function(resolve, reject) {

      progress(request(url), {
        throttle: 10,
        delay: 10
      })
      .on('progress', function (state) {
        if (on_progress) {
          on_progress(state);
        }
      })
      .on('error', function (err) {
        reject(err);
      })
      .pipe(fs.createWriteStream(destination_path))
      .on('error', function (err) {
        reject(err);
      })
      .on('close', function (status) {
        resolve({status: status});
      });

    });
  }
});
