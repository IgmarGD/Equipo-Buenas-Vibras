/* ================================================================
   GALERÍA "MOMENTOS" · Equipo Buena Vibra / Lapta Ecosol

   DOS MODOS:
   - Públicos: edita videos-publicos.js para que los vea cualquiera.
   - Del navegador: formulario para previsualizar y organizar tus videos
     aquí. Los archivos se guardan en IndexedDB del navegador actual;
     no se publican ni se envían a un servidor.
   ================================================================ */
(() => {
  'use strict';
  const gallery = document.querySelector('#momentosGaleria');
  if (!gallery) return;

  const empty = document.querySelector('#momentosVacio');
  const count = document.querySelector('#momentosConteo');
  const status = document.querySelector('#momentosEstado');
  const fileForm = document.querySelector('#formMomentoArchivo');
  const linkForm = document.querySelector('#formMomentoEnlace');
  const fileInput = document.querySelector('#momentoArchivos');
  const titleInput = document.querySelector('#momentoTitulo');
  const urlInput = document.querySelector('#momentoUrl');
  const DB_NAME = 'buena-vibra-momentos';
  const DB_STORE = 'videos';
  const LINKS_KEY = 'buena-vibra-links-v1';
  const MAX_BYTES = 250 * 1024 * 1024; // Por video, con límites adicionales según navegador.
  const memoryFiles = new Map();
  const objectUrls = [];
  let cachedLinks = [];
  let db = null;
  let storageAvailable = false;

  function notify(message, isError = false) {
    status.textContent = message;
    status.classList.toggle('is-error', isError);
  }

  function openDB() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) { reject(new Error('IndexedDB no disponible')); return; }
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(DB_STORE)) database.createObjectStore(DB_STORE, { keyPath: 'id' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error('Cierra otras pestañas que estén usando la galería'));
    });
  }

  function dbAction(type, value = null) {
    return new Promise((resolve, reject) => {
      if (!db) { reject(new Error('No se pudo usar el almacenamiento local')); return; }
      const tx = db.transaction(DB_STORE, type === 'list' ? 'readonly' : 'readwrite');
      const store = tx.objectStore(DB_STORE);
      const request = type === 'list' ? store.getAll() : type === 'delete' ? store.delete(value) : store.put(value);
      let result;
      request.onsuccess = () => { result = request.result; };
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error('Operación cancelada'));
    });
  }

  function uniqueId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return String(Date.now()) + '-' + Math.random().toString(36).slice(2);
  }

  function readLinks() {
    try {
      const data = JSON.parse(localStorage.getItem(LINKS_KEY) || '[]');
      return Array.isArray(data) ? data.filter(x => x && typeof x.url === 'string' && typeof x.title === 'string') : [];
    } catch (_error) { return cachedLinks; }
  }

  function saveLinks(links) {
    cachedLinks = links;
    try { localStorage.setItem(LINKS_KEY, JSON.stringify(links)); return true; }
    catch (_error) { return false; }
  }

  function classifyUrl(raw, allowRelative = false) {
    if (allowRelative && /^(assets\/videos\/)[a-zA-Z0-9._\-/ %]+\.(mp4|webm|ogv|ogg)(\?.*)?$/i.test(raw)) return { kind: 'file', url: raw };
    let parsed;
    try { parsed = new URL(raw); } catch (_error) { return null; }
    if (parsed.protocol !== 'https:') return null;
    const host = parsed.hostname.replace(/^(www\.|m\.)/, '').toLowerCase();
    let youtubeId = null;
    if (host === 'youtu.be') youtubeId = parsed.pathname.split('/')[1];
    else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.pathname === '/watch') youtubeId = parsed.searchParams.get('v');
      else if (/^\/(shorts|embed|live)\//.test(parsed.pathname)) youtubeId = parsed.pathname.split('/')[2];
    }
    if (youtubeId && /^[\w-]{11}$/.test(youtubeId)) {
      return { kind: 'youtube', url: 'https://www.youtube-nocookie.com/embed/' + youtubeId };
    }
    if (/\.(mp4|webm|ogv|ogg)$/i.test(parsed.pathname)) return { kind: 'file', url: parsed.href };
    return null;
  }

  function makeVideoCard(data) {
    const card = document.createElement('article');
    card.className = 'moment-card';
    const player = document.createElement('div');
    player.className = 'moment-player';

    const isLocalFile = data.source === 'archivo-local';
    const target = isLocalFile
      ? { kind: 'file', url: URL.createObjectURL(data.blob) }
      : classifyUrl(data.url, data.source === 'publico');
    if (isLocalFile) objectUrls.push(target.url);
    if (!target) return null;

    if (target.kind === 'youtube') {
      const iframe = document.createElement('iframe');
      iframe.src = target.url;
      iframe.loading = 'lazy';
      iframe.title = 'Video: ' + data.title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      player.appendChild(iframe);
    } else {
      const video = document.createElement('video');
      video.src = target.url;
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', 'Video: ' + data.title);
      player.appendChild(video);
    }

    const meta = document.createElement('div');
    meta.className = 'moment-meta';
    const label = document.createElement('span');
    label.className = 'moment-label';
    label.textContent = data.source === 'publico' ? 'VIDEO PUBLICADO' : 'GUARDADO EN ESTE NAVEGADOR';
    const title = document.createElement('h3');
    title.textContent = data.title;
    meta.append(label, title);
    if (data.description) {
      const description = document.createElement('p');
      description.textContent = data.description;
      meta.appendChild(description);
    }
    if (data.source !== 'publico') {
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'moment-remove';
      deleteButton.textContent = 'Quitar este video';
      deleteButton.setAttribute('aria-label', 'Quitar ' + data.title);
      deleteButton.addEventListener('click', async () => {
        if (!confirm('¿Quitar este video de este navegador?')) return;
        if (data.source === 'archivo-local') {
          if (db) {
            try { await dbAction('delete', data.id); }
            catch (_error) { notify('No se pudo quitar el archivo guardado.', true); return; }
          } else memoryFiles.delete(data.id);
        } else {
          saveLinks(readLinks().filter(item => item.id !== data.id));
        }
        await renderGallery();
        notify('Video quitado de este navegador.');
      });
      meta.appendChild(deleteButton);
    }
    card.append(player, meta);
    return card;
  }

  async function renderGallery() {
    objectUrls.forEach(url => URL.revokeObjectURL(url));
    objectUrls.length = 0;
    gallery.replaceChildren();
    let localFiles = [];
    if (db) {
      try { localFiles = await dbAction('list'); }
      catch (_error) { notify('No se pudieron leer algunos videos guardados.', true); }
    } else localFiles = Array.from(memoryFiles.values());
    const publicVideos = Array.isArray(window.VIDEOS_PUBLICOS)
      ? window.VIDEOS_PUBLICOS.filter(item => item && typeof item.titulo === 'string' && (item.archivo || item.url)).map((item, i) => ({
          id: 'publico-' + i, source: 'publico', title: item.titulo,
          url: item.archivo || item.url, description: item.descripcion || ''
        })) : [];
    const links = readLinks().map(item => ({ ...item, source: 'enlace-local' }));
    const files = localFiles.map(item => ({ ...item, source: 'archivo-local' }));
    const all = [...publicVideos, ...links, ...files];
    let shown = 0;
    for (const item of all) {
      const card = makeVideoCard(item);
      if (card) { gallery.appendChild(card); shown++; }
    }
    empty.hidden = shown !== 0;
    count.textContent = shown === 0 ? 'Aún no hay videos publicados' : shown === 1 ? '1 video disponible' : shown + ' videos disponibles';
  }

  fileForm.addEventListener('submit', async event => {
    event.preventDefault();
    const chosen = Array.from(fileInput.files || []);
    if (!chosen.length) { notify('Selecciona al menos un video.', true); return; }
    let saved = 0;
    let errors = 0;
    for (const file of chosen) {
      if (!file.type.startsWith('video/') && !/\.(mp4|webm|mov|ogv|ogg|m4v)$/i.test(file.name)) { errors++; continue; }
      if (file.size > MAX_BYTES) { errors++; continue; }
      const record = {
        id: uniqueId(), title: file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ').slice(0, 90),
        description: '', blob: file, createdAt: Date.now()
      };
      if (db) {
        try { await dbAction('put', record); saved++; }
        catch (_error) { errors++; }
      } else { memoryFiles.set(record.id, record); saved++; }
    }
    fileForm.reset();
    await renderGallery();
    const persistence = storageAvailable ? 'Se guardaron en este navegador.' : 'Solo estarán disponibles mientras mantengas abierta esta página.';
    notify(saved + ' video(s) añadidos. ' + persistence + (errors ? ' ' + errors + ' no se pudieron guardar (formato, tamaño o espacio disponible).' : ''), saved === 0);
  });

  linkForm.addEventListener('submit', async event => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const input = urlInput.value.trim();
    if (!title || !classifyUrl(input)) {
      notify('Escribe un título y un enlace HTTPS válido de YouTube o de un video MP4/WebM.', true);
      return;
    }
    const links = readLinks();
    links.push({ id: uniqueId(), title: title.slice(0,90), url: input, description: '' });
    const persisted = saveLinks(links);
    linkForm.reset();
    await renderGallery();
    notify(persisted ? 'Enlace añadido en este navegador. Para publicarlo a todos, agrégalo también a videos-publicos.js.' : 'Enlace añadido temporalmente. Tu navegador no permitió guardarlo de forma permanente.');
  });

  async function start() {
    try { db = await openDB(); storageAvailable = true; }
    catch (_error) { notify('Tu navegador no permite guardar archivos de video de forma permanente. Puedes previsualizarlos durante esta sesión.', true); }
    await renderGallery();
  }
  start();
})();

// Si llegan por el botón «Añadir momentos», abrir el formulario automáticamente.
document.querySelectorAll('a[href="#agregar-momentos"]').forEach(link => {
  link.addEventListener('click', () => { document.querySelector('#agregar-momentos').open = true; });
});
