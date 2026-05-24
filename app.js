// Client-side gate only. This keeps spoilers out of sight, but is not real security.
const ORGANIZER_PASSWORD = "wesseldeknapste";
const UNLOCK_DATE = "2026-05-29T17:00:00";
const AUTH_STORAGE_KEY = "woezik-organizer-access";
const unlockDate = new Date(UNLOCK_DATE);

const schedule = [
  {
    day: "Vrijdag",
    date: "29 mei",
    subtitle: "Aankomst, boodschappen, BBQ en dodenstraal",
    events: [
      {
        time: "17:00",
        title: "Aankomst",
        text: "Vanaf 17:00 druppelt iedereen binnen. Eerst landen, spullen dumpen en het huis in gebruik nemen.",
        dateTime: "2026-05-29T17:00:00+02:00",
      },
      {
        time: "17:30",
        title: "Boodschappen",
        text: "Een ploeg haalt de laatste dingen voor de avond en het ontbijt, zodat de rest direct kan doorpakken.",
        dateTime: "2026-05-29T17:30:00+02:00",
      },
      {
        time: "19:00",
        title: "BBQ",
        text: "Burgers op de barbecue zodat iedereen die binnenkomt direct kan eten en aan kan sluiten.",
        dateTime: "2026-05-29T19:00:00+02:00",
      },
      {
        time: "21:30",
        title: "Dodenstraal",
        text: "Teams gaan van punt A naar punt B zonder geraakt te worden door de zaklampen van de wachters.",
        dateTime: "2026-05-29T21:30:00+02:00",
      },
    ],
  },
  {
    day: "Zaterdag",
    date: "30 mei",
    subtitle: "Buitenactiviteiten, pasta, pubquiz en avond weg",
    events: [
      {
        time: "12:30",
        title: "Buitenactiviteiten",
        text: "Outdoor Dag in de Ardennen met mountainbiken en kanoen. Actief naar buiten en daarna terug voor pasta en pubquiz.",
        dateTime: "2026-05-30T12:30:00+02:00",
      },
      {
        time: "18:30",
        title: "Pastamaaltijd",
        text: "Huishoudteams koken gezamenlijk pasta. Koolhydraten met een functie.",
        dateTime: "2026-05-30T18:30:00+02:00",
      },
      {
        time: "21:00",
        title: "Pubquiz",
        text: "Rondes van Jacco, Chiel en Wessel. Inclusief random teamfeitjes.",
        dateTime: "2026-05-30T21:00:00+02:00",
      },
      {
        time: "23:30",
        title: "Feest / stapavond",
        text: "Na de quiz door in avondmodus. Hoe en waar precies volgt op locatie.",
        dateTime: "2026-05-30T23:30:00+02:00",
      },
    ],
  },
  {
    day: "Zondag",
    date: "31 mei",
    subtitle: "Huisfestival, BBQ en rustige zondagavond",
    events: [
      {
        time: "13:00",
        title: "Activiteiten bij het huisje / huisfestival",
        text: "Zondag blijft bij de accommodatie. Muziek, spelletjes en genoeg ruimte om het dagprogramma losser te houden.",
        dateTime: "2026-05-31T13:00:00+02:00",
      },
      {
        time: "17:30",
        title: "BBQ",
        text: "Samen eten bij het huis, met genoeg marge voor de zondagrijders en de rest van de avond.",
        dateTime: "2026-05-31T17:30:00+02:00",
      },
      {
        time: "21:00",
        title: "Chill avond",
        text: "Rustiger afronden bij het huis. Eerste vertrekkers kunnen daarna netjes weg, de rest blijft hangen.",
        dateTime: "2026-05-31T21:00:00+02:00",
      },
    ],
  },
  {
    day: "Maandag",
    date: "1 juni",
    subtitle: "Opruimen en terug naar de realiteit",
    events: [
      {
        time: "09:30",
        title: "Opruimen",
        text: "Kamers nalopen, koelkast leeg, afval mee en nog één keer checken of niemand iets laat liggen.",
        dateTime: "2026-06-01T09:30:00+02:00",
      },
      {
        time: "11:00",
        title: "Vertrek",
        text: "Auto's inpakken, laatste check en richting huis.",
        dateTime: "2026-06-01T11:00:00+02:00",
      },
    ],
  },
];

const players = [
  "Niek",
  "Rik",
  "Finn",
  "Jacco",
  "Chiel",
  "Yassine",
  "Nigel",
  "Thom",
  "Kas",
  "Timo",
  "Steven",
  "Menno",
  "Jeroen",
  "Brian",
  "Gui",
  "Dennis",
  "Juul",
  "Wessel",
  "Giel",
];

const organizers = ["Jacco", "Chiel", "Wessel"];
const carAssignments = [
  {
    duration: "Vrijdag t/m zondag",
    label: "Auto 1",
    driver: "Finn",
    passengers: ["Brian", "Niek"],
    note: "Zondag terug. Eerste vertrekkers kunnen na het eten en het officiële einde van het programma weg.",
  },
  {
    duration: "Vrijdag t/m zondag",
    label: "Auto 2",
    driver: "Menno",
    passengers: ["Thom"],
    note: "Zondag terug. Houd vertrek rond 19:00 - 19:30 uur aan zolang er niets verandert.",
  },
  {
    duration: "Vrijdag t/m maandag",
    label: "Auto 1",
    driver: "Jacco",
    passengers: ["Chiel", "Wessel"],
    note: "Blijft tot maandag en pakt dus ook check-out mee.",
  },
  {
    duration: "Vrijdag t/m maandag",
    label: "Auto 2",
    driver: "Steven",
    passengers: ["Timo", "Jeroen", "Nigel"],
    note: "Maandag terug. Handig voor spullen en laatste check-outronde.",
  },
  {
    duration: "Vrijdag t/m maandag",
    label: "Auto 3",
    driver: "Dennis",
    passengers: ["Juul", "Kas", "Yassine"],
    note: "Maandag terug. Auto zit inhoudelijk vol, dus slim inpakken.",
  },
];
const drivers = carAssignments.map((car) => car.driver);
const sundayDepartures = carAssignments
  .filter((car) => car.duration === "Vrijdag t/m zondag")
  .flatMap((car) => [car.driver, ...car.passengers]);
const passengerToCarTag = Object.fromEntries(
  carAssignments.flatMap((car) =>
    car.passengers.map((passenger) => [passenger, `${car.label} ${car.driver}`]),
  ),
);
const backend = window.WOEZIK_BACKEND ?? {};
const backendEnabled = Boolean(backend.supabaseUrl && backend.supabaseAnonKey);
const PRESENCE_STORAGE_KEY = "woezik-presence";
const TASK_STORAGE_KEY = "woezik-tasks";
const SHOPPING_STORAGE_KEY = "woezik-shopping";
const QUOTE_STORAGE_KEY = "woezik-quotes";
const SITE_STATE_STORAGE_KEY = "woezik-site-state";
const PRESENCE_POLL_MS = 10000;
const appState = {
  isOrganizer: false,
  isUnlocked: false,
};
const presenceState = {
  entries: {},
  loading: false,
  error: false,
};
const sharedState = {
  site: {},
  tasks: {},
  quotes: [],
  shopping: [],
  errors: {
    site: false,
    tasks: false,
    quotes: false,
    shopping: false,
  },
};
const statusUiState = {
  filter: "all",
  unknownOnly: false,
};
const publicPages = ["home", "autos", "paklijst", "locatie"];
const publicHomeActions = [
  { id: "autos", label: "Auto's" },
  { id: "paklijst", label: "Paklijst" },
];
const organizerHomeActions = [
  { id: "status", label: "Status" },
];
const publicNavItems = [
  { id: "home", label: "Home" },
  { id: "autos", label: "Auto's" },
  { id: "locatie", label: "Locatie" },
  { id: "paklijst", label: "Paklijst" },
];
const organizerNavItems = [
  { id: "home", label: "Home" },
  { id: "programma", label: "Programma" },
  { id: "autos", label: "Auto's" },
  { id: "locatie", label: "Locatie" },
  { id: "meer", label: "Meer" },
];

const packingGroups = [
  {
    title: "Kleding",
    items: [
      "Genoeg casual kleding voor het hele weekend",
      "Ondergoed en sokken",
      "Pyjama of chill kleding",
      "Extra set kleding voor na activiteiten",
      "Jas of hoodie voor 's avonds",
      "Regenjas",
      "Zwembroek",
    ],
  },
  {
    title: "Voetbal & sport",
    items: [
      "Voetbalschoenen",
      "Scheenbeschermers",
      "Sportkleding (broekje en shirt)",
      "Sportsokken",
      "Sportschoenen",
      "Extra paar schoenen dat vies mag worden",
      "Slippers",
    ],
  },
  {
    title: "Badkamer & verzorging",
    items: [
      "Handdoek",
      "Shampoo of douchegel",
      "Tandenborstel en tandpasta",
      "Deo",
      "Eventuele medicijnen",
      "Lenzen of lenzenvloeistof",
    ],
  },
  {
    title: "Slapen",
    items: [
      "Kussen indien gewenst",
      "Oordoppen als je licht slaapt",
    ],
  },
  {
    title: "Handig om mee te nemen",
    items: [
      "Oplader(s)",
      "Powerbank",
      "Zaklamp",
      "Zonnebrand creme",
      "Zonnebril",
      "Pet of cap",
      "ID of rijbewijs",
      "Portemonnee",
      "Waterfles",
    ],
  },
];

