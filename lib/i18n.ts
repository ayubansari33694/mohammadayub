export const langs = ["en", "bn", "ar"] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = "en";
export const isLang = (v: string): v is Lang => (langs as readonly string[]).includes(v);
export const dir = (l: Lang) => (l === "ar" ? "rtl" : "ltr");
export const langNames: Record<Lang, { short: string; name: string; locale: string }> = {
  en: { short: "EN", name: "English", locale: "en_US" },
  bn: { short: "বাং", name: "বাংলা", locale: "bn_BD" },
  ar: { short: "عر", name: "العربية", locale: "ar_SA" },
};

/** Build a link for a language. English lives at the root (no prefix). */
export function href(lang: Lang, path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return p;
  if (p === "/") return `/${lang}`;
  if (p.startsWith("/#")) return `/${lang}${p.slice(1)}`;
  return `/${lang}${p}`;
}

type Edu = { when: string; level: string; school: string; place: string; note: string; grade?: boolean; current?: boolean };

export type Dict = {
  meta: { title: string; description: string };
  name: { first: string; last: string; full: string };
  roles: string[];
  nav: { about: string; work: string; ventures: string; education: string; contact: string; home: string; talk: string; time: string; menu: string; close: string; navigate: string; projects: string };
  app: { install: string; iosHint: string };
  hero: { kicker: [string, string]; intro: string; explore: string; touch: string; caption: string; scroll: string; seal: string; portraitAlt: string; secondary: string };
  marquee: string[];
  about: { label: string; statement: string; p: string[]; aimLabel: string; aim: string; principles: [string, string][] };
  work: { label: string; title1: string; title2: string; lede: string; view: string; explore: string };
  status: Record<"Live business" | "Active project" | "Preview edition" | "In preparation", string>;
  panels: {
    safarTitle: [string, string, string];
    safarCaptions: [string, string, string];
    stops: string[];
    sakinahList: string[];
    historyTitle: [string, string];
    historyNote: string;
    ruler: string[];
    mystrickTitle: [string, string];
    mystrickDesks: string;
    attarFacts: [string, string][];
    sundusRange: string[];
  };
  ventures: {
    label: string;
    title1: string;
    title2: string;
    live: string;
    attar: string;
    built: string;
    builtList: string[];
    caseStudy: string;
    soon: string;
    sundus: string;
    planned: string;
    plannedList: string[];
    aboutVenture: string;
  };
  edu: { label: string; title1: string; title2: string; lede: string; items: Edu[] };
  skills: { label: string; title1: string; title2: string; groups: { title: string; lead: string; items: string[] }[]; langsTitle: string; langsNote: string; langs: { name: string; native: string; value: number; cls: Lang }[] };
  research: { label: string; title1: string; title2: string; items: { k: string; v: string; slug?: string; link?: string }[]; see: string };
  contact: {
    label: string;
    title1: string;
    title2: string;
    lede: string;
    email: string;
    phone: string;
    website: string;
    location: string;
    locationValue: string;
    social: string;
    form: { name: string; email: string; subject: string; message: string; send: string; sending: string; sent: string; mailto: string; error: string; network: string; hp: string };
  };
  footer: { kicker: string; title1: string; title2: string; orb: [string, string]; line: string; work: string; elsewhere: string; contact: string; time: string; rights: string; top: string };
  case: { home: string; work: string; overview: string; role: string; website: string; caption: string; next: string; visit: string; productImagery: string; posts: string; road: string; collection: string; soon: string; soonLink: string };
  notFound: { label: string; title1: string; title2: string; lede: string; home: string; contact: string };
  loader: string;
};

