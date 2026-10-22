// MEGAOGRODZENIA - menu pełnoekranowe, suwak usług, opinie (układ jak wzorzec Szymona)
(function () {
  var t = document.querySelector('.nav-toggle'), l = document.querySelector('.nav-links');
  if (t && l) {
    var sync = function () { document.body.classList.toggle('menu-open', l.classList.contains('open')); };
    t.addEventListener('click', function () { setTimeout(sync, 0); });
    l.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setTimeout(sync, 0); t.setAttribute('aria-expanded', 'false'); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && l.classList.contains('open')) { l.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); sync(); }
    });
  }
  // suwak usług: strzałki + pasek postępu
  document.querySelectorAll('[data-slider]').forEach(function (box) {
    var s = box.querySelector('.kw-slider'), bar = box.querySelector('.kw-track i');
    if (!s) return;
    var step = function (d) { var c = s.querySelector('.kw-slide'); s.scrollBy({ left: d * (c ? c.getBoundingClientRect().width + 40 : 400), behavior: 'smooth' }); };
    box.querySelectorAll('[data-step]').forEach(function (b) { b.addEventListener('click', function () { step(+b.getAttribute('data-step')); }); });
    var upd = function () {
      if (!bar) return;
      var max = s.scrollWidth - s.clientWidth, vis = s.clientWidth / s.scrollWidth;
      bar.style.width = (vis * 100) + '%';
      bar.style.left = (max > 0 ? (s.scrollLeft / max) * (100 - vis * 100) : 0) + '%';
    };
    s.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
  });
  // opinie: jedna na raz
  document.querySelectorAll('[data-quotes]').forEach(function (box) {
    var q = box.querySelectorAll('.kw-q'), i = 0;
    if (!q.length) return;
    var show = function (n) { q[i].classList.remove('on'); i = (n + q.length) % q.length; q[i].classList.add('on'); };
    box.querySelectorAll('[data-step]').forEach(function (b) { b.addEventListener('click', function () { show(i + +b.getAttribute('data-step')); }); });
  });
})();
// stopklatka: włącz tło tylko w pobliżu sekcji
(function () {
  var s = document.querySelectorAll('.stopklatka');
  if (!s.length) return;
  if (!('IntersectionObserver' in window)) { s.forEach(function (x) { x.classList.add('on'); }); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('on', e.isIntersecting); }); }, { rootMargin: '10% 0px' });
  s.forEach(function (x) { io.observe(x); });
})();