const taskGroups = [
  {
    title: "Vrijdag aankomst",
    owner: "Organisatie",
    tasks: [
      "Check-in en accommodatie nalopen",
      "Koelkasten verdelen: eten, fris, bier",
      "Boodschappen voor burgers en zaterdagontbijt halen",
      "Bosroute voor dodenstraal uitzetten",
      "Zaklampen en start/eindpunt checken",
    ],
  },
  {
    title: "Zaterdag",
    owner: "Ontbijt- en activiteitenteam",
    tasks: [
      "Ontbijt met eieren regelen",
      "Vertrek en spullen voor de buitenactiviteiten scherp hebben",
      "Zorgen dat iedereen om 09:00 klaarstaat voor de eerste activiteit",
      "Pastamaaltijd voorbereiden",
      "Pubquizrondes klaarzetten",
    ],
  },
  {
    title: "Zondag",
    owner: "Festivalcrew",
    tasks: [
      "Huisfestivalplek opbouwen",
      "Muziek en stroompunten checken",
      "Chauffeurs scherp houden",
      "Gezamenlijk eten rond 17:30 uur voorbereiden",
      "Zondagrijders rond 19:30 uur goed weg laten komen",
    ],
  },
  {
    title: "Maandag",
    owner: "Iedereen die nog leeft",
    tasks: [
      "Kamers nalopen",
      "Afval verzamelen",
      "Koelkast leegmaken",
      "Sleutels en check-out regelen",
      "Laatste rondje vergeten spullen",
    ],
  },
];

const mealPlan = [
  {
    moment: "Vrijdag avond",
    title: "Burgers barbecue-stijl",
    text: "Makkelijk eten voor iedereen die verspreid binnenkomt.",
  },
  {
    moment: "Zaterdag ontbijt",
    title: "Eieren en stevige bodem",
    text: "Gebakken of gekookte eieren met brood en koffie.",
  },
  {
    moment: "Zaterdag avond",
    title: "Pastamaaltijd",
    text: "Grote pannen pasta voor de hele groep.",
  },
  {
    moment: "Zondag 17:30",
    title: "Gezamenlijk eten",
    text: "Op tijd eten voor de zondagrijders.",
  },
  {
    moment: "Maandag ochtend",
    title: "Restjesontbijt",
    text: "Koelkast leegmaken voordat de check-out begint.",
  },
];

const shoppingItems = [
  "Burgerbroodjes",
  "Burgers",
  "Kaas, sla, tomaat en saus",
  "Houtskool of gascheck barbecue",
  "Eieren",
  "Brood",
  "Koffie en melk",
  "Pasta",
  "Pastasaus",
  "Groente voor pasta",
  "Frisdrank",
  "Water",
  "Snacks",
  "Vuilniszakken",
  "Keukenrol",
  "Afwasmiddel",
];

const rules = [
  {
    type: "Echt",
    title: "Respecteer de accommodatie",
    text: "Alles wat heel aankomt, moet ook heel vertrekken. Schade meteen melden bij Jacco, Chiel of Wessel.",
  },
  {
    type: "Echt",
    title: "Chauffeurs blijven scherp",
    text: "Wie zondag rijdt, houdt daar overdag rekening mee. Geen discussie met mensen die jou naar huis moeten brengen.",
  },
  {
    type: "Echt",
    title: "Geen glas of rommel waar het niet hoort",
    text: "Zeker buiten en in het bos. We willen verhalen meenemen, geen glas in schoenen.",
  },
  {
    type: "Weekend",
    title: "Dodenstraal is geen contactsport",
    text: "Zaklampen zijn wapens genoeg. Tackles bewaren we voor het veld.",
  },
  {
    type: "Weekend",
    title: "Wie kookt, wordt geholpen",
    text: "Minimaal iemand dekt, iemand ruimt op en iemand doet alsof hij weet waar de pannen staan.",
  },
  {
    type: "Weekend",
    title: "Geen mensen achterlaten",
    text: "Niet bij tankstations, niet in België, niet omdat het grappig leek in het moment.",
  },
  {
    type: "Weekend",
    title: "Foto's mogen, verraad hoeft niet",
    text: "Bewijsmateriaal is leuk. Gebruik gezond verstand voordat iets de wereld in gaat.",
  },
];

const bingoItems = [
  "Iemand zegt: ik doe rustig aan",
  "Er raakt iemand iets kwijt",
  "Een DJ-set begint zonder overleg",
  "Iemand begint over vroeger",
  "Een chauffeur wordt ineens heel volwassen",
  "Er wordt tactiek besproken zonder bal",
  "Iemand valt overdag in slaap",
  "Boodschappen worden vergeten",
  "Een pubquizantwoord leidt tot ruzie",
];

const presenceStatuses = [
  "Bij huisje",
  "Onderweg",
  "Supermarkt",
  "Activiteit",
  "Slapen",
  "Even kwijt",
  "Waarschijnlijk oké",
  "Naar huis",
];

const eventPages = {
  dodenstraal: [
    {
      title: "Basisregels",
      tag: "Spel",
      items: [
        "Teams starten bij punt A",
        "Doel is punt B halen zonder zaklamp-hit",
        "Geraakt is terug naar checkpoint of start",
        "Wachters blijven op hun zone",
      ],
    },
    {
      title: "Winconditie",
      tag: "Doel",
      items: ["Zo veel mogelijk spelers halen punt B", "Werk rustig en slim", "Gebruik het donker in je voordeel"],
    },
    {
      title: "Veiligheid",
      tag: "Belangrijk",
      items: ["Geen tackles", "Niet rennen waar het gevaarlijk is", "Zaklampen mee", "Telefoon opgeladen"],
    },
  ],
  festival: [
    {
      title: "DJ-slots",
      tag: "Zondag",
      items: ["Slot 1 volgt", "Slot 2 volgt", "Slot 3 volgt", "Open aux moment"],
    },
    {
      title: "Flow",
      tag: "Programma",
      items: ["DJ-slots rouleren", "Spellen tussendoor", "Eten en drinken dichtbij houden", "Niet alles tegelijk willen"],
    },
    {
      title: "Benodigd",
      tag: "Check",
      items: ["Speaker", "Opladers", "Verlichting", "Spellen", "Voldoende water"],
    },
  ],
  activiteit: [
    {
      title: "Outdoor Dag",
      tag: "Zaterdag",
      items: [
        "Ardennen.nl Outdoor Dag",
        "Locatie in Comblain-au-Pont",
        "Ongeveer 45 minuten rijden vanaf het huisje",
        "Mountainbiken en kanoen staan voor jullie op het programma",
      ],
    },
    {
      title: "Praktisch",
      tag: "Praktisch",
      items: [
        "Om 09:00 bij de eerste activiteit zijn",
        "Nederlandstalige begeleiding volgens aanbieder",
        "Sportieve kleding en schoenen die vies mogen worden zijn slim",
        "Lunch en BBQ staan op de aanbiederspagina als inbegrepen",
      ],
    },
    {
      title: "Voor jullie groep",
      tag: "Keuze",
      items: [
        "Mountainbiken",
        "Kanoen",
        "Vertrektijd en definitieve groepsafspraak volgen via de site",
        "Website: ardennen.nl/activiteiten/outdoor-dag",
      ],
    },
  ],
};

const quizRounds = [
  {
    host: "Jacco",
    title: "Voetbal & Woezik",
    text: "Clubvragen, derde helft-logica en momenten die volgens sommigen nooit gebeurd zijn.",
  },
  {
    host: "Chiel",
    title: "Muziek & festival",
    text: "Intro's raden, foute meezingers en DJ-kennis die niemand hardop wil claimen.",
  },
  {
    host: "Wessel",
    title: "Random teamfeitjes",
    text: "Wie zei dit, wie deed dit, en wie ontkent dit waarschijnlijk direct?",
  },
  {
    host: "Finale",
    title: "Alles-of-niets ronde",
    text: "Dubbele punten, twijfelachtige overleggen en nul garantie op rechtvaardigheid.",
  },
];

const teamFacts = [
  "Er is altijd iemand die voor vertrek zegt dat hij weinig meeneemt en alsnog drie tassen heeft.",
  "De zin 'ik doe rustig aan' telt pas als waarschuwing wanneer hij voor 18:00 uur wordt uitgesproken.",
  "Een chauffeur die zondag rijdt, krijgt automatisch tijdelijk meer volwassenheid toegewezen.",
  "Bij een pubquiz is het hardste antwoord niet automatisch het juiste antwoord.",
  "Dodenstraal klinkt als een kinderspel totdat iemand in het donker fanatiek wordt.",
  "Een huisfestival is pas begonnen wanneer iemand vraagt wie de aux heeft.",
  "Boodschappen die niet op de lijst staan, worden toch gekocht als iemand honger heeft.",
];

function getStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function hasFullAccess() {
  return appState.isUnlocked || appState.isOrganizer;
}

function syncAccessState() {
  const nextUnlocked = Date.now() >= unlockDate.getTime();
  const nextOrganizer = nextUnlocked ? false : localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  const changed = appState.isUnlocked !== nextUnlocked || appState.isOrganizer !== nextOrganizer;

  appState.isUnlocked = nextUnlocked;
  appState.isOrganizer = nextOrganizer;

  document.body.classList.toggle("mode-unlocked", appState.isUnlocked);
  document.body.classList.toggle("mode-organizer", appState.isOrganizer && !appState.isUnlocked);
  document.body.classList.toggle("mode-public", !hasFullAccess());

  return changed;
}

