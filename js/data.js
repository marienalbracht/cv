/* ============================================================
   MARIEN ALBRACHT — CV DATA
   Bijgewerkt op basis van CV Marien Albracht 2026.docx
   ============================================================ */

const cvData = {

  personal: {
    name:     "Marien Albracht",
    title:    "Consultant HRM & Payroll | Overheid & Onderwijs",
    subtitle: "AFAS Software expert met een Master Change Management en Bachelor Psychologie. Ik help kleine en grote instellingen hun processen te optimaliseren via AFAS.",
    email:    "marien.albracht@afas.nl",
    phone:    "+31 6 40 96 82 13",
    location: "Zwolle, Nederland",
    linkedin: "linkedin.com/in/marienalbracht",
  },

  typewriterTexts: [
    "Consultant HRM & Payroll",
    "AFAS Software expert",
    "Overheid & Onderwijs specialist",
    "Master Change Management",
    "Getrouwd met Charlotte",
    "De langste medewerker van AFAS",
    "Passie voor muziek maken",
  ],

  stats: [
    { number:  4, suffix: "+", label: "Jaar bij AFAS",     link: "#experience" },
    { number:  7, suffix: "+", label: "Jaar werkervaring",  link: "#experience" },
    { number: 40, suffix: "+", label: "AFAS-projecten",     link: "#projects"   },
    { number:  2, suffix: "",  label: "Diploma's",      link: "#education"  },
  ],

  summary: "Ik ben Marien Albracht, 32 jaar, en woon in Zwolle met mijn vrouw Charlotte. Dagelijks inspireer ik organisaties om werk leuker en makkelijker te maken. Als consultant HRM & Payroll bij AFAS Software optimaliseer ik bedrijfsprocessen in de sectoren Overheid en Onderwijs. Jaarlijks begeleid ik tientallen kleine en grote organisaties tijdens implementatietrajecten, van analyse tot nazorg. Ik krijg energie van samenwerken, het realiseren van innovatieve oplossingen en mezelf continu blijven ontwikkelen.",

  experience: [
    {
      id:      1,
      logo:    "assets/AFAS.png",
      role:    "Consultant HRM & Payroll | Overheid & Onderwijs",
      company: "AFAS Software",
      period:  "april 2024 - heden",
      location:"Leusden",
      type:    "Vast",
      summary: "In het team Overheid & Onderwijs van AFAS tientallen klanten geimplementeerd en bedrijfsprocessen geoptimaliseerd. Aanbestedingen met complexe projectstructuren en lange doorlooptijden.",
      details: [
        "Projectbegeleiding bij organisaties van 1000+ FTE aanbestedingstrajecten",
        "Software-implementatie AFAS HRM & Payroll van analyse- tot nazorgfase",
        "Werken in klein team van 2-4 consultants met volledige projectverantwoordelijkheid",
        "Bedrijfsprocessen geoptimaliseerd via AFAS-platform voor overheid en onderwijs",
        "Opgebouwd op expertise vanuit traineeship richting grote publieke sector",
      ],
      tags: ["AFAS", "Overheid", "Onderwijs", "HRM", "Payroll", "Aanbesteding", "Implementatie"],
    },
    {
      id:      2,
      logo:    "assets/AFAS.png",
      role:    "Trainee Consultant HRM & Payroll",
      company: "AFAS Software",
      period:  "april 2022 - april 2024",
      location:"Leusden",
      type:    "Vast",
      summary: "In een tweejarig traineeship opgeleid tot AFAS-expert op het gebied van HRM & Payroll. Daarna MKB-klanten zelfstandig begeleid.",
      details: [
        "AFAS expert geworden op het gebied van HRM & Payroll binnen de software",
        "PDL-opleiding (MBO 3 Salarisadministrateur) gevolgd",
        "Cursussen gegeven aan applicatiebeheerders en salarisadministrateurs",
        "MKB-klanten geholpen bij implementatie en dagelijks gebruik van AFAS",
        "Soft skills ontwikkeld via trainingen (Suo Marte, Talentmanagement, An Apple A Day)",
      ],
      tags: ["AFAS", "HRM", "Payroll", "MKB", "Traineeship", "Training"],
    },
    {
      id:      3,
      logo:    "assets/Heroes of Work.png",
      role:    "Co-founder & Operational Manager",
      company: "Heroes of Work B.V.",
      period:  "2020 - april 2022",
      location:"Groningen",
      type:    "Ondernemer",
      summary: "Met 9 ondernemers een platform ontwikkeld om de beste match op de arbeidsmarkt te realiseren.",
      details: [
        "Operationeel team geleid over ICT, marketing & sales",
        "Visie & strategie mede bepaald als board-member",
        "Productontwerp geleid van applicatie- en desktopplatform",
        "Product-owner in development team (Agile/Scrum)",
        "Partnerrelaties aangegaan met o.a. MK Publishing en GP&O",
      ],
      tags: ["Startup", "Product Owner", "Agile", "Ondernemen", "Arbeidsmarkt"],
    },
    {
      id:      4,
      logo:    "assets/KerkSterk.png",
      role:    "Mede-eigenaar | Adviseur & Projectleider",
      company: "KerkSterk VOF",
      period:  "2020 - april 2022",
      location:"Nederland",
      type:    "Ondernemer",
      summary: "Adviesbureau dat kerken toekomstbestendig maakt op het gebied van visie, strategie en organisatiestructuur.",
      details: [
        "Advies visie & strategie voor kerkelijke organisaties",
        "Leiderschapstrainingen gegeven",
        "Begeleiding bij innovatie & beleid (GKv Bergentheim) en jeugdwerk (3GK Deventer)",
        "Professionals gedetacheerd en vrijwilligers gemobiliseerd",
        "Advies bij transitie naar online kerk-zijn tijdens corona",
      ],
      tags: ["Advies", "Strategie", "Projectleiding", "Change", "Leiderschap"],
    },
    {
      id:      5,
      logo:    "assets/Team050.png",
      role:    "Individueel Begeleider | Hoogbegaafd onderwijs",
      company: "Team050",
      period:  "2018 - 2020",
      location:"Groningen",
      type:    "Bijbaan",
      summary: "Hoofdbegaafdenschool in Haren mee opgezet. Coaching en begeleiding van hoogbegaafde jongeren.",
      details: [
        "Begeleidingsprogramma voor hoogbegaafden inhoudelijk vormgegeven",
        "Coaching zonder volledig het stuur over te nemen",
        "Problematiek van clienten in kaart gebracht en vertaald naar begeleiding",
      ],
      tags: ["Coaching", "Begeleiding", "Hoogbegaafdheid", "Psychologie"],
    },
    {
      id:      6,
      logo:    "assets/Hotel de Hoop.png",
      role:    "Beheerder B&B de Hoop",
      company: "B&B de Hoop",
      period:  "2020",
      location:"Workum",
      type:    "Tijdelijk",
      summary: "Tijdelijk een volledig geboekte B&B van 5 kamers gerund, inclusief operatie, inkoop en gastvrijheid.",
      details: [
        "Onderhoud van website (booking.com etc.)",
        "Inchecken gasten, ontbijt en schoonmaak georganiseerd",
        "Inkoop geregeld voor vijf dagelijks volgeboekte kamers",
        "Volledig verantwoordelijk voor een goedlopende B&B",
      ],
      tags: ["Operationeel", "Gastvrijheid", "Zelfstandig", "Ondernemerschap"],
    },
  ],

  education: [
    {
      logo:        "assets/RUG.png",
      degree:      "Change Management | Master Business Administration",
      school:      "Rijksuniversiteit Groningen",
      period:      "2019 - 2020",
      description: "Masterdiploma Change Management behaald in 2020. Afgestudeerd op de invloed van leiderschapsstijlen op identificatie bij een M&A. Conclusie: transformationeel leiderschap bevordert identificatie met de organisatie na een fusie.",
    },
    {
      logo:        "assets/RUG.png",
      degree:      "Bachelor Psychologie | Social Studies",
      school:      "Rijksuniversiteit Groningen",
      period:      "2014 - 2019",
      description: "Bachelordiploma Psychologie behaald in 2019. Afgestudeerd op de mate van emotieregulatie bij mensen met ADHD.",
    },
    {
      logo:        "assets/AFAS.png",
      degree:      "PDL | MBO 3 Salarisadministrateur",
      school:      "PDL (via AFAS Software)",
      period:      "2021 - 2022",
      description: "Beroepsopleiding Salarisadministrateur (MBO niveau 3), gevolgd tijdens traineeship bij AFAS Software.",
    },
    {
      logo:        "assets/viaa.webp",
      degree:      "Sociaal Pedagogische Hulpverlening | Social Work",
      school:      "Hogeschool Viaa Zwolle",
      period:      "2012 - 2014",
      description: "Propedeuse SPH behaald. Stage bij VSO De Ambelt (2013-2014): begeleiding van jongeren in het speciaal onderwijs.",
    },
    {
      degree:      "Geloofwaardig Spreken | Presentatiecursus",
      school:      "Paulien Vervoorn",
      period:      "2019",
      description: "5-daagse training: mensen meenemen, een verhaal neerzetten en impact maken bij het presenteren, geleid door schrijfster Paulien Vervoorn.",
    },
  ],

  skills: [
    {
      category: "AFAS & HR-Software",
      items: [
        { name: "AFAS HRM",                   score: 5 },
        { name: "AFAS Overheid & Onderwijs",   score: 5 },
        { name: "AFAS Profit",                 score: 5 },
        { name: "Salarisadministratie",         score: 5 },
      ],
    },
    {
      category: "Implementatie & Projectmanagement",
      items: [
        { name: "Implementatietrajecten",      score: 5 },
        { name: "Aanbestedingsprocessen",      score: 3 },
        { name: "Projectleiding (2-4 pers.)",  score: 4 },
        { name: "Agile / Scrum",               score: 3 },
      ],
    },
    {
      category: "Strategie & Change",
      items: [
        { name: "Change Management",       score: 4 },
        { name: "Visie & Strategieadvies", score: 3 },
        { name: "Stakeholdermanagement",   score: 3 },
        { name: "Procesoptimalisatie",     score: 5 },
      ],
    },
    {
      category: "Soft Skills",
      items: [
        { name: "Presenteren",         score: 5 },
        { name: "Samenwerking",        score: 4 },
        { name: "Analytisch denken",   score: 5 },
        { name: "Ondernemerschap",     score: 4 },
      ],
    },
  ],

  projects: [
    {
      id:       1,
      name:     "AFAS Implementaties Overheid & Onderwijs",
      category: "Consultancy",
      period:   "2024 - heden",
      client:   "Grote instellingen 1000+ FTE (AFAS Software)",
      icon:     "🏛️",
      summary:  "Tientallen overheids- en onderwijsinstellingen begeleid bij complexe aanbestedingen en volledige AFAS-implementaties.",
      details:  "In het team Overheid & Onderwijs van AFAS verantwoordelijk voor de volledige projectbegeleiding van grote instellingen. Trajecten kenmerken zich door aanbestedingen met complexe juridische en technische eisen en lange doorlooptijden. In een klein team van 2-4 consultants verantwoordelijk van analyse- tot nazorgfase. Focus op procesoptimalisatie via AFAS HRM & Payroll.",
      tags:     ["AFAS", "Overheid", "Onderwijs", "Aanbesteding", "Implementatie", "HRM"],
      color:    "#00f5ff",
    },
    {
      id:       2,
      name:     "Heroes of Work - Arbeidsmarktplatform",
      category: "Startup & Product",
      period:   "2020 - 2021",
      client:   "Heroes of Work B.V.",
      icon:     "⚡",
      summary:  "Co-founder van een innovatief platform om de beste match op de arbeidsmarkt te realiseren.",
      details:  "Samen met 9 ondernemers een platform ontwikkeld dat werkzoekenden en werkgevers slimmer matcht. Als Operational Manager en Product Owner verantwoordelijk voor team ICT, marketing & sales, productontwerp (Agile). Partnerrelaties gelegd met o.a. MK Publishing en GP&O. Volledig ondernemerschap van begin tot einde meegemaakt.",
      tags:     ["Startup", "Product Owner", "Agile", "Platform", "Ondernemen"],
      color:    "#7b2fff",
    },
    {
      id:       3,
      name:     "KerkSterk - Organisatieadvies",
      category: "Advies & Change",
      period:   "2020 - 2022",
      client:   "Diverse kerkelijke organisaties",
      icon:     "🌟",
      summary:  "Kerken toekomstbestendig gemaakt via adviestrajecten over visie, strategie en organisatiestructuur.",
      details:  "Als mede-eigenaar en projectleider van KerkSterk VOF kerken begeleid bij identiteit, visie en structuur. Projecten voor GKv Bergentheim (innovatie & beleid) en 3GK Deventer (jeugdwerkinnovatie). Leiderschapstrainingen gegeven, professionals gedetacheerd en samengewerkt met vrijwilligers. Extra uitdaging: begeleiding bij online transformatie tijdens corona.",
      tags:     ["Advies", "Change Management", "Leiderschap", "Training", "Strategie"],
      color:    "#ffd700",
    },
  ],

  certificates: [
    {
      name:   "Master Change Management",
      issuer: "Rijksuniversiteit Groningen",
      year:   "2020",
      icon:   "🎓",
    },
    {
      name:   "Bachelor Psychologie",
      issuer: "Rijksuniversiteit Groningen",
      year:   "2019",
      icon:   "🧠",
    },
    {
      name:   "Geloofwaardig Spreken",
      issuer: "Paulien Vervoorn",
      year:   "2019",
      icon:   "🎤",
    },
  ],

  hobbies: [
    { name: "Muziek maken",      icon: "🎤", video: "assets/Video.MP4",            caption: "Marien maakt zelf muziek en treedt op.",        funfact: "Wist je dat Marien in zijn eerste week in dienst voor het hele bedrijf een liedje zong in het theater?" },
    { name: "Liedjes schrijven", icon: "✍️", photo: "assets/Liedjes schrijven.jpg",  caption: "Van tekst tot melodie — alles zelf geschreven.", funfact: "Wist je dat ik een liedje schreef voor mijn vrouw en deze liet horen bij onze bruiloft?" },
    { name: "Voetbal",           icon: "⚽", photo: "assets/Voetbal.png",            caption: "Elke week op het veld te vinden.",              funfact: "Wist je dat ik elke week op het veld te vinden ben, zowel binnen als buiten? Dit ben ik in D1. Kun je mij vinden?" },
    { name: "Schaken",           icon: "♟️", photo: "assets/Schaken.avif",          caption: null,                                           funfact: "Links ben ik aan het schaken tijdens het wereldkampioenschap 2025. (Voor de echte kenner: Dit is Magnus Carlsen - vijfvoudig wereldkampioen)" },
  ],

  references: [
    {
      name:     "Gerben voor de Poorte",
      role:     "P&O-adviseur",
      company:  "GP&O Advies",
      relation: "Samenwerkingspartner",
    },
    {
      name:     "Hannie Stuurman",
      role:     "Recruitment-adviseur",
      company:  "Hannie Stuurman Advies",
      relation: "Professionele relatie",
    },
    {
      name:     "Arjan ten Have",
      role:     "Eigenaar",
      company:  "Pontifexx",
      relation: "Samenwerkingspartner",
    },
  ],

  coverLetter: {
    colleaguesFeedback: "Collega's omschrijven mij als rustig, overtuigend en communicatief sterk. Ik laat me niet snel gek maken en houd ook bij drukte of escalaties het overzicht.",
    strengths: [
      "Rustig en overzicht houden onder druk — ook bij escalaties en hoge belangen",
      "Analytisch ingesteld: meerdere kanten bekijken én knopen doorhakken",
      "Communicatief sterk: verwachtingen helder maken en lastige gesprekken niet uit de weg gaan",
      "Verbindt mensen en geeft richting in complexe, meerlagige trajecten",
      "Proactief: mijn sjabloon voor Teams-terugkoppelingen wordt inmiddels door het hele team gebruikt",
    ],
    ambition: "De stap naar projectleider voelt als het perfecte vervolg: complexe trajecten begeleiden, mensen meenemen in verandering en samen zelfredzame klanten blij maken. Mijn ambitie is om regisseur van verandering te worden — schakel tussen consultancy, productontwikkeling en sales.",
    examples: [
      "Implementatie met fusie, organisatieverandering, meertalig team en nieuwe bv-structuur — in dit soort trajecten kom ik het beste tot mijn recht.",
      "Hoofd koel gehouden tijdens een escalatie, relatie intact gelaten en samen toegewerkt naar een oplossing.",
      "Creatieve oplossing gevonden voor een complexe conversie-uitdaging samen met het team en een externe partij.",
    ],
  },

};
