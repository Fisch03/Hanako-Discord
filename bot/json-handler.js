'use strict';
var request = require('request');

const main = require('../index.js');
const embeds = require('./embeds.js');

const { fetchSubreddit, fetchRandomSubredditName } = require('fetch-subreddit');

module.exports.RedditJSON = function(obj, len){
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

module.exports.getCatgirl = function(channel) {
  request('https://nekos.life/api/neko', function (error, response, body) {
    var msgstring = body.split('"');
    var msg = "";
    if (error)
      console.error(error);
    if (response.statusCode != 200)
      console.error(response.statusCode);
    msg = msgstring[3];
    msg = embeds.CatgirlEmbed(msg);
    main.sendMsg(msg, channel);
  });
}

module.exports.getAnimeWallpaper = function(num, list) {
  var strlist = JSON.stringify(list, null, 2);
  var arr = strlist.split('"full": "');
  arr = arr[num].split('" },');
  return arr[0];
}