function setOrganizerAccess(enabled) {
  if (enabled) {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
  syncAccessState();
}

function canAccessPage(pageId) {
  const panel = document.querySelector(`[data-page="${pageId}"]`);
  if (!panel) return false;
  return panel.dataset.access !== "organizer" || hasFullAccess();
}

function formatUnlockParts(diff) {
  const totalMinutes = Math.max(0, Math.floor(diff / 60000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  return { days, hours, minutes };
}

function formatUnlockLabel(diff) {
  if (diff <= 0) return "Open";
  const { days, hours, minutes } = formatUnlockParts(diff);
  return `${days}d ${hours}u ${minutes}m`;
}

function applyAccessVisibility() {
  document.querySelectorAll("[data-access]").forEach((node) => {
    const shouldHide = node.dataset.access === "organizer" && !hasFullAccess();
    node.hidden = shouldHide;
  });
}

function renderTopbarActions() {
  const root = document.querySelector("#topbarActions");
  if (!root) return;

  if (appState.isUnlocked) {
    root.innerHTML = '<button class="ghost-button" data-jump="nood">SOS</button>';
    return;
  }

  if (appState.isOrganizer) {
    root.innerHTML = `
      <button class="ghost-button subtle" data-jump="nood">SOS</button>
      <button class="ghost-button" id="logoutOrganizer" type="button">Uitloggen</button>
    `;
    return;
  }

  root.innerHTML = '<button class="ghost-button" id="openAuthModal" type="button">Organisator login</button>';
}

function renderHeroState() {
  const subcopy = document.querySelector("#heroSubcopy");
  const pills = document.querySelector("#heroPills");
  const meta = document.querySelector("#heroMeta");
  const contextLabel = document.querySelector("#heroContextLabel");
  const contextValue = document.querySelector("#heroContextValue");
  if (!subcopy || !pills || !meta || !contextLabel || !contextValue) return;

  if (hasFullAccess()) {
    subcopy.textContent =
      "29 mei tot 1 juni in Vaux-sur-Sure. Acht slaapkamers, sauna, bubbelbad en genoeg ruimte om er een volledig teamweekend van te maken.";
    pills.innerHTML = `
      <span>Vrij 29 mei</span>
      <span>Aankomst 17:00</span>
      <span>18 gasten</span>
      <span>Sauna + bubbelbad</span>
    `;
    meta.innerHTML = `
      <div>
        <span>Vrijdag</span>
        <strong>Aankomst, burgers, dodenstraal</strong>
      </div>
      <div>
        <span>Zaterdag</span>
        <strong>Buitenactiviteiten, pasta, pubquiz</strong>
      </div>
      <div>
        <span>Zondag + maandag</span>
        <strong>Huisfestival, BBQ, terugrit en check-out</strong>
      </div>
    `;
    contextLabel.textContent = "Locatie";
    contextValue.textContent = "Vaux-sur-Sure";
    return;
  }

  subcopy.textContent =
    "29 mei tot 1 juni. Bosspel in het donker, zaterdag naar buiten en zondag huisfestival bij het huisje.";
  pills.innerHTML = `
    <span>Vrij 29 mei</span>
    <span>Aankomst 17:00</span>
    <span>Weekendbase locked</span>
    <span>Unlock 17:00</span>
  `;
  meta.innerHTML = `
    <div>
      <span>Open nu</span>
      <strong>Paklijst, auto's en locatie</strong>
    </div>
    <div>
      <span>Later zichtbaar</span>
      <strong>Planning en verrassingen</strong>
    </div>
    <div>
      <span>Unlock</span>
      <strong>Vrijdag 17:00</strong>
    </div>
  `;
  contextLabel.textContent = "Locatie";
  contextValue.textContent = "Vaux-sur-Sure";
}

function renderHomeActions() {
  const root = document.querySelector("#homeActions");
  if (!root) return;

  if (hasFullAccess()) {
    const updatedBy = localStorage.getItem("woezik-presence-updater") || organizers[0];
    root.innerHTML = `
      <form class="home-status-quick" id="homeStatusForm">
        <div class="home-status-quick-head">
          <span class="eyebrow">Snelle actie</span>
          <strong>Status update</strong>
        </div>
        <div class="home-status-quick-fields">
          <label>
            <span>Speler</span>
            <select name="player">${players.map((player) => `<option value="${player}">${player}</option>`).join("")}</select>
          </label>
          <label>
            <span>Status</span>
            <select name="status">${presenceStatuses
              .map((status) => `<option value="${status}">${status}</option>`)
              .join("")}</select>
          </label>
        </div>
        <input type="hidden" name="updatedBy" value="${updatedBy}">
        <button type="submit">Update status</button>
      </form>
    `;
    return;
  }

  const actions = publicHomeActions;
  root.innerHTML = actions.map((action) => `<button data-jump="${action.id}">${action.label}</button>`).join("");
}

function renderBottomNav() {
  const root = document.querySelector("#bottomNav");
  if (!root) return;

  const current = document.querySelector(".panel.active")?.dataset.page ?? "home";
  const items = hasFullAccess() ? organizerNavItems : publicNavItems;

  root.innerHTML = items
    .map(
      (item) => `
        <button class="${current === item.id ? "active" : ""}" data-jump="${item.id}">
          ${item.label}
        </button>
      `,
    )
    .join("");
}

function renderUnlockGate() {
  const root = document.querySelector("#unlockGate");
  if (!root) return;

  const diff = unlockDate.getTime() - Date.now();
  const unlockText = new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(unlockDate);

  if (appState.isUnlocked) {
    root.innerHTML = `
      <article class="unlock-card unlock-live">
        <p class="eyebrow">Open voor iedereen</p>
        <h2>Het weekend is officieel begonnen.</h2>
        <p>Alles staat nu open. Programma, locatie, verrassingen en praktische details zijn voor iedereen zichtbaar.</p>
      </article>
    `;
    return;
  }

  if (appState.isOrganizer) {
    root.innerHTML = `
      <article class="unlock-card unlock-organizer unlock-organizer-compact">
        <div class="unlock-organizer-copy">
          <p class="eyebrow">Organizer preview</p>
          <h2>Organizer actief</h2>
          <p>Publieke unlock: ${unlockText}</p>
        </div>
        <button class="small-button secondary" id="logoutOrganizerInline" type="button">Uitloggen</button>
      </article>
    `;
    return;
  }

  const { days, hours, minutes } = formatUnlockParts(diff);
  root.innerHTML = `
    <article class="unlock-card unlock-public">
      <div class="unlock-copy">
        <p class="eyebrow">Nog even wachten</p>
        <h2>Het volledige weekendprogramma wordt onthuld over...</h2>
        <p>Paklijst en auto-indeling zijn al open. De rest unlockt automatisch zodra het teamweekend echt losgaat.</p>
      </div>
      <div class="unlock-timer" aria-label="Countdown naar unlock">
        <div><strong>${days}</strong><span>dagen</span></div>
        <div><strong>${hours}</strong><span>uren</span></div>
        <div><strong>${minutes}</strong><span>min</span></div>
      </div>
      <div class="unlock-tease" aria-hidden="true">
        <span>Programma</span>
        <span>Locatie</span>
        <span>Activiteiten</span>
        <span>Verrassingen</span>
      </div>
    </article>
  `;
}

function updateUnlockTimer(diff) {
  const timer = document.querySelector(".unlock-public .unlock-timer");
  if (!timer) return;

  const { days, hours, minutes } = formatUnlockParts(diff);
  const values = timer.querySelectorAll("strong");
  if (values.length < 3) return;

  values[0].textContent = String(days);
  values[1].textContent = String(hours);
  values[2].textContent = String(minutes);
}

function renderAccessShell() {
  applyAccessVisibility();
  renderHeroState();
  renderTopbarActions();
  renderHomeActions();
  renderBottomNav();
  renderUnlockGate();
}

function openAuthModal() {
  const modal = document.querySelector("#authModal");
  const input = document.querySelector("#authPassword");
  const error = document.querySelector("#authError");
  if (!modal) return;

  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  if (error) error.hidden = true;
  window.setTimeout(() => input?.focus(), 30);
}

function closeAuthModal() {
  const modal = document.querySelector("#authModal");
  const form = document.querySelector("#authForm");
  const error = document.querySelector("#authError");
  if (!modal) return;

  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  form?.reset();
  if (error) error.hidden = true;
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getSiteStateLocal() {
  return getStorage(SITE_STATE_STORAGE_KEY, {});
}

function setSiteStateLocal(nextState) {
  setStorage(SITE_STATE_STORAGE_KEY, nextState);
}

function getCurrentSiteState() {
  if (backendEnabled && Object.keys(sharedState.site).length) {
    return sharedState.site;
  }

  return getSiteStateLocal();
}

function getSiteValue(key, fallback = "") {
  const state = getCurrentSiteState();
  return state[key] ?? fallback;
}

function getTaskRecords() {
  return taskGroups.flatMap((group, groupIndex) =>
    group.tasks.map((task, taskIndex) => ({
      key: `${groupIndex}-${taskIndex}`,
      groupIndex,
      taskIndex,
      title: group.title,
      owner: group.owner,
      label: task,
    })),
  );
}

function getTasksLocal() {
  return getStorage(TASK_STORAGE_KEY, {});
}

function setTasksLocal(nextTasks) {
  setStorage(TASK_STORAGE_KEY, nextTasks);
}

function getRenderableTasks() {
  if (backendEnabled && Object.keys(sharedState.tasks).length) {
    return sharedState.tasks;
  }

  return getTasksLocal();
}

function getShoppingLocal() {
  return getStorage(SHOPPING_STORAGE_KEY, []);
}

function setShoppingLocal(nextItems) {
  setStorage(SHOPPING_STORAGE_KEY, nextItems);
}

function getRenderableShopping() {
  if (backendEnabled && sharedState.shopping.length) {
    return sharedState.shopping;
  }

  const local = getShoppingLocal();
  if (local.length) return local;

  return shoppingItems.map((label, index) => ({
    id: `seed-${index}`,
    label,
    done: false,
    createdAt: null,
    createdBy: null,
    updatedAt: null,
    updatedBy: null,
  }));
}

function getDeviceId() {
  const existingId = localStorage.getItem("woezik-device-id");
  if (existingId) return existingId;

  const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  localStorage.setItem("woezik-device-id", id);
  return id;
}

function getSupabaseBaseUrl() {
  return (backend.supabaseUrl || "").replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

async function supabaseRequest(path, options = {}) {
  if (!backendEnabled) return null;

  const baseUrl = getSupabaseBaseUrl();
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      apikey: backend.supabaseAnonKey,
      Authorization: `Bearer ${backend.supabaseAnonKey}`,
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

function normalizeSiteStateRows(rows) {
  return (rows ?? []).reduce((map, row) => {
    if (!row?.key) return map;
    map[row.key] = row.value;
    return map;
  }, {});
}

async function fetchSharedSiteState() {
  if (!backendEnabled) return null;
  const rows = await supabaseRequest("/rest/v1/site_state?select=key,value,updated_at,updated_by");
  return normalizeSiteStateRows(rows);
}

async function saveSharedSiteState(key, value, updatedBy = "Organisatie") {
  if (!backendEnabled || !key) return;

  await supabaseRequest("/rest/v1/site_state?on_conflict=key", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify([
      {
        key,
        value,
        updated_at: new Date().toISOString(),
        updated_by: updatedBy,
      },
    ]),
  });
}

async function refreshSiteState(options = {}) {
  const local = getSiteStateLocal();
  if (!backendEnabled) {
    sharedState.site = local;
    sharedState.errors.site = false;
    return local;
  }

  try {
    const nextState = await fetchSharedSiteState();
    sharedState.site = nextState ?? {};
    sharedState.errors.site = false;
    setSiteStateLocal(sharedState.site);
    return sharedState.site;
  } catch (error) {
    sharedState.errors.site = true;
    sharedState.site = local;
    if (!options.silent) {
      console.error("Site state sync failed", error);
    }
    return local;
  }
}

function normalizeTaskRows(rows) {
  return (rows ?? []).reduce((map, row) => {
    if (!row?.task_key) return map;
    map[row.task_key] = {
      done: Boolean(row.done),
      updatedAt: row.updated_at ?? null,
      updatedBy: row.updated_by ?? null,
      label: row.label ?? null,
      title: row.group_title ?? null,
      owner: row.owner ?? null,
    };
    return map;
  }, {});
}

async function seedSharedTasks() {
  const rows = getTaskRecords().map((task) => ({
    task_key: task.key,
    group_title: task.title,
    owner: task.owner,
    label: task.label,
    done: false,
  }));

  await supabaseRequest("/rest/v1/shared_tasks?on_conflict=task_key", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });
}

async function fetchSharedTasks() {
  const rows = await supabaseRequest("/rest/v1/shared_tasks?select=task_key,group_title,owner,label,done,updated_at,updated_by&order=task_key.asc");
  if (!rows?.length) {
    await seedSharedTasks();
    return fetchSharedTasks();
  }
  return normalizeTaskRows(rows);
}

async function saveSharedTask(taskKey, done, updatedBy = "Organisatie") {
  await supabaseRequest("/rest/v1/shared_tasks?task_key=eq." + encodeURIComponent(taskKey), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      done,
      updated_at: new Date().toISOString(),
      updated_by: updatedBy,
    }),
  });
}

async function resetSharedTasks() {
  const payload = getTaskRecords().map((task) => ({
    task_key: task.key,
    group_title: task.title,
    owner: task.owner,
    label: task.label,
    done: false,
    updated_at: null,
    updated_by: null,
  }));

  await supabaseRequest("/rest/v1/shared_tasks?on_conflict=task_key", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(payload),
  });
}

