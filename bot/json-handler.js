'use strict';
var request = require('request');

const main = require('../index.js');
const embeds = require('./embeds.js');

module.exports.RedditJSON = function(obj, len) {
    var cstring;
    var content = "";
    cstring = JSON.stringify(obj, null, 2);
    cstring = cstring.split("[");
    cstring = cstring[2].split("]");
    cstring = cstring[0].split('"');
    for (var i = 1; i <= len; i++) {
      content += cstring[i*2+1];
      content += "\n";
    }
    return content;
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
