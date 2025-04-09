const multer = require('multer');

const storage = multer.memoryStorage(); // guardamos en RAM antes de subir a Dropbox
const upload = multer({ storage });

module.exports = upload;
