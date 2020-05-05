"use strict";
var request = require("request");

const main = require("../index.js");
const embeds = require("./embeds.js");

module.exports.RedditJSON = function(obj, len = 5) {
  obj.urls.length = len;
  var msg = embeds.RedditEmbed(obj.subreddit, obj.urls);
  return msg;
};

module.exports.getCatgirl = function(channel, callback) {
  request("https://nekos.life/api/neko", function(error, response, body) {
    var json = JSON.parse(body);
    var msg = "";
    if (error) console.error(error);
    if (response.statusCode != 200) console.error(response.statusCode);
    msg = json.neko;
    msg = embeds.CatgirlEmbed(msg);
    callback(msg, channel);
  });
};

module.exports.getLewdCatgirl = function(channel, callback) {
  request("https://nekos.life/api/lewd/neko", function(error, response, body) {
    var json = JSON.parse(body);
    var msg = "";
    if (error) console.error(error);
    if (response.statusCode != 200) console.error(response.statusCode);
    msg = json.neko;
    msg = embeds.CatgirlEmbed(msg);
    callback(msg, channel);
  });
};

module.exports.getCat = function(channel, callback) {
  request("http://aws.random.cat/meow", function(error, response, body) {
    var json = JSON.parse(body);
    var msg = "";
    if (error) console.error(error);
    if (response.statusCode != 200) console.error(response.statusCode);
    msg = json.file;
    msg = msg.replace(/\\/g, "");
    callback(msg, channel);
  });
};

module.exports.getQuote = function(channel, callback) {
  request("https://inspirobot.me/api?generate=true", function(error, repsonse, body) {
    var quoteImageURL = body;
    var msg = embeds.QuoteEmbed(quoteImageURL);
    callback(msg, channel);
  });
};

module.exports.getGitHubRepos = function(channel, callback, username) {
  var cRequest = request.defaults({
    headers: {
      "User-Agent":
        "Mozilla/5.0 (FurryOS 1.0; Furry64; x64) AppleWebKit/537.36 (KHTML, like Gecko) SralBrowser/3.0.1.3 Safari/537.36"
    }
  });
  cRequest("https://api.github.com/users/" + username + "/repos", function(
    error,
    response,
    body
  ) {
    var json = JSON.parse(body);
    var msg = "";
    var avatarurl = json[0].owner.avatar_url;
    if (error) console.error(error);
    if (response.statusCode != 200) console.error(response.statusCode);
    msg = "";
    for (var i = 0; i < json.length; i++) {
      msg = msg + json[i].full_name + "\n";
    }
    msg = embeds.RepoEmbed(username, msg, avatarurl);
    callback(msg, channel);
  });
};