async function refreshTasks(options = {}) {
  const local = getTasksLocal();
  if (!backendEnabled) {
    sharedState.tasks = local;
    sharedState.errors.tasks = false;
    renderTaskMode();
    renderTasks();
    renderHomeDashboard();
    return local;
  }

  try {
    const nextTasks = await fetchSharedTasks();
    sharedState.tasks = nextTasks ?? {};
    sharedState.errors.tasks = false;
    setTasksLocal(sharedState.tasks);
  } catch (error) {
    sharedState.errors.tasks = true;
    sharedState.tasks = local;
    if (!options.silent) {
      console.error("Task sync failed", error);
    }
  }

  renderTaskMode();
  renderTasks();
  renderHomeDashboard();
  return sharedState.tasks;
}

function normalizeShoppingRows(rows) {
  return (rows ?? []).map((row) => ({
    id: row.id,
    label: row.label,
    done: Boolean(row.done),
    createdAt: row.created_at ?? null,
    createdBy: row.created_by ?? null,
    updatedAt: row.updated_at ?? null,
    updatedBy: row.updated_by ?? null,
  }));
}

async function seedSharedShopping() {
  const rows = shoppingItems.map((label) => ({
    label,
    done: false,
    created_by: "Organisatie",
  }));

  await supabaseRequest("/rest/v1/shared_shopping_items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(rows),
  });
}

async function fetchSharedShopping() {
  const rows = await supabaseRequest(
    "/rest/v1/shared_shopping_items?select=id,label,done,created_at,created_by,updated_at,updated_by&order=created_at.asc",
  );
  if (!rows?.length) {
    await seedSharedShopping();
    return fetchSharedShopping();
  }
  return normalizeShoppingRows(rows);
}

async function saveSharedShoppingItem(label, createdBy = "Organisatie") {
  await supabaseRequest("/rest/v1/shared_shopping_items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify([
      {
        label,
        done: false,
        created_by: createdBy,
      },
    ]),
  });
}

async function updateSharedShoppingItem(id, done, updatedBy = "Organisatie") {
  await supabaseRequest("/rest/v1/shared_shopping_items?id=eq." + encodeURIComponent(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      done,
      updated_at: new Date().toISOString(),
      updated_by: updatedBy,
    }),
  });
}

async function deleteSharedShoppingItem(id) {
  await supabaseRequest("/rest/v1/shared_shopping_items?id=eq." + encodeURIComponent(id), {
    method: "DELETE",
    headers: {
      Prefer: "return=minimal",
    },
  });
}

async function refreshShopping(options = {}) {
  const local = getShoppingLocal();
  if (!backendEnabled) {
    sharedState.shopping = local;
    sharedState.errors.shopping = false;
    renderShoppingMode();
    renderShoppingList();
    return local;
  }

  try {
    sharedState.shopping = (await fetchSharedShopping()) ?? [];
    sharedState.errors.shopping = false;
    setShoppingLocal(sharedState.shopping);
  } catch (error) {
    sharedState.errors.shopping = true;
    sharedState.shopping = local;
    if (!options.silent) {
      console.error("Shopping sync failed", error);
    }
  }

  renderShoppingMode();
  renderShoppingList();
  return sharedState.shopping;
}

async function fetchSharedQuotes() {
  return supabaseRequest("/rest/v1/shared_quotes?select=id,text,person,created_at,created_by&order=created_at.desc");
}

async function saveSharedQuote(text, person, createdBy = "Onbekend") {
  await supabaseRequest("/rest/v1/shared_quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify([
      {
        text,
        person,
        created_at: new Date().toISOString(),
        created_by: createdBy,
      },
    ]),
  });
}

async function deleteSharedQuote(id) {
  await supabaseRequest("/rest/v1/shared_quotes?id=eq." + encodeURIComponent(id), {
    method: "DELETE",
    headers: {
      Prefer: "return=minimal",
    },
  });
}

async function refreshQuotes(options = {}) {
  const local = getQuotes();
  if (!backendEnabled) {
    sharedState.quotes = local;
    sharedState.errors.quotes = false;
    renderQuotes();
    renderAdmin();
    return local;
  }

  try {
    sharedState.quotes = (await fetchSharedQuotes()) ?? [];
    sharedState.errors.quotes = false;
    setQuotes(sharedState.quotes);
  } catch (error) {
    sharedState.errors.quotes = true;
    sharedState.quotes = local;
    if (!options.silent) {
      console.error("Quote sync failed", error);
    }
  }

  renderQuotes();
  renderAdmin();
  return sharedState.quotes;
}

async function resetSharedPresence() {
  await supabaseRequest("/rest/v1/presence_status?player=not.is.null", {
    method: "DELETE",
    headers: {
      Prefer: "return=minimal",
    },
  });
}

async function saveSharedVote(award, player) {
  if (!backendEnabled || !player) return;

  await supabaseRequest("/rest/v1/award_votes?on_conflict=award,voter_id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify([
      {
        award,
        player,
        voter_id: getDeviceId(),
      },
    ]),
  });
}

async function getSharedVoteTotals() {
  if (!backendEnabled) return {};

  const rows = await supabaseRequest("/rest/v1/award_votes?select=award,player");
  return rows.reduce((totals, row) => {
    totals[row.award] ??= {};
    totals[row.award][row.player] = (totals[row.award][row.player] ?? 0) + 1;
    return totals;
  }, {});
}

function getVoteLeaderText(totals) {
  const entries = Object.entries(totals ?? {}).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return "Nog geen gedeelde stemmen";
  const [player, count] = entries[0];
  return `${player} staat bovenaan met ${count} stem${count === 1 ? "" : "men"}`;
}

