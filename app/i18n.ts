export type Locale = "pt" | "en" | "es" | "nb";

export type Capability = {
  code: string;
  title: string;
  description: string;
  topics: string;
};

export type Project = {
  name: string;
  descriptor: string;
  url: string;
  tag?: string;
};

export type Patent = {
  number: string;
  title: string;
  status: string;
};

export type PatentGroup = {
  title: string;
  holder: string;
  patents: Patent[];
};

export type ContactCopy = {
  name: string;
  email: string;
  company: string;
  optional: string;
  subject: string;
  message: string;
  privacyAcknowledgement: string;
  privacyLink: string;
  verification: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  turnstileError: string;
  configurationError: string;
};

type Translation = {
  htmlLang: string;
  metadata: { title: string; description: string };
  navigationLabel: string;
  languageLabel: string;
  headerLine: string;
  nav: {
    profile: string;
    capabilities: string;
    projects: string;
    patents: string;
    trajectory: string;
    contact: string;
    menu: string;
  };
  hero: {
    kicker: string;
    statement: string;
    trajectoryLink: string;
    orbitAria: string;
    coordinate: string;
    now: string;
    strategy: string;
    software: string;
    ai: string;
    operations: string;
    systems: string;
  };
  console: {
    channel: string;
    readout: string;
    collaborations: string;
    status: string;
    statusValue: string;
    protectedContact: string;
    secureChannel: string;
  };
  signal: { label: string; items: string[] };
  profile: {
    label: string;
    tag: string;
    title: string;
    portraitLabel: string;
    portraitText: string;
    lead: string;
    bodyOne: string;
    bodyTwo: string;
    principleLabel: string;
    principle: string;
  };
  capabilities: {
    label: string;
    tag: string;
    title: string;
    intro: string;
    items: Capability[];
  };
  projects: {
    label: string;
    tag: string;
    title: string;
    intro: string;
    ownedTitle: string;
    collaborationTitle: string;
    holdingsTitle: string;
    owned: Project[];
    collaborations: Project[];
    holdings: Project[];
  };
  patents: {
    label: string;
    tag: string;
    title: string;
    intro: string;
    groups: PatentGroup[];
    note: string;
  };
  trajectory: {
    label: string;
    tag: string;
    title: string;
    items: { time: string; title: string; description: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    protectedLabel: string;
    form: ContactCopy;
  };
  footer: {
    back: string;
    privacyNote: string;
    legal: string;
    privacy: string;
  };
  jsonDescription: string;
};

export const localeOptions: {
  code: Locale;
  short: string;
  label: string;
  lang: string;
}[] = [
  { code: "pt", short: "PT", label: "Português", lang: "pt" },
  { code: "en", short: "EN", label: "English", lang: "en" },
  { code: "es", short: "ES", label: "Español", lang: "es" },
  { code: "nb", short: "NO", label: "Norsk bokmål", lang: "nb" },
];

const projectUrls = {
  cinteca: "https://cinteca.es",
  legalNeuron: "https://legalneuron.es",
  nordixBios: "https://nordixbios.com",
  nordixAIgency: "https://nordixaigency.com",
  ncsEngine: "https://ncsengine.com",
  nordixSystems: "https://nordixsystems.com",
  cinte: "https://cinte.com.br",
  plorea: "https://plorea.no",
  laeras: "https://grupolaeras.com",
  innocards: "https://innocardloyalty.ch",
  aiRobotics: "https://airobotics.no",
};

// Patent numbers are official identifiers and stay identical in every
// language; only titles and status lines are localised.
const patentNumbers = {
  reservoir: "P202631350",
  budget: "P202631351",
  expansion: "P202631352",
  rescue: "P202631353",
  fuelSwitch: "PI 0600924-7",
  stethoscope: "PI 0706462-4",
  fuelAnalyser: "PI 0801894-4",
};

export const translations: Record<Locale, Translation> = {
  en: {
    htmlLang: "en",
    metadata: {
      title: "Adriano César Moreno Caldas · Technology, product and operations",
      description:
        "Personal website of Adriano César Moreno Caldas: technology leadership, software, artificial intelligence, cloud, telecommunications, automation and digital products — including NordixBIOS, the Agentic AI Factory.",
    },
    navigationLabel: "Main navigation",
    languageLabel: "Language",
    headerLine: "Strategy · Systems · Operations",
    nav: { profile: "Profile", capabilities: "Capabilities", projects: "Projects", patents: "Patents", trajectory: "Journey", contact: "Contact", menu: "Menu" },
    hero: {
      kicker: "Since 2003 · global activity",
      statement:
        "Technology seen end to end: from decision to production, from algorithm to global operations.",
      trajectoryLink: "Explore the journey",
      orbitAria: "Technology channels",
      coordinate: "GLOBAL / 24H",
      now: "today",
      strategy: "strategy",
      software: "software",
      ai: "AI",
      operations: "operations",
      systems: "systems",
    },
    console: {
      channel: "Channel",
      readout: "Readout",
      collaborations: "Collaborations",
      status: "Status",
      statusValue: "In operation",
      protectedContact: "Protected contact",
      secureChannel: "Secure channel",
    },
    signal: {
      label: "Activity overview",
      items: ["Technology leadership", "Owned products", "Selected collaborations", "Global activity"],
    },
    profile: {
      label: "Profile",
      tag: "An integrated view",
      title: "Connecting vision, technology and operational reality.",
      portraitLabel: "The person behind the systems",
      portraitText:
        "Technical curiosity, a broad perspective and commitment to what happens after delivery.",
      lead:
        "Adriano works across technology direction, product creation and complex operations. He has served in CTO roles in multinational organisations and leads owned and third-party initiatives across different countries.",
      bodyOne:
        "Since 2003, he has worked with digital signal processing, artificial intelligence algorithms and model training. That foundation has grown into broad work across software, telecommunications, cloud, networks, automation and applied electronics.",
      bodyTwo:
        "His role changes with the challenge: set direction, break down a problem, assemble the right team, select platforms, guide delivery or take responsibility for operations. The constant is turning complexity into systems that work in the real world.",
      principleLabel: "Working principle",
      principle:
        "Technology creates value only when strategy, product and operations can speak to each other.",
    },
    capabilities: {
      label: "Capabilities",
      tag: "Applied knowledge",
      title: "Breadth to lead. Depth to decide.",
      intro:
        "A broad reading of the landscape connects disciplines, anticipates dependencies and coordinates specialists without losing sight of the final outcome.",
      items: [
        { code: "DIR", title: "Technology strategy and direction", description: "Long-term direction, enterprise architecture, portfolios, budgets, governance, risk, teams and partners in multinational contexts.", topics: "CTO · IT · product · programmes · suppliers · ITSM" },
        { code: "SFT", title: "Software and digital products", description: "Web, desktop and mobile systems, platforms, APIs and distributed architectures — from experience and prototyping to quality and continuous operations.", topics: "frontend · backend · APIs · QA · Windows · Linux · macOS · Android · iOS" },
        { code: "AIM", title: "AI, signals and models", description: "Creation and application of algorithms, digital signal processing, model training, evaluation and operation inside real products.", topics: "DSP · ML · deep learning · LLMs · agents · RAG · MLOps · GPU" },
        { code: "CLD", title: "Cloud, networks and operations", description: "Local, cloud and hybrid infrastructure, telecommunications, virtualisation, orchestration, observability and operational reliability.", topics: "AWS · Azure · Google Cloud · Kubernetes/PODs · IaC · DevOps · SRE" },
        { code: "DAT", title: "Data, integrations and platforms", description: "Modelling, relational and non-relational databases, pipelines, messaging, APIs, events and integration across owned or third-party systems.", topics: "SQL · NoSQL · ETL/ELT · streaming · data governance · analytics" },
        { code: "SEC", title: "Security and resilience", description: "Identity and access, layered protection, hardening, continuity, backups, recovery, incident response and technology risk management.", topics: "IAM · Zero Trust · vulnerabilities · DR · continuity · compliance" },
        { code: "AUT", title: "Automation and physical systems", description: "Applied electronics, embedded systems, microcontrollers, PLCs, sensors and home or industrial automation connected to software.", topics: "firmware · PCB · IoT · edge · OT · SCADA/HMI · control" },
        { code: "DIG", title: "Digital presence and growth", description: "Websites, content, social media, advertising and organic discovery connected to product strategy and international presence.", topics: "media · paid acquisition · technical SEO · GEO · LLMO · reputation" },
      ],
    },
    projects: {
      label: "Projects",
      tag: "An ecosystem in motion",
      title: "Owned products. International collaborations.",
      intro:
        "Different brands and platforms connected by the same approach: build, integrate, operate and evolve.",
      ownedTitle: "Owned ecosystem",
      collaborationTitle: "Selected collaborations",
      holdingsTitle: "Equity holdings",
      owned: [
        { name: "NordixBIOS", descriptor: "Agentic AI Factory — infrastructure to create and operate AI workers inside your software", url: projectUrls.nordixBios, tag: "Latest" },
        { name: "NordixAIgency", descriptor: "AI agents that carry out real actions across own and third-party software — calls, messages, bookings, orders — taking over digital work that used to need people", url: projectUrls.nordixAIgency },
        { name: "Cinteca", descriptor: "Technology brand linked to AD Caldas Innotec, S.A.", url: projectUrls.cinteca },
        { name: "LegalNeuron", descriptor: "AI and software for the legal sector", url: projectUrls.legalNeuron },
        { name: "NCS Engine", descriptor: "Infrastructure for AI workloads", url: projectUrls.ncsEngine },
        { name: "Nordix Systems", descriptor: "Digital systems and solutions", url: projectUrls.nordixSystems },
        { name: "CINTE", descriptor: "Telecommunications and technology company established in 2004", url: projectUrls.cinte },
      ],
      collaborations: [
        { name: "Plorea · Norway", descriptor: "Unified commerce, POS and e-commerce", url: projectUrls.plorea },
        { name: "Grupo Laeras", descriptor: "Platforms and digital presence", url: projectUrls.laeras },
        { name: "Innocards Loyalty · Switzerland", descriptor: "Loyalty and connected experiences", url: projectUrls.innocards },
      ],
      holdings: [
        { name: "AI Robotics · Norway", descriptor: "Partner and CTO since 2025 — autonomous service robots for Norwegian businesses: cleaning, serving and transport, installed and supported nationwide", url: projectUrls.aiRobotics },
      ],
    },
    patents: {
      label: "Patents",
      tag: "Industrial property",
      title: "Registered inventions, from embedded electronics to neural networks.",
      intro:
        "Seven patent applications in two countries: four filed in Spain in 2026 on neural-network architecture and training, with AD Caldas Innotec, S.A. as applicant, and three filed in Brazil between 2006 and 2008, with Adriano as holder and inventor.",
      groups: [
        {
          title: "Spain · OEPM",
          holder: "Applicant: AD Caldas Innotec, S.A.",
          patents: [
            { number: patentNumbers.reservoir, title: "Method and system for conditional computation with a reservoir of addressable neurons and exact-cardinality selection", status: "Filed 02 Oct 2026 · pending" },
            { number: patentNumbers.budget, title: "Method and system for allocating a per-element compute budget across the layers of a neural network", status: "Filed 02 Oct 2026 · pending" },
            { number: patentNumbers.expansion, title: "Method for expanding a reservoir of addressable units in a neural network while preserving the computed function", status: "Filed 02 Oct 2026 · pending" },
            { number: patentNumbers.rescue, title: "Method for rescuing under-used units by splitting, in a reservoir of addressable units of a neural network", status: "Filed 02 Oct 2026 · pending" },
          ],
        },
        {
          title: "Brazil · INPI",
          holder: "Holder and inventor: Adriano César Moreno Caldas",
          patents: [
            { number: patentNumbers.fuelSwitch, title: "Fuel selector switch for bi-fuel or tri-fuel cars (petrol, ethanol and CNG) with precise digital measurement of the CNG volume", status: "Filed 22 Mar 2006 · published 20 Nov 2007 · archived 2012" },
            { number: patentNumbers.stethoscope, title: "Digital electronic stethoscope with data storage, wireless transmission, graph display and diagnostic suggestion", status: "Filed 11 Oct 2007 · published 16 Jun 2009 · archived 2012" },
            { number: patentNumbers.fuelAnalyser, title: "Vehicle fuel level and quality analyser for filling stations, with data transmission and remote processing of the collected information", status: "Filed 27 May 2008 · published 17 Feb 2010 · archived 2012" },
          ],
        },
      ],
      note: "Titles translated from the original Spanish and Portuguese.",
    },
    trajectory: {
      label: "Journey",
      tag: "Continuous evolution",
      title: "A continuous line between research, product and scale.",
      items: [
        { time: "2003", title: "Signals, algorithms and models", description: "The beginning of continuous work with digital signal processing and artificial intelligence applications." },
        { time: "2004", title: "CINTE · Telecommunications", description: "The incorporation of CINTE marked the start of a business journey focused on telecommunications and technology." },
        { time: "2014", title: "AD Caldas Innotec, S.A.", description: "Spanish corporate structure, tax ID A66316399, owner of the Cinteca technology brand, created to develop products, provide services and lead technology initiatives." },
        { time: "TODAY", title: "Global ecosystem", description: "Owned products, international collaborations and work spanning software, AI, infrastructure and connected systems." },
      ],
    },
    contact: {
      eyebrow: "Professional conversations and new projects",
      title: "Let’s connect the next system.",
      intro: "Send your message through this protected channel. No personal email address or telephone number is published on this website.",
      protectedLabel: "Protected by Cloudflare Turnstile",
      form: {
        name: "Name", email: "Your email", company: "Company", optional: "optional", subject: "Subject", message: "Message",
        privacyAcknowledgement: "I accept the processing of my data to answer this message under the", privacyLink: "privacy policy", verification: "Human verification",
        send: "Send securely", sending: "Sending…", success: "Message sent securely. I will reply by email.", error: "The message could not be sent. Review the fields and try again.", turnstileError: "Human verification expired or failed. Please try again.", configurationError: "The protected channel is not yet configured for this domain.",
      },
    },
    footer: { back: "Back to the top", privacyNote: "No advertising or audience analytics. Protected contact.", legal: "Legal notice", privacy: "Privacy" },
    jsonDescription: "Technology leadership, software creation, artificial intelligence, telecommunications, automation and global infrastructure operations.",
  },
  pt: {
    htmlLang: "pt-BR",
    metadata: {
      title: "Adriano César Moreno Caldas · Tecnologia, produto e operação",
      description: "Site pessoal de Adriano César Moreno Caldas: liderança tecnológica, software, inteligência artificial, cloud, telecomunicações, automação e produtos digitais — incluindo o NordixBIOS, a Agentic AI Factory.",
    },
    navigationLabel: "Navegação principal",
    languageLabel: "Idioma",
    headerLine: "Estratégia · Sistemas · Operação",
    nav: { profile: "Perfil", capabilities: "Atuação", projects: "Projetos", patents: "Patentes", trajectory: "Trajetória", contact: "Contato", menu: "Menu" },
    hero: {
      kicker: "Desde 2003 · atuação global",
      statement: "Tecnologia vista de ponta a ponta: da decisão ao sistema em produção, do algoritmo à operação global.",
      trajectoryLink: "Conhecer a trajetória", orbitAria: "Canais de atuação", coordinate: "GLOBAL / 24H", now: "hoje", strategy: "estratégia", software: "software", ai: "IA", operations: "operação", systems: "sistemas",
    },
    console: { channel: "Canal", readout: "Leituras", collaborations: "Colaborações", status: "Estado", statusValue: "Em operação", protectedContact: "Contato protegido", secureChannel: "Canal seguro" },
    signal: { label: "Resumo da atuação", items: ["Liderança tecnológica", "Produtos próprios", "Colaborações selecionadas", "Atuação global"] },
    profile: {
      label: "Perfil", tag: "Uma visão integrada", title: "Conectar visão, tecnologia e realidade operacional.", portraitLabel: "Pessoa por trás dos sistemas", portraitText: "Curiosidade técnica, visão de conjunto e compromisso com o que acontece depois da entrega.",
      lead: "Adriano atua entre direção tecnológica, criação de produtos e operação de ambientes complexos. Já exerceu funções de CTO em organizações multinacionais e conduz iniciativas próprias e de terceiros em diferentes países.",
      bodyOne: "Desde 2003, trabalha com processamento digital de sinais, algoritmos de inteligência artificial e treinamento de modelos. Essa base evoluiu para uma atuação ampla em software, telecomunicações, cloud, redes, automação e eletrônica aplicada.",
      bodyTwo: "Seu papel muda conforme o desafio: definir direção, decompor um problema, formar o time certo, escolher plataformas, acompanhar a entrega ou assumir a operação. O ponto constante é transformar complexidade em sistemas que funcionem no mundo real.",
      principleLabel: "Princípio de trabalho", principle: "Tecnologia só cria valor quando estratégia, produto e operação conseguem conversar.",
    },
    capabilities: {
      label: "Atuação", tag: "Conhecimento aplicado", title: "Amplitude para dirigir. Profundidade para decidir.", intro: "A leitura ampla do cenário permite conectar disciplinas, antecipar dependências e coordenar especialistas sem perder o resultado final de vista.",
      items: [
        { code: "DIR", title: "Estratégia e direção tecnológica", description: "Direção de longo prazo, arquitetura empresarial, portfólios, orçamento, governança, riscos, times e parceiros em contextos multinacionais.", topics: "CTO · TI · produto · programas · fornecedores · ITSM" },
        { code: "SFT", title: "Software e produtos digitais", description: "Sistemas web, desktop e móveis, plataformas, APIs e arquiteturas distribuídas — da experiência e prototipação à qualidade e operação contínua.", topics: "frontend · backend · APIs · QA · Windows · Linux · macOS · Android · iOS" },
        { code: "AIM", title: "IA, sinais e modelos", description: "Criação e aplicação de algoritmos, processamento digital de sinais, treinamento, avaliação e operação de modelos incorporados a produtos reais.", topics: "DSP · ML · deep learning · LLMs · agentes · RAG · MLOps · GPU" },
        { code: "CLD", title: "Cloud, redes e operação", description: "Infraestruturas locais, cloud e híbridas, telecomunicações, virtualização, orquestração, observabilidade e confiabilidade operacional.", topics: "AWS · Azure · Google Cloud · Kubernetes/PODs · IaC · DevOps · SRE" },
        { code: "DAT", title: "Dados, integrações e plataformas", description: "Modelagem, bancos relacionais e não relacionais, pipelines, mensageria, APIs, eventos e integração entre sistemas próprios ou de terceiros.", topics: "SQL · NoSQL · ETL/ELT · streaming · data governance · analytics" },
        { code: "SEC", title: "Segurança e resiliência", description: "Identidade e acesso, proteção em camadas, hardening, continuidade, backups, recuperação, resposta a incidentes e gestão de riscos tecnológicos.", topics: "IAM · Zero Trust · vulnerabilidades · DR · continuidade · compliance" },
        { code: "AUT", title: "Automação e sistemas físicos", description: "Eletrônica aplicada, sistemas embarcados, microcontroladores, CLPs, sensores e automação residencial ou industrial conectada ao software.", topics: "firmware · PCB · IoT · edge · OT · SCADA/HMI · controle" },
        { code: "DIG", title: "Presença e crescimento digital", description: "Sites, conteúdo, redes sociais, publicidade e descoberta orgânica integrados à estratégia de produto e à presença internacional.", topics: "mídias · aquisição paga · SEO técnico · GEO · LLMO · reputação" },
      ],
    },
    projects: {
      label: "Projetos", tag: "Ecossistema em movimento", title: "Produtos próprios. Colaborações internacionais.", intro: "Marcas e plataformas diferentes, conectadas por uma mesma forma de pensar: construir, integrar, operar e evoluir.", ownedTitle: "Ecossistema próprio", collaborationTitle: "Colaborações selecionadas", holdingsTitle: "Participações societárias",
      owned: [
        { name: "NordixBIOS", descriptor: "Agentic AI Factory — infraestrutura para criar e operar trabalhadores de IA no seu software", url: projectUrls.nordixBios, tag: "Mais recente" },
        { name: "NordixAIgency", descriptor: "Agentes de IA que executam ações reais em softwares próprios e de terceiros — chamadas, mensagens, agendas, pedidos — assumindo trabalho digital que antes exigia pessoas", url: projectUrls.nordixAIgency },
        { name: "Cinteca", descriptor: "Marca tecnológica vinculada à AD Caldas Innotec, S.A.", url: projectUrls.cinteca },
        { name: "LegalNeuron", descriptor: "IA e software para o setor jurídico", url: projectUrls.legalNeuron },
        { name: "NCS Engine", descriptor: "Infraestrutura para cargas de IA", url: projectUrls.ncsEngine },
        { name: "Nordix Systems", descriptor: "Sistemas e soluções digitais", url: projectUrls.nordixSystems },
        { name: "CINTE", descriptor: "Empresa de telecomunicações e tecnologia constituída em 2004", url: projectUrls.cinte },
      ],
      collaborations: [
        { name: "Plorea · Noruega", descriptor: "Comércio unificado, POS e e-commerce", url: projectUrls.plorea },
        { name: "Grupo Laeras", descriptor: "Plataformas e presença digital", url: projectUrls.laeras },
        { name: "Innocards Loyalty · Suíça", descriptor: "Fidelização e experiências conectadas", url: projectUrls.innocards },
      ],
      holdings: [
        { name: "AI Robotics · Noruega", descriptor: "Sócio e CTO desde 2025 — robôs de serviço autônomos para empresas na Noruega: limpeza, atendimento e transporte, com instalação e suporte em todo o país", url: projectUrls.aiRobotics },
      ],
    },
    patents: {
      label: "Patentes", tag: "Propriedade industrial", title: "Invenções registradas, da eletrônica embarcada às redes neurais.",
      intro: "Sete pedidos de patente em dois países: quatro apresentados na Espanha em 2026 sobre arquitetura e treinamento de redes neurais, tendo a AD Caldas Innotec, S.A. como requerente, e três depositados no Brasil entre 2006 e 2008, com Adriano como titular e inventor.",
      groups: [
        {
          title: "Espanha · OEPM", holder: "Requerente: AD Caldas Innotec, S.A.",
          patents: [
            { number: patentNumbers.reservoir, title: "Método e sistema de computação condicional com reservatório de neurônios endereçáveis e seleção de cardinalidade exata", status: "Pedido apresentado em 02/10/2026 · em tramitação" },
            { number: patentNumbers.budget, title: "Método e sistema de distribuição de um orçamento de computação por elemento entre camadas de uma rede neural", status: "Pedido apresentado em 02/10/2026 · em tramitação" },
            { number: patentNumbers.expansion, title: "Método de ampliação de um reservatório de unidades endereçáveis de uma rede neural que preserva a função calculada", status: "Pedido apresentado em 02/10/2026 · em tramitação" },
            { number: patentNumbers.rescue, title: "Método de resgate por divisão de unidades subutilizadas em um reservatório de unidades endereçáveis de uma rede neural", status: "Pedido apresentado em 02/10/2026 · em tramitação" },
          ],
        },
        {
          title: "Brasil · INPI", holder: "Titular e inventor: Adriano César Moreno Caldas",
          patents: [
            { number: patentNumbers.fuelSwitch, title: "Chave comutadora para automóveis bicombustível ou tricombustível (gasolina, álcool e GNV) com medição digital precisa do volume de GNV", status: "Depósito em 22/03/2006 · publicado em 20/11/2007 · arquivado em 2012" },
            { number: patentNumbers.stethoscope, title: "Estetoscópio eletrônico digital com armazenamento de dados, transmissão sem fio, exibição de gráficos e sugestão de diagnóstico", status: "Depósito em 11/10/2007 · publicado em 16/06/2009 · arquivado em 2012" },
            { number: patentNumbers.fuelAnalyser, title: "Analisador de nível e qualidade de combustível veicular em postos de abastecimento, com transmissão de dados e processamento remoto das informações coletadas", status: "Depósito em 27/05/2008 · publicado em 17/02/2010 · arquivado em 2012" },
          ],
        },
      ],
      note: "Títulos dos pedidos espanhóis traduzidos do original em espanhol.",
    },
    trajectory: {
      label: "Trajetória", tag: "Evolução contínua", title: "Uma linha contínua entre pesquisa, produto e escala.",
      items: [
        { time: "2003", title: "Sinais, algoritmos e modelos", description: "Início de um trabalho contínuo com processamento digital de sinais e aplicações de inteligência artificial." },
        { time: "2004", title: "CINTE · Telecomunicações", description: "A constituição da CINTE marcou o início de uma trajetória empresarial voltada a telecomunicações e tecnologia." },
        { time: "2014", title: "AD Caldas Innotec, S.A.", description: "Estrutura societária espanhola, NIF A66316399, titular da marca tecnológica Cinteca, para desenvolver produtos, prestar serviços e conduzir iniciativas tecnológicas." },
        { time: "HOJE", title: "Ecossistema global", description: "Produtos próprios, colaborações internacionais e atuação sobre software, IA, infraestrutura e sistemas conectados." },
      ],
    },
    contact: {
      eyebrow: "Conversas profissionais e novos projetos", title: "Vamos conectar o próximo sistema.", intro: "Envie sua mensagem por este canal protegido. Nenhum e-mail pessoal ou número de telefone é publicado neste site.", protectedLabel: "Protegido por Cloudflare Turnstile",
      form: { name: "Nome", email: "Seu e-mail", company: "Empresa", optional: "opcional", subject: "Assunto", message: "Mensagem", privacyAcknowledgement: "Li e aceito o tratamento dos dados para responder a esta mensagem, nos termos da", privacyLink: "política de privacidade", verification: "Verificação humana", send: "Enviar com segurança", sending: "Enviando…", success: "Mensagem enviada com segurança. Responderei por e-mail.", error: "Não foi possível enviar. Revise os campos e tente novamente.", turnstileError: "A verificação humana expirou ou falhou. Tente novamente.", configurationError: "O canal protegido ainda não está configurado para este domínio." },
    },
    footer: { back: "Voltar ao início", privacyNote: "Sem analytics de publicidade ou audiência. Contato protegido.", legal: "Aviso legal", privacy: "Privacidade" },
    jsonDescription: "Liderança tecnológica, criação de software, inteligência artificial, telecomunicações, automação e operação de infraestruturas globais.",
  },
  es: {
    htmlLang: "es",
    metadata: {
      title: "Adriano César Moreno Caldas · Tecnología, producto y operaciones",
      description: "Sitio personal de Adriano César Moreno Caldas: liderazgo tecnológico, software, inteligencia artificial, cloud, telecomunicaciones, automatización y productos digitales — incluido NordixBIOS, la Agentic AI Factory.",
    },
    navigationLabel: "Navegación principal", languageLabel: "Idioma", headerLine: "Estrategia · Sistemas · Operaciones",
    nav: { profile: "Perfil", capabilities: "Actividad", projects: "Proyectos", patents: "Patentes", trajectory: "Trayectoria", contact: "Contacto", menu: "Menú" },
    hero: { kicker: "Desde 2003 · actividad global", statement: "Tecnología de extremo a extremo: de la decisión al sistema en producción, del algoritmo a la operación global.", trajectoryLink: "Conocer la trayectoria", orbitAria: "Canales de actividad", coordinate: "GLOBAL / 24H", now: "hoy", strategy: "estrategia", software: "software", ai: "IA", operations: "operaciones", systems: "sistemas" },
    console: { channel: "Canal", readout: "Lecturas", collaborations: "Colaboraciones", status: "Estado", statusValue: "En operación", protectedContact: "Contacto protegido", secureChannel: "Canal seguro" },
    signal: { label: "Resumen de la actividad", items: ["Liderazgo tecnológico", "Productos propios", "Colaboraciones seleccionadas", "Actividad global"] },
    profile: {
      label: "Perfil", tag: "Una visión integrada", title: "Conectar visión, tecnología y realidad operativa.", portraitLabel: "La persona detrás de los sistemas", portraitText: "Curiosidad técnica, visión de conjunto y compromiso con lo que ocurre después de la entrega.",
      lead: "Adriano trabaja entre la dirección tecnológica, la creación de productos y la operación de entornos complejos. Ha desempeñado funciones de CTO en organizaciones multinacionales y dirige iniciativas propias y de terceros en distintos países.",
      bodyOne: "Desde 2003 trabaja con procesamiento digital de señales, algoritmos de inteligencia artificial y entrenamiento de modelos. Esa base evolucionó hacia una actividad amplia en software, telecomunicaciones, cloud, redes, automatización y electrónica aplicada.",
      bodyTwo: "Su papel cambia según el reto: definir la dirección, descomponer un problema, reunir el equipo adecuado, elegir plataformas, acompañar la entrega o asumir la operación. La constante es convertir la complejidad en sistemas que funcionen en el mundo real.",
      principleLabel: "Principio de trabajo", principle: "La tecnología solo crea valor cuando estrategia, producto y operaciones pueden conversar.",
    },
    capabilities: {
      label: "Actividad", tag: "Conocimiento aplicado", title: "Amplitud para dirigir. Profundidad para decidir.", intro: "Una lectura amplia del escenario permite conectar disciplinas, anticipar dependencias y coordinar especialistas sin perder de vista el resultado final.",
      items: [
        { code: "DIR", title: "Estrategia y dirección tecnológica", description: "Dirección a largo plazo, arquitectura empresarial, portafolios, presupuestos, gobierno, riesgos, equipos y socios en contextos multinacionales.", topics: "CTO · TI · producto · programas · proveedores · ITSM" },
        { code: "SFT", title: "Software y productos digitales", description: "Sistemas web, de escritorio y móviles, plataformas, APIs y arquitecturas distribuidas: de la experiencia y el prototipo a la calidad y la operación continua.", topics: "frontend · backend · APIs · QA · Windows · Linux · macOS · Android · iOS" },
        { code: "AIM", title: "IA, señales y modelos", description: "Creación y aplicación de algoritmos, procesamiento digital de señales, entrenamiento, evaluación y operación de modelos dentro de productos reales.", topics: "DSP · ML · deep learning · LLMs · agentes · RAG · MLOps · GPU" },
        { code: "CLD", title: "Cloud, redes y operaciones", description: "Infraestructuras locales, cloud e híbridas, telecomunicaciones, virtualización, orquestación, observabilidad y fiabilidad operativa.", topics: "AWS · Azure · Google Cloud · Kubernetes/PODs · IaC · DevOps · SRE" },
        { code: "DAT", title: "Datos, integraciones y plataformas", description: "Modelado, bases de datos relacionales y no relacionales, pipelines, mensajería, APIs, eventos e integración entre sistemas propios o de terceros.", topics: "SQL · NoSQL · ETL/ELT · streaming · gobierno de datos · analytics" },
        { code: "SEC", title: "Seguridad y resiliencia", description: "Identidad y acceso, protección por capas, hardening, continuidad, copias, recuperación, respuesta a incidentes y gestión de riesgos tecnológicos.", topics: "IAM · Zero Trust · vulnerabilidades · DR · continuidad · compliance" },
        { code: "AUT", title: "Automatización y sistemas físicos", description: "Electrónica aplicada, sistemas embebidos, microcontroladores, PLCs, sensores y automatización residencial o industrial conectada al software.", topics: "firmware · PCB · IoT · edge · OT · SCADA/HMI · control" },
        { code: "DIG", title: "Presencia y crecimiento digital", description: "Sitios, contenido, redes sociales, publicidad y descubrimiento orgánico integrados con la estrategia de producto y la presencia internacional.", topics: "medios · adquisición pagada · SEO técnico · GEO · LLMO · reputación" },
      ],
    },
    projects: {
      label: "Proyectos", tag: "Ecosistema en movimiento", title: "Productos propios. Colaboraciones internacionales.", intro: "Marcas y plataformas diferentes, conectadas por una misma forma de pensar: construir, integrar, operar y evolucionar.", ownedTitle: "Ecosistema propio", collaborationTitle: "Colaboraciones seleccionadas", holdingsTitle: "Participaciones societarias",
      owned: [
        { name: "NordixBIOS", descriptor: "Agentic AI Factory — infraestructura para crear y operar trabajadores IA en tu software", url: projectUrls.nordixBios, tag: "Más reciente" },
        { name: "NordixAIgency", descriptor: "Agentes de IA que ejecutan acciones reales en software propio y de terceros — llamadas, mensajes, reservas, pedidos — asumiendo trabajo digital que antes requería personas", url: projectUrls.nordixAIgency },
        { name: "Cinteca", descriptor: "Marca tecnológica vinculada a AD Caldas Innotec, S.A.", url: projectUrls.cinteca },
        { name: "LegalNeuron", descriptor: "IA y software para el sector jurídico", url: projectUrls.legalNeuron },
        { name: "NCS Engine", descriptor: "Infraestructura para cargas de IA", url: projectUrls.ncsEngine },
        { name: "Nordix Systems", descriptor: "Sistemas y soluciones digitales", url: projectUrls.nordixSystems },
        { name: "CINTE", descriptor: "Empresa de telecomunicaciones y tecnología constituida en 2004", url: projectUrls.cinte },
      ],
      collaborations: [
        { name: "Plorea · Noruega", descriptor: "Comercio unificado, POS y e-commerce", url: projectUrls.plorea },
        { name: "Grupo Laeras", descriptor: "Plataformas y presencia digital", url: projectUrls.laeras },
        { name: "Innocards Loyalty · Suiza", descriptor: "Fidelización y experiencias conectadas", url: projectUrls.innocards },
      ],
      holdings: [
        { name: "AI Robotics · Noruega", descriptor: "Socio y CTO desde 2025 — robots de servicio autónomos para empresas en Noruega: limpieza, servicio de sala y transporte, con instalación y soporte en todo el país", url: projectUrls.aiRobotics },
      ],
    },
    patents: {
      label: "Patentes", tag: "Propiedad industrial", title: "Invenciones registradas, de la electrónica embebida a las redes neuronales.",
      intro: "Siete solicitudes de patente en dos países: cuatro presentadas en España en 2026 sobre arquitectura y entrenamiento de redes neuronales, con AD Caldas Innotec, S.A. como solicitante, y tres presentadas en Brasil entre 2006 y 2008, con Adriano como titular e inventor.",
      groups: [
        {
          title: "España · OEPM", holder: "Solicitante: AD Caldas Innotec, S.A.",
          patents: [
            { number: patentNumbers.reservoir, title: "Método y sistema de computación condicional con reservorio de neuronas direccionables y selección de cardinalidad exacta", status: "Solicitud presentada el 02/10/2026 · en tramitación" },
            { number: patentNumbers.budget, title: "Método y sistema de reparto de un presupuesto de cómputo por elemento entre capas de una red neuronal", status: "Solicitud presentada el 02/10/2026 · en tramitación" },
            { number: patentNumbers.expansion, title: "Método de ampliación de un reservorio de unidades direccionables de una red neuronal que preserva la función calculada", status: "Solicitud presentada el 02/10/2026 · en tramitación" },
            { number: patentNumbers.rescue, title: "Método de rescate por división de unidades infrautilizadas en un reservorio de unidades direccionables de una red neuronal", status: "Solicitud presentada el 02/10/2026 · en tramitación" },
          ],
        },
        {
          title: "Brasil · INPI", holder: "Titular e inventor: Adriano César Moreno Caldas",
          patents: [
            { number: patentNumbers.fuelSwitch, title: "Conmutador de combustible para automóviles bicombustible o tricombustible (gasolina, alcohol y GNV) con medición digital precisa del volumen de GNV", status: "Presentada el 22/03/2006 · publicada el 20/11/2007 · archivada en 2012" },
            { number: patentNumbers.stethoscope, title: "Estetoscopio electrónico digital con almacenamiento de datos, transmisión inalámbrica, visualización de gráficos y sugerencia de diagnóstico", status: "Presentada el 11/10/2007 · publicada el 16/06/2009 · archivada en 2012" },
            { number: patentNumbers.fuelAnalyser, title: "Analizador de nivel y calidad de combustible vehicular en estaciones de servicio, con transmisión de datos y procesamiento remoto de la información recogida", status: "Presentada el 27/05/2008 · publicada el 17/02/2010 · archivada en 2012" },
          ],
        },
      ],
      note: "Títulos de las solicitudes brasileñas traducidos del portugués original.",
    },
    trajectory: {
      label: "Trayectoria", tag: "Evolución continua", title: "Una línea continua entre investigación, producto y escala.",
      items: [
        { time: "2003", title: "Señales, algoritmos y modelos", description: "Inicio de un trabajo continuo con procesamiento digital de señales y aplicaciones de inteligencia artificial." },
        { time: "2004", title: "CINTE · Telecomunicaciones", description: "La constitución de CINTE marcó el inicio de una trayectoria empresarial centrada en telecomunicaciones y tecnología." },
        { time: "2014", title: "AD Caldas Innotec, S.A.", description: "Estructura societaria española, NIF A66316399, titular de la marca tecnológica Cinteca, para desarrollar productos, prestar servicios y dirigir iniciativas tecnológicas." },
        { time: "HOY", title: "Ecosistema global", description: "Productos propios, colaboraciones internacionales y actividad en software, IA, infraestructura y sistemas conectados." },
      ],
    },
    contact: {
      eyebrow: "Conversaciones profesionales y nuevos proyectos", title: "Conectemos el próximo sistema.", intro: "Envíe su mensaje a través de este canal protegido. En este sitio no se publica ningún correo personal ni número de teléfono.", protectedLabel: "Protegido por Cloudflare Turnstile",
      form: { name: "Nombre", email: "Su correo electrónico", company: "Empresa", optional: "opcional", subject: "Asunto", message: "Mensaje", privacyAcknowledgement: "Acepto el tratamiento de mis datos para responder a este mensaje conforme a la", privacyLink: "política de privacidad", verification: "Verificación humana", send: "Enviar de forma segura", sending: "Enviando…", success: "Mensaje enviado de forma segura. Responderé por correo electrónico.", error: "No se ha podido enviar el mensaje. Revise los campos e inténtelo de nuevo.", turnstileError: "La verificación humana ha caducado o ha fallado. Inténtelo de nuevo.", configurationError: "El canal protegido todavía no está configurado para este dominio." },
    },
    footer: { back: "Volver al inicio", privacyNote: "Sin analítica publicitaria ni de audiencia. Contacto protegido.", legal: "Aviso legal", privacy: "Privacidad" },
    jsonDescription: "Liderazgo tecnológico, creación de software, inteligencia artificial, telecomunicaciones, automatización y operación de infraestructuras globales.",
  },
  nb: {
    htmlLang: "nb",
    metadata: {
      title: "Adriano César Moreno Caldas · Teknologi, produkt og drift",
      description: "Adriano César Moreno Caldas’ personlige nettsted: teknologiledelse, programvare, kunstig intelligens, sky, telekommunikasjon, automatisering og digitale produkter — inkludert NordixBIOS, Agentic AI Factory.",
    },
    navigationLabel: "Hovednavigasjon", languageLabel: "Språk", headerLine: "Strategi · Systemer · Drift",
    nav: { profile: "Profil", capabilities: "Kompetanse", projects: "Prosjekter", patents: "Patenter", trajectory: "Utvikling", contact: "Kontakt", menu: "Meny" },
    hero: { kicker: "Siden 2003 · global aktivitet", statement: "Teknologi fra ende til ende: fra beslutning til produksjon, fra algoritme til global drift.", trajectoryLink: "Se utviklingen", orbitAria: "Teknologikanaler", coordinate: "GLOBAL / 24T", now: "i dag", strategy: "strategi", software: "programvare", ai: "KI", operations: "drift", systems: "systemer" },
    console: { channel: "Kanal", readout: "Avlesninger", collaborations: "Samarbeid", status: "Status", statusValue: "I drift", protectedContact: "Beskyttet kontakt", secureChannel: "Sikker kanal" },
    signal: { label: "Oversikt over aktivitet", items: ["Teknologiledelse", "Egne produkter", "Utvalgte samarbeid", "Global aktivitet"] },
    profile: {
      label: "Profil", tag: "Et helhetlig perspektiv", title: "Å koble sammen visjon, teknologi og operativ virkelighet.", portraitLabel: "Personen bak systemene", portraitText: "Teknisk nysgjerrighet, helhetsblikk og ansvar for det som skjer etter leveransen.",
      lead: "Adriano arbeider i skjæringspunktet mellom teknologiledelse, produktutvikling og drift av komplekse miljøer. Han har hatt CTO-roller i multinasjonale virksomheter og leder egne og eksterne initiativer i flere land.",
      bodyOne: "Siden 2003 har han arbeidet med digital signalbehandling, algoritmer for kunstig intelligens og trening av modeller. Dette grunnlaget har utviklet seg til bred aktivitet innen programvare, telekommunikasjon, sky, nettverk, automatisering og anvendt elektronikk.",
      bodyTwo: "Rollen endres med utfordringen: sette retning, dele opp et problem, samle riktig team, velge plattformer, følge leveransen eller ta ansvar for driften. Det konstante er å gjøre kompleksitet om til systemer som fungerer i den virkelige verden.",
      principleLabel: "Arbeidsprinsipp", principle: "Teknologi skaper bare verdi når strategi, produkt og drift kan snakke sammen.",
    },
    capabilities: {
      label: "Kompetanse", tag: "Anvendt kunnskap", title: "Bredde til å lede. Dybde til å beslutte.", intro: "Et bredt perspektiv kobler sammen fagområder, forutser avhengigheter og koordinerer spesialister uten å miste sluttresultatet av syne.",
      items: [
        { code: "DIR", title: "Teknologistrategi og ledelse", description: "Langsiktig retning, virksomhetsarkitektur, porteføljer, budsjetter, styring, risiko, team og partnere i multinasjonale sammenhenger.", topics: "CTO · IT · produkt · programmer · leverandører · ITSM" },
        { code: "SFT", title: "Programvare og digitale produkter", description: "Web-, skrivebords- og mobilsystemer, plattformer, API-er og distribuert arkitektur — fra opplevelse og prototype til kvalitet og kontinuerlig drift.", topics: "frontend · backend · API-er · QA · Windows · Linux · macOS · Android · iOS" },
        { code: "AIM", title: "KI, signaler og modeller", description: "Utvikling og bruk av algoritmer, digital signalbehandling, trening, evaluering og drift av modeller i reelle produkter.", topics: "DSP · ML · deep learning · LLM-er · agenter · RAG · MLOps · GPU" },
        { code: "CLD", title: "Sky, nettverk og drift", description: "Lokal, skybasert og hybrid infrastruktur, telekommunikasjon, virtualisering, orkestrering, observerbarhet og operativ pålitelighet.", topics: "AWS · Azure · Google Cloud · Kubernetes/PODs · IaC · DevOps · SRE" },
        { code: "DAT", title: "Data, integrasjoner og plattformer", description: "Modellering, relasjonelle og ikke-relasjonelle databaser, pipelines, meldinger, API-er, hendelser og integrasjon mellom egne og eksterne systemer.", topics: "SQL · NoSQL · ETL/ELT · strømming · datastyring · analyse" },
        { code: "SEC", title: "Sikkerhet og robusthet", description: "Identitet og tilgang, lagdelt beskyttelse, herding, kontinuitet, sikkerhetskopier, gjenoppretting, hendelseshåndtering og teknologirisiko.", topics: "IAM · Zero Trust · sårbarheter · DR · kontinuitet · etterlevelse" },
        { code: "AUT", title: "Automatisering og fysiske systemer", description: "Anvendt elektronikk, innebygde systemer, mikrokontrollere, PLS-er, sensorer og bolig- eller industriautomatisering koblet til programvare.", topics: "firmware · PCB · IoT · edge · OT · SCADA/HMI · styring" },
        { code: "DIG", title: "Digital tilstedeværelse og vekst", description: "Nettsteder, innhold, sosiale medier, annonsering og organisk synlighet koblet til produktstrategi og internasjonal tilstedeværelse.", topics: "medier · betalt synlighet · teknisk SEO · GEO · LLMO · omdømme" },
      ],
    },
    projects: {
      label: "Prosjekter", tag: "Et økosystem i bevegelse", title: "Egne produkter. Internasjonale samarbeid.", intro: "Ulike merker og plattformer, koblet sammen av samme tilnærming: bygge, integrere, drifte og videreutvikle.", ownedTitle: "Eget økosystem", collaborationTitle: "Utvalgte samarbeid", holdingsTitle: "Eierandeler",
      owned: [
        { name: "NordixBIOS", descriptor: "Agentic AI Factory — infrastruktur for å skape og drifte KI-arbeidere i programvaren din", url: projectUrls.nordixBios, tag: "Nyeste" },
        { name: "NordixAIgency", descriptor: "KI-agenter som utfører reelle handlinger i egen og ekstern programvare — samtaler, meldinger, bookinger, bestillinger — og tar over digitalt arbeid som før krevde mennesker", url: projectUrls.nordixAIgency },
        { name: "Cinteca", descriptor: "Teknologimerke knyttet til AD Caldas Innotec, S.A.", url: projectUrls.cinteca },
        { name: "LegalNeuron", descriptor: "KI og programvare for juridisk sektor", url: projectUrls.legalNeuron },
        { name: "NCS Engine", descriptor: "Infrastruktur for KI-arbeidslaster", url: projectUrls.ncsEngine },
        { name: "Nordix Systems", descriptor: "Digitale systemer og løsninger", url: projectUrls.nordixSystems },
        { name: "CINTE", descriptor: "Telekommunikasjons- og teknologiselskap etablert i 2004", url: projectUrls.cinte },
      ],
      collaborations: [
        { name: "Plorea · Norge", descriptor: "Samlet handel, POS og e-handel", url: projectUrls.plorea },
        { name: "Grupo Laeras", descriptor: "Plattformer og digital tilstedeværelse", url: projectUrls.laeras },
        { name: "Innocards Loyalty · Sveits", descriptor: "Lojalitet og sammenkoblede opplevelser", url: projectUrls.innocards },
      ],
      holdings: [
        { name: "AI Robotics · Norge", descriptor: "Medeier og CTO siden 2025 — autonome serviceroboter for norske virksomheter: rengjøring, servering og transport, med installasjon og service i hele landet", url: projectUrls.aiRobotics },
      ],
    },
    patents: {
      label: "Patenter", tag: "Industrielt rettsvern", title: "Registrerte oppfinnelser, fra innebygd elektronikk til nevrale nettverk.",
      intro: "Sju patentsøknader i to land: fire levert i Spania i 2026 om arkitektur og trening av nevrale nettverk, med AD Caldas Innotec, S.A. som søker, og tre levert i Brasil mellom 2006 og 2008, med Adriano som innehaver og oppfinner.",
      groups: [
        {
          title: "Spania · OEPM", holder: "Søker: AD Caldas Innotec, S.A.",
          patents: [
            { number: patentNumbers.reservoir, title: "Metode og system for betinget beregning med et reservoar av adresserbare nevroner og utvalg med eksakt kardinalitet", status: "Søknad levert 02.10.2026 · under behandling" },
            { number: patentNumbers.budget, title: "Metode og system for fordeling av et beregningsbudsjett per element mellom lagene i et nevralt nettverk", status: "Søknad levert 02.10.2026 · under behandling" },
            { number: patentNumbers.expansion, title: "Metode for utvidelse av et reservoar av adresserbare enheter i et nevralt nettverk som bevarer den beregnede funksjonen", status: "Søknad levert 02.10.2026 · under behandling" },
            { number: patentNumbers.rescue, title: "Metode for redning av underutnyttede enheter ved deling i et reservoar av adresserbare enheter i et nevralt nettverk", status: "Søknad levert 02.10.2026 · under behandling" },
          ],
        },
        {
          title: "Brasil · INPI", holder: "Innehaver og oppfinner: Adriano César Moreno Caldas",
          patents: [
            { number: patentNumbers.fuelSwitch, title: "Drivstoffvelger for biler med to eller tre drivstoff (bensin, etanol og CNG) med presis digital måling av CNG-volumet", status: "Levert 22.03.2006 · publisert 20.11.2007 · henlagt 2012" },
            { number: patentNumbers.stethoscope, title: "Digitalt elektronisk stetoskop med datalagring, trådløs overføring, grafisk visning og diagnoseforslag", status: "Levert 11.10.2007 · publisert 16.06.2009 · henlagt 2012" },
            { number: patentNumbers.fuelAnalyser, title: "Analysator for nivå og kvalitet på drivstoff ved bensinstasjoner, med dataoverføring og fjernbehandling av innsamlede data", status: "Levert 27.05.2008 · publisert 17.02.2010 · henlagt 2012" },
          ],
        },
      ],
      note: "Titlene er oversatt fra originalspråkene (spansk og portugisisk).",
    },
    trajectory: {
      label: "Utvikling", tag: "Kontinuerlig utvikling", title: "En sammenhengende linje mellom forskning, produkt og skala.",
      items: [
        { time: "2003", title: "Signaler, algoritmer og modeller", description: "Starten på kontinuerlig arbeid med digital signalbehandling og anvendelser av kunstig intelligens." },
        { time: "2004", title: "CINTE · Telekommunikasjon", description: "Etableringen av CINTE markerte starten på en forretningsreise med fokus på telekommunikasjon og teknologi." },
        { time: "2014", title: "AD Caldas Innotec, S.A.", description: "Spansk selskapsstruktur, skatte-ID A66316399, eier av teknologimerket Cinteca, for å utvikle produkter, levere tjenester og lede teknologiske initiativer." },
        { time: "I DAG", title: "Globalt økosystem", description: "Egne produkter, internasjonale samarbeid og aktivitet innen programvare, KI, infrastruktur og sammenkoblede systemer." },
      ],
    },
    contact: {
      eyebrow: "Profesjonelle samtaler og nye prosjekter", title: "La oss koble sammen det neste systemet.", intro: "Send meldingen gjennom denne beskyttede kanalen. Ingen personlig e-postadresse eller telefonnummer publiseres på nettstedet.", protectedLabel: "Beskyttet av Cloudflare Turnstile",
      form: { name: "Navn", email: "Din e-post", company: "Selskap", optional: "valgfritt", subject: "Emne", message: "Melding", privacyAcknowledgement: "Jeg godtar behandling av opplysningene mine for å besvare denne meldingen i henhold til", privacyLink: "personvernerklæringen", verification: "Menneskelig verifisering", send: "Send sikkert", sending: "Sender…", success: "Meldingen er sendt sikkert. Jeg svarer på e-post.", error: "Meldingen kunne ikke sendes. Kontroller feltene og prøv igjen.", turnstileError: "Den menneskelige verifiseringen utløp eller mislyktes. Prøv igjen.", configurationError: "Den beskyttede kanalen er ennå ikke konfigurert for dette domenet." },
    },
    footer: { back: "Tilbake til toppen", privacyNote: "Ingen annonse- eller publikumsanalyse. Beskyttet kontakt.", legal: "Juridisk informasjon", privacy: "Personvern" },
    jsonDescription: "Teknologiledelse, utvikling av programvare, kunstig intelligens, telekommunikasjon, automatisering og global infrastrukturdrift.",
  },
};

export function resolveLocale(languageTags: readonly string[]): Locale {
  for (const languageTag of languageTags) {
    const normalised = languageTag.trim().toLowerCase();
    const base = normalised.split("-")[0];

    if (base === "pt" || base === "en" || base === "es") return base;
    if (base === "nb" || base === "no") return "nb";
  }

  return "en";
}
