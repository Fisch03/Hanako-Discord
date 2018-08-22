module.exports = {
  RedditJSON:function(obj, len) {
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
}