export type Status = "Live business" | "Active project" | "Preview edition" | "In preparation";

export type Project = {
  slug: string;
  no: string;
  name: string;
  native?: string; // name in its own script
  category: string;
  status: Status;
  url?: string;
  urlLabel?: string;
  tagline: string;
  summary: string;
  story: string[];
  facts: { k: string; v: string }[];
  role: string[];
  logo?: { src: string; w: number; h: number; alt: string; invertOnDark?: boolean };
  cover: { src: string; alt: string };
  gallery: { src: string; alt: string; tall?: boolean; wide?: boolean }[];
  products?: { src: string; name: string }[];
  screens?: { desktop: string; mobile?: string; dw?: number; dh?: number };
  links?: { label: string; href: string }[];
  theme: string;
};

export const projects: Project[] = [
  {
    slug: "safar-nama",
    no: "01",
    name: "Ayub Safar Nama",
    native: "আইয়ুব সফরনামা",
    category: "Travel · Exploration · Travel journal",
    status: "Active project",
    url: "https://ayubsafarnama.vercel.app",
    urlLabel: "ayubsafarnama.vercel.app",
    tagline: "The road is the story.",
    summary:
      "A travel journal in film. Wherever I go, at home in Bangladesh or beyond it, I record the journey with a drone, a phone and a camera, and give each place a page of its own.",
    story: [
      "Safar Nama began with a simple habit: filming the places I visit. It has grown into a travel vlog and a website where each trip becomes a destination page, with the films, photographs and a short, sourced note on the place itself.",
      "The trips so far range from Mughal and colonial-era heritage in Old Dhaka (Lalbagh Fort and Ahsan Manzil) to the National Martyrs' Memorial in Savar, the sal forest of Bhawal National Park, the Nine Dome Mosque in Bagerhat and quieter corners such as Dogortoli and Horinpala Eco Park.",
      "Every trip is seen through three eyes: the drone for the wide view, the camera for the details and the phone for the honest moments in between.",
    ],
    facts: [
      { k: "Destinations", v: "10" },
      { k: "Films", v: "13+" },
      { k: "Ways of seeing", v: "Drone · Camera · Phone" },
      { k: "Languages", v: "বাংলা · English" },
    ],
    role: ["Founder & filmmaker", "Filming and editing", "Brand and website direction"],
    logo: { src: "/work/safar-nama/logo-dark.png", w: 1027, h: 1015, alt: "Ayub Safar Nama logo" },
    cover: { src: "/work/safar-nama/ayub-forest.jpg", alt: "Mohammad Ayub resting in the sal forest of Bhawal National Park" },
    gallery: [
      { src: "/work/safar-nama/lalbagh-tomb.jpg", alt: "In front of the tomb of Pari Bibi at Lalbagh Fort, Dhaka", tall: true },
      { src: "/work/safar-nama/memorial-pool.jpg", alt: "The reflecting pool at the National Martyrs' Memorial, Savar", tall: true },
      { src: "/work/safar-nama/lalbagh-wall.jpg", alt: "Beside the old wall of Lalbagh Fort with a drone case", tall: true },
      { src: "/work/safar-nama/ayub-boat.jpg", alt: "On a boat on the river before sunset", tall: true },
    ],
    screens: { desktop: "/work/safar-nama/site.jpg" },
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@ayub_safar_nama" },
      { label: "Instagram", href: "https://www.instagram.com/mdayub_net/" },
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61583304615651" },
    ],
    theme: "t-safar",
  },
  {
    slug: "as-sakinah",
    no: "02",
    name: "As-Sakinah",
    native: "السكينة · আস-সাকীনা",
    category: "Islamic knowledge · Content · Learning platform",
    status: "Active project",
    url: "https://as-sakinah.vercel.app",
    urlLabel: "as-sakinah.vercel.app",
    tagline: "A tranquil home for Islamic knowledge.",
    summary:
      "An Islamic knowledge and learning platform that brings the Quran, Hadith, Fiqh, Aqidah, Seerah and the Arabic language together in one organised, trilingual home.",
    story: [
      "As-Sakinah (السكينة, tranquillity) grew out of my own studies in Al-Hadith and Islamic Studies. It started as a series of carefully designed knowledge posts and became a full learning platform.",
      "Its library already holds the complete Quran in Uthmani script with Bengali and English translations, word-by-word meanings and verse-by-verse recitation; the Forty Hadith of Imam an-Nawawi; and the complete Sahih al-Bukhari and Sahih Muslim, each with Arabic text and translation.",
      "Accuracy comes before volume: every verse, hadith and ruling is taken from recognised sources and cited, and nothing is published without verification.",
    ],
    facts: [
      { k: "Knowledge sections", v: "16" },
      { k: "Topic pages", v: "310+" },
      { k: "Languages", v: "বাংলা · English · العربية" },
      { k: "Complete collections", v: "Quran · Bukhari · Muslim · Arba'in" },
    ],
    role: ["Founder", "Content direction and verification", "Brand and visual direction", "Platform planning (AI-assisted build)"],
    logo: { src: "/work/as-sakinah/arabic.png", w: 629, h: 619, alt: "As-Sakinah logo with two leaves and Arabic calligraphy" },
    cover: { src: "/work/as-sakinah/post-6-dua.jpg", alt: "As-Sakinah post: a Quranic supplication in Arabic calligraphy" },
    gallery: [
      { src: "/work/as-sakinah/post-1-nisyan.jpg", alt: "As-Sakinah infographic on the meanings of forgetfulness" },
      { src: "/work/as-sakinah/post-2-waqia.jpg", alt: "As-Sakinah infographic on Surah al-Waqi'ah" },
      { src: "/work/as-sakinah/post-3-waqafat-1.jpg", alt: "As-Sakinah 'Pauses with the Quran' post" },
      { src: "/work/as-sakinah/post-5-cover.jpg", alt: "Cover of the As-Sakinah 'Pauses with the Quran' series" },
    ],
    screens: { desktop: "/work/as-sakinah/site.jpg", mobile: "/work/as-sakinah/mobile.jpg" },
    theme: "t-sakinah",
  },
  {
    slug: "story-behind-history",
    no: "03",
    name: "Story Behind History",
    category: "History · Research · Historical storytelling",
    status: "Active project",
    url: "https://storybehindhistory.vercel.app",
    urlLabel: "storybehindhistory.vercel.app",
    tagline: "History is not just meant to be read. It is meant to be experienced.",
    summary:
      "A digital museum of human history: five thousand years told through maps, timelines and sourced stories, from the cities of Mesopotamia to the caliphates and the modern world.",
    story: [
      "Story Behind History is my attempt to make history something you can walk through. Empires, dynasties, people, places and battles sit on one shared timeline and one shared map, so you can see what was happening in different parts of the world at the same moment.",
      "Islamic history has a central place: fourteen centuries organised by era, dynasty and theme, from the Seerah and the Rightly Guided Caliphs to the Ottomans, the Mughals and al-Andalus. Battles such as Badr, Uhud and the Trench are reconstructed on animated maps.",
      "The rule is simple: define the scope first, and add a story only after it has been checked against sources.",
    ],
    facts: [
      { k: "Span", v: "c. 3500 BCE to the modern world" },
      { k: "Lenses", v: "Period · Civilisation · Empire · Dynasty · Region · Event · Battle · Figure · Topic" },
      { k: "Languages", v: "English · বাংলা · العربية" },
      { k: "Tools", v: "Historical atlas · World timeline · Comparisons" },
    ],
    role: ["Founder", "Research direction", "Editorial and visual concept", "Platform planning (AI-assisted build)"],
    logo: { src: "/work/story-behind-history/logo.png", w: 900, h: 370, alt: "Story Behind History logo" },
    cover: { src: "/work/story-behind-history/banner.jpg", alt: "Story Behind History banner with archival icons of world monuments" },
    gallery: [],
    screens: { desktop: "/work/story-behind-history/site.jpg", mobile: "/work/story-behind-history/mobile.jpg" },
    theme: "t-history",
  },
  {
    slug: "mystrick",
    no: "04",
    name: "Mystrick",
    category: "Technology · Science · Knowledge",
    status: "Preview edition",
    url: "https://mystrick.vercel.app",
    urlLabel: "mystrick.vercel.app",
    tagline: "Beyond the known.",
    summary:
      "A destination for science, technology, artificial intelligence, discoveries and the mysteries of our world, written to be understood and always linked to its sources.",
    story: [
      "Mystrick is where my curiosity about science and technology goes public. It covers technology, AI, space, discoveries, research, the future, and the questions history still has not answered.",
      "Its stories are explainers with real, linked sources: the eight-page paper that rewired artificial intelligence, the unfolding of the James Webb Space Telescope, the Antikythera mechanism, fusion ignition and the fifty-year protein-folding puzzle.",
      "Mystrick is currently in its preview edition. The stories on it are demonstration pieces while the publication is being built.",
    ],
    facts: [
      { k: "Desks", v: "Technology · AI · Science · Space · Discoveries · History & Mystery · Future" },
      { k: "Formats", v: "Stories · Explainers · Visual science · Videos" },
      { k: "Stage", v: "Preview edition" },
    ],
    role: ["Founder", "Editorial direction", "Brand and interface concept", "Platform planning (AI-assisted build)"],
    logo: { src: "/work/mystrick/icon.svg", w: 40, h: 40, alt: "Mystrick mark: a ring crossed by a horizon line" },
    cover: { src: "/work/mystrick/site.jpg", alt: "The Mystrick homepage: Beyond the known" },
    gallery: [],
    screens: { desktop: "/work/mystrick/site.jpg" },
    theme: "t-mystrick",
  },
  {
    slug: "attar-lagbe",
    no: "05",
    name: "Attar Lagbe",
    native: "আতর লাগবে",
    category: "Entrepreneurship · E-commerce · Fragrance",
    status: "Live business",
    url: "https://www.attarlagbe.com",
    urlLabel: "attarlagbe.com",
    tagline: "Pure fragrance, honestly sold.",
    summary:
      "My own attar and perfume-oil business: a Bangladeshi brand selling authentic, alcohol-free fragrance oils online, with cash on delivery across the country.",
    story: [
      "Attar Lagbe (আতর লাগবে, 'need attar?') is a real business, not a design exercise. It sells concentrated, alcohol-free attars and perfume oils, from fresh and sweet scents to deep oud, in 3, 6, 12 and 15 ml glass bottles.",
      "I built the brand from the ground up: the Bengali calligraphic logo, the product photography and packaging direction, the social and video content, and the bilingual e-commerce website, with its shop, order tracking and fragrance guides.",
      "The aim is a premium, trustworthy fragrance brand in which product quality, presentation and the customer's experience carry equal weight.",
    ],
    facts: [
      { k: "Products", v: "Attar · Perfume oil · Oud" },
      { k: "Bottles", v: "3 · 6 · 12 · 15 ml" },
      { k: "Delivery", v: "Nationwide, cash on delivery" },
      { k: "Website", v: "বাংলা · English" },
    ],
    role: ["Founder", "Brand identity and logo", "Product photography and creative content", "Packaging and visual branding", "E-commerce website", "Digital marketing"],
    logo: { src: "/work/attar-lagbe/logo-light.png", w: 900, h: 697, alt: "Attar Lagbe logo in Bengali calligraphy" },
    cover: { src: "/work/attar-lagbe/banner-vampire-blood.jpg", alt: "Attar Lagbe campaign banner: Vampire Blood, a touch of mystery" },
    gallery: [
      { src: "/work/attar-lagbe/banner-dior-sauvage.jpg", alt: "Attar Lagbe campaign banner: Dior Sauvage attar on a chessboard", wide: true },
      { src: "/work/attar-lagbe/banner-creed-aventus.jpg", alt: "Attar Lagbe campaign banner: Creed Aventus", wide: true },
      { src: "/work/attar-lagbe/banner-dunhill-desire.jpg", alt: "Attar Lagbe campaign banner: Dunhill Desire on a stage", wide: true },
      { src: "/work/attar-lagbe/banner-hawas-ice.jpg", alt: "Attar Lagbe campaign banner: Hawas Ice above the clouds", wide: true },
      { src: "/work/attar-lagbe/banner-gucci-flora.jpg", alt: "Attar Lagbe campaign banner: Gucci Flora held in a red silk glove", wide: true },
    ],
    products: [
      { src: "/work/attar-lagbe/p-bakhoor-al-arais.jpg", name: "Bakhoor Al Arais" },
      { src: "/work/attar-lagbe/p-black-afgano.jpg", name: "Black Afgano" },
      { src: "/work/attar-lagbe/p-creed-aventus.jpg", name: "Creed Aventus" },
      { src: "/work/attar-lagbe/p-dunhill-desire.jpg", name: "Dunhill Desire" },
      { src: "/work/attar-lagbe/p-gucci-flora.jpg", name: "Gucci Flora" },
      { src: "/work/attar-lagbe/p-hawas-ice.jpg", name: "Hawas Ice" },
      { src: "/work/attar-lagbe/p-lattafa-khamrah.jpg", name: "Khamrah" },
      { src: "/work/attar-lagbe/p-shahi-oud.jpg", name: "Shahi Oud" },
      { src: "/work/attar-lagbe/p-vampire-blood.jpg", name: "Vampire Blood" },
    ],
    screens: { desktop: "/work/attar-lagbe/site.jpg", dw: 946, dh: 591 },
    theme: "t-attar",
  },
  {
    slug: "sundus",
    no: "06",
    name: "Sundus",
    native: "سندس",
    category: "Entrepreneurship · Fashion · Modest clothing",
    status: "In preparation",
    tagline: "Modest clothing, in preparation.",
    summary:
      "An upcoming fashion and clothing brand for modest and Arabian-inspired wear, currently being prepared for launch.",
    story: [
      "Sundus (سندس) takes its name from the fine green silk described in the Quran as a garment of Paradise. The brand is being prepared around modest, dignified clothing with Arabian influences.",
      "The planned range includes jubba, abaya, hijab, niqab, burqa and other modest wear. Sourcing, the product line and the visual identity are being developed now.",
      "Sundus has not launched yet. This page will grow with the brand.",
    ],
    facts: [
      { k: "Planned range", v: "Jubba · Abaya · Hijab · Niqab · Burqa" },
      { k: "Direction", v: "Modest · Arabian-inspired" },
      { k: "Stage", v: "In preparation" },
    ],
    role: ["Founder", "Brand and product planning"],
    cover: { src: "", alt: "" },
    gallery: [],
    theme: "t-sundus",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
