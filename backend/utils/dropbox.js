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

  // Subir el archivo (sobrescribe si ya existe)
  await dbx.filesUpload({
    path,
    contents: contenido,
    mode: 'overwrite',
  });

  try {
    // Intentar crear un enlace público
    const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({ path });
    return sharedLink.result.url.replace('?dl=0', '?dl=1');
  } catch (error) {
    // Si ya existe un enlace, lo recuperamos
    if (error?.error?.error_summary?.includes('shared_link_already_exists')) {
      const links = await dbx.sharingListSharedLinks({ path });
      if (links.result.links.length > 0) {
        return links.result.links[0].url.replace('?dl=0', '?dl=1');
      }
    }
    throw error;
  }
}

module.exports = { subirArchivo };
