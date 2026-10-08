/* =========================================================================
   CAFS ENGENHARIA MECÂNICA — scripts do site
   ========================================================================= */
(function () {
  "use strict";

  /* ---------------- ÍCONES (SVG inline) ---------------- */
  var ICON = {
    set:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.9 2.9M16.2 16.2l2.9 2.9M19.1 4.9l-2.9 2.9M7.8 16.2l-2.9 2.9"/></svg>',
    arrows:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    spark:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 2L4.5 13H11l-1 9 8.5-11H12l1-9z"/></svg>',
    download:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12M7 11l5 5 5-5M4 20h16"/></svg>',
    wa: '<svg viewBox="0 0 32 32"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8A13 13 0 1 0 16 3zm0 23.6c-2 0-3.9-.6-5.5-1.6l-.4-.2-4 1.1 1.1-3.9-.3-.4A10.6 10.6 0 1 1 16 26.6zm6-8c-.3-.2-2-.9-2.3-1-.3-.1-.5-.2-.8.2-.2.3-.9 1-1.1 1.2-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-2.5-1.6A9.4 9.4 0 0 1 12.5 15c-.2-.3 0-.5.1-.6l.6-.7c.2-.2.2-.4.3-.6v-.6l-1-2.4c-.2-.6-.5-.5-.8-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.4z"/></svg>',
    cube:
      '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><path d="M24 4l18 10v20L24 44 6 34V14L24 4z"/><path d="M6 14l18 10 18-10M24 24v20"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 2L4.5 13H11l-1 9 8.5-11H12l1-9z"/></svg>'
  };

  /* ---------------- WHATSAPP ---------------- */
  var WA_NUM = "554736225207";
  function waLink(msg) {
    return (
      "https://api.whatsapp.com/send?phone=" +
      WA_NUM +
      "&text=" +
      encodeURIComponent(msg || "Olá! Vim pelo site da CAFS e gostaria de um orçamento.")
    );
  }

  /* ---------------- TEMA CLARO / ESCURO ---------------- */
  var TEMA_KEY = "cafs-tema";

  function temaSalvo() {
    try { return localStorage.getItem(TEMA_KEY); } catch (e) { return null; }
  }

  function aplicarTema(t) {
    var raiz = document.documentElement;
    if (t === "light") raiz.setAttribute("data-theme", "light");
    else raiz.removeAttribute("data-theme");

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "light" ? "#ffffff" : "#12151a");

    var btn = document.getElementById("themetog");
    if (btn) {
      btn.setAttribute("aria-pressed", t === "light" ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        t === "light" ? "Ativar tema escuro" : "Ativar tema claro"
      );
    }
  }

  function initTema() {
    // 1) escolha salva; 2) preferência do sistema; 3) escuro
    var salvo = temaSalvo();
    var inicial = salvo ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");
    aplicarTema(inicial);

    var btn = document.getElementById("themetog");
    if (btn) {
      btn.addEventListener("click", function () {
        var novo = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        aplicarTema(novo);
        try { localStorage.setItem(TEMA_KEY, novo); } catch (e) {}
      });
    }
  }

  /* ---------------- NAV / MENU ---------------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    var burger = document.querySelector(".burger");
    var menu = document.querySelector(".menu");

    if (burger && menu) {
      burger.addEventListener("click", function () {
        menu.classList.toggle("is-open");
      });
    }

    if (nav) {
      var onScroll = function () {
        nav.classList.toggle("is-stuck", window.scrollY > 12);
        var top = document.querySelector(".totop");
        if (top) top.classList.toggle("is-on", window.scrollY > 600);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    var top = document.querySelector(".totop");
    if (top) {
      top.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // marca a página atual
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".menu a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href && href.split("/").pop() === here) a.setAttribute("aria-current", "page");
    });

    // preenche links de WhatsApp
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      el.setAttribute("href", waLink(el.getAttribute("data-wa") || ""));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* ---------------- REVEAL ---------------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------------- CARROSSEL ---------------- */
  function initCarousel() {
    var root = document.getElementById("galeria");
    var track = document.getElementById("carTrack");
    var dots = document.getElementById("carDots");
    if (!root || !track) return;

    var slides = track.querySelectorAll(".slide");
    var total = slides.length;
    var i = 0;
    var timer = null;
    var AUTO = 5200;

    if (dots) {
      dots.innerHTML = "";
      for (var k = 0; k < total; k++) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Foto " + (k + 1));
        b.addEventListener("click", (function (idx) {
          return function () { go(idx); restart(); };
        })(k));
        dots.appendChild(b);
      }
    }

    function render() {
      track.style.transform = "translateX(" + -i * 100 + "%)";
      if (dots) {
        Array.prototype.forEach.call(dots.children, function (d, k) {
          d.classList.toggle("is-on", k === i);
        });
      }
      Array.prototype.forEach.call(slides, function (s, k) {
        s.setAttribute("aria-hidden", k === i ? "false" : "true");
      });
    }

    function go(n) { i = (n + total) % total; render(); }
    function next() { go(i + 1); }
    function prev() { go(i - 1); }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, AUTO);
    }

    root.querySelectorAll(".carousel__nav").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var d = parseInt(btn.getAttribute("data-dir"), 10);
        if (d > 0) next(); else prev();
        restart();
      });
    });

    // arrastar / swipe
    var x0 = null;
    root.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
    root.addEventListener("pointerup", function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0;
      if (Math.abs(dx) > 45) { if (dx < 0) next(); else prev(); }
      x0 = null;
      restart();
    });

    root.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
    root.addEventListener("mouseleave", restart);
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { next(); restart(); }
      if (e.key === "ArrowLeft") { prev(); restart(); }
    });
    root.setAttribute("tabindex", "0");

    // pausa quando a aba fica em segundo plano
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { if (timer) clearInterval(timer); }
      else restart();
    });

    render();
    restart();
  }

  /* ---------------- CONTADORES ---------------- */
  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var alvo = parseFloat(el.getAttribute("data-count"));
        var sufixo = el.getAttribute("data-suffix") || "";
        var t0 = null;
        var dur = 1300;
        function tick(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / dur, 1);
          var e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(alvo * e) + sufixo;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------------- ACORDEÃO ---------------- */
  function initAccordion() {
    document.querySelectorAll(".acc__item").forEach(function (item) {
      var q = item.querySelector(".acc__q");
      var a = item.querySelector(".acc__a");
      if (!q || !a) return;
      q.addEventListener("click", function () {
        var open = item.classList.contains("is-open");
        item.parentElement.querySelectorAll(".acc__item").forEach(function (o) {
          o.classList.remove("is-open");
          o.querySelector(".acc__a").style.maxHeight = "";
        });
        if (!open) {
          item.classList.add("is-open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------------- CATÁLOGO (marketplace) ---------------- */
  function slugCat(id) {
    return id === "incendio" ? "Incêndio" : id.charAt(0).toUpperCase() + id.slice(1);
  }

  function mediaHTML(p, cls) {
    var empty = !p.img;
    return (
      '<div class="' + cls + ' media ' + (empty ? "media-empty" : "media-filled") + '">' +
      (empty
        ? '<div class="cat__ph"><div class="cube"></div><b>Desenho 3D</b><small>IMG: ' + p.code + '.jpg</small></div>'
        : '<img src="' + p.img + '" alt="' + p.nome + '" loading="lazy">') +
      "</div>"
    );
  }

  function cardHTML(p, i) {
    var flags = (p.flags || [])
      .map(function (f, k) {
        return '<span class="cat__flag' + (k ? " cat__flag--sf" : "") + '">' + f + "</span>";
      })
      .join("");
    var specs = Object.keys(p.specs || {})
      .map(function (k) {
        return "<dt>" + k + "</dt><dd>" + p.specs[k] + "</dd>";
      })
      .join("");
    var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + t + "</span>"; }).join("");

    return (
      '<article class="cat reveal d' + ((i % 4) + 1) + '" data-cat="' + p.cat + '">' +
      mediaHTML(p, "cat__media") +
      flags +
      '<span class="cat__zoom">AMPLIAR</span>' +
      '<div class="cat__body">' +
      '<span class="cat__code">' + p.code + " // " + slugCat(p.cat).toUpperCase() + "</span>" +
      "<h3>" + p.nome + "</h3>" +
      "<p>" + p.desc + "</p>" +
      '<dl class="cat__specs">' + specs + "</dl>" +
      '<div class="cat__tags" style="display:flex;flex-wrap:wrap;gap:7px">' + tags + "</div>" +
      '<div class="cat__foot">' +
      '<span class="cat__price">Sob consulta<small>orçamento em até 24h</small></span>' +
      '<a class="btn btn--sm" data-wa="Olá! Tenho interesse no produto ' +
      p.nome +
      ' (' +
      p.code +
      '). Pode me enviar a proposta?">Orçamento</a>' +
      "</div></div></article>"
    );
  }

  function galleryOf(p) {
    var list = [];
    if (p.img) list.push(p.img);
    (p.imgs || []).forEach(function (s) { if (list.indexOf(s) === -1) list.push(s); });
    return list;
  }

  function modalHTML(p) {
    var gal = galleryOf(p);
    var main, thumbs;

    if (gal.length) {
      main = '<img src="' + gal[0] + '" alt="' + p.nome + '" loading="eager">';
      thumbs =
        '<div class="modal__thumbs">' +
        gal
          .map(
            function (g, i) {
              return '<button type="button" data-src="' + g + '" class="' + (i ? "" : "is-on") + '"><img src="' + g + '" alt=""></button>';
            }
          )
          .join("") +
        "</div>";
    } else {
      main =
        '<div class="cat__ph modal__ph--vazio">' +
        '<div class="cube"></div>' +
        "<b>Foto do projeto</b>" +
        '<small>IMAGEM A SER INSERIDA<br>assets/img/produtos/' +
        p.code.toLowerCase() +
        ".jpg</small></div>";
      thumbs = "";
    }

    /* abas: foto do projeto | modelo 3D giratório */
    var painelFoto =
      '<div data-painel-foto>' +
      '<div class="modal__media">' + main + "</div>" +
      thumbs +
      "</div>";

    var painel3d =
      '<div data-painel-3d hidden>' +
      (window.CAFS3D ? window.CAFS3D.html(p) : '<div class="m3d__wait"><small>Visor 3D indispon&iacute;vel.</small></div>') +
      "</div>";

    var abas =
      '<div class="mtabs" data-m3d-tabs role="tablist">' +
      '<button type="button" class="mtab is-on" data-aba="foto" role="tab" aria-selected="true">Foto do projeto</button>' +
      '<button type="button" class="mtab" data-aba="3d" role="tab" aria-selected="false">Modelo 3D</button>' +
      "</div>";

    var specs = Object.keys(p.specs || {})
      .map(function (k) { return "<dt>" + k + "</dt><dd>" + p.specs[k] + "</dd>"; })
      .join("");
    var tags = (p.tags || []).map(function (t) { return '<span class="tag tag--gold">' + t + "</span>"; }).join("");
    var arquivo = p.link3d
      ? '<a class="btn btn--gold btn--sm" href="' + p.link3d + '" target="_blank" rel="noopener">' + ICON.download + " Baixar modelo 3D</a>"
      : "";

    return (
      '<button class="modal__close" type="button" aria-label="Fechar">&times;</button>' +
      abas +
      painelFoto +
      painel3d +
      '<div class="modal__body">' +
      '<span class="cat__code">' + p.code + " // " + slugCat(p.cat).toUpperCase() + "</span>" +
      "<h3 class='h2' style='margin:var(--sp-2) 0 var(--sp-3)'>" + p.nome + "</h3>" +
      "<p class='txt'>" + p.desc + "</p>" +
      '<dl class="cat__specs specs-block">' + specs + "</dl>" +
      '<div class="tags-block">' + tags + "</div>" +
      '<div class="modal__dl">' +
      '<a class="btn btn--sm" data-wa="Olá! Tenho interesse no produto ' +
      p.nome +
      " (" +
      p.code +
      '). Pode me enviar a proposta?">Solicitar orçamento</a>' +
      arquivo +
      "</div></div>"
    );
  }

  function initCatalogo() {
    var grid = document.getElementById("grade");
    var filtros = document.getElementById("filtros");
    var modal = document.getElementById("modal");
    var box = document.getElementById("modalBox");
    var contador = document.getElementById("contador");
    if (!grid || typeof PRODUTOS === "undefined") return;

    // filtros
    if (filtros) {
      filtros.innerHTML = CATEGORIAS.map(function (c) {
        return '<button class="chip' + (c.padrao ? " is-on" : "") + '" data-f="' + c.id + '">' + c.nome + "</button>";
      }).join("");
      filtros.addEventListener("click", function (e) {
        var b = e.target.closest(".chip");
        if (!b) return;
        filtros.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-on"); });
        b.classList.add("is-on");
        var f = b.getAttribute("data-f");
        var vis = 0;
        grid.querySelectorAll(".cat").forEach(function (card) {
          var ok = f === "todos" || card.getAttribute("data-cat") === f;
          card.classList.toggle("is-hidden", !ok);
          if (ok) { vis++; card.classList.add("in"); }
        });
        if (contador) contador.textContent = vis;
      });
    }

    // busca
    var busca = document.getElementById("busca");
    if (busca) {
      busca.addEventListener("input", function () {
        var t = busca.value.toLowerCase().trim();
        grid.querySelectorAll(".cat").forEach(function (card) {
          card.classList.toggle("is-hidden", t && card.textContent.toLowerCase().indexOf(t) === -1);
        });
      });
    }

    // ordena
    var ordem = document.getElementById("ordem");
    if (ordem) {
      ordem.addEventListener("change", function () {
        var itens = Array.prototype.slice.call(grid.querySelectorAll(".cat"));
        if (ordem.value === "az") itens.sort(function (a, b) { return a.textContent.localeCompare(b.textContent); });
        if (ordem.value === "za") itens.sort(function (a, b) { return b.textContent.localeCompare(a.textContent); });
        itens.forEach(function (i) { grid.appendChild(i); });
      });
    }

    function abrir(p) {
      box.innerHTML = modalHTML(p);
      var x = box.querySelector(".modal__close");
      if (x) x.addEventListener("click", fechar);
      box.querySelectorAll(".modal__thumbs button").forEach(function (b) {
        b.addEventListener("click", function () {
          box.querySelector(".modal__media img").src = b.getAttribute("data-src");
          box.querySelectorAll(".modal__thumbs button").forEach(function (o) { o.classList.remove("is-on"); });
          b.classList.add("is-on");
        });
      });
      box.querySelectorAll("[data-wa]").forEach(function (el) {
        el.setAttribute("href", waLink(el.getAttribute("data-wa")));
        el.setAttribute("target", "_blank");
      });
      if (window.CAFS3D) window.CAFS3D.init(box, p);
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".cat");
      if (!card) return;
      var code = card.querySelector(".cat__code").textContent.split(" ")[0];
      var p = PRODUTOS.filter(function (x) { return x.code === code; })[0];
      if (p) abrir(p);
    });

    function fechar() {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    if (modal) {
      modal.addEventListener("click", function (e) { if (e.target === modal) fechar(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") fechar(); });
    }

    // primeiro render
    grid.innerHTML = PRODUTOS.map(cardHTML).join("");
    if (contador) contador.textContent = PRODUTOS.length;

    // aplica a categoria padrao (primeira marcada em CATEGORIAS)
    if (filtros) {
      var on = filtros.querySelector(".chip.is-on");
      if (on) {
        var def = on.getAttribute("data-f");
        var n = 0;
        grid.querySelectorAll(".cat").forEach(function (card) {
          var ok = card.getAttribute("data-cat") === def;
          card.classList.toggle("is-hidden", !ok);
          if (ok) { n++; card.classList.add("in"); }
        });
        if (contador) contador.textContent = n;
      }
    }

    initReveal();
  }

  /* ---------------- FORMULÁRIO -> WHATSAPP ---------------- */
  function initForm() {
    var f = document.getElementById("form");
    if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(f);
      var linhas = [];
      d.forEach(function (v, k) { if (v) linhas.push(k + ": " + v); });
      var msg =
        "Olá! Sou da empresa " + (d.get("empresa") || "(não informado)") + ".\n\n" +
        "Preciso de um orçamento com a CAFS:\n\n" + linhas.join("\n");
      window.open(waLink(msg), "_blank");
    });
  }

  /* ---------------- ANO NO RODAPÉ ---------------- */
  function initAno() {
    document.querySelectorAll("[data-ano]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------------- INICIA ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initTema();
    initNav();
    initCatalogo();
    initCarousel();
    initReveal();
    initCounters();
    initAccordion();
    initForm();
    initAno();
  });
})();