# 🪔 Happy Diwali — Festive Digital Greeting Card

> **“Different traditions, one beautiful humanity. May your life always shine with happiness, kindness, and endless possibilities.”**  
> — *Osama Khalil*

[![Live Demo](https://img.shields.io/badge/Live_Demo-khalilosam.github.io%2Fdiwali--wishes-gold?style=for-the-badge&logo=github)](https://khalilosam.github.io/diwali-wishes/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero_Vanilla_JS-success?style=for-the-badge)](#technical-highlights)

A modern, elegant, single-page festive Diwali greeting website crafted by **Osama Khalil** to share warm wishes with friends, family, colleagues, and professional connections worldwide.

---

## ✨ Design Philosophy & Core Message

This greeting embraces the true universal spirit of Diwali: **light, hope, peace, kindness, and renewed beginnings**.

- **Humanity First:** A festive tribute celebrating shared human values beyond religious boundaries.
- **Warm & Sophisticated:** Deep midnight blue, royal gold accents, warm glowing amber, and soft lighting effects.
- **Professional & Personal:** Thoughtfully crafted for corporate networks, colleagues, and close loved ones alike.

---

## 🌟 Key Features

1. **Realistic Animated Diya & Flame:**
   - Multi-layer SVG + CSS animated diya with flickering flames, glowing aura bloom, and radiating light rings.
   - Interactive: click **"Light a Diya"** or tap the central diya to ignite warm illumination and celebratory fireworks.
   - Flame counter tracking collective goodwill.

2. **Canvas Particle & Festive Fireworks Engine:**
   - 60 FPS floating golden stardust and fireflies drifting gently with cursor interaction.
   - Elegant background golden fireworks that burst gracefully across the night sky.
   - Interactive sparkle bursts on clicks and taps.

3. **Ambient Generative Music (Web Audio API):**
   - Procedural, calming ambient sitar/tanpura harmonic drone and meditative bells generated via the browser's native Web Audio API.
   - **Zero external audio file dependencies** (never fails, 100% offline-ready, no copyright or CORS issues).
   - Off by default with an interactive toggle button and animated visualizer waves.

4. **Dynamic Personalization Studio:**
   - Customize the greeting card live with any recipient's name or group (e.g. *"Priya"*, *"Rahul"*, *"Engineering Team"*).
   - Generates unique personalized shareable URLs: `https://khalilosam.github.io/diwali-wishes/?to=Name`.
   - Visitors opening the link see a personalized banner and customized card.

5. **Universal Sharing:**
   - **Web Share API**: Native one-tap sharing on mobile and desktop browsers (WhatsApp, Instagram, Messages, LinkedIn, etc.).
   - **One-Click Copy Link**: Instant clipboard copy with animated toast feedback.
   - Direct share shortcuts for WhatsApp, LinkedIn, and X (Twitter).

6. **Four Pillars of Light:**
   - Interactive blessings for **Peace (शांति)**, **Kindness (सद्भाव)**, **Prosperity (समृद्धि)**, and **Hope (आशा)**.

7. **Accessibility & Performance:**
   - Zero heavyweight frameworks — pure semantic HTML5, modern CSS3, and vanilla ES6+ JavaScript.
   - Full support for `prefers-reduced-motion`.
   - 100% responsive across smartphones, tablets, and 4K displays.
   - Rich Open Graph (OG) and Twitter Card metadata with custom SVG preview images.

---

## 📁 Project Structure

```
diwali-wishes/
├── index.html          # Semantic HTML5 markup, SEO meta tags, SVG diya
├── styles.css          # Modern CSS3 styling, animations, responsive design
├── script.js           # Particle canvas, fireworks, Web Audio API, sharing logic
├── assets/
│   ├── favicon.svg     # Ornate golden diya SVG favicon
│   └── og-image.svg    # 1200x630 social preview card
└── README.md           # Documentation & deployment guide
```

---

## 🚀 GitHub Pages Deployment Guide

This project is pre-configured for instant zero-config hosting on GitHub Pages.

### Option 1: Standalone Repository (`diwali-wishes`)

This serves your website directly at `https://khalilosam.github.io/diwali-wishes/`.

1. **Create a new repository on GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `diwali-wishes`
   - Set visibility to **Public**
   - Click **Create repository**

2. **Initialize and push the code:**
   ```bash
   cd projects/diwali-wishes
   git init
   git add .
   git commit -m "feat: initial commit of Osama Khalil Diwali greeting website"
   git branch -M main
   git remote add origin https://github.com/khalilosam/diwali-wishes.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Open your repository settings: `https://github.com/khalilosam/diwali-wishes/settings/pages`
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, choose `main` and folder `/ (root)`.
   - Click **Save**.
   - Within 1–2 minutes, your website is live at:  
     👉 **https://khalilosam.github.io/diwali-wishes/**

---

### Option 2: Subfolder in Personal Portfolio (`khalilosam.github.io`)

If you host your root website at `khalilosam.github.io`, you can also place this folder under a `diwali-wishes` directory in your main portfolio repository:

```bash
# Copy files into your personal github.io repository
cp -r projects/diwali-wishes projects/khalilosam.github.io/diwali-wishes
cd projects/khalilosam.github.io
git add diwali-wishes/
git commit -m "feat: add diwali wishes greeting page"
git push origin main
```

Because all asset links use relative paths (`./styles.css`, `./assets/...`), the greeting page works perfectly in both standalone repository and subdirectory configurations!

---

## 💻 Local Testing & Development

To test the website locally, run any local HTTP server:

### Using Python:
```bash
cd projects/diwali-wishes
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### Using Node.js (npx):
```bash
npx serve projects/diwali-wishes
```

### Using PowerShell:
```powershell
Start-Process "projects\diwali-wishes\index.html"
```

---

## 👤 Author & Credits

- **Crafted with warmth & positivity by:** [Osama Khalil](https://github.com/khalilosam)
- **GitHub:** [@khalilosam](https://github.com/khalilosam)
- **Portfolio:** [khalilosam.github.io](https://khalilosam.github.io)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
Feel free to use and share the spirit of peace, light, and goodwill.
