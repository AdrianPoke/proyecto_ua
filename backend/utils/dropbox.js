// utils/dropbox.js
const { Dropbox } = require('dropbox');
const fetch = require('isomorphic-fetch');

const dbx = new Dropbox({
  clientId: process.env.DROPBOX_CLIENT_ID,
  clientSecret: process.env.DROPBOX_CLIENT_SECRET,
  refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
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

  return sharedLink.result.url.replace('?dl=0', '?dl=1');
}

module.exports = { subirArchivo };
