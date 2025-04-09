// utils/dropbox.js
const { Dropbox } = require('dropbox');
const fetch = require('isomorphic-fetch');

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch,
});

async function subirArchivo(nombreArchivo, contenido) {
    const path = `/recursos/${nombreArchivo}`;


  await dbx.filesUpload({
    path,
    contents: contenido,
    mode: 'overwrite',
  });

  const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({ path });

  // Convertimos dl=0 (vista previa) a dl=1 (descarga directa)
  return sharedLink.result.url.replace('?dl=0', '?raw=1');
}

module.exports = { subirArchivo };
