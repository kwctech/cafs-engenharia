# Site CAFS Engenharia Mecânica

Site estático (HTML + CSS + JavaScript). Sem WordPress, sem build, sem banco de dados.
Você abre o `index.html` no navegador e o site funciona.

```
site-cafs/
├─ index.html          Início (apresentação + frase de impacto)
├─ quem-somos.html     Quem Somos (galeria/carrossel de 5 fotos + história)
├─ produtos.html       Catálogo por categoria (3 itens por categoria)
├─ servicos.html       As 6 frentes de serviço + FAQ
├─ contato.html        Formulário (vira WhatsApp) e dados
└─ assets/
   ├─ css/style.css    Todo o visual (cores, layout, animações, responsivo)
   ├─ js/main.js       Menu, filtros, modal de produto, carrossel, animações
   ├─ js/produtos.js   ⭐ LISTA DE PRODUTOS — é aqui que você edita o catálogo
   └─ img/
      ├─ logo-nome.svg Logo (CAFS em branco + subtítulo na mesma largura)
      ├─ favicon.svg   Ícone do navegador
      ├─ empresa-fachada.webp  Foto da sede
      ├─ serv-vapor.webp      Foto do sistema de vapor
      ├─ galeria/     ← ⭐ AS 5 FOTOS DO CARROSSEL (vazio, esperando as imagens)
      ├─ produtos/    ← renders e fotos dos produtos
      └─ desenhos/    ← desenhos técnicos, plantas, memórias de cálculo
```

---

## 1. Onde coloco as imagens / renders 3D

**a) Galeria da aba "Quem Somos" (carrossel de 5 fotos)** → `assets/img/galeria/`

O ambiente já está pronto com 5 slides, setas, bolinhas e troca automática.
Baixe/crie a pasta (já existe) e salve com estes nomes:

| Arquivo | Conteúdo sugerido | Legenda |
|---|---|---|
| `1-fachada.jpg` | Fachada e acesso | Fachada e acesso |
| `2-oficina.jpg` | Oficina e máquinas | Oficina e máquinas |
| `3-caldeiras.jpg` | Fabricação de caldeiras | Fabricação de caldeiras |
| `4-equipamentos.jpg` | Esteiras / transportadores | Esteiras e transportadores |
| `5-estruturas.jpg` | Pórticos e estruturas | Pórticos e estruturas metálicas |

**Tamanho recomendado: 1600 x 900 px (16:9), JPG até ~250 KB.**

Para usar as fotos, em `quem-somos.html` troque este bloco de cada slide:

```html
<div class="slide__ph">
  <div>
    ... placeholder ...
  </div>
</div>
```

por:

```html
<img src="assets/img/galeria/1-fachada.jpg" alt="Fachada da CAFS">
```

O slide já tem a legenda (`slide__cap`) embaixo — só pode mudar o texto dela se quiser.

**b) Imagens dos produtos** → `assets/img/produtos/`

Abra `assets/js/produtos.js` e preencha o campo `img` do produto:

```js
img: "assets/img/produtos/caldeira-vapor.jpg",
```

Enquanto `img` estiver `""` (vazio), o site mostra um **placeholder tracejado de modelo 3D**
com o nome do arquivo que falta. Vários ângulos (opcional):

```js
imgs: ["assets/img/produtos/caldeira-a.jpg",
       "assets/img/produtos/caldeira-b.jpg"],
```

**Recomendado: 1400 x 960 px, JPG (até ~200 KB) ou WEBP.**

**c) Desenhos técnicos / plantas / memórias** → `assets/img/desenhos/`

---

## 2. Desenhos e modelos 3D (.MB, .STEP, .STL, .IPT, .SLDPRT)

**Não coloque arquivos pesados dentro do site** (fica lento e o Hostinger pode bloquear).

1. Suba o arquivo no **Google Drive**, **OneDrive** ou **Dropbox**.
2. Compartilhe e copie o link.
3. Cole no campo `link3d` do produto:

```js
link3d: "https://drive.google.com/uc?id=XXXXXXX",
```

O botão **"BAIXAR MODELO 3D"** aparece sozinho dentro do produto.
Para arquivos leves (até ~2 MB), use a pasta `assets/modelos-3d/` e aponte o caminho.

---

## 3. Adicionar / remover produtos

Tudo está em `assets/js/produtos.js`. Para **adicionar**, copie um bloco existente:

