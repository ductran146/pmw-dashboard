/* PMW shared components loader
   Dùng cho static HTML trên GitHub Pages / Live Server.
   Không chạy ổn nếu mở file bằng file:// vì trình duyệt thường chặn fetch/XHR local.
*/
(function () {

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }


  function setTextIfFound(root, selectors, text) {
    if (!text) return;
    for (var i = 0; i < selectors.length; i += 1) {
      var node = root.querySelector(selectors[i]);
      if (node) { node.textContent = text; return; }
    }
  }

  function setHrefIfFound(root, selectors, href) {
    if (!href) return;
    for (var i = 0; i < selectors.length; i += 1) {
      var node = root.querySelector(selectors[i]);
      if (node) { node.setAttribute('href', href); return; }
    }
  }

  function applyBusinessReportHeadAttributes(hostEl, html) {
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    var head = wrap.firstElementChild;
    if (!head) return html;

    var hasRoot = hostEl.getAttribute('data-show-root') === 'true' || hostEl.hasAttribute('data-root') || hostEl.hasAttribute('data-root-url');
    var rootText = hostEl.getAttribute('data-root') || hostEl.getAttribute('data-root-title') || 'Quản lý điều hành';
    var rootUrl = hostEl.getAttribute('data-root-url') || 'quanly-dieuhanh.html';
    var parentText = hostEl.getAttribute('data-parent') || hostEl.getAttribute('data-section') || 'Báo cáo số liệu nội bộ';
    var parentUrl = hostEl.getAttribute('data-parent-url') || 'bc-so-lieu-kd.html';
    var currentText = hostEl.getAttribute('data-current') || hostEl.getAttribute('data-title') || '';
    var title = hostEl.getAttribute('data-title') || '';
    var subtitle = hostEl.getAttribute('data-subtitle') || '';

    var breadcrumb = head.querySelector('.sm-breadcrumb');
    if (breadcrumb && hasRoot && !breadcrumb.querySelector('.br-breadcrumb-root')) {
      var rootLink = document.createElement('a');
      rootLink.className = 'sm-bc-item br-breadcrumb-root';
      rootLink.href = rootUrl;
      rootLink.textContent = rootText;

      var sep = document.createElement('span');
      sep.className = 'sm-bc-sep br-breadcrumb-root-sep';
      sep.textContent = '›';

      breadcrumb.insertBefore(sep, breadcrumb.firstChild);
      breadcrumb.insertBefore(rootLink, sep);
    }

    if (hasRoot) {
      setTextIfFound(head, ['.br-breadcrumb-root'], rootText);
      setHrefIfFound(head, ['.br-breadcrumb-root'], rootUrl);
    } else {
      var oldRoot = head.querySelector('.br-breadcrumb-root');
      if (oldRoot) {
        var oldSep = oldRoot.nextElementSibling;
        oldRoot.remove();
        if (oldSep && oldSep.classList.contains('sm-bc-sep')) oldSep.remove();
      }
    }

    setTextIfFound(head, ['.br-breadcrumb-parent', '.sm-breadcrumb a.sm-bc-item:nth-of-type(1)'], parentText);
    setHrefIfFound(head, ['.br-breadcrumb-parent', '.sm-breadcrumb a.sm-bc-item:nth-of-type(1)'], parentUrl);
    if (currentText) setTextIfFound(head, ['.br-breadcrumb-current', '.sm-bc-item.active', '.sm-bc-item.current'], currentText);
    if (title) setTextIfFound(head, ['.br-page-title', '.sm-content-title'], title);
    if (subtitle) setTextIfFound(head, ['.br-page-subtitle', '.sm-content-subtitle'], subtitle);

    if (hostEl.getAttribute('data-hide-filter') === 'true') {
      var filter = head.querySelector('.sm-filter-row, .br-filter, .business-report-filter');
      if (filter) filter.remove();
    }

    return head.outerHTML;
  }


  function applyEmptyStateAttributes(hostEl, html) {
    var wrap = document.createElement('div');
    wrap.innerHTML = html;

    var titleNode = wrap.querySelector('#pmw-empty-state-title, .pmw-empty-state-title');
    var descNode = wrap.querySelector('#pmw-empty-state-desc, .pmw-empty-state-desc');

    var pageName = hostEl.getAttribute('data-page-name') || hostEl.getAttribute('data-title') || '';
    var description = hostEl.getAttribute('data-description') || 'Thông tin đang được cập nhật. Vui lòng quay lại sau';

    if (!pageName) {
      var existingTitle = document.querySelector('.br-page-title, .sm-content-title, h1');
      if (existingTitle) pageName = existingTitle.textContent.trim();
    }

    if (!pageName && document.title) {
      pageName = document.title.replace(/^PMW\s*[—-]\s*/i, '').trim();
    }

    if (titleNode) {
      titleNode.textContent = pageName ? (pageName + ' đang được xây dựng') : 'Không có thông tin';
    }

    if (descNode) {
      descNode.textContent = description;
    }

    return wrap.innerHTML;
  }

  function renderPageToolbar(el) {
    var parent = el.getAttribute('data-parent') || '';
    var parentUrl = el.getAttribute('data-parent-url') || '#';
    var title = el.getAttribute('data-title') || '';
    var subtitle = el.getAttribute('data-subtitle') || '';
    var filterType = el.getAttribute('data-filter') || '';
    var selectedMonth = String(el.getAttribute('data-month') || (new Date().getMonth() + 1));
    var selectedYear = String(el.getAttribute('data-year') || new Date().getFullYear());
    var years = (el.getAttribute('data-years') || selectedYear).split(',').map(function (item) { return item.trim(); }).filter(Boolean);

    var monthOptions = '';
    for (var i = 1; i <= 12; i += 1) {
      var value = String(i);
      var label = value.padStart(2, '0');
      monthOptions += '<option value="' + value + '"' + (value === selectedMonth ? ' selected' : '') + '>' + label + '</option>';
    }

    if (years.indexOf(selectedYear) === -1) years.unshift(selectedYear);
    var yearOptions = years.map(function (year) {
      return '<option value="' + escapeHtml(year) + '"' + (year === selectedYear ? ' selected' : '') + '>' + escapeHtml(year) + '</option>';
    }).join('');

    var filterHtml = '';
    if (filterType === 'month-year') {
      filterHtml = '' +
        '<div class="qlsx-filter-row">' +
          '<div class="qlsx-filter-group">' +
            '<label class="qlsx-filter-label" for="selectMonth">Tháng</label>' +
            '<select class="qlsx-select" id="selectMonth">' + monthOptions + '</select>' +
          '</div>' +
          '<div class="qlsx-filter-group">' +
            '<label class="qlsx-filter-label" for="selectYear">Năm</label>' +
            '<select class="qlsx-select" id="selectYear">' + yearOptions + '</select>' +
          '</div>' +
          '<button class="qlsx-filter-btn" id="btnView" type="button">Xem</button>' +
        '</div>';
    }

    el.outerHTML = '' +
      '<div class="sm-page-toolbar">' +
        '<div class="sm-breadcrumb">' +
          '<a class="sm-bc-item" href="' + escapeHtml(parentUrl) + '">' + escapeHtml(parent) + '</a>' +
          '<span class="sm-bc-sep">›</span>' +
          '<span class="sm-bc-item active">' + escapeHtml(title) + '</span>' +
        '</div>' +
        '<div class="qlsx-header">' +
          '<div class="qlsx-title-wrap">' +
            '<h1 class="qlsx-title">' + escapeHtml(title) + '</h1>' +
            (subtitle ? '<p class="qlsx-subtitle">' + escapeHtml(subtitle) + '</p>' : '') +
          '</div>' +
          filterHtml +
        '</div>' +
      '</div>';
  }
  function loadComponent(el) {
    var name = el.getAttribute('data-component');
    if (!name) return;
    if (name === 'page-toolbar') {
      renderPageToolbar(el);
      return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'components/' + name + '.html', false); // sync để script cũ chạy sau khi component đã có DOM
    try {
      xhr.send(null);
      if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText)) {
        if (name === 'business-report-page-head') {
          el.outerHTML = applyBusinessReportHeadAttributes(el, xhr.responseText);
        } else if (name === 'empty-state') {
          el.outerHTML = applyEmptyStateAttributes(el, xhr.responseText);
        } else {
          el.outerHTML = xhr.responseText;
        }
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

    // Các trang tab của cùng module kinh doanh dùng nhiều file HTML
    // nhưng cùng một menu cha trong sidebar QLSX.
    if (current.indexOf('qlsx-tong-hop-so-lieu-kinh-doanh') === 0) {
      document.querySelectorAll('.sm-sidebar a[href="qlsx-tong-hop-so-lieu-kinh-doanh.html"]').forEach(function (link) {
        link.classList.add('active');
      });
    }
  }

  function normalizeSubnavActiveState() {
    document.querySelectorAll('.sm-sidebar .sm-subnav .sm-subnav-item').forEach(function (item) {
      if (item.classList.contains('active')) {
        item.classList.add('pmw-subnav-active');
        item.style.setProperty('background', 'transparent', 'important');
        item.style.setProperty('background-color', 'transparent', 'important');
        item.style.setProperty('background-image', 'none', 'important');
        item.style.setProperty('box-shadow', 'none', 'important');
        item.style.setProperty('outline', 'none', 'important');
        item.style.setProperty('color', '#FFFFFF', 'important');
        item.style.setProperty('font-weight', '700', 'important');
        var label = item.querySelector('span');
        if (label) {
          label.style.setProperty('color', '#FFFFFF', 'important');
          label.style.setProperty('font-weight', '700', 'important');
        }
      } else {
        item.classList.remove('pmw-subnav-active');
        item.style.removeProperty('background');
        item.style.removeProperty('background-color');
        item.style.removeProperty('background-image');
        item.style.removeProperty('box-shadow');
        item.style.removeProperty('outline');
        item.style.removeProperty('color');
        item.style.removeProperty('font-weight');
        var inactiveLabel = item.querySelector('span');
        if (inactiveLabel) {
          inactiveLabel.style.removeProperty('color');
          inactiveLabel.style.removeProperty('font-weight');
        }
      }
    });
  }


  function initMobileSidebar() {
    var sidebar = document.querySelector('.sm-sidebar');
    var toggle = document.querySelector('.pmw-menu-toggle');
    if (!sidebar) {
      if (toggle) toggle.style.display = 'none';
      document.body.classList.remove('pmw-has-sidebar');
      return;
    }

    document.body.classList.add('pmw-has-sidebar');

    var backdrop = document.querySelector('.pmw-sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'pmw-sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    function setOpen(isOpen) {
      document.body.classList.toggle('pmw-sidebar-open', isOpen);
      if (toggle) toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        setOpen(!document.body.classList.contains('pmw-sidebar-open'));
      });
    }
    backdrop.addEventListener('click', function () { setOpen(false); });
    sidebar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function initPageClass() {
    var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase().replace(/\.html$/, '');
    document.body.classList.add('pmw-page-' + current.replace(/[^a-z0-9_-]/g, '-'));
  }

  function initComponents() {
    initPageClass();
    document.querySelectorAll('[data-component]').forEach(loadComponent);
    initActiveMenu();
    normalizeSubnavActiveState();
    initMobileSidebar();
    document.dispatchEvent(new CustomEvent('pmw:components-loaded'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents, { once: true });
  } else {
    initComponents();
  }
})();
