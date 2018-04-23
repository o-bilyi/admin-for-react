const formidable = require('formidable');
const fs         = require('fs');

/**
 * uploadFile
 * @param req
 * @returns {Promise<object>}
 */
function uploadFile(req) {
  return new Promise((resolve, rej) => {
    let fieldForm = {};

    const form = new formidable.IncomingForm();

    form.uploadDir = './public/uploads-image';

    form
    .on('error', function(err) {
      console.warn(err);
      rej(err);
    })

    .on('file', function(field, file) {
      const filename = new Date().getTime() + "-" + file.name;
      fieldForm.image = filename;
      fs.renameSync(file.path, form.uploadDir + '/' + filename);
    })

    .on('field', function(field, value) {
      fieldForm[field] = value;
    })

    .on('end', function() {
      resolve(fieldForm);
      console.log('-> upload done');
    })

    .parse(req);
  })
}

module.exports = uploadFile;
