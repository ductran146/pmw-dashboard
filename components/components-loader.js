/* PMW shared components loader
   Dùng cho static HTML trên GitHub Pages / Live Server.
   Không chạy ổn nếu mở file bằng file:// vì trình duyệt thường chặn fetch/XHR local.
*/
(function () {
  function loadComponent(el) {
    var name = el.getAttribute('data-component');
    if (!name) return;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'components/' + name + '.html', false); // sync để script cũ chạy sau khi component đã có DOM
    try {
      xhr.send(null);
      if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText)) {
        el.outerHTML = xhr.responseText;
      } else {
        console.error('Không tải được component:', name, xhr.status);
      }
    } catch (err) {
      console.error('Không tải được component:', name, err);
    }
  }

  function initActiveMenu() {
    var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var currentHash = location.hash || '';

    document.querySelectorAll('.sm-sidebar a[href]').forEach(function (link) {
      var rawHref = link.getAttribute('href') || '';
      var urlPart = rawHref.split('?')[0];
      var hrefPage = urlPart.split('#')[0].toLowerCase();
      var hrefHash = rawHref.indexOf('#') >= 0 ? '#' + rawHref.split('#')[1].split('?')[0] : '';

      link.classList.remove('active');
      if (!hrefPage || hrefPage === '#') return;
      if (hrefPage !== current) return;

      // Nếu nhiều menu cùng trỏ về một page nhưng khác hash, chỉ active đúng hash.
      // Nếu đang ở page chính không có hash, chỉ item không có hash được active.
      if (hrefHash) {
        if (hrefHash === currentHash) link.classList.add('active');
      } else if (!currentHash) {
        link.classList.add('active');
      }
    });
  }

  function initComponents() {
    document.querySelectorAll('[data-component]').forEach(loadComponent);
    initActiveMenu();
    document.dispatchEvent(new CustomEvent('pmw:components-loaded'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents, { once: true });
  } else {
    initComponents();
  }
})();