const en: Dict = {
  meta: {
    title: "Mohammad Ayub — Student, Designer, Entrepreneur & Digital Creator",
    description:
      "The personal portfolio of Mohammad Ayub: a student of Al-Hadith and Islamic Studies who designs brands, builds digital platforms and founds ventures, from Attar Lagbe to As-Sakinah, Story Behind History and Mystrick.",
  },
  name: { first: "Mohammad", last: "Ayub", full: "Mohammad Ayub" },
  roles: ["Student", "Creative Designer", "Entrepreneur", "Digital Creator", "Research Enthusiast"],
  nav: { about: "About", work: "Work", ventures: "Ventures", education: "Education", contact: "Contact", home: "Home", talk: "Let’s talk", time: "Dhaka", menu: "Open menu", close: "Close menu", navigate: "Navigate", projects: "Projects" },
  app: { install: "Install the app", iosHint: "On iPhone or iPad: tap Share, then “Add to Home Screen”." },
  hero: {
    kicker: ["Personal portfolio", "Bangladesh"],
    intro: "I study the Hadith and the Islamic sciences, and I build things: brands, digital platforms, films and ventures. This is where all of them meet.",
    explore: "Explore my work",
    touch: "Get in touch",
    caption: "Student · Al-Hadith & Islamic Studies",
    scroll: "Scroll",
    seal: "KNOWLEDGE · CREATIVITY · TECHNOLOGY · ENTERPRISE · ",
    portraitAlt: "Portrait of Mohammad Ayub",
    secondary: "محمد أيوب",
  },
  marquee: ["Knowledge", "Design", "Enterprise", "Technology", "Storytelling", "Research", "العلم"],
  about: {
    label: "01 — About",
    statement: "A student by calling, a maker by habit. I believe knowledge, creativity, technology and enterprise belong in the same hands.",
    p: [
      "I am a student of Al-Hadith and Islamic Studies with a wide, restless curiosity. Alongside my studies I work across Islamic scholarship, creative design, digital technology, entrepreneurship and research.",
      "What I enjoy most is turning an idea into something real: a visual identity, a website people use, a film, a business with customers. Each project on this site is one expression of that habit. Some are about knowledge, some about stories, one is about fragrance, and all of them were built with the same care.",
      "My early schooling was in Saudi Arabia, and my madrasa education continued in Bangladesh. Bengali, Arabic and English are the three languages I live and work in.",
    ],
    aimLabel: "My aim",
    aim: "Above all, I want to be a sincere and devoted Muslim: to grow, through the pursuit of sacred knowledge, into a knowledgeable and capable scholar; to draw closer to Allah; and to carry the message of Islam to others with wisdom and compassion.",
    principles: [
      ["Verify, then publish", "Whether it is a hadith, a date in history or a scientific claim, nothing goes out unchecked."],
      ["Build, don't just plan", "Plans matter only when they turn into working things. I prefer shipping and improving."],
      ["AI-first, people-centred", "I use AI to do more with less, so the work can serve more people."],
      ["Create opportunity", "My long-term aim is ventures that grow large enough to create work for others."],
    ],
  },
  work: {
    label: "02 — Projects & ventures",
    title1: "Six worlds.",
    title2: "One maker.",
    lede: "Every project has its own name, its own audience and its own visual language. Together they map what I care about: travel, faith, history, science, enterprise and craft.",
    view: "View",
    explore: "Explore the project",
  },
  status: { "Live business": "Live business", "Active project": "Active project", "Preview edition": "Preview edition", "In preparation": "In preparation" },
  panels: {
    safarTitle: ["The road", "is the", "story."],
    safarCaptions: ["Lalbagh Fort · Dhaka", "Bhawal · Gazipur", "Savar"],
    stops: ["Lalbagh Fort", "Ahsan Manzil", "National Martyrs' Memorial", "Bhawal National Park", "Nine Dome Mosque", "Dogortoli", "Horinpala Eco Park"],
    sakinahList: ["The complete Quran, word by word", "Sahih al-Bukhari and Sahih Muslim, complete", "The Forty Hadith of an-Nawawi", "16 sections · 310+ topic pages · 3 languages"],
    historyTitle: ["History is not just meant to be read.", "It is meant to be experienced."],
    historyNote: "Nine lenses: period, civilisation, empire, dynasty, region, event, battle, figure and topic. One atlas, one world timeline. English, বাংলা and العربية.",
    ruler: ["3500 BCE", "500 BCE", "622 CE", "1258", "1453", "1922", "Today"],
    mystrickTitle: ["Beyond", "the known."],
    mystrickDesks: "Technology / AI / Science / Space / Discoveries / History & Mystery / Future",
    attarFacts: [
      ["Alcohol-free", "Concentrated oils"],
      ["3 · 6 · 12 · 15 ml", "Glass bottles"],
      ["Nationwide", "Cash on delivery"],
    ],
    sundusRange: ["Jubba", "Abaya", "Hijab", "Niqab", "Burqa"],
  },
  ventures: {
    label: "03 — Ventures & entrepreneurship",
    title1: "One brand on the market.",
    title2: "One in the making.",
    live: "Live business",
    attar: "A fragrance brand that sells authentic, alcohol-free attar and perfume oils across Bangladesh, online, with cash on delivery.",
    built: "What I built",
    builtList: ["Brand identity and Bengali calligraphic logo", "Product presentation and photography", "Packaging and visual branding", "Bilingual e-commerce website", "Digital marketing and creative content"],
    caseStudy: "Case study →",
    soon: "In preparation",
    sundus: "A modest-fashion and clothing brand with Arabian influences, being prepared for launch. Not yet open for orders.",
    planned: "Planned range",
    plannedList: ["Jubba", "Abaya", "Hijab and niqab", "Burqa", "Other modest and Arabian-inspired wear"],
    aboutVenture: "About the venture →",
  },
  edu: {
    label: "04 — Education",
    title1: "From Khamis Mushait",
    title2: "to Tongi.",
    lede: "A madrasa education that began in Saudi Arabia and continues today in the study of the Hadith.",
    items: [
      { when: "Now", level: "Second-year student · Al-Hadith and Islamic Studies", school: "Tamirul Millat Kamil Madrasa, Tongi Campus", place: "Tongi, Gazipur, Bangladesh", note: "First-year examinations completed; results not yet published.", current: true },
      { when: "2024", level: "Alim (HSC equivalent) · Humanities", school: "Darunnajat Siddikia Kamil Madrasa", place: "Dhaka, Bangladesh", note: "GPA 5.00 (A+)", grade: true },
      { when: "2022", level: "Dakhil (SSC equivalent) · Humanities", school: "Dhani Safa Salehia Fazil Madrasa", place: "Pirojpur, Bangladesh", note: "GPA 5.00 (A+)", grade: true },
      { when: "1437–1438 AH", level: "Elementary Certificate (Ebtedai)", school: "Al-Mowaddah Primary School for Memorization", place: "Khamis Mushait, Aseer, Saudi Arabia", note: "Result: Excellent" },
    ],
  },
  skills: {
    label: "05 — Skills & expertise",
    title1: "The toolkit",
    title2: "behind the work.",
    groups: [
      { title: "Creative & Design", lead: "Giving ideas a face.", items: ["Graphic design", "Typography", "Visual identity design", "Branding and creative direction"] },
      { title: "Video & Motion", lead: "Telling it in time.", items: ["Video editing", "Motion graphics"] },
      { title: "Digital & Business", lead: "Taking it to people.", items: ["Digital marketing", "Digital content creation", "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"] },
    ],
    langsTitle: "Languages",
    langsNote: "Self-assessed proficiency, as stated in my CV. Not formal examination scores.",
    langs: [
      { name: "Bengali", native: "বাংলা", value: 99, cls: "bn" },
      { name: "Arabic", native: "العربية", value: 90, cls: "ar" },
      { name: "English", native: "English", value: 80, cls: "en" },
    ],
  },
  research: {
    label: "06 — Research & interests",
    title1: "Curious about how things work,",
    title2: "and how we know.",
    see: "See",
    items: [
      { k: "Hadith & the Islamic sciences", v: "My formal study. The discipline of checking a report's chain and its text shapes how I treat every source, in every field.", slug: "as-sakinah", link: "As-Sakinah" },
      { k: "History, read from sources", v: "Civilisations, dynasties and battles placed on one map and one timeline, with each story added only after verification.", slug: "story-behind-history", link: "Story Behind History" },
      { k: "Science & technology", v: "Discoveries, space, computing and the ideas behind modern AI, explained clearly and always linked to the original source.", slug: "mystrick", link: "Mystrick" },
      { k: "AI & automation", v: "I work AI-first: using AI tools and agents to research, design, build and run projects that would otherwise need a team." },
    ],
  },
  contact: {
    label: "07 — Contact",
    title1: "Let’s build something",
    title2: "meaningful.",
    lede: "For collaborations, projects, questions about my ventures, or simply to say salam, write to me. I read every message.",
    email: "Email",
    phone: "Phone",
    website: "Website",
    location: "Location",
    locationValue: "Mathbaria, Pirojpur, Barisal, Bangladesh",
    social: "Social",
    form: {
      name: "Your name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send message",
      sending: "Sending…",
      sent: "Thank you. Your message has been sent.",
      mailto: "Your email app should open with the message ready to send.",
      error: "Something went wrong. Please try again.",
      network: "Network error. Please try again, or email me directly.",
      hp: "Leave this empty",
    },
  },
  footer: {
    kicker: "Have an idea worth building?",
    title1: "Let’s make it",
    title2: "real.",
    orb: ["Start a", "conversation"],
    line: "Knowledge, creativity, technology and enterprise, in one practice.",
    work: "Work",
    elsewhere: "Elsewhere",
    contact: "Contact",
    time: "Dhaka time",
    rights: "All rights reserved.",
    top: "Back to top",
  },
  case: {
    home: "Home",
    work: "Work",
    overview: "Overview",
    role: "My role",
    website: "The website",
    caption: "Screenshots of the live site, captured November 2026.",
    next: "Next project",
    visit: "Visit",
    productImagery: "Campaign imagery",
    posts: "Knowledge posts",
    road: "From the road",
    collection: "The collection · 6 ml",
    soon: "Sundus is being prepared. Its logo, collection and launch date will be shared here when they are ready. To ask about it in the meantime,",
    soonLink: "get in touch",
  },
  notFound: { label: "Error 404", title1: "This page took", title2: "a different road.", lede: "The page you were looking for does not exist, or it has moved. Try one of these instead.", home: "Back to home", contact: "Contact me" },
  loader: "Portfolio · MMXXVI",
};

