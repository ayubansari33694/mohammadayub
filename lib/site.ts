export const site = {
  name: "Mohammad Ayub",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mohammadayub.net").replace(/\/$/, ""),
  title: "Mohammad Ayub — Student, Designer, Entrepreneur & Digital Creator",
  description:
    "The personal portfolio of Mohammad Ayub: a student of Al-Hadith and Islamic Studies who designs brands, builds digital platforms and founds ventures, from Attar Lagbe to As-Sakinah, Story Behind History and Mystrick.",
  roles: ["Student", "Creative Designer", "Entrepreneur", "Digital Creator", "Research Enthusiast"],
  email: "mohammadayub.net@gmail.com",
  phone: "+880 17-40444562",
  phoneHref: "tel:+8801740444562",
  location: "Mathbaria, Pirojpur, Barisal, Bangladesh",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/mdayub_net/" },
    { label: "YouTube", href: "https://www.youtube.com/@ayub_safar_nama" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61583304615651" },
  ],
};

export const nav = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#ventures", label: "Ventures" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];
