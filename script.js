(function () {
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');
  var progress = document.getElementById('progress');
  var filters = document.querySelectorAll('.filter');
  var projects = document.querySelectorAll('.project-card');
  var copyEmail = document.getElementById('copyEmail');
  var copyStatus = document.getElementById('copyStatus');
  var reveals = document.querySelectorAll('.reveal');

  // Only hide content for animation if IntersectionObserver exists
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js-ready');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
    // Safety net: never leave content hidden
    setTimeout(function () { reveals.forEach(function (el) { el.classList.add('visible'); }); }, 2500);
  }

  if (menuToggle) menuToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      var sel = f.dataset.filter;
      filters.forEach(function (i) { i.classList.toggle('active', i === f); });
      projects.forEach(function (p) {
        p.classList.toggle('is-hidden', !(sel === 'all' || p.dataset.category === sel));
      });
    });
  });

  window.addEventListener('scroll', function () {
    var s = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (s > 0 ? (window.scrollY / s) * 100 : 0) + '%';
  }, { passive: true });

  if (copyEmail) copyEmail.addEventListener('click', function () {
    var email = copyEmail.dataset.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        function () { copyStatus.textContent = 'Email copied to clipboard.'; },
        function () { copyStatus.textContent = email; });
    } else { copyStatus.textContent = email; }
  });
})();
