export type LanguageCode = 'EN' | 'ES' | 'FR' | 'HI';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'EN', name: 'English', nativeName: 'English' },
  { code: 'ES', name: 'Spanish', nativeName: 'Español' },
  { code: 'FR', name: 'French', nativeName: 'Français' },
  { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी' },
];

export interface ProjectTranslation {
  id: number;
  title: string;
  category: string;
  role: string;
  shortDesc: string;
  description: string;
  challenges: string;
}

export interface Translations {
  nav: {
    home: string;
    about: string;
    stack: string;
    projects: string;
    connect: string;
    resume: string;
    soundOn: string;
    soundOff: string;
    themeDark: string;
    themeLight: string;
    langTitle: string;
  };
  hero: {
    sysOnline: string;
    identityProtocol: string;
    roles: string[];
    bio: string;
    exploreBtn: string;
    contactBtn: string;
    philosophyTitle: string;
    philosophyQuote: string;
    role1Tag: string;
    role1Title: string;
    role1Desc: string;
    role2Tag: string;
    role2Title: string;
    role2Desc: string;
    role3Tag: string;
    role3Title: string;
    role3Desc: string;
    revealHint: string;
    liveTime: string;
  };
  about: {
    heading: string;
    idBadge: string;
    dragBadge: string;
    cardTag: string;
    subheading: string;
    summary: string;
    readFullBtn: string;
    modalTitle: string;
    modalSubtitle: string;
    closeBtn: string;
    experienceTitle: string;
    philosophyTitle: string;
    modalPhilosophy: string;
    highlightsTitle: string;
    highlight1: string;
    highlight2: string;
    highlight3: string;
  };
  stack: {
    heading: string;
    subheading: string;
    description: string;
    targetHint: string;
  };
  projects: {
    heading: string;
    subheading: string;
    description: string;
    filterLabel: string;
    filters: string[];
    indexLabel: string;
    scrollHint: string;
    flipHint: string;
    liveDemo: string;
    sourceCode: string;
    techStack: string;
    architecture: string;
    keyChallenges: string;
    items: ProjectTranslation[];
  };
  connect: {
    heading: string;
    subheading: string;
    status: string;
    emailDispatch: string;
    copyBtn: string;
    copiedBtn: string;
    mailBtn: string;
    locationTitle: string;
    locationVal: string;
    responseTitle: string;
    responseVal: string;
    downloadCvBtn: string;
    formTag: string;
    formTitle: string;
    formDesc: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    sendingBtn: string;
    successTitle: string;
    successDesc: string;
  };
  footer: {
    statusOpen: string;
    roleDesc: string;
    navTitle: string;
    expertiseTitle: string;
    networkTitle: string;
    designedBy: string;
    rights: string;
    localTime: string;
  };
  loading: {
    initialTitle: string;
    changingLangTitle: string;
    initStep1: string;
    initStep2: string;
    initStep3: string;
    initStep4: string;
    langStep1: string;
    langStep2: string;
    langStep3: string;
    langStep4: string;
  };
  likes: {
    tooltip: string;
    liked: string;
    likeCount: string;
  };
}

