# K Jagadeesh Kumar — Resume Website

My resume as a website, built with React and Vite. Visitors see a modern portfolio site (light and dark theme, works on phones). The **Download PDF** button prints the classic one-column resume layout.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Update the resume

All content is in [`src/data/resume.js`](src/data/resume.js). Edit it, push, and the site redeploys.

You can also edit in the browser:

1. Open the site with `?edit` at the end of the URL, for example `http://localhost:5173/?edit`.
2. Click any line to change it. Use **+ Add line** and **×** to add or remove bullets, jobs, and projects.
3. Click **Copy data** and paste the result over the contents of `src/data/resume.js`.
4. Commit and push.

In-browser edits are saved only in that browser until you paste them into `resume.js`. Visitors never see the edit mode unless they add `?edit` themselves, and anything they change stays in their own browser.

## Save as PDF

Click **Download PDF** and choose **Save as PDF** as the printer. Turn off **Headers and footers** in the print dialog's settings for a clean page.

## Deploy

The build output is a static site in `dist/`, so any static host works.

### Vercel (easiest)
1. Push this folder to a GitHub repository.
2. Go to vercel.com → **Add New Project** → import the repo → **Deploy**. Vercel detects Vite automatically.
3. You get a URL like `jagadeesh-resume.vercel.app`.

### Netlify
Import the repo at app.netlify.com. Build command: `npm run build`. Publish directory: `dist`.

### GitHub Pages
A workflow is included at `.github/workflows/deploy.yml`.
1. Push to the `main` branch of a GitHub repository.
2. In the repo, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The site is published at `https://<your-username>.github.io/<repo-name>/`.

## Project structure

```
src/
  data/resume.js          all resume content
  site/Site.jsx           the website visitors see
  site/site.css           website styles (light/dark, responsive)
  lib/format.js           shared helpers (dates, links, PDF download)
  components/Resume.jsx   paper resume layout (used for PDF and ?edit)
  components/Editable.jsx click-to-edit text and list controls (?edit mode)
  components/Toolbar.jsx  Download PDF and edit-mode buttons
  App.jsx                 state and saving of in-browser edits
  styles.css              screen, phone and print styles
```
