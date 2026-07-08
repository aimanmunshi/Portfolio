(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Loader                                                              */
  /* ------------------------------------------------------------------ */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    if (loader) {
      setTimeout(function () {
        loader.classList.add('hidden');
      }, 400);
    }
  });

  /* ------------------------------------------------------------------ */
  /* Starfield canvas background                                        */
  /* ------------------------------------------------------------------ */
  var canvas = document.getElementById('starfield');
  var ctx = canvas.getContext('2d');
  var stars = [];
  var shootingStars = [];
  var width, height, dpr;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStars();
  }

  function buildStars() {
    var count = Math.floor((width * height) / 8000);
    stars = [];
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.85 ? (Math.random() > 0.5 ? '77,216,255' : '255,95,216') : '255,255,255'
      });
    }
  }

  function maybeSpawnShootingStar() {
    if (Math.random() < 0.006 && shootingStars.length < 2) {
      var startX = Math.random() * width * 0.6 + width * 0.2;
      shootingStars.push({
        x: startX,
        y: -10,
        len: Math.random() * 140 + 80,
        speed: Math.random() * 9 + 8,
        angle: Math.PI / 3.4,
        life: 1
      });
    }
  }

  var t = 0;
  function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#05050f';
    ctx.fillRect(0, 0, width, height);

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var alpha = reduceMotion ? s.baseAlpha : s.baseAlpha + Math.sin(t * s.twinkleSpeed + s.twinklePhase) * 0.3;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(' + s.hue + ',' + Math.max(0, Math.min(1, alpha)) + ')';
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!reduceMotion) {
      maybeSpawnShootingStar();
      for (var j = shootingStars.length - 1; j >= 0; j--) {
        var sh = shootingStars[j];
        var dx = Math.cos(sh.angle) * sh.speed;
        var dy = Math.sin(sh.angle) * sh.speed;
        sh.x += dx;
        sh.y += dy;
        sh.life -= 0.012;

        var grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - dx * (sh.len / sh.speed), sh.y - dy * (sh.len / sh.speed));
        grad.addColorStop(0, 'rgba(255,255,255,' + sh.life + ')');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - dx * (sh.len / sh.speed), sh.y - dy * (sh.len / sh.speed));
        ctx.stroke();

        if (sh.life <= 0 || sh.y > height + 50) {
          shootingStars.splice(j, 1);
        }
      }
    }

    t++;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();

  /* ------------------------------------------------------------------ */
  /* Cursor glow (desktop only)                                          */
  /* ------------------------------------------------------------------ */
  var cursorGlow = document.querySelector('.cursor-glow');
  var isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (cursorGlow && !isTouch) {
    window.addEventListener('mousemove', function (e) {
      cursorGlow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    });
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  /* ------------------------------------------------------------------ */
  /* Navbar: scroll state, mobile toggle, active link, smooth scroll     */
  /* ------------------------------------------------------------------ */
  var navbar = document.querySelector('.navbar');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var navLinkItems = document.querySelectorAll('.nav-links a');
  var backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 40);
    if (backToTop) backToTop.classList.toggle('show', y > 600);
  }, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinkItems.forEach(function (a) {
      a.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var sections = document.querySelectorAll('section[id]');
  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinkItems.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { navObserver.observe(s); });

  /* ------------------------------------------------------------------ */
  /* Scroll reveal                                                       */
  /* ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ------------------------------------------------------------------ */
  /* Rotating role text                                                  */
  /* ------------------------------------------------------------------ */
  var roleEl = document.querySelector('.role-cycle');
  if (roleEl) {
    var roleSpans = roleEl.querySelectorAll('span');
    var activeIndex = 0;
    roleSpans[0].classList.add('active');
    setInterval(function () {
      var current = roleSpans[activeIndex];
      var nextIndex = (activeIndex + 1) % roleSpans.length;
      var next = roleSpans[nextIndex];
      current.classList.remove('active');
      current.classList.add('exit');
      next.classList.add('active');
      setTimeout(function () {
        current.classList.remove('exit');
      }, 600);
      activeIndex = nextIndex;
    }, 2600);
  }

  /* ------------------------------------------------------------------ */
  /* Hero parallax on mouse move                                         */
  /* ------------------------------------------------------------------ */
  var heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && !isTouch) {
    document.querySelector('.hero').addEventListener('mousemove', function (e) {
      var rect = heroVisual.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = (e.clientX - cx) / rect.width;
      var dy = (e.clientY - cy) / rect.height;
      heroVisual.style.transform = 'translate(' + dx * 14 + 'px,' + dy * 14 + 'px)';
    });
    document.querySelector('.hero').addEventListener('mouseleave', function () {
      heroVisual.style.transform = 'translate(0,0)';
    });
  }

  /* ------------------------------------------------------------------ */
  /* Card tilt on hover                                                  */
  /* ------------------------------------------------------------------ */
  if (!isTouch) {
    document.querySelectorAll('.tilt-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(700px) rotateX(' + (y * -8) + 'deg) rotateY(' + (x * 8) + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }
})();
