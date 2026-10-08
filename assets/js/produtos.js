/* =========================================================================
   CATÁLOGO DE PRODUTOS — CAFS Engenharia Mecânica
   ------------------------------------------------------------------
   COMO ADICIONAR / TROCAR IMAGENS E DESENHOS 3D

   1) IMAGENS RENDERIZADAS
      Coloque os arquivos dentro de:  assets/img/produtos/
      e escreva o nome no campo "img", por exemplo:
         img: "assets/img/produtos/caldeira-vapor-01.jpg"

      Vários ângngulos / mais de uma imagem (opcional) no campo "imgs":
         imgs: ["assets/img/produtos/caldeira-a.jpg",
                "assets/img/produtos/caldeira-b.jpg"]

      Se "img" estiver VAZIO (""), o site mostra o placeholder tracejado
      de modelo 3D — perfeito enquanto o render não está pronto.

   2) MODELO 3D INTERATIVO (o que gira dentro do site)
      Exporte o desenho como .glb ou .gltf — Blender, SolidWorks, Fusion
      e SketchUp todos exportam .glb.
      Coloque o arquivo dentro de:  assets/modelos-3d/
      e preencha no produto:
         modelo3d: "assets/modelos-3d/caldeira-vapor-01.glb"

      Enquanto "modelo3d" estiver vazio (""), a aba "Modelo 3D" mostra
      um aviso de modelo em preparação. Manter o .glb abaixo de ~5 MB
      para a página abrir rápido.

   3) ARQUIVO PARA BAIXAR (.STEP, .STL, .IPT, .MB — para o cliente abrir
      no próprio CAD)
      NÃO suba arquivos pesados para dentro do site (fica lento).
      Hospede no Google Drive / OneDrive e cole o link de compartilhamento
      em "link3d". O botão "BAIXAR MODELO 3D" aparece sozinho.
   ========================================================================= */

const CATEGORIAS = [
  { id: "caldeiras", nome: "Caldeiras", padrao: true },
  { id: "incendio", nome: "Incêndio" },
  { id: "nr12", nome: "NR-12" },
  { id: "transporte", nome: "Transporte" },
  { id: "estruturas", nome: "Estruturas" },
  { id: "vapor", nome: "Vapor" },
  { id: "dutos", nome: "Dutos" }
];

