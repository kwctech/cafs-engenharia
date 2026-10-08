/* =========================================================================
   VISOR 3D — CAFS Engenharia Mecânica
   ------------------------------------------------------------------
   Usa o <model-viewer> do Google, carregado SOB DEMANDA: o script só entra
   quando o visitante abre a aba 3D de um produto. Sem isso, o catálogo não
   paga esse custo de download.

   COMO LIGAR UM MODELO AO PRODUTO
   ------------------------------------------------------------------
   1) Exporte o desenho como .glb ou .gltf (Blender, SolidWorks, Fusion,
      SketchUp — todos exportam .glb).
   2) Coloque o arquivo em  assets/modelos-3d/
   3) No arquivo  assets/js/produtos.js, no produto desejado, preencha:
         modelo3d: "assets/modelos-3d/caldeira-vapor-01.glb"

   Enquanto o campo estiver vazio ("") o visor mostra o estado de espera,
   explicando como girar assim que houver arquivo.
   ========================================================================= */
(function () {
  "use strict";

  var CDN = "https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js";
  var carregando = false;

  function carregar() {
    if (customElements.get("model-viewer")) return Promise.resolve();
    if (carregando) return new Promise(function (r) { setTimeout(r, 120); });
    carregando = true;
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.type = "module";
      s.src = CDN;
      s.onload = resolve;
      s.onerror = function () { carregando = false; reject(new Error("model-viewer")); };
      document.head.appendChild(s);
    });
  }

  /* ---------------- MONTAGEM DO BLOCO 3D ---------------- */
  function viewerHTML(p) {
    var src = p.modelo3d || "";
    var rot =
      'camera-controls interaction-prompt="none" ' +
      'shadow-intensity="1" shadow-softness="0.8" ' +
      'environment-image="neutral" ' +
      'exposure="1" ' +
      'camera-orbit="45deg 72deg 105%" min-camera-orbit="auto auto 5%" ' +
      'max-camera-orbit="auto auto 500%" ' +
      'touch-action="pan-y" ' +
      'alt="Modelo 3D de ' + p.nome + ' — arraste para girar"';

    var aviso = src
      ? '<div class="m3d__wait" data-m3d-wait>Carregando modelo 3D<span class="m3d__spin"></span></div>'
      : '<div class="m3d__wait"><div class="cube"></div>' +
        "<b>Modelo 3D em prepara&ccedil;&atilde;o</b>" +
        "<small>Assim que o desenho for exportado em .glb, ele gira aqui neste lugar.</small></div>";

    return (
      '<div class="m3d" data-m3d data-src="' + src + '">' +
      '<div class="m3d__stage">' +
      aviso +
      (src ? "<model-viewer " + rot + ' src="' + src + '" reveal="auto"></model-viewer>' : "") +
      "</div>" +
      '<div class="m3d__bar">' +
      '<span class="m3d__hint"><svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" ' +
      'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      "</svg>Arraste para girar &bull; role ou fa&ccedil;a para aproximar</span>" +
      '<span class="m3d__acts">' +
      '<button type="button" data-m3d-spin aria-pressed="true">Girar auto</button>' +
      '<button type="button" data-m3d-reset>Recentrar</button>' +
      "</span></div>" +
      "</div>"
    );
  }

  /* ---------------- ABAS DO MODAL (FOTO | 3D) ---------------- */
  function initAbas(box, p) {
    var abas = box.querySelector("[data-m3d-tabs]");
    if (!abas) return;

    var painelFoto = box.querySelector("[data-painel-foto]");
    var painel3d = box.querySelector("[data-painel-3d]");
    var botoes = abas.querySelectorAll("[data-aba]");

    function abrir(alvo) {
      Array.prototype.forEach.call(botoes, function (b) {
        var on = b.getAttribute("data-aba") === alvo;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      painelFoto.hidden = alvo !== "foto";
      painel3d.hidden = alvo !== "3d";
      if (alvo === "3d") iniciar(p);
    }

    Array.prototype.forEach.call(botoes, function (b) {
      b.addEventListener("click", function () { abrir(b.getAttribute("data-aba")); });
    });

    abrir("foto");
    painel3d.hidden = true;

    /* ---- visor ---- */
    function iniciar(prod) {
      var raiz = box.querySelector("[data-m3d]");
      var viewer = raiz.querySelector("model-viewer");
      if (!viewer) return;

      carregar()
        .then(function () {
          var espera = raiz.querySelector("[data-m3d-wait]");
          if (viewer.loaded && viewer.loaded()) return;
          viewer.addEventListener("load", function () { if (espera) espera.remove(); });
          viewer.addEventListener("error", function () {
            if (espera) {
              espera.innerHTML =
                "<b>N&atilde;o foi poss&iacute;vel carregar o .glb</b>" +
                "<small>Confira o caminho em <code>modelo3d</code> no produtos.js</small>";
            }
          });
        })
        .catch(function () {
          var espera = raiz.querySelector("[data-m3d-wait]");
          if (espera) {
            espera.innerHTML =
              "<b>Visor 3D indispon&iacute;vel</b>" +
              "<small>Sem conex&atilde;o com o servidor do modelo. Tente de novo.</small>";
          }
        });

      var spin = box.querySelector("[data-m3d-spin]");
      if (spin) {
        spin.addEventListener("click", function () {
          var on = viewer.getAttribute("auto-rotate") === "";
          viewer.setAttribute("auto-rotate", on ? "" : null);
          spin.classList.toggle("is-off", on);
          spin.setAttribute("aria-pressed", on ? "false" : "true");
        });
      }

      var reset = box.querySelector("[data-m3d-reset]");
      if (reset) {
        reset.addEventListener("click", function () {
          viewer.cameraOrbit = "45deg 72deg 105%";
          viewer.cameraTarget = "auto";
          viewer.jumpCameraToGoal();
        });
      }
    }
  }

  window.CAFS3D = { html: viewerHTML, init: initAbas };
})();