const bn: Dict = {
  meta: {
    title: "মোহাম্মদ আইয়ুব — শিক্ষার্থী, ডিজাইনার, উদ্যোক্তা ও ডিজিটাল ক্রিয়েটর",
    description:
      "মোহাম্মদ আইয়ুবের ব্যক্তিগত পোর্টফোলিও: আল-হাদিস অ্যান্ড ইসলামিক স্টাডিজের একজন শিক্ষার্থী, যিনি ব্র্যান্ড ডিজাইন করেন, ডিজিটাল প্ল্যাটফর্ম গড়েন এবং উদ্যোগ শুরু করেন — আতর লাগবে থেকে আস-সাকীনা, স্টোরি বিহাইন্ড হিস্ট্রি ও মিস্ট্রিক পর্যন্ত।",
  },
  name: { first: "মোহাম্মদ", last: "আইয়ুব", full: "মোহাম্মদ আইয়ুব" },
  roles: ["শিক্ষার্থী", "ক্রিয়েটিভ ডিজাইনার", "উদ্যোক্তা", "ডিজিটাল ক্রিয়েটর", "গবেষণা-অনুরাগী"],
  nav: { about: "পরিচিতি", work: "কাজ", ventures: "উদ্যোগ", education: "শিক্ষা", contact: "যোগাযোগ", home: "হোম", talk: "কথা বলুন", time: "ঢাকা", menu: "মেনু খুলুন", close: "মেনু বন্ধ করুন", navigate: "নেভিগেশন", projects: "প্রজেক্টসমূহ" },
  app: { install: "অ্যাপ হিসেবে ইনস্টল করুন", iosHint: "আইফোন বা আইপ্যাডে: Share বাটনে চাপ দিন, তারপর “Add to Home Screen” বেছে নিন।" },
  hero: {
    kicker: ["ব্যক্তিগত পোর্টফোলিও", "বাংলাদেশ"],
    intro: "আমি হাদিস ও ইসলামি জ্ঞান অধ্যয়ন করি, আর তৈরি করি নানা কিছু: ব্র্যান্ড, ডিজিটাল প্ল্যাটফর্ম, ভিডিও আর উদ্যোগ। সবকিছু এক জায়গায় এখানে।",
    explore: "আমার কাজ দেখুন",
    touch: "যোগাযোগ করুন",
    caption: "শিক্ষার্থী · আল-হাদিস অ্যান্ড ইসলামিক স্টাডিজ",
    scroll: "স্ক্রল",
    seal: "KNOWLEDGE · CREATIVITY · TECHNOLOGY · ENTERPRISE · ",
    portraitAlt: "মোহাম্মদ আইয়ুবের প্রতিকৃতি",
    secondary: "Mohammad Ayub",
  },
  marquee: ["জ্ঞান", "ডিজাইন", "উদ্যোগ", "প্রযুক্তি", "গল্পকথন", "গবেষণা", "العلم"],
  about: {
    label: "০১ — পরিচিতি",
    statement: "পরিচয়ে শিক্ষার্থী, অভ্যাসে নির্মাতা। আমি বিশ্বাস করি জ্ঞান, সৃজনশীলতা, প্রযুক্তি আর উদ্যোগ — সবই একই হাতে থাকতে পারে।",
    p: [
      "আমি আল-হাদিস অ্যান্ড ইসলামিক স্টাডিজের একজন শিক্ষার্থী, যার কৌতূহলের সীমা নেই। পড়াশোনার পাশাপাশি আমি কাজ করি ইসলামি জ্ঞান, ক্রিয়েটিভ ডিজাইন, ডিজিটাল প্রযুক্তি, উদ্যোক্তা-জীবন আর গবেষণা নিয়ে।",
      "সবচেয়ে ভালো লাগে একটা ভাবনাকে বাস্তবে রূপ দিতে: একটা ভিজ্যুয়াল আইডেন্টিটি, মানুষ ব্যবহার করে এমন একটা ওয়েবসাইট, একটা ভিডিও, ক্রেতা আছে এমন একটা ব্যবসা। এই সাইটের প্রতিটি প্রজেক্ট সেই অভ্যাসেরই প্রকাশ। কোনোটা জ্ঞান নিয়ে, কোনোটা গল্প নিয়ে, একটা সুগন্ধি নিয়ে — আর প্রতিটি গড়া হয়েছে একই যত্নে।",
      "আমার প্রাথমিক পড়াশোনা সৌদি আরবে, এরপর মাদ্রাসা শিক্ষা বাংলাদেশে। বাংলা, আরবি ও ইংরেজি — এই তিন ভাষাতেই আমার জীবন ও কাজ।",
    ],
    aimLabel: "আমার লক্ষ্য",
    aim: "সবার আগে আমি একজন নিষ্ঠাবান ও একনিষ্ঠ মুসলিম হতে চাই: পবিত্র জ্ঞানের সাধনার মাধ্যমে নিজেকে একজন জ্ঞানী ও যোগ্য আলেম হিসেবে গড়ে তুলতে, আল্লাহর আরও নিকটবর্তী হতে, এবং প্রজ্ঞা ও মমতা দিয়ে মানুষের কাছে ইসলামের বাণী পৌঁছে দিতে।",
    principles: [
      ["আগে যাচাই, পরে প্রকাশ", "হাদিস হোক, ইতিহাসের তারিখ হোক বা বৈজ্ঞানিক দাবি — যাচাই ছাড়া কিছুই প্রকাশ করি না।"],
      ["শুধু পরিকল্পনা নয়, নির্মাণ", "পরিকল্পনা তখনই অর্থবহ, যখন তা কাজের জিনিসে পরিণত হয়। আমি বানাই, তারপর উন্নত করি।"],
      ["AI-প্রথম, মানুষ-কেন্দ্রিক", "কম সম্পদে বেশি কাজ করতে AI ব্যবহার করি, যাতে কাজটা আরও বেশি মানুষের উপকারে আসে।"],
      ["সুযোগ সৃষ্টি", "আমার দীর্ঘমেয়াদি লক্ষ্য এমন উদ্যোগ গড়া, যা অন্যদের জন্যও কর্মসংস্থান তৈরি করবে।"],
    ],
  },
  work: {
    label: "০২ — প্রজেক্ট ও উদ্যোগ",
    title1: "ছয়টি জগৎ।",
    title2: "একজন নির্মাতা।",
    lede: "প্রতিটি প্রজেক্টের নিজস্ব নাম, নিজস্ব দর্শক আর নিজস্ব ভিজ্যুয়াল ভাষা আছে। একসাথে এগুলো দেখায় আমি কী ভালোবাসি: ভ্রমণ, বিশ্বাস, ইতিহাস, বিজ্ঞান, উদ্যোগ আর কারুকাজ।",
    view: "দেখুন",
    explore: "প্রজেক্টটি দেখুন",
  },
  status: { "Live business": "চালু ব্যবসা", "Active project": "চলমান প্রজেক্ট", "Preview edition": "প্রিভিউ সংস্করণ", "In preparation": "প্রস্তুতি চলছে" },
  panels: {
    safarTitle: ["পথই", "আসল", "গল্প।"],
    safarCaptions: ["লালবাগ কেল্লা · ঢাকা", "ভাওয়াল · গাজীপুর", "সাভার"],
    stops: ["লালবাগ কেল্লা", "আহসান মঞ্জিল", "জাতীয় স্মৃতিসৌধ", "ভাওয়াল জাতীয় উদ্যান", "নয় গম্বুজ মসজিদ", "ডগরতলি", "হরিণপালা ইকো পার্ক"],
    sakinahList: ["সম্পূর্ণ কুরআন, শব্দে শব্দে অর্থসহ", "সহীহ আল-বুখারী ও সহীহ মুসলিম, সম্পূর্ণ", "ইমাম নববীর চল্লিশ হাদিস", "১৬টি বিভাগ · ৩১০+ বিষয়ভিত্তিক পাতা · ৩টি ভাষা"],
    historyTitle: ["ইতিহাস শুধু পড়ার জন্য নয়।", "ইতিহাস অনুভব করার জন্য।"],
    historyNote: "নয়টি দৃষ্টিকোণ: কাল, সভ্যতা, সাম্রাজ্য, রাজবংশ, অঞ্চল, ঘটনা, যুদ্ধ, ব্যক্তিত্ব ও বিষয়। একটি মানচিত্র, একটি বিশ্ব-টাইমলাইন। English, বাংলা ও العربية।",
    ruler: ["খ্রিস্টপূর্ব ৩৫০০", "খ্রিস্টপূর্ব ৫০০", "৬২২ খ্রি.", "১২৫৮", "১৪৫৩", "১৯২২", "আজ"],
    mystrickTitle: ["জানার", "ওপারে।"],
    mystrickDesks: "প্রযুক্তি / AI / বিজ্ঞান / মহাকাশ / আবিষ্কার / ইতিহাস ও রহস্য / ভবিষ্যৎ",
    attarFacts: [
      ["অ্যালকোহল-মুক্ত", "ঘন সুগন্ধি তেল"],
      ["৩ · ৬ · ১২ · ১৫ মি.লি.", "কাচের বোতল"],
      ["সারা দেশে", "ক্যাশ অন ডেলিভারি"],
    ],
    sundusRange: ["জুব্বা", "আবায়া", "হিজাব", "নিকাব", "বোরকা"],
  },
  ventures: {
    label: "০৩ — উদ্যোগ ও উদ্যোক্তা-জীবন",
    title1: "একটি ব্র্যান্ড বাজারে।",
    title2: "আরেকটি তৈরি হচ্ছে।",
    live: "চালু ব্যবসা",
    attar: "একটি সুগন্ধি ব্র্যান্ড, যা সারা বাংলাদেশে অনলাইনে খাঁটি, অ্যালকোহল-মুক্ত আতর ও পারফিউম অয়েল বিক্রি করে — ক্যাশ অন ডেলিভারিতে।",
    built: "যা আমি গড়েছি",
    builtList: ["ব্র্যান্ড আইডেন্টিটি ও বাংলা ক্যালিগ্রাফি লোগো", "প্রোডাক্ট উপস্থাপনা ও ফটোগ্রাফি", "প্যাকেজিং ও ভিজ্যুয়াল ব্র্যান্ডিং", "দ্বিভাষিক ই-কমার্স ওয়েবসাইট", "ডিজিটাল মার্কেটিং ও ক্রিয়েটিভ কনটেন্ট"],
    caseStudy: "বিস্তারিত দেখুন →",
    soon: "প্রস্তুতি চলছে",
    sundus: "আরবীয় ছোঁয়ার একটি শালীন পোশাকের ব্র্যান্ড, যা চালুর প্রস্তুতি চলছে। এখনো অর্ডার নেওয়া শুরু হয়নি।",
    planned: "পরিকল্পিত পণ্য",
    plannedList: ["জুব্বা", "আবায়া", "হিজাব ও নিকাব", "বোরকা", "অন্যান্য শালীন ও আরবীয় ধাঁচের পোশাক"],
    aboutVenture: "উদ্যোগটি সম্পর্কে →",
  },
  edu: {
    label: "০৪ — শিক্ষা",
    title1: "খামিস মুশাইত থেকে",
    title2: "টঙ্গী।",
    lede: "যে মাদ্রাসা শিক্ষা শুরু হয়েছিল সৌদি আরবে, তা আজ চলছে হাদিস অধ্যয়নে।",
    items: [
      { when: "বর্তমান", level: "দ্বিতীয় বর্ষের শিক্ষার্থী · আল-হাদিস অ্যান্ড ইসলামিক স্টাডিজ", school: "তামিরুল মিল্লাত কামিল মাদ্রাসা, টঙ্গী ক্যাম্পাস", place: "টঙ্গী, গাজীপুর, বাংলাদেশ", note: "প্রথম বর্ষের পরীক্ষা সম্পন্ন; ফলাফল এখনো প্রকাশিত হয়নি।", current: true },
      { when: "২০২৪", level: "আলিম (এইচএসসি সমমান) · মানবিক", school: "দারুন্নাজাত সিদ্দিকিয়া কামিল মাদ্রাসা", place: "ঢাকা, বাংলাদেশ", note: "জিপিএ ৫.০০ (A+)", grade: true },
      { when: "২০২২", level: "দাখিল (এসএসসি সমমান) · মানবিক", school: "ধানী সাফা সালেহিয়া ফাজিল মাদ্রাসা", place: "পিরোজপুর, বাংলাদেশ", note: "জিপিএ ৫.০০ (A+)", grade: true },
      { when: "১৪৩৭–১৪৩৮ হি.", level: "প্রাথমিক সনদ (ইবতেদায়ি)", school: "আল-মাওয়াদ্দাহ প্রাথমিক হিফজ বিদ্যালয়", place: "খামিস মুশাইত, আসির, সৌদি আরব", note: "ফলাফল: অতি উত্তম" },
    ],
  },
  skills: {
    label: "০৫ — দক্ষতা",
    title1: "কাজের পেছনের",
    title2: "হাতিয়ার।",
    groups: [
      { title: "ক্রিয়েটিভ ও ডিজাইন", lead: "ভাবনাকে রূপ দেওয়া।", items: ["গ্রাফিক ডিজাইন", "টাইপোগ্রাফি", "ভিজ্যুয়াল আইডেন্টিটি ডিজাইন", "ব্র্যান্ডিং ও ক্রিয়েটিভ ডিরেকশন"] },
      { title: "ভিডিও ও মোশন", lead: "সময়ের ভাষায় বলা।", items: ["ভিডিও এডিটিং", "মোশন গ্রাফিক্স"] },
      { title: "ডিজিটাল ও ব্যবসা", lead: "মানুষের কাছে পৌঁছানো।", items: ["ডিজিটাল মার্কেটিং", "ডিজিটাল কনটেন্ট তৈরি", "মাইক্রোসফট ওয়ার্ড", "মাইক্রোসফট এক্সেল", "মাইক্রোসফট পাওয়ারপয়েন্ট"] },
    ],
    langsTitle: "ভাষা",
    langsNote: "সিভিতে উল্লেখিত নিজস্ব মূল্যায়ন, কোনো আনুষ্ঠানিক পরীক্ষার নম্বর নয়।",
    langs: [
      { name: "বাংলা", native: "বাংলা", value: 99, cls: "bn" },
      { name: "আরবি", native: "العربية", value: 90, cls: "ar" },
      { name: "ইংরেজি", native: "English", value: 80, cls: "en" },
    ],
  },
  research: {
    label: "০৬ — গবেষণা ও আগ্রহ",
    title1: "জিনিস কীভাবে কাজ করে,",
    title2: "আর আমরা কীভাবে জানি।",
    see: "দেখুন",
    items: [
      { k: "হাদিস ও ইসলামি জ্ঞান", v: "আমার প্রাতিষ্ঠানিক পড়াশোনা। বর্ণনার সনদ ও মতন যাচাইয়ের শৃঙ্খলা আমাকে শিখিয়েছে যেকোনো ক্ষেত্রের প্রতিটি উৎসকে কীভাবে বিচার করতে হয়।", slug: "as-sakinah", link: "আস-সাকীনা" },
      { k: "উৎস থেকে পড়া ইতিহাস", v: "সভ্যতা, রাজবংশ আর যুদ্ধ — এক মানচিত্রে, এক টাইমলাইনে; প্রতিটি গল্প যোগ হয় কেবল যাচাইয়ের পর।", slug: "story-behind-history", link: "স্টোরি বিহাইন্ড হিস্ট্রি" },
      { k: "বিজ্ঞান ও প্রযুক্তি", v: "আবিষ্কার, মহাকাশ, কম্পিউটিং আর আধুনিক AI-এর পেছনের ধারণা — সহজ ভাষায়, সবসময় মূল উৎসের লিংকসহ।", slug: "mystrick", link: "মিস্ট্রিক" },
      { k: "AI ও অটোমেশন", v: "আমি AI-প্রথম পদ্ধতিতে কাজ করি: গবেষণা, ডিজাইন, নির্মাণ ও পরিচালনায় AI টুল ও এজেন্ট ব্যবহার করি, যে কাজে অন্যথায় পুরো একটা দল লাগত।" },
    ],
  },
  contact: {
    label: "০৭ — যোগাযোগ",
    title1: "চলুন অর্থবহ কিছু",
    title2: "গড়ে তুলি।",
    lede: "কোনো কোলাবোরেশন, প্রজেক্ট, আমার উদ্যোগ নিয়ে প্রশ্ন — কিংবা শুধু সালাম জানাতে — লিখুন। প্রতিটি বার্তা আমি নিজে পড়ি।",
    email: "ইমেইল",
    phone: "ফোন",
    website: "ওয়েবসাইট",
    location: "ঠিকানা",
    locationValue: "মঠবাড়িয়া, পিরোজপুর, বরিশাল, বাংলাদেশ",
    social: "সোশ্যাল",
    form: {
      name: "আপনার নাম",
      email: "ইমেইল",
      subject: "বিষয়",
      message: "বার্তা",
      send: "বার্তা পাঠান",
      sending: "পাঠানো হচ্ছে…",
      sent: "ধন্যবাদ। আপনার বার্তা পাঠানো হয়েছে।",
      mailto: "আপনার ইমেইল অ্যাপে বার্তাটি পাঠানোর জন্য তৈরি অবস্থায় খুলবে।",
      error: "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      network: "নেটওয়ার্কে সমস্যা। আবার চেষ্টা করুন, অথবা সরাসরি ইমেইল করুন।",
      hp: "এটি খালি রাখুন",
    },
  },
  footer: {
    kicker: "গড়ে তোলার মতো কোনো ভাবনা আছে?",
    title1: "চলুন সেটা",
    title2: "বাস্তব করি।",
    orb: ["কথা", "শুরু করুন"],
    line: "জ্ঞান, সৃজনশীলতা, প্রযুক্তি ও উদ্যোগ — একই সাধনায়।",
    work: "কাজ",
    elsewhere: "অন্যত্র",
    contact: "যোগাযোগ",
    time: "ঢাকার সময়",
    rights: "সর্বস্বত্ব সংরক্ষিত।",
    top: "উপরে যান",
  },
  case: {
    home: "হোম",
    work: "কাজ",
    overview: "সংক্ষেপে",
    role: "আমার ভূমিকা",
    website: "ওয়েবসাইট",
    caption: "লাইভ সাইটের স্ক্রিনশট, নভেম্বর ২০২৬-এ তোলা।",
    next: "পরের প্রজেক্ট",
    visit: "দেখুন",
    productImagery: "ক্যাম্পেইনের ছবি",
    posts: "জ্ঞানভিত্তিক পোস্ট",
    road: "পথের ছবি",
    collection: "কালেকশন · ৬ মি.লি.",
    soon: "সুন্দুস প্রস্তুত হচ্ছে। এর লোগো, কালেকশন ও চালুর তারিখ প্রস্তুত হলে এখানে জানানো হবে। এর মধ্যে জানতে চাইলে",
    soonLink: "যোগাযোগ করুন",
  },
  notFound: { label: "ত্রুটি ৪০৪", title1: "এই পাতাটি", title2: "অন্য পথে চলে গেছে।", lede: "আপনি যে পাতাটি খুঁজছেন তা নেই, অথবা সরানো হয়েছে। নিচের যেকোনোটি দেখতে পারেন।", home: "হোমে ফিরুন", contact: "যোগাযোগ" },
  loader: "পোর্টফোলিও · ২০২৬",
};