export const translations: Record<LanguageCode, Translations> = {
  EN: {
    nav: {
      home: 'Home',
      about: 'About',
      stack: 'Stack',
      projects: 'Projects',
      connect: 'Connect',
      resume: 'Resume',
      soundOn: 'Sound Effects: On',
      soundOff: 'Sound Effects: Off',
      themeDark: 'Theme: Dark (click for Light)',
      themeLight: 'Theme: Light (click for Dark)',
      langTitle: 'Language Selector',
    },
    hero: {
      sysOnline: 'SYS://ONLINE',
      identityProtocol: '// IDENTITY PROTOCOL',
      roles: ['ARNAV RAJ', 'NETXSPIDER'],
      bio: 'Architecting intelligent full-stack systems and machine learning models with uncompromising, minimalist dark-mode aesthetics.',
      exploreBtn: 'Explore Projects',
      contactBtn: 'Get In Touch',
      philosophyTitle: '// PHILOSOPHY',
      philosophyQuote: '“Where rigorous logic meets visual restraint, technology becomes art.”',
      role1Tag: '01 / INTERFACE & INTERACTION',
      role1Title: 'Web Designer',
      role1Desc: 'Minimalist UI • Motion • Craft',
      role2Tag: '02 / ARCHITECTURE & PLATFORMS',
      role2Title: 'Full Stack Developer',
      role2Desc: 'React • Next.js • Node • Scalability',
      role3Tag: '03 / INTELLIGENCE & MODELS',
      role3Title: 'Data Scientist',
      role3Desc: 'PyTorch • GenAI • Computer Vision',
      revealHint: 'Move cursor over portrait to reveal cybernetic layer',
      liveTime: 'LOCAL SYSTEM TIME',
    },
    about: {
      heading: '01. About Me',
      idBadge: 'ID // PASS-2026',
      dragBadge: 'DRAG BADGE',
      cardTag: 'RAPIER3D // INTERACTIVE',
      subheading: 'Bridging Intelligent Systems & Fluid Digital Interfaces.',
      summary: 'I engineer end-to-end intelligent systems, merging high-performance full-stack architectures with deep learning models. My work bridges mathematical precision with tactile, micro-animated digital interfaces that feel alive and responsive.',
      readFullBtn: 'Read Full Version',
      modalTitle: 'Arnav Raj // Engineering Narrative',
      modalSubtitle: 'Systems Architect, AI Researcher & Interaction Craftsman',
      closeBtn: 'Close',
      experienceTitle: 'Core Engineering Mindset',
      philosophyTitle: 'Architectural Philosophy',
      modalPhilosophy: 'I believe digital artifacts should be as mechanically robust underneath as they are visually serene on the surface. True software craftsmanship is found in deterministic code, low-latency rendering, and interfaces that respect human focus.',
      highlightsTitle: 'Key Focus Areas',
      highlight1: 'Full-Stack Scalability: Distributed backend services, reactive frontends, and micro-animations with 60FPS fluid physics.',
      highlight2: 'Machine Learning & Vision: Neural architectures, Computer Vision pipelines, and Generative AI systems built on PyTorch.',
      highlight3: 'Interface Restraint: Cyberpunk-infused minimalist design, bespoke typography, and purposeful motion design.',
    },
    stack: {
      heading: '02. Tech Stack',
      subheading: 'Engineering Platforms, Deep Learning & Scalable Frameworks.',
      description: 'A comprehensive toolkit spanning web architecture, cloud backends, and machine intelligence models.',
      targetHint: 'TARGET CURSOR // HOVER CARDS',
    },
    projects: {
      heading: '03. Projects',
      subheading: 'Architected for Scale, Intelligence & Experience.',
      description: 'Scroll horizontally to inspect each system. Click any poster to flip the card and explore architecture details.',
      filterLabel: '// Domain Filter',
      filters: ['ALL', 'AI & SYSTEMS', 'FULL STACK', 'MOBILE & TOOLS'],
      indexLabel: 'INDEX //',
      scrollHint: 'Scroll down or click card to flip',
      flipHint: 'Click to Flip Back',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      techStack: 'Tech Stack',
      architecture: 'System Architecture',
      keyChallenges: 'Key Challenges & Optimizations',
      items: [
        {
          id: 1,
          title: 'MyLullaby',
          category: 'AI & Systems',
          role: 'AI Sleep Companion & Face-to-Face Therapy',
          shortDesc: 'Generative Sleep Stories & Multimodal AI Avatar Sessions',
          description: 'A holistic emotional wellness platform featuring generative bedtime stories powered by Gemini 2.5 + Google Cloud TTS, and real-time interactive video therapy with Tavus avatars across 15+ languages.',
          challenges: 'Engineered sub-800ms streaming story generation, Tavus avatar synchronization, and privacy-first context memory.',
        },
        {
          id: 2,
          title: 'KSP Intelligence Copilot',
          category: 'AI & Systems',
          role: 'Karnataka State Police Investigation Assistant',
          shortDesc: 'Evidence-Grounded Intelligence for Modern Investigations',
          description: 'Local-first investigative copilot for Karnataka State Police with 5,000 relational FIR records, safe deterministic SQL search, SQLite FTS5 RAG retrieval, relationship graphs, and Amazon Bedrock Nova Lite synthesis.',
          challenges: 'Guaranteed 0% hallucinated SQL queries across 5,000 records with sub-50ms hybrid FTS5 and graph traversal.',
        },
        {
          id: 3,
          title: 'POLARIS',
          category: 'AI & Systems',
          role: 'AI Antarctic Sea-Ice & Navigation System',
          shortDesc: '3D Navigation Corridor & Tabular Iceberg Trajectory Forecasting',
          description: 'Prototype for Smart India Hackathon (SIH 2026) with MoES / NCPOR. Lat/lon-accurate 3D Antarctic navigation corridor predicting sea-ice risk via CNN segmentation, tabular iceberg trajectories via LSTM + Coriolis mechanics, and dynamic A* vessel routing.',
          challenges: 'Coupled hydrodynamic ocean currents and Coriolis drift models in PyTorch with 60FPS CesiumJS 3D bathymetric globe rendering.',
        },
        {
          id: 4,
          title: 'Newift',
          category: 'Full Stack',
          role: 'Real-Time Viral Trends & Breaking News Hub',
          shortDesc: "What's Trending Now, Delivered Swift",
          description: 'High-velocity real-time editorial platform delivering breaking updates, tech insights, and viral pop culture moments with high-frequency live feeds, dark editorial typography, and instant curation.',
          challenges: 'Engineered sub-30ms WebSocket news streaming with automated ISR cache invalidation across 50,000+ monthly readers.',
        },
        {
          id: 5,
          title: 'Sumit Sandhu Portfolio',
          category: 'Full Stack',
          role: 'Luxury Brand & Graphic Design Showcase',
          shortDesc: 'Crafting Visual Stories That Resonate',
          description: 'Bespoke digital portfolio engineered for high-end graphic and identity design, featuring fluid GSAP scroll interactions, dark gold aesthetic tokens, and interactive project galleries.',
          challenges: 'Achieved flawless 60FPS hardware-accelerated scroll pinning and responsive WebGL image distortion shaders.',
        },
        {
          id: 6,
          title: 'Thread Simulator',
          category: 'Full Stack',
          role: 'Real-Time OS Visualization & Scheduling Engine',
          shortDesc: 'Demystifying Operating System Concurrency',
          description: 'Interactive educational simulator visualizing OS multi-threading, concurrency hazards (race conditions, deadlocks), and CPU scheduling algorithms (Round Robin, FCFS, Priority) with canvas-based execution pipelines.',
          challenges: 'Rendered microsecond-accurate OS thread lifecycle transitions and deadlock detection algorithms on interactive HTML5 canvas.',
        },
        {
          id: 7,
          title: 'LPU Auto-Connect v2.0',
          category: 'Mobile & Tools',
          role: 'Chrome Extension & Student Productivity Hub',
          shortDesc: 'Automated WiFi Captive Portal Auth & University Suite',
          description: 'Intelligent campus Wi-Fi productivity hub featuring automated captive portal authentication with OCR captcha solving, one-click SSO login for university portals (UMS, MyClass, OAS), real-time Wi-Fi latency health tests, and background keep-alive.',
          challenges: 'Engineered in-browser Tesseract OCR pipeline to solve dynamic distorted captchas in <350ms, with robust background service worker keep-alive.',
        },
        {
          id: 8,
          title: 'Daily Sage 🌿',
          category: 'Mobile & Tools',
          role: 'Offline Mindfulness & Reflection App',
          shortDesc: 'Daily Mindfulness. One Breath at a Time.',
          description: 'Cross-platform React Native & Expo mobile mindfulness companion featuring guided 4-7-8 breathing exercises with soothing animations, an encrypted offline-first personal reflection diary with mood tracking, curated daily affirmations, and smart local scheduled notifications.',
          challenges: 'Implemented smooth 60FPS breathing animations with Reanimated, local AES-encrypted AsyncStorage diary, and background notification triggers.',
        },
        {
          id: 9,
          title: 'Swift Share',
          category: 'Mobile & Tools',
          role: 'Local Wireless File Transfer & Sync Utility',
          shortDesc: 'Fast, Secure Wireless File Sync on Local Wi-Fi',
          description: 'High-speed local Wi-Fi peer-to-peer file transfer utility enabling direct wireless browsing, media streaming, and high-throughput multi-file downloads between Android devices and desktop web browsers without internet access, third-party cables, or cloud dependencies.',
          challenges: 'Built high-throughput local embedded HTTP streaming server on Android with chunked transfers sustaining 30MB/s+ over local WLAN.',
        },
      ],
    },
    connect: {
      heading: "04. Let's Connect",
      subheading: "Let's Build Something Extraordinary.",
      status: 'STATUS // OPEN TO INNOVATION',
      emailDispatch: '// Direct Email Dispatch',
      copyBtn: 'COPY',
      copiedBtn: 'COPIED',
      mailBtn: 'MAIL',
      locationTitle: 'Location',
      locationVal: 'India [IST]',
      responseTitle: 'Response Window',
      responseVal: 'Within 24–48h',
      downloadCvBtn: 'DOWNLOAD RESUME (PDF)',
      formTag: '// Direct Mail Interface',
      formTitle: 'Send a Message',
      formDesc: 'Direct dispatch to netxspider@gmail.com',
      nameLabel: 'Your Name *',
      namePlaceholder: 'John Doe',
      emailLabel: 'Your Email *',
      emailPlaceholder: 'john@example.com',
      subjectLabel: 'Project / Role Subject',
      subjectPlaceholder: 'AI Collaboration / Full Stack Inquiry',
      messageLabel: 'Your Message *',
      messagePlaceholder: 'Tell me about your project, timeline, or technical requirements...',
      sendBtn: 'DISPATCH MESSAGE',
      sendingBtn: 'TRANSMITTING...',
      successTitle: 'Message Dispatched Successfully',
      successDesc: "Thank you! Delivered to Arnav's inbox. Expect a reply within 24–48 hours.",
    },
    footer: {
      statusOpen: 'SYSTEM STATUS: FULL OPERATIONAL CAPACITY',
      roleDesc: 'Architecting intelligent software systems, computer vision models, and fluid digital experiences.',
      navTitle: 'Navigation',
      expertiseTitle: 'Specializations',
      networkTitle: 'Direct Network',
      designedBy: 'Designed & Engineered by Arnav Raj',
      rights: 'All rights reserved. Built with precision and care.',
      localTime: 'IST TIME // NEW DELHI, INDIA',
    },
    loading: {
      initialTitle: 'INITIALIZING ARNAV RAJ PORTFOLIO...',
      changingLangTitle: 'CONFIGURING LOCALIZATION MATRIX...',
      initStep1: '[KERNEL] INITIALIZING CORE RUNTIME ENGINES...',
      initStep2: '[GRAPHICS] PRE-COMPILING THREE.JS & RAPIER3D PHYSICS...',
      initStep3: '[TELEMETRY] CALIBRATING HIGH-PRECISION MOTION SURFACES...',
      initStep4: '[SECURE] PROTOCOLS VERIFIED // SYSTEM ONLINE',
      langStep1: '[LOCALE] RESOLVING LINGUISTIC SCHEMA: ENGLISH [EN]...',
      langStep2: '[PARSER] COMPILING SEMANTIC DICTIONARIES...',
      langStep3: '[DOM] RE-APPLYING TYPOGRAPHY & FLUID WRAPPERS...',
      langStep4: '[SYNCHRONIZED] LOCALE TRANSFORMATION COMPLETE',
    },
    likes: {
      tooltip: 'Drop a like',
      liked: 'Thanks for the love!',
      likeCount: 'Likes',
    },
  },

  ES: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Mí',
      stack: 'Tecnologías',
      projects: 'Proyectos',
      connect: 'Contacto',
      resume: 'Currículum',
      soundOn: 'Efectos de Sonido: Activados',
      soundOff: 'Efectos de Sonido: Desactivados',
      themeDark: 'Tema: Oscuro (clic para Claro)',
      themeLight: 'Tema: Claro (clic para Oscuro)',
      langTitle: 'Selector de Idioma',
    },
    hero: {
      sysOnline: 'SIS://EN LÍNEA',
      identityProtocol: '// PROTOCOLO DE IDENTIDAD',
      roles: ['ARNAV RAJ', 'NETXSPIDER'],
      bio: 'Arquitectura de sistemas full-stack inteligentes y modelos de machine learning con una estética minimalista en modo oscuro sin concesiones.',
      exploreBtn: 'Explorar Proyectos',
      contactBtn: 'Contactar',
      philosophyTitle: '// FILOSOFÍA',
      philosophyQuote: '“Donde la lógica rigurosa se encuentra con la sobriedad visual, la tecnología se convierte en arte.”',
      role1Tag: '01 / INTERFAZ E INTERACCIÓN',
      role1Title: 'Diseñador Web',
      role1Desc: 'UI Minimalista • Movimiento • Oficio',
      role2Tag: '02 / ARQUITECTURA Y PLATAFORMAS',
      role2Title: 'Desarrollador Full Stack',
      role2Desc: 'React • Next.js • Node • Escalabilidad',
      role3Tag: '03 / INTELIGENCIA Y MODELOS',
      role3Title: 'Científico de Datos',
      role3Desc: 'PyTorch • GenAI • Visión Computacional',
      revealHint: 'Mueve el cursor sobre el retrato para revelar la capa cibernética',
      liveTime: 'HORA LOCAL DEL SISTEMA',
    },
    about: {
      heading: '01. Sobre Mí',
      idBadge: 'ID // PASE-2026',
      dragBadge: 'ARRASTRAR',
      cardTag: 'RAPIER3D // INTERACTIVO',
      subheading: 'Conectando Sistemas Inteligentes con Interfaces Digitales Fluidas.',
      summary: 'Diseño sistemas inteligentes de extremo a extremo, uniendo arquitecturas full-stack de alto rendimiento con modelos de deep learning. Mi trabajo combina la precisión matemática con interfaces digitales táctiles y microanimadas que transmiten vida y dinamismo.',
      readFullBtn: 'Leer Versión Completa',
      modalTitle: 'Arnav Raj // Narrativa de Ingeniería',
      modalSubtitle: 'Arquitecto de Sistemas, Investigador de IA y Artesano de Interacción',
      closeBtn: 'Cerrar',
      experienceTitle: 'Mentalidad de Ingeniería',
      philosophyTitle: 'Filosofía Arquitectónica',
      modalPhilosophy: 'Creo que los artefactos digitales deben ser tan mecánicamente robustos por debajo como visualmente serenos en la superficie. La verdadera maestría del software radica en el código determinista, la baja latencia y el respeto por la concentración humana.',
      highlightsTitle: 'Áreas de Especialización',
      highlight1: 'Escalabilidad Full-Stack: Microservicios distribuidos, frontends reactivos y microanimaciones fluidas a 60FPS.',
      highlight2: 'Machine Learning y Visión: Arquitecturas neuronales, canales de visión por computadora e IA generativa en PyTorch.',
      highlight3: 'Sobriedad Visual: Diseño minimalista con influencia cyberpunk, tipografía cuidada y animaciones intencionales.',
    },
    stack: {
      heading: '02. Tecnologías',
      subheading: 'Plataformas de Ingeniería, Deep Learning y Marcos Escalables.',
      description: 'Un conjunto integral de herramientas que abarca arquitectura web, backend en la nube y modelos de inteligencia artificial.',
      targetHint: 'CURSOR OBJETIVO // TARJETAS HOVER',
    },
    projects: {
      heading: '03. Proyectos',
      subheading: 'Diseñados para Escalar, Inteligencia y Experiencia.',
      description: 'Desplaza horizontalmente para explorar cada sistema. Haz clic en cualquier tarjeta para voltearla e inspeccionar detalles de arquitectura.',
      filterLabel: '// Filtro por Dominio',
      filters: ['TODOS', 'IA Y SISTEMAS', 'FULL STACK', 'MÓVIL Y HERRAMIENTAS'],
      indexLabel: 'ÍNDICE //',
      scrollHint: 'Desplázate hacia abajo o haz clic para voltear',
      flipHint: 'Clic para Voltear',
      liveDemo: 'Demo en Vivo',
      sourceCode: 'Código Fuente',
      techStack: 'Tecnologías',
      architecture: 'Arquitectura del Sistema',
      keyChallenges: 'Desafíos Clave y Optimizaciones',
      items: [
        {
          id: 1,
          title: 'MyLullaby',
          category: 'IA y Sistemas',
          role: 'Compañero de Sueño IA y Terapia Cara a Cara',
          shortDesc: 'Cuentos generativos para dormir y terapia interactiva con avatares IA',
          description: 'Plataforma holística de bienestar emocional con cuentos generativos impulsados por Gemini 2.5 + Google Cloud TTS, y terapia de video interactiva en tiempo real con avatares de Tavus en más de 15 idiomas.',
          challenges: 'Generación de historias en streaming en menos de 800 ms, sincronización labial con Tavus y memoria con privacidad garantizada.',
        },
        {
          id: 2,
          title: 'KSP Intelligence Copilot',
          category: 'IA y Sistemas',
          role: 'Asistente de Investigación Policial de Karnataka',
          shortDesc: 'Inteligencia basada en evidencias para investigaciones modernas',
          description: 'Copiloto de investigación local para la Policía de Karnataka con 5,000 registros FIR relacionales, búsqueda SQL determinista, recuperación RAG con SQLite FTS5, grafos de relaciones y síntesis de Amazon Bedrock Nova Lite.',
          challenges: 'Cero por ciento de consultas SQL alucinadas en 5,000 registros con búsqueda híbrida FTS5 y recorrido de grafos en menos de 50 ms.',
        },
        {
          id: 3,
          title: 'POLARIS',
          category: 'IA y Sistemas',
          role: 'Sistema de Navegación y Hielo Antártico con IA',
          shortDesc: 'Corredor de navegación 3D y pronóstico de trayectorias de icebergs',
          description: 'Prototipo para Smart India Hackathon (SIH 2026) con MoES / NCPOR. Corredor antártico 3D que predice el riesgo de hielo marino mediante segmentación CNN, trayectorias de icebergs con LSTM + Coriolis y rutas dinámicas A*.',
          challenges: 'Modelado acoplado de corrientes oceánicas y fuerza de Coriolis en PyTorch con renderizado CesiumJS a 60 FPS.',
        },
        {
          id: 4,
          title: 'Newift',
          category: 'Full Stack',
          role: 'Tendencias Virales en Tiempo Real y Noticias',
          shortDesc: 'Lo más destacado al instante, entregado con rapidez',
          description: 'Plataforma editorial de alta velocidad que ofrece actualizaciones de última hora, avances tecnológicos y tendencias virales con transmisiones en vivo y tipografía editorial oscura.',
          challenges: 'Transmisión de noticias por WebSockets en menos de 30 ms con revalidación ISR para más de 50,000 lectores mensuales.',
        },
        {
          id: 5,
          title: 'Sumit Sandhu Portfolio',
          category: 'Full Stack',
          role: 'Muestra de Diseño Gráfico y Marcas de Lujo',
          shortDesc: 'Creando historias visuales que resuenan',
          description: 'Portafolio digital a medida desarrollado para diseño de identidad y branding de alto nivel, con interacciones de desplazamiento GSAP fluidas, tokens en oro oscuro y galerías interactivas.',
          challenges: 'Fijación de desplazamiento acelerada por hardware a 60 FPS y shaders de distorsión WebGL reactivos.',
        },
        {
          id: 6,
          title: 'Thread Simulator',
          category: 'Full Stack',
          role: 'Simulador y Motor de Planificación de SO',
          shortDesc: 'Desmitificando la concurrencia en sistemas operativos',
          description: 'Simulador educativo interactivo que visualiza subprocesos, riesgos de concurrencia (condiciones de carrera, bloqueos mutuos) y algoritmos de planificación de CPU (Round Robin, FCFS, Prioridad).',
          challenges: 'Renderizado con precisión de microsegundos del ciclo de vida de hilos y detección de deadlocks en lienzo interactivo.',
        },
        {
          id: 7,
          title: 'LPU Auto-Connect v2.0',
          category: 'Móvil y Herramientas',
          role: 'Extensión de Chrome y Centro de Productividad Estudiantil',
          shortDesc: 'Autenticación automatizada de portal cautivo WiFi y suite universitaria',
          description: 'Extensión inteligente para el navegador que automatiza el inicio de sesión en el portal cautivo de la red Wi-Fi universitaria mediante OCR para captchas, inicio de sesión único para portales (UMS, MyClass, OAS), pruebas de latencia en tiempo real y mantenimiento de sesión en segundo plano.',
          challenges: 'Canal de OCR con Tesseract en el navegador para resolver captchas en menos de 350 ms y persistencia de service worker en segundo plano.',
        },
        {
          id: 8,
          title: 'Daily Sage 🌿',
          category: 'Móvil y Herramientas',
          role: 'Aplicación Móvil de Mindfulness y Reflexión Sin Conexión',
          shortDesc: 'Mindfulness diario. Una respiración a la vez.',
          description: 'Aplicación móvil de bienestar emocional en React Native y Expo con ejercicios de respiración guiada 4-7-8, diario personal cifrado sin conexión con registro de estado de ánimo, reflexiones diarias seleccionadas y notificaciones locales programadas.',
          challenges: 'Animaciones fluidas a 60 FPS con Reanimated, diario con cifrado local AES y disparadores de notificaciones nativas en segundo plano.',
        },
        {
          id: 9,
          title: 'Swift Share',
          category: 'Móvil y Herramientas',
          role: 'Utilidad de Transferencia y Sincronización de Archivos por WiFi Local',
          shortDesc: 'Sincronización inalámbrica rápida y segura en red WiFi local',
          description: 'Herramienta de transferencia de archivos entre pares en red WiFi local de alta velocidad que permite exploración inalámbrica directa, transmisión de medios y descargas múltiples entre dispositivos Android y navegadores de escritorio sin internet ni dependencias en la nube.',
          challenges: 'Servidor de transmisión HTTP local integrado en Android con transferencias fragmentadas que sostienen más de 30 MB/s en WLAN local.',
        },
      ],
    },
    connect: {
      heading: '04. Conectemos',
      subheading: 'Construyamos algo extraordinario.',
      status: 'ESTADO // ABIERTO A LA INNOVACIÓN',
      emailDispatch: '// Despacho Directo por Correo',
      copyBtn: 'COPIAR',
      copiedBtn: 'COPIADO',
      mailBtn: 'CORREO',
      locationTitle: 'Ubicación',
      locationVal: 'India [IST]',
      responseTitle: 'Ventana de Respuesta',
      responseVal: 'En 24–48h',
      downloadCvBtn: 'DESCARGAR CV (PDF)',
      formTag: '// Interfaz de Correo Directo',
      formTitle: 'Enviar un Mensaje',
      formDesc: 'Despacho directo a netxspider@gmail.com',
      nameLabel: 'Tu Nombre *',
      namePlaceholder: 'Juan Pérez',
      emailLabel: 'Tu Correo *',
      emailPlaceholder: 'juan@ejemplo.com',
      subjectLabel: 'Asunto / Proyecto',
      subjectPlaceholder: 'Colaboración en IA / Proyecto Full Stack',
      messageLabel: 'Tu Mensaje *',
      messagePlaceholder: 'Cuéntame sobre tu proyecto, cronograma o requisitos técnicos...',
      sendBtn: 'ENVIAR MENSAJE',
      sendingBtn: 'TRANSMITIENDO...',
      successTitle: 'Mensaje Enviado con Éxito',
      successDesc: '¡Gracias! El mensaje ha llegado a la bandeja de entrada de Arnav. Espera una respuesta en 24–48 horas.',
    },
    footer: {
      statusOpen: 'ESTADO DEL SISTEMA: CAPACIDAD OPERATIVA COMPLETA',
      roleDesc: 'Diseño y desarrollo de sistemas de software inteligentes, modelos de visión artificial y experiencias digitales fluidas.',
      navTitle: 'Navegación',
      expertiseTitle: 'Especializaciones',
      networkTitle: 'Red Directa',
      designedBy: 'Diseñado y Desarrollado por Arnav Raj',
      rights: 'Todos los derechos reservados. Creado con precisión y dedicación.',
      localTime: 'HORA IST // NUEVA DELHI, INDIA',
    },
    loading: {
      initialTitle: 'INICIALIZANDO PORTAFOLIO DE ARNAV RAJ...',
      changingLangTitle: 'CONFIGURANDO MATRIZ DE LOCALIZACIÓN...',
      initStep1: '[KERNEL] INICIALIZANDO MOTORES DE EJECUCIÓN...',
      initStep2: '[GRÁFICOS] PRECOMPILANDO FÍSICA THREE.JS Y RAPIER3D...',
      initStep3: '[TELEMETRÍA] CALIBRANDO SUPERFICIES DE MOVIMIENTO...',
      initStep4: '[SEGURO] PROTOCOLOS VERIFICADOS // SISTEMA EN LÍNEA',
      langStep1: '[LOCALE] RESOLVIENDO ESQUEMA LINGÜÍSTICO: ESPAÑOL [ES]...',
      langStep2: '[PARSER] COMPILANDO DICCIONARIOS SEMÁNTICOS...',
      langStep3: '[DOM] REAPLICANDO TOKENS TIPOGRÁFICOS Y MAQUETACIÓN...',
      langStep4: '[SINCRONIZADO] TRANSFORMACIÓN DE IDIOMA COMPLETA',
    },
    likes: {
      tooltip: 'Dar me gusta',
      liked: '¡Gracias por el apoyo!',
      likeCount: 'Me gusta',
    },
  },

  FR: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      stack: 'Technologies',
      projects: 'Projets',
      connect: 'Contact',
      resume: 'CV',
      soundOn: 'Effets Sonores: Activés',
      soundOff: 'Effets Sonores: Désactivés',
      themeDark: 'Thème: Sombre (cliquer pour Clair)',
      themeLight: 'Thème: Clair (cliquer pour Sombre)',
      langTitle: 'Sélecteur de Langue',
    },
    hero: {
      sysOnline: 'SYS://EN LIGNE',
      identityProtocol: "// PROTOCOLE D'IDENTITÉ",
      roles: ['ARNAV RAJ', 'NETXSPIDER'],
      bio: "Conception de systèmes full-stack intelligents et de modèles d'apprentissage automatique avec une esthétique sombre et minimaliste sans compromis.",
      exploreBtn: 'Explorer les Projets',
      contactBtn: 'Me Contacter',
      philosophyTitle: '// PHILOSOPHIE',
      philosophyQuote: '« Là où la logique rigoureuse rencontre la retenue visuelle, la technologie devient art. »',
      role1Tag: '01 / INTERFACE & INTERACTION',
      role1Title: 'Designer Web',
      role1Desc: 'UI Minimaliste • Mouvement • Précision',
      role2Tag: '02 / ARCHITECTURE & PLATEFORMES',
      role2Title: 'Développeur Full Stack',
      role2Desc: 'React • Next.js • Node • Scalabilité',
      role3Tag: '03 / INTELLIGENCE & MODÈLES',
      role3Title: 'Data Scientist',
      role3Desc: 'PyTorch • GenAI • Vision par Ordinateur',
      revealHint: 'Survolez le portrait pour révéler la couche cybernétique',
      liveTime: 'HEURE SYSTÈME LOCALE',
    },
    about: {
      heading: '01. À Propos',
      idBadge: 'ID // PASS-2026',
      dragBadge: 'GLISSER LE BADGE',
      cardTag: 'RAPIER3D // INTERACTIF',
      subheading: 'Relier les Systèmes Intelligents aux Interfaces Numériques Fluides.',
      summary: "Je conçois des systèmes intelligents de bout en bout, fusionnant des architectures full-stack haute performance avec des modèles de deep learning. Mon travail combine rigueur mathématique et interfaces numériques tactiles, micro-animées et réactives.",
      readFullBtn: 'Lire la Version Complète',
      modalTitle: 'Arnav Raj // Récit d’Ingénierie',
      modalSubtitle: "Architecte Systèmes, Chercheur en IA & Artisan d'Interaction",
      closeBtn: 'Fermer',
      experienceTitle: "État d'Esprit Technique",
      philosophyTitle: 'Philosophie Architecturale',
      modalPhilosophy: "Je crois que les artefacts numériques doivent être aussi mécaniquement robustes à l'intérieur qu'épurés en surface. La véritable excellence logicielle réside dans un code déterministe, une faible latence et un respect absolu de l'attention humaine.",
      highlightsTitle: 'Domaines Clés',
      highlight1: 'Scalabilité Full-Stack: Microservices distribués, interfaces réactives et micro-animations fluides à 60FPS.',
      highlight2: 'Machine Learning & Vision: Architectures neuronales, vision par ordinateur et IA générative avec PyTorch.',
      highlight3: 'Épure Visuelle: Design minimaliste aux touches cyberpunk, typographie travaillée et animations ciblées.',
    },
    stack: {
      heading: '02. Technologies',
      subheading: 'Plateformes Logicielles, Deep Learning et Frameworks Évolutifs.',
      description: "Une suite technologique complète couvrant le web moderne, l'infrastructure cloud et les modèles d'intelligence artificielle.",
      targetHint: 'VISEUR INTERACTIF // SURVOL DES CARTES',
    },
    projects: {
      heading: '03. Projets',
      subheading: 'Conçus pour la Scalabilité, l’Intelligence et l’Expérience.',
      description: 'Faites défiler horizontalement pour examiner chaque système. Cliquez sur une carte pour la retourner et explorer son architecture.',
      filterLabel: '// Filtre par Domaine',
      filters: ['TOUS', 'IA & SYSTÈMES', 'FULL STACK', 'MOBILE & OUTILS'],
      indexLabel: 'INDEX //',
      scrollHint: 'Faites défiler vers le bas ou cliquez pour retourner',
      flipHint: 'Cliquer pour Retourner',
      liveDemo: 'Démo en Direct',
      sourceCode: 'Code Source',
      techStack: 'Stack Technique',
      architecture: 'Architecture du Système',
      keyChallenges: 'Défis Clés & Optimisations',
      items: [
        {
          id: 1,
          title: 'MyLullaby',
          category: 'IA & Systèmes',
          role: 'Compagnon de Sommeil IA & Thérapie Visuelle',
          shortDesc: 'Histoires génératives du soir et séances avec avatars IA interactifs',
          description: 'Plateforme holistique de bien-être émotionnel proposant des contes génératifs alimentés par Gemini 2.5 + Google Cloud TTS, et des séances de thérapie vidéo interactive avec avatars Tavus en plus de 15 langues.',
          challenges: 'Génération d’histoires en streaming en moins de 800 ms, synchronisation labiale Tavus et mémoire respectant la vie privée.',
        },
        {
          id: 2,
          title: 'KSP Intelligence Copilot',
          category: 'IA & Systèmes',
          role: "Assistant d'Enquête Policière de l'État du Karnataka",
          shortDesc: 'Renseignements fondés sur des preuves pour enquêtes modernes',
          description: "Copilote d'enquête local pour la police du Karnataka avec 5 000 dossiers FIR relationnels, recherche SQL déterministe, recherche RAG avec SQLite FTS5, graphes de relations et synthèse Amazon Bedrock Nova Lite.",
          challenges: '0% de requêtes SQL hallucinées sur 5 000 dossiers avec recherche hybride FTS5 et parcours de graphes en moins de 50 ms.',
        },
        {
          id: 3,
          title: 'POLARIS',
          category: 'IA & Systèmes',
          role: 'Système Antarctique IA de Banquise & Navigation',
          shortDesc: 'Couloir de navigation 3D & prévision de trajectoire des icebergs',
          description: "Prototype pour Smart India Hackathon (SIH 2026) avec MoES / NCPOR. Couloir antarctique 3D précis prédisant le risque de banquise par segmentation CNN, dérive des icebergs par LSTM + Coriolis et routage dynamique A*.",
          challenges: 'Couplage des courants océaniques et de la dérive de Coriolis sous PyTorch avec rendu 3D CesiumJS à 60 FPS constants.',
        },
        {
          id: 4,
          title: 'Newift',
          category: 'Full Stack',
          role: 'Tendances Virales en Direct & Actualités Flash',
          shortDesc: "L'actualité brûlante livrée avec rapidité",
          description: 'Plateforme éditoriale ultra-rapide diffusant les dernières actualités, innovations technologiques et tendances virales avec flux directs haute fréquence et typographie sombre soignée.',
          challenges: 'Diffusion d’actualités par WebSocket en moins de 30 ms avec revalidation ISR pour plus de 50 000 lecteurs mensuels.',
        },
        {
          id: 5,
          title: 'Sumit Sandhu Portfolio',
          category: 'Full Stack',
          role: 'Vitrine de Marques de Luxe & Design Graphique',
          shortDesc: 'Concevoir des histoires visuelles captivantes',
          description: 'Portfolio numérique sur mesure conçu pour le design d’identité et de marques haut de gamme, avec interactions de défilement GSAP fluides et galeries de projets immersives.',
          challenges: 'Défilement fixé accéléré matériellement à 60 FPS et shaders de distorsion d’image WebGL réactifs.',
        },
        {
          id: 6,
          title: 'Thread Simulator',
          category: 'Full Stack',
          role: "Simulateur d'OS & Moteur d'Ordonnancement",
          shortDesc: "Démystifier la concurrence des systèmes d'exploitation",
          description: "Simulateur pédagogique interactif visualisant le multi-threading de l'OS, les aléas de concurrence (deadlocks, conditions de course) et les algorithmes d'ordonnancement CPU (Round Robin, FCFS, Priorité).",
          challenges: "Rendu fidèle à la microseconde du cycle de vie des threads et détection visuelle de deadlocks sur canvas interactif.",
        },
        {
          id: 7,
          title: 'LPU Auto-Connect v2.0',
          category: 'Mobile & Outils',
          role: 'Extension Chrome & Hub de Productivité Étudiante',
          shortDesc: 'Authentification portail captif WiFi automatisée & suite universitaire',
          description: "Extension de navigateur intelligente automatisant la connexion au portail captif du campus avec résolution de captcha par OCR, connexion SSO en un clic pour les portails universitaires (UMS, MyClass, OAS), tests de latence WiFi en direct et maintien de session.",
          challenges: 'Pipeline OCR Tesseract dans le navigateur résolvant les captchas en moins de 350 ms avec persistance des workers d’arrière-plan.',
        },
        {
          id: 8,
          title: 'Daily Sage 🌿',
          category: 'Mobile & Outils',
          role: 'Application de Pleine Conscience & Journal Hors Ligne',
          shortDesc: 'Pleine conscience au quotidien. Une respiration à la fois.',
          description: "Compagnon mobile de bien-être sous React Native & Expo proposant des exercices de respiration guidée 4-7-8, un journal intime chiffré hors ligne avec suivi de l’humeur, des pensées positives quotidiennes et des notifications locales programmées.",
          challenges: 'Animations fluides à 60 FPS avec Reanimated, journal chiffré AES local et déclencheurs de notifications natives en arrière-plan.',
        },
        {
          id: 9,
          title: 'Swift Share',
          category: 'Mobile & Outils',
          role: 'Utilitaire de Transfert & Synchronisation sans Fil sur WiFi Local',
          shortDesc: 'Partage de fichiers sans fil rapide et sécurisé sur réseau local',
          description: "Utilitaire de transfert de fichiers poste à poste haut débit sur réseau WiFi local, permettant la navigation sans fil, le streaming multimédia et le téléchargement direct entre appareils Android et navigateurs de bureau, sans Internet ni dépendance au cloud.",
          challenges: 'Serveur de streaming HTTP intégré sur Android avec transferts fragmentés soutenant plus de 30 Mo/s sur le réseau local.',
        },
      ],
    },
    connect: {
      heading: '04. Contactez-Moi',
      subheading: 'Construisons quelque chose d’extraordinaire.',
      status: 'STATUT // OUVERT À L’INNOVATION',
      emailDispatch: '// Envoi Direct par Email',
      copyBtn: 'COPIER',
      copiedBtn: 'COPIÉ',
      mailBtn: 'EMAIL',
      locationTitle: 'Localisation',
      locationVal: 'Inde [IST]',
      responseTitle: 'Délai de Réponse',
      responseVal: 'Sous 24–48h',
      downloadCvBtn: 'TÉLÉCHARGER LE CV (PDF)',
      formTag: '// Interface de Message Direct',
      formTitle: 'Envoyer un Message',
      formDesc: 'Transmission directe à netxspider@gmail.com',
      nameLabel: 'Votre Nom *',
      namePlaceholder: 'Jean Dupont',
      emailLabel: 'Votre Email *',
      emailPlaceholder: 'jean@exemple.com',
      subjectLabel: 'Projet / Sujet',
      subjectPlaceholder: 'Collaboration IA / Projet Full Stack',
      messageLabel: 'Votre Message *',
      messagePlaceholder: 'Parlez-moi de votre projet, planning ou besoins techniques...',
      sendBtn: 'ENVOYER LE MESSAGE',
      sendingBtn: 'TRANSMISSION...',
      successTitle: 'Message Transmis avec Succès',
      successDesc: "Merci ! Votre message a été reçu dans la boîte de réception d'Arnav. Réponse attendue sous 24–48 heures.",
    },
    footer: {
      statusOpen: 'STATUT DU SYSTÈME: CAPACITÉ OPÉRATIONNELLE MAXIMALE',
      roleDesc: "Ingénierie de systèmes logiciels intelligents, modèles de vision par ordinateur et expériences numériques fluides.",
      navTitle: 'Navigation',
      expertiseTitle: 'Spécialisations',
      networkTitle: 'Réseau Direct',
      designedBy: 'Conçu et Développé par Arnav Raj',
      rights: 'Tous droits réservés. Réalisé avec précision et passion.',
      localTime: 'HEURE IST // NEW DELHI, INDE',
    },
    loading: {
      initialTitle: 'INITIALISATION DU PORTFOLIO ARNAV RAJ...',
      changingLangTitle: 'CONFIGURATION DE LA MATRICE LINGUISTIQUE...',
      initStep1: '[KERNEL] DÉMARRAGE DES MOTEURS SYSTÈME...',
      initStep2: '[GRAPHIQUE] PRÉ-COMPILATION THREE.JS & PHYSIQUE RAPIER3D...',
      initStep3: '[TÉLÉMÉTRIE] CALIBRATION DES SURFACES INTERACTIVES...',
      initStep4: '[SÉCURISÉ] PROTOCOLES VÉRIFIÉS // SYSTÈME EN LIGNE',
      langStep1: '[LOCALE] SÉLECTION DU SCHÉMA: FRANÇAIS [FR]...',
      langStep2: '[PARSER] COMPILATION DES DICTIONNAIRES SÉMANTIQUES...',
      langStep3: '[DOM] RÉAPPLICATION DE LA TYPOGRAPHIE ET DES COMPOSANTS...',
      langStep4: '[SYNCHRONISÉ] TRANSFORMATION LINGUISTIQUE TERMINÉE',
    },
    likes: {
      tooltip: "Laisser un j'aime",
      liked: 'Merci pour le soutien !',
      likeCount: "J'aime",
    },
  },

  HI: {
    nav: {
      home: 'होम',
      about: 'परिचय',
      stack: 'तकनीक',
      projects: 'परियोजनाएं',
      connect: 'संपर्क',
      resume: 'बायोडाटा',
      soundOn: 'ध्वनि प्रभाव: चालू',
      soundOff: 'ध्वनि प्रभाव: बंद',
      themeDark: 'थीम: डार्क (लाइट के लिए क्लिक करें)',
      themeLight: 'थीम: लाइट (डार्क के लिए क्लिक करें)',
      langTitle: 'भाषा चयनकर्ता',
    },
    hero: {
      sysOnline: 'प्रणाली://सक्रिय',
      identityProtocol: '// पहचान प्रोटोकॉल',
      roles: ['अर्णव राज', 'NETXSPIDER'],
      bio: 'सख्त और आकर्षक डार्क-मोड शैली में उन्नत फुल-स्टैक सिस्टम और मशीन लर्निंग मॉडल का निर्माण।',
      exploreBtn: 'परियोजनाएं देखें',
      contactBtn: 'संपर्क करें',
      philosophyTitle: '// दर्शनशास्त्र',
      philosophyQuote: '“जहाँ कठोर तर्क और दृश्य संयम का मिलन होता है, वहाँ तकनीक कला बन जाती है।”',
      role1Tag: '01 / इंटरफ़ेस एवं इंटरेक्शन',
      role1Title: 'वेब डिज़ाइनर',
      role1Desc: 'न्यूनतम यूआई • मोशन • शिल्प कौशल',
      role2Tag: '02 / आर्किटेक्चर एवं प्लेटफ़ॉर्म',
      role2Title: 'फुल स्टैक डेवलपर',
      role2Desc: 'रिएक्ट • नेक्स्ट.जेएस • नोड • स्केलेबिलिटी',
      role3Tag: '03 / इंटेलिजेंस एवं मॉडल्स',
      role3Title: 'डेटा साइंटिस्ट',
      role3Desc: 'पाइटॉर्च • जनरेटिव एआई • कंप्यूटर विज़न',
      revealHint: 'साइबरनेटिक परत देखने के लिए कर्सर को चित्र पर ले जाएं',
      liveTime: 'स्थानीय प्रणाली समय',
    },
    about: {
      heading: '01. मेरे बारे में',
      idBadge: 'आईडी // पास-2026',
      dragBadge: 'बैज खींचें',
      cardTag: 'RAPIER3D // इंटरैक्टिव',
      subheading: 'बुद्धिमान प्रणालियों और जीवंत डिजिटल इंटरफेस का संगम।',
      summary: 'मैं एंड-टू-एंड बुद्धिमान प्रणालियां विकसित करता हूं, जहां उच्च-प्रदर्शन फुल-स्टैक आर्किटेक्चर का डीप लर्निंग मॉडल्स से सटीक तालमेल होता है। मेरा कार्य गणितीय परिशुद्धता को सहज, सूक्ष्म-एनिमेटेड डिजिटल इंटरफेस से जोड़ता है।',
      readFullBtn: 'पूरा विवरण पढ़ें',
      modalTitle: 'अर्णव राज // इंजीनियरिंग यात्रा',
      modalSubtitle: 'सिस्टम्स आर्किटेक्ट, एआई शोधकर्ता एवं इंटरफेस शिल्पकार',
      closeBtn: 'बंद करें',
      experienceTitle: 'मुख्य इंजीनियरिंग दृष्टिकोण',
      philosophyTitle: 'आर्किटेक्चर दर्शन',
      modalPhilosophy: 'मेरा मानना है कि डिजिटल उत्पाद जितने सतह पर शांत और सुंदर दिखें, अंदर से उतने ही शक्तिशाली और ठोस होने चाहिए। सच्चा सॉफ्टवेयर शिल्प डिटरमिनिस्टिक कोड, अल्ट्रा-लो लेटेंसी और उपयोगकर्ता के ध्यान का सम्मान करने में निहित है।',
      highlightsTitle: 'मुख्य विशेषज्ञता क्षेत्र',
      highlight1: 'फुल-स्टैक स्केलेबिलिटी: वितरित बैकएंड सेवाएं, प्रतिक्रियाशील फ्रंटएंड और 60FPS सहज भौतिकी के साथ माइक्रो-इंटरैक्शन।',
      highlight2: 'मशीन लर्निंग व विज़न: पाइटॉर्च पर निर्मित न्यूरल आर्किटेक्चर, कंप्यूटर विज़न पाइपलाइन और जनरेटिव एआई प्रणालियां।',
      highlight3: 'इंटरफ़ेस संयम: मिनिमलिस्ट डार्क सौंदर्यशास्त्र, विशिष्ट टाइपोग्राफी और उद्देश्यपूर्ण मोशन डिज़ाइन।',
    },
    stack: {
      heading: '02. टेक स्टैक',
      subheading: 'इंजीनियरिंग प्लेटफॉर्म, डीप लर्निंग एवं स्केलेबल फ्रेमवर्क।',
      description: 'वेब आर्किटेक्चर, क्लाउड बैकएंड और मशीन इंटेलिजेंस मॉडल्स का एक संपूर्ण आधुनिक टूलकिट।',
      targetHint: 'टारगेट कर्सर // कार्ड्स पर होवर करें',
    },
    projects: {
      heading: '03. प्रमुख परियोजनाएं',
      subheading: 'स्केलेबिलिटी, इंटेलिजेंस और बेहतरीन अनुभव के लिए निर्मित।',
      description: 'प्रत्येक प्रणाली का निरीक्षण करने के लिए क्षैतिज रूप से स्क्रॉल करें। आर्किटेक्चर विवरण देखने के लिए किसी भी कार्ड पर क्लिक करें।',
      filterLabel: '// डोमेन फ़िल्टर',
      filters: ['सभी', 'एआई एवं सिस्टम्स', 'फुल स्टैक', 'मोबाइल व टूल्स'],
      indexLabel: 'अनुक्रमणिका //',
      scrollHint: 'नीचे स्क्रॉल करें या पलटने के लिए क्लिक करें',
      flipHint: 'वापस पलटने के लिए क्लिक करें',
      liveDemo: 'लाइव डेमो',
      sourceCode: 'सोर्स कोड',
      techStack: 'तकनीकी स्टैक',
      architecture: 'सिस्टम आर्किटेक्चर',
      keyChallenges: 'मुख्य चुनौतियां एवं अनुकूलन',
      items: [
        {
          id: 1,
          title: 'MyLullaby',
          category: 'एआई एवं सिस्टम्स',
          role: 'जेनेरेटिव स्लीप स्टोरीज़ व मल्टीमॉडल एआई अवतार थेरेपी',
          shortDesc: 'नींद की कहानियां व रीयल-टाइम एआई अवतार परामर्श',
          description: 'एक समग्र भावनात्मक वेलनेस प्लेटफॉर्म जिसमें जेमिनी 2.5 और गूगल क्लाउड टीटीएस द्वारा संचालित सोने की कहानियां और 15+ भाषाओं में तावुस अवतारों के साथ रीयल-टाइम इंटरैक्टिव वीडियो सत्र शामिल हैं।',
          challenges: '800 मिलीसेकंड से कम में स्टोरी स्ट्रीमिंग, तावुस अवतार सिंक्रोनाइज़ेशन और निजता-सुरक्षित संदर्भ स्मृति।',
        },
        {
          id: 2,
          title: 'KSP Intelligence Copilot',
          category: 'एआई एवं सिस्टम्स',
          role: 'कर्नाटक राज्य पुलिस अनुसंधान सहायक',
          shortDesc: 'आधुनिक जांच के लिए साक्ष्य-आधारित खोजी प्रणाली',
          description: 'कर्नाटक राज्य पुलिस के लिए 5,000 रिलेशनल एफआईआर रिकॉर्ड, सुरक्षित एसक्यूएल सर्च, एसक्यूलाइट एफटीएस5 आरएजी पुनर्प्राप्ति, संबंध ग्राफ़ और अमेज़न बेडरॉक नोवा लाइट विश्लेषण से लैस स्थानीय-प्रथम कोपायलट।',
          challenges: '5,000 रिकॉर्ड्स में 0% गलत एसक्यूएल क्वेरी गारंटी और 50ms से कम में FTS5 व नॉलेज ग्राफ़ ट्रैवर्सल।',
        },
        {
          id: 3,
          title: 'POLARIS',
          category: 'एआई एवं सिस्टम्स',
          role: 'अंटार्कटिक समुद्री बर्फ एवं नेविगेशन एआई प्रणाली',
          shortDesc: '3D नेविगेशन कॉरिडोर एवं हिमखंड प्रक्षेपवक्र पूर्वानुमान',
          description: 'स्मार्ट इंडिया हैकाथॉन (SIH 2026) के लिए पृथ्वी विज्ञान मंत्रालय व एनसीपीओआर का प्रोटोटाइप। सीएनएन से समुद्री बर्फ के जोखिम का पूर्वानुमान, एलएसटीएम + कोरिओलिस बल से हिमखंड की गति और डायनेमिक A* समुद्री जहाज़ी मार्ग निर्धारण।',
          challenges: 'पाइटॉर्च में समुद्री धाराओं और कोरिओलिस ड्रिफ्ट का एकीकरण तथा CesiumJS में 60 FPS पर 3D ग्लोब रेंडरिंग।',
        },
        {
          id: 4,
          title: 'Newift',
          category: 'फुल स्टैक',
          role: 'रीयल-टाइम ट्रेंड्स एवं ताज़ा समाचार मंच',
          shortDesc: 'ट्रेंडिंग खबरें, तुरंत और सीधे आपके स्क्रीन पर',
          description: 'ताज़ा समाचार, तकनीकी अपडेट और वायरल पॉप कल्चर पलों को तेज़ लाइव फ़ीड और डार्क संपादकीय टाइपोग्राफी के साथ पेश करने वाला रीयल-टाइम समाचार मंच।',
          challenges: 'वेबसॉकेट द्वारा 30ms से कम में समाचार स्ट्रीमिंग और 50,000+ मासिक पाठकों के लिए स्वचालित ISR कैशिंग।',
        },
        {
          id: 5,
          title: 'Sumit Sandhu Portfolio',
          category: 'फुल स्टैक',
          role: 'लक्ज़री ब्रांड एवं ग्राफिक डिज़ाइन शोकेस',
          shortDesc: 'प्रभावशाली दृश्य कहानियों का निर्माण',
          description: 'हाई-एंड ग्राफिक और ब्रांड पहचान डिज़ाइन के लिए निर्मित विशेष डिजिटल पोर्टफोलियो, जिसमें सहज जीएसएपी स्क्रॉल एनिमेशन और इंटरैक्टिव गैलरी शामिल हैं।',
          challenges: 'हार्डवेयर-एक्सेलरेटेड 60 FPS स्क्रॉल पिनिंग और रिस्पॉन्सिव WebGL डिस्टॉर्शन शेडर्स।',
        },
        {
          id: 6,
          title: 'Thread Simulator',
          category: 'फुल स्टैक',
          role: 'रीयल-टाइम ओएस विज़ुअलाइज़ेशन व शेड्यूलिंग इंजन',
          shortDesc: 'ऑपरेटिंग सिस्टम समवर्ती (Concurrency) को समझना',
          description: 'ऑपरेटिंग सिस्टम के मल्टी-थ्रेडिंग, रेस कंडीशंस, डेडलॉक और सीपीयू शेड्यूलिंग एल्गोरिदम (राउंड रॉबिन, एफसीएफएस, प्रायोरिटी) को दृश्य रूप में दर्शाने वाला इंटरैक्टिव सिम्युलेटर।',
          challenges: 'इंटरैक्टिव कैनवास पर माइक्रोसेकंड सटीकता से थ्रेड जीवनचक्र रेंडरिंग और डेडलॉक पहचान एल्गोरिदम।',
        },
        {
          id: 7,
          title: 'LPU Auto-Connect v2.0',
          category: 'मोबाइल व टूल्स',
          role: 'क्रोम एक्सटेंशन एवं छात्र उत्पादकता हब',
          shortDesc: 'स्वचालित वाईफाई कैप्टिव पोर्टल प्रमाणीकरण एवं विश्वविद्यालय सुइट',
          description: 'कैंपस वाई-फाई कैप्टिव पोर्टल पर स्वचालित लॉगिन, ओसीआर कैप्चा समाधान, विश्वविद्यालय पोर्टलों (UMS, MyClass, OAS) के लिए सिंगल-क्लिक एसएसओ, वास्तविक समय नेटवर्क लेटेंसी परीक्षण और बैकग्राउंड सत्र चालू रखने वाला बुद्धिमान क्रोम एक्सटेंशन।',
          challenges: 'ब्राउज़र में 350ms से कम में विकृत कैप्चा हल करने के लिए Tesseract OCR पाइपलाइन और विश्वसनीय बैकग्राउंड सर्विस वर्कर प्रबंधन।',
        },
        {
          id: 8,
          title: 'Daily Sage 🌿',
          category: 'मोबाइल व टूल्स',
          role: 'ऑफ़लाइन माइंडफुलनेस व व्यक्तिगत डायरी ऐप',
          shortDesc: 'दैनिक माइंडफुलनेस। हर सांस के साथ शांति।',
          description: 'रिएक्ट नेटिव व एक्सपो पर निर्मित माइंडफुलनेस मोबाइल ऐप, जिसमें 4-7-8 श्वास व्यायाम, एन्क्रिप्टेड ऑफ़लाइन डायरी, मूड ट्रैकिंग, दैनिक सुविचार और देशी पृष्ठभूमि सूचनाएं शामिल हैं।',
          challenges: 'Reanimated के साथ 60 FPS पर श्वास एनिमेशन, स्थानीय AES-एन्क्रिप्टेड डायरी और बैकग्राउंड स्थानीय नोटिफिकेशन शेड्यूलिंग।',
        },
        {
          id: 9,
          title: 'Swift Share',
          category: 'मोबाइल व टूल्स',
          role: 'लोकल वाईफाई फ़ाइल ट्रांसफर एवं सिंक टूल',
          shortDesc: 'लोकल वाईफाई पर तेज़ और सुरक्षित वायरलेस फ़ाइल शेयरिंग',
          description: 'लोकल वाईफाई पर बिना इंटरनेट या क्लाउड के एंड्रॉइड डिवाइस और डेस्कटॉप ब्राउज़र के बीच सीधी वायरलेस ब्राउज़िंग, मीडिया स्ट्रीमिंग और हाई-स्पीड मल्टी-फ़ाइल डाउनलोड की सुविधा देने वाला पीयर-टू-पीयर यूटिलिटी।',
          challenges: 'एंड्रॉइड पर एम्बेडेड HTTP स्ट्रीमिंग सर्वर का निर्माण, जो स्थानीय नेटवर्क पर 30MB/s से अधिक की गति से डेटा ट्रांसफर करता है।',
        },
      ],
    },
    connect: {
      heading: '04. संपर्क करें',
      subheading: 'आइए कुछ असाधारण और प्रभावशाली बनाएं।',
      status: 'स्थिति // नवाचार के लिए तत्पर',
      emailDispatch: '// सीधा ईमेल प्रेषण',
      copyBtn: 'कॉपी',
      copiedBtn: 'कॉपी हुआ',
      mailBtn: 'ईमेल',
      locationTitle: 'स्थान',
      locationVal: 'भारत [IST]',
      responseTitle: 'प्रतिक्रिया समय',
      responseVal: '24–48 घंटों में',
      downloadCvBtn: 'बायोडाटा डाउनलोड करें (PDF)',
      formTag: '// सीधा ईमेल इंटरफ़ेस',
      formTitle: 'एक संदेश भेजें',
      formDesc: 'सीधा प्रेषण netxspider@gmail.com पर',
      nameLabel: 'आपका नाम *',
      namePlaceholder: 'राहुल शर्मा',
      emailLabel: 'आपका ईमेल *',
      emailPlaceholder: 'rahul@example.com',
      subjectLabel: 'परियोजना / विषय',
      subjectPlaceholder: 'एआई सहयोग / फुल स्टैक चर्चा',
      messageLabel: 'आपका संदेश *',
      messagePlaceholder: 'अपनी परियोजना, समय-सीमा या तकनीकी आवश्यकताओं के बारे में बताएं...',
      sendBtn: 'संदेश भेजें',
      sendingBtn: 'भेजा जा रहा है...',
      successTitle: 'संदेश सफलतापूर्वक भेजा गया',
      successDesc: 'धन्यवाद! आपका संदेश अर्णव के इनबॉक्स में पहुँच गया है। 24–48 घंटों में उत्तर की प्रतीक्षा करें।',
    },
    footer: {
      statusOpen: 'सिस्टम स्थिति: पूर्ण परिचालन क्षमता',
      roleDesc: 'बुद्धिमान सॉफ़्टवेयर सिस्टम, कंप्यूटर विज़न मॉडल और सहज डिजिटल अनुभवों का निर्माण।',
      navTitle: 'नेविगेशन',
      expertiseTitle: 'विशेषज्ञता',
      networkTitle: 'सीधा नेटवर्क',
      designedBy: 'अर्णव राज द्वारा डिज़ाइन एवं निर्मित',
      rights: 'सर्वाधिकार सुरक्षित। पूर्ण तकनीकी निष्ठा से निर्मित।',
      localTime: 'IST समय // नई दिल्ली, भारत',
    },
    loading: {
      initialTitle: 'अर्णव राज पोर्टफोलियो लोड हो रहा है...',
      changingLangTitle: 'भाषा मैट्रिक्स कॉन्फ़िगर हो रहा है...',
      initStep1: '[कर्नेल] मुख्य निष्पादन इंजन प्रारंभ हो रहे हैं...',
      initStep2: '[ग्राफ़िक्स] Three.js और Rapier3D भौतिकी प्री-कंपाइल हो रही है...',
      initStep3: '[टेलीमेट्री] मोशन और इंटरफेस सतहों का अंशांकन...',
      initStep4: '[सुरक्षित] प्रोटोकॉल सत्यापित // सिस्टम ऑनलाइन',
      langStep1: '[भाषा] भाषा स्कीमा लोड हो रही है: हिन्दी [HI]...',
      langStep2: '[पार्सर] सिमेंटिक शब्दावली संकलित हो रही है...',
      langStep3: '[डीओएम] टाइपोग्राफी और लेआउट अद्यतन हो रहे हैं...',
      langStep4: '[समन्वित] भाषा रूपांतरण पूर्ण हुआ',
    },
    likes: {
      tooltip: 'लाइक करें',
      liked: 'समर्थन के लिए धन्यवाद!',
      likeCount: 'लाइक्स',
    },
  },
};
