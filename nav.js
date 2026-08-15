/* ==========================================================================
   QUINTA BUGAMBILIA — MENÚ COMPARTIDO
   Antes cada página traía su propio <header> con un subconjunto distinto de
   enlaces (y alguno roto). Ahora todas cargan el mismo menú completo desde
   un solo lugar: más fácil de mantener y siempre consistente.

   Cada página, antes de este script, puede declarar:
     window.QB_PAGE = 'calendario';           // id de la página activa
     window.QB_EXTRA = { label:'Nuevo', icon:'reset', onclick:'clearForm()' };
   ========================================================================== */
(function () {
  var ICONS = {
    calendario: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
    cotizador: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    servicios: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    combo: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    hospedaje: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    evento: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line>',
    ventas: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    rentas: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    sync: '<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10"/><path d="M1 14l4.64 4.36A9 9 0 0020.49 15"/>',
    reset: '<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10"/>'
  };

  var PAGES = [
    { id: 'calendario', href: 'index.html',            label: 'Calendario' },
    { id: 'cotizador',  href: 'cotizador.html',         label: 'Cotizador' },
    { id: 'servicios',  href: 'servicios.html',         label: 'Servicios WA' },
    { id: 'combo',      href: 'eventohospedaje.html',   label: 'Ev. + Hosp.' },
    { id: 'hospedaje',  href: 'contrato_hospedaje.html',label: 'Hosp.' },
    { id: 'evento',     href: 'contrato_evento.html',   label: 'Evento' },
    { id: 'ventas',     href: 'ventas.html',            label: 'Res. Ventas' },
    { id: 'rentas',     href: 'rentas.html',            label: 'Res. Rentas' }
  ];

  function svg(paths, size) {
    size = size || 13;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" width="' + size + '" height="' + size + '">' + paths + '</svg>';
  }

  function buildLink(page, activeId) {
    var isActive = page.id === activeId;
    var tag = isActive ? 'span' : 'a';
    var hrefAttr = isActive ? '' : ' href="' + page.href + '"';
    var ariaCurrent = isActive ? ' aria-current="page"' : '';
    return '<' + tag + hrefAttr + ariaCurrent + ' class="nav-link' + (isActive ? ' active' : '') + '">' +
      svg(ICONS[page.id]) + '<span>' + page.label + '</span></' + tag + '>';
  }

  function render() {
    var mount = document.getElementById('site-header');
    if (!mount) return;

    var activeId = window.QB_PAGE || '';
    var linksHtml = PAGES.map(function (p) { return buildLink(p, activeId); }).join('');

    var extraHtml = '';
    if (window.QB_SYNC) {
      extraHtml += '<button id="sync-btn" type="button" onclick="' + window.QB_SYNC + '">' +
        svg(ICONS.sync) + '<span>Actualizar</span></button>';
    }
    if (window.QB_EXTRA) {
      extraHtml += '<button class="action-btn" type="button" onclick="' + window.QB_EXTRA.onclick + '">' +
        svg(ICONS[window.QB_EXTRA.icon] || ICONS.reset) + '<span>' + window.QB_EXTRA.label + '</span></button>';
    }

    mount.innerHTML =
      '<a href="#main-content" class="skip-link">Saltar al contenido</a>' +
      '<header>' +
        '<a href="index.html" class="logo" style="text-decoration:none;color:inherit;">' +
          '<img src="icon.png" alt="" width="26" height="26">' +
          'Quinta Bugambilia <span>· Real del 14</span>' +
        '</a>' +
        '<nav class="nav-container" aria-label="Navegación principal">' + linksHtml + extraHtml + '</nav>' +
      '</header>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
