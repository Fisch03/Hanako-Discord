module.exports.Matrix = function(channel) {
  this.channel = channel;
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
    var content = "";
    for (var row in this.pixels) {
      for (var pixel in this.pixels[row]) {
        if (this.pixels[row][pixel] == 0) {
          content += ":white_large_square:";
        } else if (this.pixels[row][pixel] == 1) {
          content += ":black_large_square:";
        } else if (this.pixels[row][pixel] == 2) {
          content += ":red_circle:";
        } else {
          content += ":cat:";
        }
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