const PRODUTOS = [
  {
    id: "caldeira-vapor",
    code: "CF-1001",
    nome: "Caldeira de Vapor Autobiêntica",
    cat: "caldeiras",
    flags: ["Fabricação própria", "Aprovação SP-160"],
    img: "",
    imgs: [],
    desc: "Geradora de vapor em aço carbono soldado, com comando automático de queima, pressostatos de segurança e laudo para operação com operador habilitado.",
    specs: {
      "Pressão de projeto": "6 a 12 bar",
      "Vaporização": "300 a 3.000 kg/h",
      "Material": "Aço carbono SA-102",
      "Combustível": "Óleo, gás natural ou lenha"
    },
    tags: ["NR-13", "SP-160", "Automação"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "vaso-pressao",
    code: "CF-1002",
    nome: "Vaso de Pressão e Autoclave",
    cat: "caldeiras",
    flags: ["Projeto dimensional", "Soldagem certificada"],
    img: "",
    imgs: [],
    desc: "Fabricação sob medida de vasos de pressão, trocadores de calor e reatores, com cálculo de espessura, soldagem qualificada e ensaios de pressão.",
    specs: {
      "Volumes": "0,1 a 20 m&sup3;",
      "Pintura": "Epóxi, PU ou inox",
      "Ensaios": "Hidroestático e CND",
      "Norma": "ASME VIII / NR-13"
    },
    tags: ["NR-13", "ASME", "Indústria de alimentos"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "sistema-incendio",
    code: "CF-2001",
    nome: "Sistema Preventivo de Incêndio",
    cat: "incendio",
    flags: ["Projeto e instalação"],
    img: "",
    imgs: [],
    desc: "Projeto e execução de redes de hidrantes, sprinklers, extintores e sistemas de detecção, com memorial descritivo e aprovação junto à Defesa Civil.",
    specs: {
      "Norma": "NBR 12688 / NBR 15659",
      "Rede": "Aço-carbono ou inox",
      "Bombeamento": "30 a 300 m&sup3;/h",
      "Entrega": "Projeto, instalação e teste"
    },
    tags: ["Rede de hidrantes", "Sprinkler", "Defesa Civil"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "rede-hidrantes",
    code: "CF-2002",
    nome: "Rede de Hidrantes Industriais",
    cat: "incendio",
    flags: ["Rede sob medida"],
    img: "",
    imgs: [],
    desc: "Rede de incêndio completa com tubos de aço, carretéis, válvulas de gaveta, hidrantes internos e externos, boxes e casa de bombas.",
    specs: {
      "Bocas de incêndio": "50 / 65 / 100 mm",
      "Pressão": "Até 20 bar",
      "Montagem": "Solda ou roscada",
      "Teste": "Estático de estanqueidade"
    },
    tags: ["Hidrantes", "Carretel", "Bombeiro"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "adequacao-nr12",
    code: "CF-3001",
    nome: "Adequação de Máquinas - NR-12",
    cat: "nr12",
    flags: ["Laudo técnico", "NR-12 e NR-10"],
    img: "",
    imgs: [],
    desc: "Projeto e fabricação de proteções fixas e móveis, sistemas de segurança, sensores e paradas de emergência, com relatório de risco e checklist de conformidade.",
    specs: {
      "Escopo": "Proteção, sensoreamento e sinalização",
      "Documentos": "Relatório e projeto executivo",
      "Treinamento": "Integração de segurança",
      "Entrega": "Laudo de conformidade"
    },
    tags: ["NR-12", "NR-10", "Segurança"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "protecao-maquina",
    code: "CF-3002",
    nome: "Proteção Fixa e Móvel",
    cat: "nr12",
    flags: ["Chapa dobrada", "Pintura PU"],
    img: "",
    imgs: [],
    desc: "Enclausuramentos em chapa de aço carbono ou inox para prensas, retificadoras, tornos e linhas de produção, com acesso de manutenção sem perder setup.",
    specs: {
      "Materiais": "Chapa 3 mm, perfurada, inox",
      "Acabamento": "Pintura industrial ou inox escovado",
      "Vistas": "Visão direta sem abrir a proteção",
      "Instalação": "In loco, sem parar a produção"
    },
    tags: ["Enclausuramento", "Chapa", "Prensas"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "esteira",
    code: "CF-4001",
    nome: "Esteira Transportadora",
    cat: "transporte",
    flags: ["Projetada para a sua carga"],
    img: "",
    imgs: [],
    desc: "Esteiras de roletes, de lona e de corrente, com estrutura calculada para a carga real e acionamento dimensionado conforme o processo.",
    specs: {
      "Largura": "300 a 1.200 mm",
      "Velocidade": "0,1 a 2,0 m/s",
      "Capacidade": "Até 300 kg por metro linear",
      "Acionamento": "Redutor, moto-redutor ou drive"
    },
    tags: ["Roletes", "Lona", "Movimentação"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "rosca-transportadora",
    code: "CF-4002",
    nome: "Rosca Transportadora Helicoidal",
    cat: "transporte",
    flags: ["Hélice em chapa"],
    img: "",
    imgs: [],
    desc: "Transportadores helicoidais para grãos, farelos, produtos químicos e materiais granulares, com hélice em chapa soldada, calha em U ou caixa fechada.",
    specs: {
      "Diâmetros": "100 a 700 mm",
      "Passo": "Variável conforme o material",
      "Estrutura": "Inox, galvanizado ou carbono",
      "Acionamento": "Redutor e acoplamento elástico"
    },
    tags: ["Helicoidal", "Granulados", "Inox"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "valvula-rotativa",
    code: "CF-4003",
    nome: "Válvula Rotativa de Descarga",
    cat: "transporte",
    flags: ["Aço inox 304 / 316"],
    img: "",
    imgs: [],
    desc: "Válvulas rotativas para dosagem e desvio em linhas de pó, farelo e produtos granulares, com rotor de passagem e vedação ajustável.",
    specs: {
      "Diâmetros": "1/2 pol a 8 pol",
      "Corpo": "Inox 304 ou 316",
      "Acionamento": "Cilindro pneumático ou manual",
      "Vedação": "Anéis substituíveis"
    },
    tags: ["Dosagem", "Inox", "Pneumática"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "porticos-monovias",
    code: "CF-5001",
    nome: "Pórticos e Monovias Industriais",
    cat: "estruturas",
    flags: ["Projeto estrutural"],
    img: "",
    imgs: [],
    desc: "Pórticos, galp&otilde;es, passarelas, mezaninos e monovias, calculados e executados para p&aacute;tios e unidades industriais.",
    specs: {
      "Vãos": "Até 60 m",
      "Pórticos": "Perfis laminados ou treliçados",
      "Acabamento": "Galvanizado a fogo ou pintura",
      "Fundação": "Projeto e execução"
    },
    tags: ["Pórticos", "Galpão", "Monovia"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "plataformas",
    code: "CF-5002",
    nome: "Plataformas e Estruturas Metálicas",
    cat: "estruturas",
    flags: ["Sob medida"],
    img: "",
    imgs: [],
    desc: "Plataformas de manutenção, passarelas, mezaninos, escadas industriais, guarda-corpo e boxes em estrutura metálica.",
    specs: {
      "Piso": "Grade galvanizada ou chapa xadrez",
      "Estrutura": "Perfis I, U e cantoneiras",
      "Guarda-corpo": "1,10 m conforme NR-12",
      "Carga": "Até 500 kg/m&sup2;"
    },
    tags: ["Mezanino", "Passarela", "Guarda-corpo"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "vapor-condensado",
    code: "CF-6001",
    nome: "Sistema de Distribuição de Vapor",
    cat: "vapor",
    flags: ["Eficiência energética"],
    img: "",
    imgs: [],
    desc: "Projeto e instalação de redes de vapor e condensado: ramais, purgadores, separadores, pontos de consumo e medição, com recuperação de condensado.",
    specs: {
      "Vapor": "4 a 20 bar",
      "Condensado": "Recuperado e devolvido",
      "Materiais": "Aço carbono, inox ou cobre",
      "Resultado": "Redução do consumo de combustível"
    },
    tags: ["Vapor", "Condensado", "Purgadores"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "refervedor-trocador",
    code: "CF-6002",
    nome: "Trocador de Calor e Refervedor",
    cat: "vapor",
    flags: ["Casco e tubo"],
    img: "",
    imgs: [],
    desc: "Trocadores casco-tubo, refervedores e pré-aquecedores para processos de aquecimento, com desenho térmico e execução mecânica.",
    specs: {
      "Tipos": "Casco-tubo, placa, casco-tubo 1 e 2 passes",
      "Área": "At&eacute; 100 m&sup2;",
      "Pressão": "Até 25 bar",
      "Materiais": "Inox, carbono ou cobre"
    },
    tags: ["Trocador", "Aquecimento", "Casco-tubo"],
    modelo3d: "",
    link3d: ""
  },

  /* ---------- DUTOS DE VENTILAÇÃO ---------- */
  {
    id: "duto-reto",
    code: "CF-8001",
    nome: "Duto de Ventilação Reto",
    cat: "dutos",
    flags: ["Fabricação sob medida"],
    img: "assets/img/produtos/duto-reto.webp",
    imgs: [],
    desc: "Duto reto em chapa de aço carbono para sistemas de ventilação industrial e climatização de ambientes de processo.",
    specs: {
      "Seção": "Sob medida (retangular ou redonda)",
      "Material": "Chapa de aço carbono",
      "Espessura": "1,0 / 1,5 mm conforme o diâmetro",
      "Acabamento": "Galvanizado ou pintado"
    },
    tags: ["Ventilação", "Chapa", "Ar"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "duto-bifurcacao-y",
    code: "CF-8002",
    nome: "Duto Bifurcação em Y",
    cat: "dutos",
    flags: ["Fabricação própria"],
    img: "assets/img/produtos/duto-bifurcacao-y.webp",
    imgs: [],
    desc: "Bifurcação em Y para dividir o fluxo principal em dois ramais de ventilação com ângulo simétrico.",
    specs: {
      "Tipo": "Bifurcação Y",
      "Ângulo": "45° / 60° / 90°",
      "Seção": "Sob medida",
      "Material": "Chapa de aço carbono"
    },
    tags: ["Bifurcação", "Rede de dutos"],
    modelo3d: "",
    link3d: ""
  },
  {
    id: "duto-flange",
    code: "CF-8003",
    nome: "Flange para Duto de Ventilação",
    cat: "dutos",
    flags: ["Conexão rápida"],
    img: "assets/img/produtos/duto-flange.webp",
    imgs: [],
    desc: "Flange estampado para junção de trechos de duto, com furos padronizados e vedação por gasket.",
    specs: {
      "Material": "Chapa de aço carbono",
      "Furação": "Padrão para parafusos M6/M8/M10",
      "Vedação": "Gasket / manta térmica",
      "Acabamento": "Galvanizado"
    },
    tags: ["Flange", "Conexão", "Vedação"],
    modelo3d: "",
    link3d: ""
  }
];