async function uploadSharedPhoto(file) {
  if (!backendEnabled) return null;

  const bucket = backend.photoBucket || "weekend-photos";
  const safeName = file.name.replace(/[^a-z0-9._-]/gi, "-").toLowerCase();
  const path = `${getDeviceId()}/${Date.now()}-${safeName}`;
  const baseUrl = getSupabaseBaseUrl();
  const response = await fetch(`${baseUrl}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      apikey: backend.supabaseAnonKey,
      Authorization: `Bearer ${backend.supabaseAnonKey}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Photo upload failed: ${response.status}`);
  }

  return `${baseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

function renderSchedule() {
  const now = Date.now();
  const currentIndex = getCurrentEventIndex(now);
  const root = document.querySelector("#schedule");
  const mergedSchedule = getMergedSchedule();

  root.innerHTML = mergedSchedule
    .map((day, dayIndex) => {
      const events = day.events
        .map((event, eventIndex) => {
          const isCurrent = currentIndex?.dayIndex === dayIndex && currentIndex?.eventIndex === eventIndex;
          return `
            <article class="event ${isCurrent ? "current" : ""}">
              <time>${event.time}</time>
              <div>
                <h3>${event.title}</h3>
                <p>${event.text}</p>
                ${isCurrent ? '<span class="tag">Nu bezig</span>' : ""}
              </div>
            </article>
          `;
        })
        .join("");

      return `
        <section class="day-card">
          <div class="day-header">
            <h2>${day.day} <span>${day.date}</span></h2>
            <p>${day.subtitle}</p>
          </div>
          ${events}
        </section>
      `;
    })
    .join("");
}

function getAllEvents() {
  return getMergedSchedule().flatMap((day, dayIndex) =>
    day.events.map((event, eventIndex) => ({
      ...event,
      day: day.day,
      dayIndex,
      eventIndex,
      timestamp: new Date(event.dateTime).getTime(),
    })),
  );
}

function getCurrentEventIndex(now) {
  const events = getAllEvents();
  const current = events.find((event, index) => {
    const next = events[index + 1];
    return now >= event.timestamp && (!next || now < next.timestamp);
  });
  return current ? { dayIndex: current.dayIndex, eventIndex: current.eventIndex } : null;
}

function renderNextEvent() {
  const root = document.querySelector("#nextEvent");
  if (!root) return;

  const now = Date.now();
  const event = getNextEvent();
  const date = new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(event.dateTime));

  root.innerHTML = `
    <span>${date}</span>
    <strong>${event.title}</strong>
    <p>${event.text}</p>
  `;
}

function getNextEvent() {
  const now = Date.now();
  return getAllEvents().find((item) => item.timestamp > now) ?? getAllEvents().at(-1);
}

function getScheduleOverrides() {
  return getSiteValue("schedule_overrides", {});
}

function getMergedSchedule() {
  const overrides = getScheduleOverrides();

  return schedule.map((day, dayIndex) => ({
    ...day,
    events: day.events.map((event, eventIndex) => {
      const override = overrides[`${dayIndex}-${eventIndex}`] ?? {};
      return {
        ...event,
        ...override,
      };
    }),
  }));
}

function renderPlayers() {
  const root = document.querySelector("#players");
  if (!root) return;

  root.innerHTML = players
    .map((player, index) => {
      const tags = [
        organizers.includes(player) ? "Organisatie" : "",
        drivers.includes(player) ? "Chauffeur" : "",
        passengerToCarTag[player] ? passengerToCarTag[player] : "",
        sundayDepartures.includes(player) ? "Zondag weg" : "",
      ].filter(Boolean);

      return `
        <article class="player-card">
          <div class="player-number">${String(index + 1).padStart(2, "0")}</div>
          <h2>${player}</h2>
          ${
            tags.length
              ? `<div class="player-tags">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div>`
              : ""
          }
        </article>
      `;
    })
    .join("");
}

function renderPackingList() {
  const checked = getStorage("woezik-packing", {});
  document.querySelector("#packingList").innerHTML = packingGroups
    .map(
      (group, groupIndex) => `
        <section class="task-group">
          <div class="task-group-header">
            <span class="tag">Paklijst</span>
            <h2>${group.title}</h2>
          </div>
          <div class="task-list">
            ${group.items
              .map((item, itemIndex) => {
                const key = `${groupIndex}-${itemIndex}`;
                return `
                  <label class="check-item ${checked[key] ? "done" : ""}">
                    <input type="checkbox" data-pack="${key}" ${checked[key] ? "checked" : ""}>
                    <span>${item}</span>
                  </label>
                `;
              })
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

function renderTasks() {
  const taskState = getRenderableTasks();
  document.querySelector("#taskBoard").innerHTML = taskGroups
    .map(
      (group, groupIndex) => `
        <section class="task-group">
          <div class="task-group-header">
            <span class="tag">${group.owner}</span>
            <h2>${group.title}</h2>
          </div>
          <div class="task-list">
            ${group.tasks
              .map((task, taskIndex) => {
                const key = `${groupIndex}-${taskIndex}`;
                const entry = taskState[key] ?? {};
                const done = backendEnabled && Object.keys(sharedState.tasks).length ? entry.done : Boolean(entry);
                return `
                  <label class="check-item ${done ? "done" : ""}">
                    <input type="checkbox" data-task="${key}" ${done ? "checked" : ""}>
                    <span>${task}</span>
                    ${
                      entry.updatedAt
                        ? `<small class="check-meta">${entry.updatedBy ? `Door ${entry.updatedBy}` : "Bijgewerkt"} · ${new Intl.DateTimeFormat("nl-NL", {
                            weekday: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(entry.updatedAt))}</small>`
                        : ""
                    }
                  </label>
                `;
              })
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

function renderMealPlan() {
  document.querySelector("#mealPlan").innerHTML = mealPlan
    .map(
      (meal) => `
        <article class="meal-card">
          <span class="tag">${meal.moment}</span>
          <h2>${meal.title}</h2>
          <p>${meal.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderShoppingList() {
  const root = document.querySelector("#shoppingList");
  if (!root) return;

  const items = getRenderableShopping();
  root.innerHTML = items.length
    ? items
        .map(
          (item) => `
            <label class="check-item ${item.done ? "done" : ""}">
              <input type="checkbox" data-shopping="${item.id}" ${item.done ? "checked" : ""}>
              <span>
                ${item.label}
                ${
                  item.updatedAt
                    ? `<small class="check-meta">${item.updatedBy ? `Door ${item.updatedBy}` : "Bijgewerkt"} · ${new Intl.DateTimeFormat("nl-NL", {
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(item.updatedAt))}</small>`
                    : item.createdBy
                      ? `<small class="check-meta">Toegevoegd door ${item.createdBy}</small>`
                      : ""
                }
              </span>
              <button class="ghost-button subtle mini-delete" type="button" data-delete-shopping="${item.id}" aria-label="Verwijder ${item.label}" title="Verwijder ${item.label}">
                <span aria-hidden="true">×</span>
              </button>
            </label>
          `,
        )
        .join("")
    : '<p class="mode-note">Nog geen boodschappen op de lijst.</p>';
}

function renderShoppingMode() {
  const note = document.querySelector("#shoppingMode");
  if (!note) return;

  if (backendEnabled && !sharedState.errors.shopping) {
    note.textContent = "Gedeelde boodschappenlijst. Iedereen kan items toevoegen, afvinken en verwijderen.";
    note.classList.add("is-live");
    note.classList.remove("is-local");
    return;
  }

  note.textContent = "Boodschappenlijst staat lokaal op dit apparaat. Voeg Supabase toe voor gedeeld gebruik.";
  note.classList.add("is-local");
  note.classList.remove("is-live");
}

function renderRules() {
  document.querySelector("#rulesList").innerHTML = rules
    .map(
      (rule, index) => `
        <article class="rule-card">
          <div class="rule-number">${String(index + 1).padStart(2, "0")}</div>
          <div>
            <span class="tag">${rule.type}</span>
            <h2>${rule.title}</h2>
            <p>${rule.text}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderBingo() {
  const checked = getStorage("woezik-bingo", {});
  const root = document.querySelector("#bingo");
  if (!root) return;

  root.innerHTML = bingoItems
    .map(
      (item, index) => `
        <button class="bingo-tile ${checked[index] ? "checked" : ""}" data-bingo="${index}">
          ${item}
        </button>
      `,
    )
    .join("");
}

function renderPhotos() {
  const photos = getStorage("woezik-photos", []);
  const root = document.querySelector("#photoGrid");
  if (!root) return;

  root.innerHTML = photos
    .map((photo) => `<img src="${photo}" alt="Geüpload weekendmoment">`)
    .join("");
}

function getOpenTaskCount() {
  const taskState = getRenderableTasks();
  return taskGroups.reduce(
    (count, group, groupIndex) =>
      count +
      group.tasks.filter((_, taskIndex) => {
        const entry = taskState[`${groupIndex}-${taskIndex}`];
        return backendEnabled && Object.keys(sharedState.tasks).length ? !entry?.done : !entry;
      }).length,
    0,
  );
}

function renderHomeDashboard() {
  const root = document.querySelector("#homeDashboard");
  if (!root) return;

  const next = getNextEvent();
  const openTasks = getOpenTaskCount();
  const customAlert = getSiteValue("home_alert", "").trim();
  const sundayCars = carAssignments.filter((car) => car.duration === "Vrijdag t/m zondag").length;
  const mondayCars = carAssignments.filter((car) => car.duration === "Vrijdag t/m maandag").length;

  root.innerHTML = `
    <article class="dashboard-card dashboard-alert">
      <span>Alert</span>
      <strong>${customAlert || "Vrijdag aankomst vanaf 17:00, daarna boodschappen, bosroute en burgers."}</strong>
      <p>Gebruik deze site vooral voor programma, route, vervoer, SOS en praktische info.</p>
    </article>
    <article class="dashboard-card">
      <span>Volgende</span>
      <strong>${next.title}</strong>
      <p>${next.day} om ${next.time}</p>
    </article>
    <article class="dashboard-card">
      <span>Vervoer</span>
      <strong>${drivers.length} auto's bekend</strong>
      <p>${sundayCars} auto's gaan zondag terug, ${mondayCars} blijven tot maandag. Check Auto's voor de indeling.</p>
    </article>
    <article class="dashboard-card">
      <span>Open taken</span>
      <strong>${openTasks}</strong>
      <p>Vooral handig voor boodschappen, bosroute, eten en check-out.</p>
    </article>
  `;
}

function renderHomeLiveBanner() {
  const root = document.querySelector("#homeLiveBanner");
  if (!root) return;

  const next = getNextEvent();
  const customAlert = getSiteValue("home_alert", "").trim();
  const alertText = customAlert || `Volgende moment: ${next.title} op ${next.day} om ${next.time}.`;

  root.innerHTML = `
    <article class="live-banner-card">
      <div class="live-banner-copy">
        <p class="eyebrow">Live update</p>
        <h2>${alertText}</h2>
        <p>Gebruik dit blok voor alles wat nu telt: verzamelen, vertrek, eten, routewijzigingen of een laatste reminder.</p>
      </div>
      <div class="live-banner-meta">
        <span>Nu relevant</span>
        <strong>${next.title}</strong>
        <small>${next.day} · ${next.time}</small>
      </div>
    </article>
  `;
}

function renderTaskMode() {
  const note = document.querySelector("#taskMode");
  if (!note) return;

  if (backendEnabled && !sharedState.errors.tasks) {
    note.textContent = "Gedeeld takenbord. Iedereen ziet dezelfde checks en laatste updates.";
    note.classList.add("is-live");
    note.classList.remove("is-local");
    return;
  }

  note.textContent = "Taken staan lokaal op dit apparaat. Run de Supabase upgrade om dit bord te delen.";
  note.classList.add("is-local");
  note.classList.remove("is-live");
}

function renderSleepNotes() {
  const note = getSiteValue(
    "sleep_plan_note",
    "Deze onderdelen blijven bewust als placeholders staan tot de details zeker zijn.",
  );
  const inline = getSiteValue("sleep_plan_inline", "Nog te bepalen");
  const noteNode = document.querySelector("#sleepPlanNote");
  const inlineNode = document.querySelector("#sleepPlanInline");
  if (noteNode) noteNode.textContent = note;
  if (inlineNode) inlineNode.textContent = inline;
}

function unlockAdmin() {
  const input = document.querySelector("#adminCode");
  const panel = document.querySelector("#adminPanel");
  const lock = document.querySelector("#adminLock");
  if (!input || !panel || !lock) return;

  if (input.value === ORGANIZER_PASSWORD) {
    panel.hidden = false;
    lock.hidden = true;
    localStorage.setItem("woezik-admin-open", "true");
  }
}

function renderAdmin() {
  const panel = document.querySelector("#adminPanel");
  const lock = document.querySelector("#adminLock");
  const form = document.querySelector("#alertForm");
  const sleepForm = document.querySelector("#sleepPlanForm");
  const scheduleForm = document.querySelector("#scheduleForm");
  const quoteList = document.querySelector("#adminQuoteList");
  if (!panel || !lock || !form || !sleepForm || !scheduleForm || !quoteList) return;

  const open = localStorage.getItem("woezik-admin-open") === "true";
  panel.hidden = !open;
  lock.hidden = open;
  form.alert.value = getSiteValue("home_alert", "");
  sleepForm.sleepPlan.value = getSiteValue("sleep_plan_note", "");

  const events = getAllEvents();
  const currentEventId = scheduleForm.eventId.value || "0-0";
  scheduleForm.eventId.innerHTML = events
    .map(
      (event) =>
        `<option value="${event.dayIndex}-${event.eventIndex}">${event.day} ${event.time} · ${event.title}</option>`,
    )
    .join("");
  scheduleForm.eventId.value = events.some((event) => `${event.dayIndex}-${event.eventIndex}` === currentEventId)
    ? currentEventId
    : `${events[0].dayIndex}-${events[0].eventIndex}`;

  const overrides = getScheduleOverrides();
  const selected = events.find(
    (event) => `${event.dayIndex}-${event.eventIndex}` === scheduleForm.eventId.value,
  );
  const override = overrides[scheduleForm.eventId.value] ?? {};
  scheduleForm.time.value = override.time ?? selected?.time ?? "";
  scheduleForm.title.value = override.title ?? selected?.title ?? "";
  scheduleForm.text.value = override.text ?? selected?.text ?? "";

  const quotes = backendEnabled && sharedState.quotes.length ? sharedState.quotes : getQuotes();
  quoteList.innerHTML = quotes.length
    ? quotes
        .slice(0, 8)
        .map(
          (quote) => `
            <article class="admin-quote-item">
              <div>
                <strong>${quote.person}</strong>
                <p>"${quote.text}"</p>
              </div>
              <button class="ghost-button subtle" type="button" data-delete-quote="${quote.id ?? quote.at}">Verwijder</button>
            </article>
          `,
        )
        .join("")
    : '<p class="mode-note">Nog geen quotes om te beheren.</p>';
}

function renderCars() {
  const root = document.querySelector("#carGrid");
  if (!root) return;

  const sections = ["Vrijdag t/m zondag", "Vrijdag t/m maandag"];

  root.innerHTML = sections
    .map((duration) => {
      const cars = carAssignments.filter((car) => car.duration === duration);
      return `
        <section class="car-group-block">
          <div class="section-heading compact">
            <p class="eyebrow">Vervoer</p>
            <h2>${duration}</h2>
          </div>
          <div class="car-group-grid">
            ${cars
              .map(
                (car) => `
                  <article class="car-card">
                    <div class="car-driver">
                      <span class="tag">${car.label}</span>
                      <h2>${car.driver}</h2>
                    </div>
                    <div class="car-passengers">
                      <h3>Meerijders</h3>
                      ${car.passengers.map((person) => `<span>${person}</span>`).join("")}
                    </div>
                    <p>${car.note}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function getQuotes() {
  return getStorage(QUOTE_STORAGE_KEY, []);
}

function setQuotes(quotes) {
  setStorage(QUOTE_STORAGE_KEY, quotes.slice(0, 80));
}

function renderQuoteForm() {
  const form = document.querySelector("#quoteForm");
  if (!form) return;

  form.person.innerHTML = [
    '<option value="Onbekend">Onbekend</option>',
    ...players.map((player) => `<option value="${player}">${player}</option>`),
  ].join("");
}

function renderShoppingForm() {
  const form = document.querySelector("#shoppingForm");
  if (!form) return;

  form.addedBy.innerHTML = [
    ...organizers.map((name) => `<option value="${name}">${name}</option>`),
    ...players
      .filter((player) => !organizers.includes(player))
      .map((name) => `<option value="${name}">${name}</option>`),
  ].join("");
  form.addedBy.value = localStorage.getItem("woezik-presence-updater") || organizers[0];
}

function renderQuotes() {
  const root = document.querySelector("#quoteList");
  if (!root) return;

  const quotes = backendEnabled && sharedState.quotes.length ? sharedState.quotes : getQuotes();
  root.innerHTML = quotes.length
    ? quotes
        .map(
          (quote) => `
            <article class="quote-card">
              <p>"${quote.text}"</p>
              <div>
                <strong>${quote.person}</strong>
                <span>${new Intl.DateTimeFormat("nl-NL", {
                  weekday: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(quote.created_at ?? quote.at))}${quote.created_by ? ` · ${quote.created_by}` : ""}</span>
              </div>
            </article>
          `,
        )
        .join("")
    : '<p class="mode-note">Nog geen quotes opgeslagen.</p>';
}

function renderEventPage(pageKey, selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  root.innerHTML = eventPages[pageKey]
    .map(
      (block) => `
        <article class="event-info-card">
          <span class="tag">${block.tag}</span>
          <h2>${block.title}</h2>
          ${
            block.items
              ? `<ul>${block.items.map((item) => `<li>${item}</li>`).join("")}</ul>`
              : ""
          }
          ${
            block.actions
              ? `<div class="event-points">
                  ${block.actions
                    .map(
                      (action) => `
                        <div>
                          <span>${action.label}</span>
                          <strong>${action.points}</strong>
                        </div>
                      `,
                    )
                    .join("")}
                </div>`
              : ""
          }
        </article>
      `,
    )
    .join("");
}

function getPresence() {
  return getStorage(PRESENCE_STORAGE_KEY, {});
}

function setPresence(presence) {
  setStorage(PRESENCE_STORAGE_KEY, presence);
}

function getPresenceSourceLabel() {
  if (backendEnabled) {
    if (presenceState.error) return "Live status kon niet laden. Laatste bekende lokale fallback wordt getoond.";
    if (presenceState.loading && !Object.keys(presenceState.entries).length) return "Live status wordt geladen...";
    return "Live voor iedereen. Updates worden gedeeld via Supabase, inclusief wie het laatst heeft aangepast.";
  }

  return "Alleen lokaal op dit apparaat. Voeg Supabase toe in config.js om dit gedeeld live te maken.";
}

function renderStatusMode() {
  const note = document.querySelector("#statusMode");
  if (!note) return;

  note.textContent = getPresenceSourceLabel();
  note.classList.toggle("is-live", backendEnabled && !presenceState.error);
  note.classList.toggle("is-local", !backendEnabled || presenceState.error);
}

function getRenderablePresence() {
  if (backendEnabled && Object.keys(presenceState.entries).length) {
    return presenceState.entries;
  }

  return getPresence();
}

function normalizePresenceRows(rows) {
  return (rows ?? []).reduce((map, row) => {
    if (!row?.player) return map;
    map[row.player] = {
      status: row.status,
      at: row.updated_at,
      updatedBy: row.updated_by ?? null,
    };
    return map;
  }, {});
}

async function fetchSharedPresence() {
  if (!backendEnabled) return null;

  const rows = await supabaseRequest("/rest/v1/presence_status?select=player,status,updated_at,updated_by");
  return normalizePresenceRows(rows);
}

async function saveSharedPresence(player, status, updatedBy = "Organisatie") {
  if (!backendEnabled || !player || !status) return;

  await supabaseRequest("/rest/v1/presence_status?on_conflict=player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify([
      {
        player,
        status,
        updated_at: new Date().toISOString(),
        updated_by: updatedBy,
      },
    ]),
  });
}

async function refreshPresence(options = {}) {
  if (!backendEnabled) {
    presenceState.entries = getPresence();
    presenceState.error = false;
    presenceState.loading = false;
    renderStatusMode();
    renderPresence();
    return;
  }

  presenceState.loading = true;
  renderStatusMode();

  try {
    const sharedPresence = await fetchSharedPresence();
    presenceState.entries = sharedPresence ?? {};
    presenceState.error = false;
    setPresence(presenceState.entries);
  } catch (error) {
    presenceState.error = true;
    presenceState.entries = getPresence();
    if (!options.silent) {
      console.error("Presence sync failed", error);
    }
  } finally {
    presenceState.loading = false;
    renderStatusMode();
    renderPresence();
  }
}

function renderStatusForm() {
  const form = document.querySelector("#statusForm");
  const filter = document.querySelector("#statusFilter");
  if (!form) return;

  form.player.innerHTML = players.map((player) => `<option value="${player}">${player}</option>`).join("");
  form.status.innerHTML = presenceStatuses.map((status) => `<option value="${status}">${status}</option>`).join("");
  form.updatedBy.innerHTML = [
    ...organizers.map((name) => `<option value="${name}">${name}</option>`),
    ...players
      .filter((player) => !organizers.includes(player))
      .map((name) => `<option value="${name}">${name}</option>`),
  ].join("");
  form.updatedBy.value = localStorage.getItem("woezik-presence-updater") || organizers[0];

  if (filter) {
    filter.innerHTML = [
      '<option value="all">Alle statussen</option>',
      ...presenceStatuses.map((status) => `<option value="${status}">${status}</option>`),
    ].join("");
    filter.value = statusUiState.filter;
  }

  const unknownOnly = document.querySelector("#unknownOnly");
  if (unknownOnly) unknownOnly.checked = statusUiState.unknownOnly;
}

function submitPresenceUpdate(player, status, updatedBy) {
  if (!player || !status || !updatedBy) return;

  const nextEntry = {
    status,
    at: new Date().toISOString(),
    updatedBy,
  };
  localStorage.setItem("woezik-presence-updater", updatedBy);
  const presence = getPresence();
  presence[player] = nextEntry;
  setPresence(presence);
  presenceState.entries = {
    ...getRenderablePresence(),
    [player]: nextEntry,
  };
  renderPresence();
  renderStatusMode();
  renderHomeActions();

  if (backendEnabled) {
    saveSharedPresence(player, status, updatedBy)
      .then(() => refreshPresence({ silent: true }))
      .catch((error) => {
        presenceState.error = true;
        renderStatusMode();
        console.error("Presence save failed", error);
      });
  }
}

function renderPresence() {
  const root = document.querySelector("#statusGrid");
  const summary = document.querySelector("#presenceSummary");
  const recent = document.querySelector("#presenceRecent");
  if (!root) return;

  const presence = getRenderablePresence();
  const allEntries = players.map((player) => ({
    player,
    entry: presence[player] ?? null,
  }));
  const unknownCount = allEntries.filter(({ entry }) => !entry?.status).length;
  const recentChanges = allEntries
    .filter(({ entry }) => entry?.at)
    .sort((a, b) => new Date(b.entry.at).getTime() - new Date(a.entry.at).getTime())
    .slice(0, 5);
  const filteredEntries = allEntries.filter(({ entry }) => {
    if (statusUiState.unknownOnly) return !entry?.status;
    if (statusUiState.filter === "all") return true;
    return entry?.status === statusUiState.filter;
  });

  if (summary) {
    summary.innerHTML = `
      <article>
        <h3>Nog onbekend</h3>
        <p>${unknownCount} speler${unknownCount === 1 ? "" : "s"} heeft nog geen status.</p>
      </article>
      <article>
        <h3>Laatste update</h3>
        <p>${recentChanges[0] ? `${recentChanges[0].player} · ${recentChanges[0].entry.status}` : "Nog geen updates"}</p>
      </article>
    `;
  }

  if (recent) {
    recent.innerHTML = recentChanges.length
      ? recentChanges
          .map(
            ({ player, entry }) => `
              <article class="recent-item">
                <strong>${player}</strong>
                <span>${entry.status}</span>
                <small>${entry.updatedBy ? `Door ${entry.updatedBy} · ` : ""}${new Intl.DateTimeFormat("nl-NL", {
                  weekday: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(entry.at))}</small>
              </article>
            `,
          )
          .join("")
      : '<p class="mode-note">Nog geen recente wijzigingen.</p>';
  }

  root.innerHTML = filteredEntries
    .map(({ player, entry }) => {
      const updatedAt = entry?.at
        ? new Intl.DateTimeFormat("nl-NL", {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(entry.at))
        : "Geen update";
      const isRecent = entry?.at ? Date.now() - new Date(entry.at).getTime() < 45 * 60 * 1000 : false;
      return `
        <article class="presence-card ${isRecent ? "is-recent" : ""}">
          <h2>${player}</h2>
          <span>${entry?.status ?? "Nog onbekend"}</span>
          <p>${updatedAt}</p>
          <small>${entry?.updatedBy ? `Laatst door ${entry.updatedBy}` : "Nog niemand heeft dit bijgewerkt"}</small>
        </article>
      `;
    })
    .join("");
}

function startPresencePolling() {
  refreshPresence({ silent: true });

  window.setInterval(() => {
    if (!backendEnabled || !hasFullAccess()) return;
    refreshPresence({ silent: true });
  }, PRESENCE_POLL_MS);
}

function startSharedPolling() {
  window.setInterval(() => {
    if (!backendEnabled || !hasFullAccess()) return;
    refreshSiteState({ silent: true }).then(() => {
      renderSleepNotes();
      renderHomeLiveBanner();
      renderHomeDashboard();
      renderSchedule();
      renderNextEvent();
      renderAdmin();
    });
    refreshTasks({ silent: true });
    refreshShopping({ silent: true });
    refreshQuotes({ silent: true });
  }, PRESENCE_POLL_MS);
}

function renderQuizRounds() {
  const root = document.querySelector("#quizRounds");
  if (!root) return;

  root.innerHTML = quizRounds
    .map(
      (round, index) => `
        <article class="quiz-card">
          <div class="quiz-number">R${index + 1}</div>
          <span class="tag">${round.host}</span>
          <h2>${round.title}</h2>
          <p>${round.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderRandomFact() {
  const root = document.querySelector("#randomFact");
  if (!root) return;

  const fact = teamFacts[Math.floor(Math.random() * teamFacts.length)];
  root.innerHTML = `<p>${fact}</p>`;
}

function updateCountdown() {
  const diff = unlockDate.getTime() - Date.now();
  const countdown = document.querySelector("#countdown");
  if (!countdown) return;

  countdown.textContent = formatUnlockLabel(diff);
  if (!appState.isOrganizer && !appState.isUnlocked) {
    updateUnlockTimer(diff);
  }

  if (syncAccessState()) {
    closeAuthModal();
    renderAccessShell();
    const currentPage = document.querySelector(".panel.active")?.dataset.page ?? "home";
    if (!canAccessPage(currentPage)) {
      setActivePage("home");
    } else {
      renderBottomNav();
    }
  }
}

function setActivePage(pageId) {
  if (!canAccessPage(pageId)) {
    pageId = "home";
  }

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.page === pageId);
  });

  renderBottomNav();

  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", `#${pageId}`);
}

function bindEvents() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAuthModal();
    }
  });

  document.addEventListener("click", (event) => {
    const jump = event.target.closest("[data-jump]");
    if (jump) setActivePage(jump.dataset.jump);

    const bingo = event.target.closest("[data-bingo]");
    if (bingo) {
      const checked = getStorage("woezik-bingo", {});
      checked[bingo.dataset.bingo] = !checked[bingo.dataset.bingo];
      setStorage("woezik-bingo", checked);
      renderBingo();
    }

    if (event.target.closest("#newFact")) {
      renderRandomFact();
    }

    if (event.target.closest("#openAuthModal")) {
      openAuthModal();
    }

    if (event.target.closest("[data-close-auth]")) {
      closeAuthModal();
    }

    if (event.target.closest("#logoutOrganizer") || event.target.closest("#logoutOrganizerInline")) {
      setOrganizerAccess(false);
      renderAccessShell();
      closeAuthModal();
      setActivePage("home");
    }

    if (event.target.closest("#unlockAdmin")) {
      unlockAdmin();
      renderAdmin();
    }

    const deleteShopping = event.target.closest("[data-delete-shopping]");
    if (deleteShopping) {
      const itemId = deleteShopping.dataset.deleteShopping;
      if (backendEnabled) {
        deleteSharedShoppingItem(itemId)
          .then(() => refreshShopping({ silent: true }))
          .catch((error) => console.error("Shopping delete failed", error));
      } else {
        setShoppingLocal(getRenderableShopping().filter((item) => item.id !== itemId));
        renderShoppingList();
      }
    }

    const deleteQuote = event.target.closest("[data-delete-quote]");
    if (deleteQuote) {
      const quoteId = deleteQuote.dataset.deleteQuote;
      if (backendEnabled) {
        deleteSharedQuote(quoteId)
          .then(() => refreshQuotes({ silent: true }))
          .catch((error) => console.error("Quote delete failed", error));
      } else {
        setQuotes(getQuotes().filter((quote) => (quote.id ?? quote.at) !== quoteId));
        renderQuotes();
        renderAdmin();
      }
    }

    if (event.target.closest("#clearLocalData")) {
      [
        "woezik-packing",
        TASK_STORAGE_KEY,
        SHOPPING_STORAGE_KEY,
        "woezik-bingo",
        "woezik-photos",
        QUOTE_STORAGE_KEY,
        PRESENCE_STORAGE_KEY,
        "woezik-alert",
        SITE_STATE_STORAGE_KEY,
      ].forEach((key) => localStorage.removeItem(key));

      renderSchedule();
      renderNextEvent();
      renderHomeLiveBanner();
      renderHomeDashboard();
      renderPackingList();
      renderTaskMode();
      renderTasks();
      renderShoppingMode();
      renderShoppingList();
      renderBingo();
      renderSleepNotes();
      renderQuotes();
      refreshPresence({ silent: true });
      renderAdmin();
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("[data-pack]")) {
      const checked = getStorage("woezik-packing", {});
      checked[event.target.dataset.pack] = event.target.checked;
      setStorage("woezik-packing", checked);
      renderPackingList();
    }

    if (event.target.matches("[data-task]")) {
      const taskKey = event.target.dataset.task;
      const updatedBy = localStorage.getItem("woezik-presence-updater") || "Organisatie";

      if (backendEnabled) {
        const nextTasks = {
          ...getRenderableTasks(),
          [taskKey]: {
            ...(getRenderableTasks()[taskKey] ?? {}),
            done: event.target.checked,
            updatedAt: new Date().toISOString(),
            updatedBy,
          },
        };
        sharedState.tasks = nextTasks;
        renderTasks();
        renderHomeDashboard();
        saveSharedTask(taskKey, event.target.checked, updatedBy)
          .then(() => refreshTasks({ silent: true }))
          .catch((error) => {
            sharedState.errors.tasks = true;
            console.error("Task save failed", error);
            renderTaskMode();
          });
      } else {
        const checked = getTasksLocal();
        checked[taskKey] = event.target.checked;
        setTasksLocal(checked);
        renderTasks();
        renderHomeDashboard();
      }
    }

    if (event.target.matches("[data-shopping]")) {
      const itemId = event.target.dataset.shopping;
      const updatedBy = localStorage.getItem("woezik-presence-updater") || "Organisatie";

      if (backendEnabled) {
        sharedState.shopping = getRenderableShopping().map((item) =>
          item.id === itemId
            ? { ...item, done: event.target.checked, updatedAt: new Date().toISOString(), updatedBy }
            : item,
        );
        renderShoppingList();
        updateSharedShoppingItem(itemId, event.target.checked, updatedBy)
          .then(() => refreshShopping({ silent: true }))
          .catch((error) => {
            sharedState.errors.shopping = true;
            console.error("Shopping save failed", error);
            renderShoppingMode();
          });
      } else {
        const nextItems = getRenderableShopping().map((item) =>
          item.id === itemId ? { ...item, done: event.target.checked, updatedAt: new Date().toISOString(), updatedBy } : item,
        );
        setShoppingLocal(nextItems);
        renderShoppingList();
      }
    }

    if (event.target.matches("#statusFilter")) {
      statusUiState.filter = event.target.value;
      renderPresence();
    }

    if (event.target.matches("#unknownOnly")) {
      statusUiState.unknownOnly = event.target.checked;
      renderPresence();
    }

    if (event.target.matches('#scheduleForm select[name="eventId"]')) {
      renderAdmin();
    }

  });

  document.querySelector("#quoteForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const text = form.quote.value.trim();
    if (!text) return;
    const createdBy = localStorage.getItem("woezik-presence-updater") || "Onbekend";

    if (backendEnabled) {
      saveSharedQuote(text, form.person.value, createdBy)
        .then(() => refreshQuotes({ silent: true }))
        .catch((error) => console.error("Quote save failed", error));
    } else {
      setQuotes([
        {
          id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
          text,
          person: form.person.value,
          at: new Date().toISOString(),
          created_by: createdBy,
        },
        ...getQuotes(),
      ]);
      renderQuotes();
      renderAdmin();
    }

    form.reset();
    renderQuoteForm();
  });

  document.querySelector("#shoppingForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const label = form.item.value.trim();
    const addedBy = form.addedBy.value;
    if (!label) return;

    localStorage.setItem("woezik-presence-updater", addedBy);

    if (backendEnabled) {
      saveSharedShoppingItem(label, addedBy)
        .then(() => refreshShopping({ silent: true }))
        .catch((error) => console.error("Shopping create failed", error));
    } else {
      setShoppingLocal([
        ...getRenderableShopping(),
        {
          id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
          label,
          done: false,
          createdAt: new Date().toISOString(),
          createdBy: addedBy,
          updatedAt: null,
          updatedBy: null,
        },
      ]);
      renderShoppingList();
    }

    form.reset();
    renderShoppingForm();
  });

  document.querySelector("#statusForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    submitPresenceUpdate(form.player.value, form.status.value, form.updatedBy.value);
  });

  document.querySelector("#homeStatusForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    submitPresenceUpdate(form.player.value, form.status.value, form.updatedBy.value);
  });

  document.querySelector("#alertForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const value = form.alert.value.trim();
    const siteState = { ...getCurrentSiteState(), home_alert: value };
    setSiteStateLocal(siteState);
    sharedState.site = siteState;
    renderHomeLiveBanner();
    renderHomeDashboard();

    if (backendEnabled) {
      saveSharedSiteState("home_alert", value, "Organisatie")
        .then(() => refreshSiteState({ silent: true }))
        .catch((error) => console.error("Alert save failed", error));
    }
  });

  document.querySelector("#sleepPlanForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const note = form.sleepPlan.value.trim();
    const inline = note || "Nog te bepalen";
    const siteState = {
      ...getCurrentSiteState(),
      sleep_plan_note: note || "Deze onderdelen blijven bewust als placeholders staan tot de details zeker zijn.",
      sleep_plan_inline: inline,
    };
    setSiteStateLocal(siteState);
    sharedState.site = siteState;
    renderSleepNotes();

    if (backendEnabled) {
      Promise.all([
        saveSharedSiteState("sleep_plan_note", siteState.sleep_plan_note, "Organisatie"),
        saveSharedSiteState("sleep_plan_inline", siteState.sleep_plan_inline, "Organisatie"),
      ])
        .then(() => refreshSiteState({ silent: true }))
        .catch((error) => console.error("Sleep note save failed", error));
    }
  });

  document.querySelector("#scheduleForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const currentOverrides = { ...getScheduleOverrides() };
    currentOverrides[form.eventId.value] = {
      time: form.time.value.trim(),
      title: form.title.value.trim(),
      text: form.text.value.trim(),
    };
    const siteState = { ...getCurrentSiteState(), schedule_overrides: currentOverrides };
    setSiteStateLocal(siteState);
    sharedState.site = siteState;
    renderSchedule();
    renderNextEvent();
    renderAdmin();

    if (backendEnabled) {
      saveSharedSiteState("schedule_overrides", currentOverrides, "Organisatie")
        .then(() => refreshSiteState({ silent: true }))
        .catch((error) => console.error("Schedule save failed", error));
    }
  });

  document.querySelector("#resetScheduleOverride")?.addEventListener("click", () => {
    const form = document.querySelector("#scheduleForm");
    if (!form) return;

    const currentOverrides = { ...getScheduleOverrides() };
    delete currentOverrides[form.eventId.value];
    const siteState = { ...getCurrentSiteState(), schedule_overrides: currentOverrides };
    setSiteStateLocal(siteState);
    sharedState.site = siteState;
    renderSchedule();
    renderNextEvent();
    renderAdmin();

    if (backendEnabled) {
      saveSharedSiteState("schedule_overrides", currentOverrides, "Organisatie")
        .then(() => refreshSiteState({ silent: true }))
        .catch((error) => console.error("Schedule reset failed", error));
    }
  });

  document.querySelector("#resetSharedStatus")?.addEventListener("click", () => {
    if (!backendEnabled) {
      setPresence({});
      presenceState.entries = {};
      renderPresence();
      return;
    }

    resetSharedPresence()
      .then(() => refreshPresence({ silent: true }))
      .catch((error) => console.error("Presence reset failed", error));
  });

  document.querySelector("#resetSharedTasks")?.addEventListener("click", () => {
    if (!backendEnabled) {
      setTasksLocal({});
      renderTasks();
      renderHomeDashboard();
      return;
    }

    resetSharedTasks()
      .then(() => refreshTasks({ silent: true }))
      .catch((error) => console.error("Task reset failed", error));
  });

  document.querySelector("#authForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#authPassword");
    const error = document.querySelector("#authError");
    const password = input?.value.trim() ?? "";

    if (password !== ORGANIZER_PASSWORD) {
      if (error) error.hidden = false;
      input?.focus();
      input?.select();
      return;
    }

    setOrganizerAccess(true);
    renderAccessShell();
    closeAuthModal();
    setActivePage("home");
  });

  document.querySelector("#photoInput")?.addEventListener("change", (event) => {
    const files = Array.from(event.target.files).slice(0, 8);
    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        }),
    );

    Promise.all(readers).then((results) => {
      const photos = getStorage("woezik-photos", []);
      setStorage("woezik-photos", [...results, ...photos].slice(0, 18));
      renderPhotos();
      event.target.value = "";
    });

    if (backendEnabled) {
      Promise.all(files.map((file) => uploadSharedPhoto(file))).catch(() => {});
    }
  });
}