```js
{
  id: "meu-produto",                 // identificador único
  code: "CF-7001",                   // código que aparece no cartão
  nome: "Nome do equipamento",
  cat: "caldeiras",                  // caldeiras | incendio | nr12 |
                                     // transporte | estruturas | vapor | dutos
  flags: ["Fabricação própria"],     // etiquetas dourada/laranja
  img: "",                           // caminho da imagem ("" = placeholder)
  imgs: [],                          // mais ângulos
  desc: "Descrição do produto.",
  specs: { "Pressão": "6 a 12 bar", "Material": "Aço carbono" },
  tags: ["NR-13", "SP-160"],
  link3d: ""                         // link do arquivo 3D (Drive)
}
```

**Regra do site: máximo de 3 itens por categoria.** As categorias ficam na lista
`CATEGORIAS` no topo do mesmo arquivo. A primeira com `"padrao": true` é a que
aparece ao abrir a aba (hoje é Caldeiras). **Não existe mais o botão "Todos"** —
cada aba mostra uma categoria por vez.

**Dica:** sobraram 7 fotos de dutos que não estão cadastradas
(`duto-2-saidas.webp`, `duto-3-saidas.webp`, `duto-4-saidas.webp`,
`duto-5-saidas.webp`, `duto-derivacao.webp`, `duto-derivacao-reducao.webp`,
`duto-curva-90.webp`) em `assets/img/produtos/`. Se quiser mostrar mais dutos,
me peça que eu crio uma categoria "Dutos" separada.

---

## 4. A logo

`assets/img/logo-nome.svg` — **CAFS** grande em **branco** e, abaixo, filete dourado +
**ENGENHARIA MECANICA** esticado ocupando **exatamente a mesma largura** do CAFS.
Usa `textLength`, então o alinhamento é exato em qualquer tamanho de tela.

- Aparece no **menu** (todas as abas) e **bem grande na apresentação** da página inicial.
- Para mudar o tamanho: no menu, mexa em `.brand__name` (altura em px) no `style.css`.
  Na apresentação, mexa no `max-width` da `.nameplate`.
- `assets/img/logo.svg` é o ícone antigo e **não é mais usado** — pode apagar.
- No rodapé aparece só a assinatura em texto.

---

## 5. Onde mudar textos, telefone e cores

| O quê | Onde |
|---|---|
| Telefone, WhatsApp, e-mail, endereço | Em todos os 5 `.html` (topo e rodapé). O WhatsApp também está em `assets/js/main.js`, linha `WA_NUM` |
| Cores do site | `assets/css/style.css`, bloco `:root` no início |
| Tamanho das fontes | `assets/css/style.css`, bloco `:root` |
| Textos das páginas | Diretamente no HTML |

**Endereço atual:** Júlio Budant Neto, 200 – Campo da Água Verde – Canoinhas/SC.
O botão "Ver no mapa" foi removido porque o link antigo apontava para outro endereço —
se quiser, me passe o link novo que eu colo no lugar.

---

## 6. Colocar no ar (Hostinger)

1. **File Manager** do Hostinger → `public_html`.
2. Envie **todo o conteúdo** desta pasta (os arquivos, não a pasta).
3. Pronto. `https://seudominio.com.br` abre o site.

Não precisa de PHP nem de banco de dados.

**Antes de publicar, confira:**
- CNPJ no rodapé (hoje está como placeholder `00.000.000/0001-00`)
- Telefone e WhatsApp
- Os números do início (450+ projetos, 12 estados) — ajuste para os reais
- Links das redes sociais

---

## 7. Resumo do visual

- **Cinza metalizado** (`#12151a` → `#3d454f`) — base, textura de chapa, rebites
- **Dourado** (`#e0a500` / `#f4bf21`) — títulos, destaques, números
- **Laranja segurança** (`#ff6a13`) — botões, faixas zebradas, tags
- Faixas zebradas **sólidas e contínuas** (faixa de 16 px, listras de 22 px em 45°)
- Cortes diagonais nos painéis, malha técnica de fundo, tipografia condensada

## 8. Responsivo

Foi feito e testado para:

| Largura | Comportamento |
|---|---|
| ≥ 1180 px | Layout completo, menu horizontal com logo |
| 1024–1180 px | Menu apertado, rodapé em 3 colunas |
| 900–1024 px | Menu vira botão hambúrguer, grades em 2 colunas |
| 720–900 px | Uma coluna nos blocos de texto, ficha de contato empilhada |
| 420–720 px | Tudo em 1 coluna, filtros com rolagem lateral, carrossel 4:3 |
| ≤ 420 px | Botões e filtros menores, nome da empresa reduzido |
| ≤ 360 px | Só o nome da empresa no menu, sem a barra superior |

Também trata: celular em paisagem, telas sem hover (toque) e
`prefers-reduced-motion` (desliga as animações).