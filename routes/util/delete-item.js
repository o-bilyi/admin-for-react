const fs = require('fs');

/**
 * @param url1
 * @param url2
 * @return {Promise<[] | void>}
 */
function deleteImages(url1, url2) {
  return Promise.all([
    new Promise(res => {
      fs.unlink(`./public_admin/uploads-image/${url1}`, err => {
        if (err) return res(false);
        res(true);
      });
    }),
    new Promise(res => {
      fs.unlink(`./public_admin/uploads-image/${url2}`, err => {
        if (err) return res(false);
        res(true);
      });
    }),
  ]).then(res => {
    return res;
  }).catch(console.error);
}

module.exports = deleteImages;
