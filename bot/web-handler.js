const axios = require("axios").default;

module.exports.getRequest = function (url) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url,
      headers: {"User-Agent": "Hanako-Discord"}
    })
      .then(function(response) {
        if (response.status != 200) reject(new Error(response.statusCode));
        resolve(response.data)
      })
      .catch((error) => {
        reject(new Error(error))
      })
  })
}