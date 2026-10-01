// とよサポ サイト共通スクリプト（2026-10 リニューアル）
document.addEventListener('DOMContentLoaded', function () {
  // スマホのメニュー開閉
  var nav = document.getElementById('nav');
  var menuBtn = document.getElementById('menuBtn');
  if (nav && menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // スクロールに合わせてふわっと表示する
  var targets = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    targets.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.06 + 's';
      io.observe(el);
    });
  } else {
    targets.forEach(function (el) { el.classList.add('on'); });
  }
});

// お知らせ欄：js/news.json の項目を、HTMLに書いてある固定のお知らせの上に追加する
// news.json の形式: [{ "date": "2026-10-01", "tag": "お知らせ", "title": "…", "url": "任意" }]
(function () {
  var list = document.getElementById('newsList');
  if (!list) return;
  fetch('js/news.json?v=' + Date.now())
    .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
    .then(function (items) {
      if (!Array.isArray(items) || items.length === 0) return;
      var frag = document.createDocumentFragment();
      items.slice(0, 5).forEach(function (item) {
        var li = document.createElement('li');
        var row = document.createElement(item.url ? 'a' : 'div');
        row.className = 'row';
        if (item.url) row.href = item.url;

        var time = document.createElement('time');
        time.dateTime = item.date;
        time.textContent = String(item.date).replace(/-/g, '.');
        row.appendChild(time);

        var tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = item.tag || 'お知らせ';
        row.appendChild(tag);

        var ttl = document.createElement('span');
        ttl.className = 'ttl';
        ttl.textContent = item.title;
        row.appendChild(ttl);

        var ar = document.createElement('span');
        ar.className = 'ar';
        ar.textContent = item.url ? '→' : '';
        row.appendChild(ar);

        li.appendChild(row);
        frag.appendChild(li);
      });
      list.insertBefore(frag, list.firstChild);
    })
    .catch(function () { /* 読み込めないときは固定のお知らせだけ表示 */ });
})();
