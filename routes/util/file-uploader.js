const formidable = require("formidable");
const fs         = require("fs");

/**
 * uploadFile
 * @param req
 * @returns {Promise<object>}
 */
function uploadFile(req) {
  return new Promise((resolve, rej) => {
    let fieldForm = {
      id : new Date().getTime() + ""
    };

    const form = new formidable.IncomingForm();

    form.uploadDir = "./public_admin/uploads-image";
    form.keepExtensions  = true;

    form
    .on("error", function(err) {
      console.warn(err);
      rej(err);
    })

    .on("file", function (field, file) {
        if (fs.existsSync(file.path)) {
            fieldForm[field] = fieldForm.id + "-" + file.name;
        }
    })
    .on('fileBegin', function (name, file) {
      const [fileName, fileExt] = file.name.split('.');
      file.path = form.uploadDir + "/" + fieldForm.id + "-" + fileName + "." + fileExt;
    })

    .on("field", function(field, value) {
      fieldForm[field] = value;
    })

    .on("end", function() {
      resolve(fieldForm);
      console.log("-> upload done");
    })
    .on('aborted', function() {
      console.warn("aborted")
    })

    .parse(req);
  })
}

module.exports = uploadFile;
