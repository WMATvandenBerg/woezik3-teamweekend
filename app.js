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
        text: "Overdag naar buiten. De precieze invulling volgt, maar reken op actief en niet binnen blijven hangen.",
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
        time: "18:00",
        title: "BBQ",
        text: "Samen eten bij het huis, met genoeg marge voor de zondagrijders en de rest van de avond.",
        dateTime: "2026-05-31T18:00:00+02:00",
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
const publicPages = ["home", "autos", "paklijst"];
const publicHomeActions = [
  { id: "autos", label: "Auto's" },
  { id: "paklijst", label: "Paklijst" },
];
const organizerHomeActions = [
  { id: "programma", label: "Programma" },
  { id: "route", label: "Route" },
  { id: "autos", label: "Auto's" },
  { id: "nood", label: "SOS" },
];
const publicNavItems = [
  { id: "home", label: "Home" },
  { id: "autos", label: "Auto's" },
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
    owner: "Ontbijt- en festivalcrew",
    tasks: [
      "Ontbijt met eieren regelen",
      "Festivalplek opbouwen",
      "Muziek en stroompunten checken",
      "Pastamaaltijd voorbereiden",
      "Pubquizrondes klaarzetten",
    ],
  },
  {
    title: "Zondag",
    owner: "Activiteitenteam",
    tasks: [
      "Vertrektijd naar activiteitenlocatie bevestigen",
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
      tag: "Line-up",
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
      title: "Locatie",
      tag: "Vast",
      items: [
        "Sniper Zone",
        "Route du Barrage, 4960 Malmedy, België",
        "Outdoor activiteitenpark in de Ardennen",
        "Welke onderdelen we doen volgt nog",
      ],
    },
    {
      title: "Praktisch",
      tag: "Praktisch",
      items: [
        "Vertrektijd en auto-indeling nog bevestigen",
        "Chauffeurs meenemen in de zondagplanning",
        "Sportieve kleding en oude schoenen zijn slim",
        "Website: sniper-zone.be",
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
      <span>Check-in 13:00</span>
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
        <strong>Huisfestival, pasta, pubquiz</strong>
      </div>
      <div>
        <span>Zondag + maandag</span>
        <strong>Activiteit, terugrit, check-out</strong>
      </div>
    `;
    contextLabel.textContent = "Locatie";
    contextValue.textContent = "Vaux-sur-Sure";
    return;
  }

  subcopy.textContent =
    "29 mei tot 1 juni. Bosspel in het donker, huisfestival overdag, pubquiz als schadeafhandeling.";
  pills.innerHTML = `
    <span>Vrij 29 mei</span>
    <span>Check-in 13:00</span>
    <span>Weekendbase locked</span>
    <span>Unlock 17:00</span>
  `;
  meta.innerHTML = `
    <div>
      <span>Open nu</span>
      <strong>Paklijst en auto's</strong>
    </div>
    <div>
      <span>Later zichtbaar</span>
      <strong>Locatie, planning, verrassingen</strong>
    </div>
    <div>
      <span>Unlock</span>
      <strong>Vrijdag 17:00</strong>
    </div>
  `;
  contextLabel.textContent = "Status";
  contextValue.textContent = "Locatie locked";
}

function renderHomeActions() {
  const root = document.querySelector("#homeActions");
  if (!root) return;

  const actions = hasFullAccess() ? organizerHomeActions : publicHomeActions;
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
      <article class="unlock-card unlock-organizer">
        <div>
          <p class="eyebrow">Organizer preview</p>
          <h2>Volledige site staat voor jou open.</h2>
          <p>Voor deelnemers unlockt alles automatisch op ${unlockText}. Tot die tijd blijft de publieke versie beperkt tot auto’s en paklijst.</p>
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

  root.innerHTML = schedule
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
  return schedule.flatMap((day, dayIndex) =>
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
  const now = Date.now();
  const event = getNextEvent();
  const date = new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(event.dateTime));

  document.querySelector("#nextEvent").innerHTML = `
    <span>${date}</span>
    <strong>${event.title}</strong>
    <p>${event.text}</p>
  `;
}

function getNextEvent() {
  const now = Date.now();
  return getAllEvents().find((item) => item.timestamp > now) ?? getAllEvents().at(-1);
}

function renderPlayers() {
  document.querySelector("#players").innerHTML = players
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
  const checked = getStorage("woezik-tasks", {});
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
                return `
                  <label class="check-item ${checked[key] ? "done" : ""}">
                    <input type="checkbox" data-task="${key}" ${checked[key] ? "checked" : ""}>
                    <span>${task}</span>
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
  const checked = getStorage("woezik-shopping", {});
  document.querySelector("#shoppingList").innerHTML = shoppingItems
    .map(
      (item, index) => `
        <label class="check-item ${checked[index] ? "done" : ""}">
          <input type="checkbox" data-shopping="${index}" ${checked[index] ? "checked" : ""}>
          <span>${item}</span>
        </label>
      `,
    )
    .join("");
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
  document.querySelector("#photoGrid").innerHTML = photos
    .map((photo) => `<img src="${photo}" alt="Geüpload weekendmoment">`)
    .join("");
}

function getOpenTaskCount() {
  const checked = getStorage("woezik-tasks", {});
  return taskGroups.reduce(
    (count, group, groupIndex) =>
      count + group.tasks.filter((_, taskIndex) => !checked[`${groupIndex}-${taskIndex}`]).length,
    0,
  );
}

function renderHomeDashboard() {
  const root = document.querySelector("#homeDashboard");
  if (!root) return;

  const next = getNextEvent();
  const openTasks = getOpenTaskCount();
  const customAlert = localStorage.getItem("woezik-alert");
  const sundayCars = carAssignments.filter((car) => car.duration === "Vrijdag t/m zondag").length;
  const mondayCars = carAssignments.filter((car) => car.duration === "Vrijdag t/m maandag").length;

  root.innerHTML = `
    <article class="dashboard-card dashboard-alert">
      <span>Alert</span>
      <strong>${customAlert || "Vrijdag aankomst rond 13:00, daarna boodschappen, bosroute en burgers."}</strong>
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
  const customAlert = localStorage.getItem("woezik-alert")?.trim();
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

function unlockAdmin() {
  const input = document.querySelector("#adminCode");
  const panel = document.querySelector("#adminPanel");
  const lock = document.querySelector("#adminLock");
  if (!input || !panel || !lock) return;

  if (input.value === "Woezik3") {
    panel.hidden = false;
    lock.hidden = true;
    localStorage.setItem("woezik-admin-open", "true");
  }
}

function renderAdmin() {
  const panel = document.querySelector("#adminPanel");
  const lock = document.querySelector("#adminLock");
  const form = document.querySelector("#alertForm");
  if (!panel || !lock || !form) return;

  const open = localStorage.getItem("woezik-admin-open") === "true";
  panel.hidden = !open;
  lock.hidden = open;
  form.alert.value = localStorage.getItem("woezik-alert") || "";
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
  return getStorage("woezik-quotes", []);
}

function setQuotes(quotes) {
  setStorage("woezik-quotes", quotes.slice(0, 40));
}

function renderQuoteForm() {
  const form = document.querySelector("#quoteForm");
  if (!form) return;

  form.person.innerHTML = [
    '<option value="Onbekend">Onbekend</option>',
    ...players.map((player) => `<option value="${player}">${player}</option>`),
  ].join("");
}

function renderQuotes() {
  const root = document.querySelector("#quoteList");
  if (!root) return;

  const quotes = getQuotes();
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
                }).format(new Date(quote.at))}</span>
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
    return "Live voor iedereen. Updates worden gedeeld via Supabase.";
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

async function saveSharedPresence(player, status) {
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
        updated_by: getDeviceId(),
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
  if (!form) return;

  form.player.innerHTML = players.map((player) => `<option value="${player}">${player}</option>`).join("");
  form.status.innerHTML = presenceStatuses.map((status) => `<option value="${status}">${status}</option>`).join("");
}

function renderPresence() {
  const root = document.querySelector("#statusGrid");
  if (!root) return;

  const presence = getRenderablePresence();
  root.innerHTML = players
    .map((player) => {
      const entry = presence[player];
      return `
        <article class="presence-card">
          <h2>${player}</h2>
          <span>${entry?.status ?? "Nog onbekend"}</span>
          <p>${entry ? new Intl.DateTimeFormat("nl-NL", {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(entry.at)) : "Geen update"}</p>
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

function renderQuizRounds() {
  document.querySelector("#quizRounds").innerHTML = quizRounds
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
  const fact = teamFacts[Math.floor(Math.random() * teamFacts.length)];
  document.querySelector("#randomFact").innerHTML = `<p>${fact}</p>`;
}

function updateCountdown() {
  const diff = unlockDate.getTime() - Date.now();
  const countdown = document.querySelector("#countdown");
  if (!countdown) return;

  countdown.textContent = formatUnlockLabel(diff);
  if (!appState.isOrganizer || appState.isUnlocked) {
    renderUnlockGate();
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

    if (event.target.closest("#clearLocalData")) {
      [
        "woezik-packing",
        "woezik-tasks",
        "woezik-shopping",
        "woezik-bingo",
        "woezik-photos",
        "woezik-quotes",
        PRESENCE_STORAGE_KEY,
        "woezik-alert",
      ].forEach((key) => localStorage.removeItem(key));

      renderSchedule();
      renderNextEvent();
      renderHomeLiveBanner();
      renderHomeDashboard();
      renderPackingList();
      renderTasks();
      renderShoppingList();
      renderBingo();
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
      const checked = getStorage("woezik-tasks", {});
      checked[event.target.dataset.task] = event.target.checked;
      setStorage("woezik-tasks", checked);
      renderTasks();
    }

    if (event.target.matches("[data-shopping]")) {
      const checked = getStorage("woezik-shopping", {});
      checked[event.target.dataset.shopping] = event.target.checked;
      setStorage("woezik-shopping", checked);
      renderShoppingList();
    }

  });

  document.querySelector("#quoteForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const text = form.quote.value.trim();
    if (!text) return;

    setQuotes([
      {
        text,
        person: form.person.value,
        at: new Date().toISOString(),
      },
      ...getQuotes(),
    ]);
    form.reset();
    renderQuoteForm();
    renderQuotes();
  });

  document.querySelector("#statusForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextEntry = {
      status: form.status.value,
      at: new Date().toISOString(),
    };
    const presence = getPresence();
    presence[form.player.value] = nextEntry;
    setPresence(presence);
    presenceState.entries = {
      ...getRenderablePresence(),
      [form.player.value]: nextEntry,
    };
    renderPresence();
    renderStatusMode();

    if (backendEnabled) {
      saveSharedPresence(form.player.value, form.status.value)
        .then(() => refreshPresence({ silent: true }))
        .catch((error) => {
          presenceState.error = true;
          renderStatusMode();
          console.error("Presence save failed", error);
        });
    }
  });

  document.querySelector("#alertForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    localStorage.setItem("woezik-alert", form.alert.value.trim());
    renderHomeLiveBanner();
    renderHomeDashboard();
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

  document.querySelector("#photoInput").addEventListener("change", (event) => {
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
  renderSchedule();
  renderNextEvent();
  renderHomeLiveBanner();
  renderHomeDashboard();
  renderPlayers();
  renderPackingList();
  renderTasks();
  renderMealPlan();
  renderShoppingList();
  renderRules();
  renderBingo();
  renderCars();
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

  const initialPage = location.hash.replace("#", "") || "home";
  if (document.querySelector(`[data-page="${initialPage}"]`) && canAccessPage(initialPage)) {
    setActivePage(initialPage);
  } else {
    setActivePage("home");
  }

  setInterval(updateCountdown, 1000);
}

init();