function init() {
  syncAccessState();
  sharedState.site = getSiteStateLocal();
  sharedState.tasks = getTasksLocal();
  sharedState.shopping = getShoppingLocal();
  sharedState.quotes = getQuotes();
  renderSchedule();
  renderNextEvent();
  renderHomeLiveBanner();
  renderHomeDashboard();
  renderPlayers();
  renderPackingList();
  renderTaskMode();
  renderTasks();
  renderMealPlan();
  renderShoppingMode();
  renderShoppingForm();
  renderShoppingList();
  renderRules();
  renderBingo();
  renderCars();
  renderSleepNotes();
  renderQuoteForm();
  renderQuotes();
  renderEventPage("dodenstraal", "#dodenstraalInfo");
  renderEventPage("festival", "#festivalInfo");
  renderEventPage("activiteit", "#activityInfo");
  renderStatusForm();
  renderStatusMode();
  renderPresence();
  renderAdmin();
  renderQuizRounds();
  renderRandomFact();
  renderPhotos();
  renderAccessShell();
  updateCountdown();
  bindEvents();
  startPresencePolling();
  startSharedPolling();

  refreshSiteState({ silent: true }).then(() => {
    renderSleepNotes();
    renderHomeLiveBanner();
    renderHomeDashboard();
    renderSchedule();
    renderNextEvent();
    renderAdmin();
  });
  refreshTasks({ silent: true });
  refreshShopping({ silent: true });
  refreshQuotes({ silent: true });

  const initialPage = location.hash.replace("#", "") || "home";
  if (document.querySelector(`[data-page="${initialPage}"]`) && canAccessPage(initialPage)) {
    setActivePage(initialPage);
  } else {
    setActivePage("home");
  }

  setInterval(updateCountdown, 1000);
}

init();
