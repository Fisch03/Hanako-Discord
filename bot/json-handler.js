'use strict';
var request = require('request');

const main = require('../index.js');
const embeds = require('./embeds.js');

module.exports.RedditJSON = function(obj, len = 5) {
  obj.urls.length = len;
  var msg = embeds.RedditEmbed(obj.subreddit, obj.urls);
  return msg;
}

module.exports.getCatgirl = function() {
  request('https://nekos.life/api/neko', function (error, response, body) {
	var json = JSON.parse(body);
    var msg = "";
    if (error)
      console.error(error);
    if (response.statusCode != 200)
      console.error(response.statusCode);
    msg = json.neko;
    msg = embeds.CatgirlEmbed(msg);
    return msg;
  });
}

module.exports.getLewdCatgirl = function() {
  request('https://nekos.life/api/lewd/neko', function (error, response, body) {
    var json = JSON.parse(body);
    var msg = "";
    if (error)
      console.error(error);
    if (response.statusCode != 200)
      console.error(response.statusCode);
    msg = json.neko;
    msg = embeds.CatgirlEmbed(msg);
    return msg;
  });
}

module.exports.getCat = function() {
  request('http://aws.random.cat/meow', function (error, response, body) {
    var json = JSON.parse(body);
    var msg = "";
    if (error)
      console.error(error);
    if (response.statusCode != 200)
      console.error(response.statusCode);
    msg = json.file;
    msg = msg.replace(/\\/g, "");
    msg = embeds.CatEmbed(msg);
    return msg;
  });
}