const ar: Dict = {
  meta: {
    title: "محمد أيوب — طالب ومصمم ورائد أعمال وصانع محتوى رقمي",
    description:
      "الموقع الشخصي لمحمد أيوب: طالب في قسم الحديث والدراسات الإسلامية، يصمم الهويات البصرية ويبني المنصات الرقمية ويؤسس المشاريع، من «عطر لاغبي» إلى «السكينة» و«ستوري بيهايند هيستوري» و«ميستريك».",
  },
  name: { first: "محمد", last: "أيوب", full: "محمد أيوب" },
  roles: ["طالب علم", "مصمم مبدع", "رائد أعمال", "صانع محتوى رقمي", "شغوف بالبحث"],
  nav: { about: "نبذة", work: "الأعمال", ventures: "المشاريع التجارية", education: "التعليم", contact: "تواصل", home: "الرئيسية", talk: "لنتحدث", time: "دكا", menu: "فتح القائمة", close: "إغلاق القائمة", navigate: "التنقل", projects: "المشاريع" },
  app: { install: "ثبّت التطبيق", iosHint: "على الآيفون أو الآيباد: اضغط زر المشاركة، ثم «إضافة إلى الشاشة الرئيسية»." },
  hero: {
    kicker: ["الموقع الشخصي", "بنغلاديش"],
    intro: "أدرس الحديث النبوي والعلوم الإسلامية، وأصنع أشياء: هويات تجارية، ومنصات رقمية، وأفلامًا، ومشاريع. وهنا تلتقي جميعها.",
    explore: "استكشف أعمالي",
    touch: "تواصل معي",
    caption: "طالب · الحديث والدراسات الإسلامية",
    scroll: "مرّر",
    seal: "KNOWLEDGE · CREATIVITY · TECHNOLOGY · ENTERPRISE · ",
    portraitAlt: "صورة شخصية لمحمد أيوب",
    secondary: "Mohammad Ayub",
  },
  marquee: ["العلم", "التصميم", "ريادة الأعمال", "التقنية", "القصة", "البحث", "Knowledge"],
  about: {
    label: "٠١ — نبذة",
    statement: "طالب علم بالرسالة، وصانعٌ بالعادة. أؤمن بأن العلم والإبداع والتقنية وريادة الأعمال يمكن أن تجتمع في يد واحدة.",
    p: [
      "أنا طالب في قسم الحديث والدراسات الإسلامية، أحمل فضولًا واسعًا لا يهدأ. وإلى جانب دراستي أعمل في مجالات العلوم الإسلامية، والتصميم الإبداعي، والتقنية الرقمية، وريادة الأعمال، والبحث.",
      "أكثر ما أحبه هو تحويل الفكرة إلى واقع: هوية بصرية، أو موقع يستخدمه الناس، أو فيلم، أو تجارة لها عملاؤها. وكل مشروع في هذا الموقع تعبير عن هذه العادة؛ بعضها عن العلم، وبعضها عن القصص، وواحد عن العطور، وكلها بُنيت بالعناية نفسها.",
      "بدأت دراستي الأولى في المملكة العربية السعودية، ثم واصلت تعليمي في المدارس الدينية في بنغلاديش. وأعيش وأعمل بثلاث لغات: البنغالية والعربية والإنجليزية.",
    ],
    aimLabel: "غايتي",
    aim: "غايتي قبل كل شيء أن أكون مسلمًا صادقًا مخلصًا: أن أنمو بطلب العلم الشرعي حتى أصبح عالمًا متمكنًا، وأن أتقرب إلى الله، وأن أبلّغ رسالة الإسلام للناس بالحكمة والرحمة.",
    principles: [
      ["التثبّت قبل النشر", "سواء كان حديثًا أو تاريخًا أو حقيقة علمية، لا أنشر شيئًا دون تحقق."],
      ["البناء لا التخطيط وحده", "لا قيمة للخطط إلا إذا تحولت إلى شيء يعمل. أفضّل الإنجاز ثم التحسين."],
      ["الذكاء الاصطناعي أولًا، والإنسان في المركز", "أستخدم الذكاء الاصطناعي لأنجز أكثر بموارد أقل، لينفع العمل عددًا أكبر من الناس."],
      ["صناعة الفرص", "هدفي البعيد مشاريع تنمو حتى توفر فرص عمل للآخرين."],
    ],
  },
  work: {
    label: "٠٢ — المشاريع",
    title1: "ستة عوالم.",
    title2: "وصانع واحد.",
    lede: "لكل مشروع اسمه وجمهوره ولغته البصرية الخاصة. ومجتمعةً ترسم ما يهمني: السفر، والإيمان، والتاريخ، والعلم، وريادة الأعمال، والحِرفة.",
    view: "عرض",
    explore: "استكشف المشروع",
  },
  status: { "Live business": "تجارة قائمة", "Active project": "مشروع نشط", "Preview edition": "إصدار تجريبي", "In preparation": "قيد الإعداد" },
  panels: {
    safarTitle: ["الطريق", "هو", "الحكاية."],
    safarCaptions: ["قلعة لالباغ · دكا", "بهاوال · غازيبور", "سافار"],
    stops: ["قلعة لالباغ", "قصر أحسن منزل", "النصب التذكاري الوطني للشهداء", "حديقة بهاوال الوطنية", "مسجد القباب التسع", "دوغورتولي", "منتزه هورينبالا البيئي"],
    sakinahList: ["القرآن الكريم كاملًا، كلمةً كلمة", "صحيح البخاري وصحيح مسلم كاملين", "الأربعون النووية", "١٦ قسمًا · أكثر من ٣١٠ صفحة موضوعية · ٣ لغات"],
    historyTitle: ["التاريخ لا يُقرأ فقط.", "بل يُعاش."],
    historyNote: "تسع زوايا للنظر: الحقبة، والحضارة، والإمبراطورية، والسلالة، والإقليم، والحدث، والمعركة، والشخصية، والموضوع. أطلس واحد، وخط زمني عالمي واحد. بالإنجليزية والبنغالية والعربية.",
    ruler: ["٣٥٠٠ ق.م", "٥٠٠ ق.م", "٦٢٢ م", "١٢٥٨", "١٤٥٣", "١٩٢٢", "اليوم"],
    mystrickTitle: ["ما وراء", "المعروف."],
    mystrickDesks: "التقنية / الذكاء الاصطناعي / العلوم / الفضاء / الاكتشافات / التاريخ والغموض / المستقبل",
    attarFacts: [
      ["خالٍ من الكحول", "زيوت مركّزة"],
      ["٣ · ٦ · ١٢ · ١٥ مل", "قوارير زجاجية"],
      ["في أنحاء البلاد", "الدفع عند الاستلام"],
    ],
    sundusRange: ["جبّة", "عباءة", "حجاب", "نقاب", "برقع"],
  },
  ventures: {
    label: "٠٣ — المشاريع التجارية وريادة الأعمال",
    title1: "علامة في السوق.",
    title2: "وأخرى قيد التكوين.",
    live: "تجارة قائمة",
    attar: "علامة عطور تبيع العطور الأصلية وزيوت العطر الخالية من الكحول في أنحاء بنغلاديش عبر الإنترنت، مع الدفع عند الاستلام.",
    built: "ما بنيتُه",
    builtList: ["الهوية التجارية وشعار بالخط البنغالي", "عرض المنتجات وتصويرها", "التغليف والهوية البصرية", "متجر إلكتروني ثنائي اللغة", "التسويق الرقمي والمحتوى الإبداعي"],
    caseStudy: "دراسة الحالة ←",
    soon: "قيد الإعداد",
    sundus: "علامة أزياء محتشمة بلمسات عربية، يجري إعدادها للإطلاق. لم يبدأ استقبال الطلبات بعد.",
    planned: "التشكيلة المخطط لها",
    plannedList: ["الجبّة", "العباءة", "الحجاب والنقاب", "البرقع", "ملابس محتشمة أخرى بطابع عربي"],
    aboutVenture: "عن المشروع ←",
  },
  edu: {
    label: "٠٤ — التعليم",
    title1: "من خميس مشيط",
    title2: "إلى تونغي.",
    lede: "مسيرة تعليم ديني بدأت في المملكة العربية السعودية، وتتواصل اليوم في دراسة الحديث النبوي.",
    items: [
      { when: "الآن", level: "طالب في السنة الثانية · قسم الحديث والدراسات الإسلامية", school: "مدرسة تعمير الملة الكاملة، حرم تونغي", place: "تونغي، غازيبور، بنغلاديش", note: "أُنهيت اختبارات السنة الأولى، ولم تُعلن النتائج بعد.", current: true },
      { when: "2024", level: "العالِم (ما يعادل الثانوية العامة) · العلوم الإنسانية", school: "مدرسة دار النجاة الصديقية الكاملة", place: "دكا، بنغلاديش", note: "المعدل 5.00 (A+)", grade: true },
      { when: "2022", level: "الداخل (ما يعادل الشهادة المتوسطة) · العلوم الإنسانية", school: "مدرسة دهاني صفا الصالحية الفاضلة", place: "بيروجبور، بنغلاديش", note: "المعدل 5.00 (A+)", grade: true },
      { when: "1437–1438 هـ", level: "الشهادة الابتدائية", school: "مدرسة المودة الابتدائية لتحفيظ القرآن", place: "خميس مشيط، عسير، المملكة العربية السعودية", note: "التقدير: ممتاز" },
    ],
  },
  skills: {
    label: "٠٥ — المهارات",
    title1: "الأدوات",
    title2: "خلف الأعمال.",
    groups: [
      { title: "الإبداع والتصميم", lead: "منح الأفكار ملامحها.", items: ["التصميم الجرافيكي", "فن الخطوط والطباعة", "تصميم الهوية البصرية", "العلامة التجارية والإدارة الإبداعية"] },
      { title: "الفيديو والحركة", lead: "رواية الفكرة عبر الزمن.", items: ["مونتاج الفيديو", "الرسوم المتحركة"] },
      { title: "الرقمي والأعمال", lead: "إيصالها إلى الناس.", items: ["التسويق الرقمي", "صناعة المحتوى الرقمي", "مايكروسوفت وورد", "مايكروسوفت إكسل", "مايكروسوفت باوربوينت"] },
    ],
    langsTitle: "اللغات",
    langsNote: "تقييم ذاتي كما ورد في سيرتي الذاتية، وليس درجات اختبارات رسمية.",
    langs: [
      { name: "البنغالية", native: "বাংলা", value: 99, cls: "bn" },
      { name: "العربية", native: "العربية", value: 90, cls: "ar" },
      { name: "الإنجليزية", native: "English", value: 80, cls: "en" },
    ],
  },
  research: {
    label: "٠٦ — البحث والاهتمامات",
    title1: "شغوف بكيف تعمل الأشياء،",
    title2: "وكيف نعرف ما نعرف.",
    see: "زُر",
    items: [
      { k: "الحديث والعلوم الإسلامية", v: "دراستي الأكاديمية. علّمني منهج نقد السند والمتن كيف أتعامل مع كل مصدر في كل مجال.", slug: "as-sakinah", link: "السكينة" },
      { k: "التاريخ من مصادره", v: "حضارات وسلالات ومعارك على خريطة واحدة وخط زمني واحد، ولا تُضاف القصة إلا بعد التحقق.", slug: "story-behind-history", link: "ستوري بيهايند هيستوري" },
      { k: "العلوم والتقنية", v: "الاكتشافات والفضاء والحوسبة والأفكار التي يقوم عليها الذكاء الاصطناعي الحديث، بشرح واضح مع ربط دائم بالمصدر الأصلي.", slug: "mystrick", link: "ميستريك" },
      { k: "الذكاء الاصطناعي والأتمتة", v: "أعمل بمنهج «الذكاء الاصطناعي أولًا»: أستخدم أدواته ووكلاءه في البحث والتصميم والبناء وإدارة مشاريع كانت ستحتاج إلى فريق كامل." },
    ],
  },
  contact: {
    label: "٠٧ — تواصل",
    title1: "لنصنع معًا",
    title2: "شيئًا ذا معنى.",
    lede: "للتعاون، أو المشاريع، أو الأسئلة عن مشاريعي التجارية، أو لمجرد إلقاء السلام، راسلني. أقرأ كل رسالة بنفسي.",
    email: "البريد",
    phone: "الهاتف",
    website: "الموقع",
    location: "العنوان",
    locationValue: "مطباريا، بيروجبور، باريسال، بنغلاديش",
    social: "التواصل الاجتماعي",
    form: {
      name: "اسمك",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      send: "أرسل الرسالة",
      sending: "جارٍ الإرسال…",
      sent: "شكرًا لك. تم إرسال رسالتك.",
      mailto: "سيفتح تطبيق البريد لديك والرسالة جاهزة للإرسال.",
      error: "حدث خطأ ما. حاول مرة أخرى.",
      network: "خطأ في الاتصال. حاول مرة أخرى أو راسلني مباشرة.",
      hp: "اترك هذا الحقل فارغًا",
    },
  },
  footer: {
    kicker: "لديك فكرة تستحق أن تُبنى؟",
    title1: "لنجعلها",
    title2: "حقيقة.",
    orb: ["ابدأ", "المحادثة"],
    line: "العلم والإبداع والتقنية وريادة الأعمال، في مسيرة واحدة.",
    work: "الأعمال",
    elsewhere: "في أماكن أخرى",
    contact: "تواصل",
    time: "توقيت دكا",
    rights: "جميع الحقوق محفوظة.",
    top: "إلى الأعلى",
  },
  case: {
    home: "الرئيسية",
    work: "الأعمال",
    overview: "نظرة عامة",
    role: "دوري",
    website: "الموقع الإلكتروني",
    caption: "لقطات من الموقع المباشر، التُقطت في نوفمبر 2026.",
    next: "المشروع التالي",
    visit: "زيارة",
    productImagery: "صور الحملات",
    posts: "منشورات علمية",
    road: "من الطريق",
    collection: "المجموعة · 6 مل",
    soon: "يجري إعداد «سندس». سيُعلن هنا عن شعارها ومجموعتها وموعد إطلاقها عند جاهزيتها. وللاستفسار في الأثناء،",
    soonLink: "تواصل معي",
  },
  notFound: { label: "خطأ 404", title1: "هذه الصفحة", title2: "سلكت طريقًا آخر.", lede: "الصفحة التي تبحث عنها غير موجودة أو نُقلت. جرّب أحد هذه الروابط.", home: "العودة للرئيسية", contact: "تواصل معي" },
  loader: "الموقع الشخصي · 2026",
};

export const dicts: Record<Lang, Dict> = { en, bn, ar };
export const t = (l: Lang) => dicts[l];
