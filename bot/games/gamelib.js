module.exports.Matrix = function(channel, skin) {
  this.channel = channel;
  this.skin = skin;

  this.msg;
  this.pixels = [];

  this.init = function(callback) {
    channel.send(":white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:\n:white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:\n:white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:\n:white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:\n:white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:")
      .then((msg)=>{
        this.msg = msg;
        callback();
      })
      .catch((err) => console.error(err));
    this.pixels = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  }

  this.update = function() {
    let content = "";
    for (row in this.pixels) {
      for (pixel in this.pixels[row]) {
        content += skin[this.pixels[row][pixel]];
      }
      content += "\n";
    }
    this.msg.edit(content)
      .catch(console.error);
  }

  this.setPixel = function(x, y, n) {
    this.pixels[y][x] = n;
  }

  this.fill = function(pxl) {
    this.pixels = [
      [pxl, pxl, pxl, pxl, pxl],
      [pxl, pxl, pxl, pxl, pxl],
      [pxl, pxl, pxl, pxl, pxl],
      [pxl, pxl, pxl, pxl, pxl],
      [pxl, pxl, pxl, pxl, pxl]
    ];
  }
}
