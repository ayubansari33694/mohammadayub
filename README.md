# Mohammad Ayub — personal portfolio

Next.js 16 (App Router) + React 19 + TypeScript, plain CSS. Deployed on Vercel.

- `lib/site.ts` — name, contact details, social links
- `lib/projects.ts` — the six projects (text, facts, images, status)
- `app/page.tsx` — home page sections (hero, about, work, ventures, education, skills, research, contact)
- `app/work/[slug]/page.tsx` — one page per project
- `app/globals.css` — the whole design system, including each project's theme
- `public/work/<project>/` — logos, photos and website screenshots

## Run locally
```
npm install
npm run dev
```

## Deploy
Every push to `main` on GitHub deploys automatically on Vercel.

## Contact form
Without settings, the form opens the visitor's email app with the message filled in.
To send directly, add `RESEND_API_KEY` (from resend.com) and `CONTACT_TO` in Vercel → Project → Settings → Environment Variables.

## Custom domain
Add `mohammadayub.net` and `www.mohammadayub.net` in Vercel → Project → Settings → Domains, then set `NEXT_PUBLIC_SITE_URL` if the address differs.
