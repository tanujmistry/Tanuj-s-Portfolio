# Tanuj Mistry — Engineering Portfolio

> **Hardware + Software Hybrid Profile**  
> *Electronics & Telecommunication Engineer | FPGA, Embedded Systems & AI/ML Specialist*

A sleek, responsive portfolio built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed around a *"futuristic engineering"* dark aesthetic featuring an interactive real-time oscilloscope waveform monitor, hardware pipeline schematics, an alternating career trajectory timeline, and typed project architecture modals.

---

## ⚡ Key Highlights & Features

- **Futuristic Engineering Aesthetic**: Tailored dark-mode palette (`#0a0e17` navy base, `#00e5c7` electric circuit-teal, and `#22d3ee` signal-cyan) with subtle circuit-trace vector overlays and graticules.
- **Real-Time Oscilloscope Canvas**: Pure HTML5 canvas rendering persistent CRT phosphor decay with dynamic signal modes (biopotential ECG arrhythmia waveform, DSP FIR/IIR response, and high-frequency CAN-bus packets).
- **Flagship Hero Project Display**: Dedicated highlight card for the *Real-Time FPGA ECG Arrhythmia Classification System* featuring a hardware pipeline schematic HUD.
- **Deep-Dive Project Modals**: Interactive detail overlays for all 6 featured projects detailing implementation highlights, metrics, and hardware environments.
- **Vertical Alternating Timeline**: Displays industry R&D roles (NIELIT Maharashtra, MediAstra MedTech, Dhariwal 600MW plant, and Team Aryans Racing DAQ).
- **Technical Skills Matrix**: 7 grouped hardware & software disciplines with interactive domain filters and credible monospace badges (no arbitrary progress bars).
- **Direct Contact & Dispatch Form**: Front-end form with client-side validation wired to `mailto:`, quick copy-to-clipboard channels, and response latency telemetry.
- **Accessible & Responsive**: Meets WCAG AA contrast standards, optimized across mobile (375px), tablet (768px), and wide desktop (1440px) viewports.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode enabled)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Inter](https://fonts.google.com/specimen/Inter), and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

---

## 📂 Project Architecture

```
├── public/
│   ├── assets/
│   │   └── silicon_architecture.jpg  # Generated abstract silicon graphic
│   ├── favicon.svg                   # Custom circuit chip vector icon
│   ├── Tanuj_Mistry_Resume.pdf       # Downloadable resume PDF
│   └── _redirects                    # Netlify SPA routing rules
├── src/
│   ├── components/
│   │   ├── Footer.tsx                # Minimal footer with social/copyright links
│   │   ├── Icons.tsx                 # Pixel-perfect SVG brand icons
│   │   ├── Layout.tsx                # Root layout, ambient glows, back-to-top
│   │   ├── Navbar.tsx                # Sticky navbar, mobile drawer, active section spy
│   │   ├── OscilloscopeCanvas.tsx    # Interactive HTML5 canvas oscilloscope
│   │   └── ProjectModal.tsx          # Architectural project detail modal
│   ├── data/
│   │   └── portfolio.ts              # Typed source of truth for all content
│   ├── sections/
│   │   ├── About.tsx                 # 3-4 sentence narrative, education, silicon graphic
│   │   ├── Certifications.tsx        # Stanford, DeepLearning.AI, Google credentials
│   │   ├── Contact.tsx               # Channels, copyable contact info, validated form
│   │   ├── Experience.tsx            # Alternating vertical engineering timeline
│   │   ├── Hero.tsx                  # Name, role title, value proposition, CTAs
│   │   ├── Projects.tsx              # Flagship card + standard grid
│   │   └── Skills.tsx                # 7 domain skill cards with interactive filters
│   ├── App.tsx                       # Main single-page application mount
│   ├── index.css                     # Tailwind directives and custom engineering utilities
│   └── main.tsx                      # Vite React DOM entry point
├── netlify.toml                      # Netlify build and redirect configuration
├── vercel.json                       # Vercel SPA rewrites and asset cache headers
└── tailwind.config.js                # Custom theme tokens, colors, and keyframes
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` or `pnpm` / `yarn`

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/tanuj-portfolio.git
cd tanuj-portfolio
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
This generates an optimized, tree-shaken static bundle in the `dist/` directory.

### 4. Preview the Production Build Locally
```bash
npm run preview
```

---

## 🌐 Deployment Guides

The project is completely **environment-agnostic** with zero hardcoded absolute paths, pre-configured SPA routing, and long-term immutable caching for static assets.

### Deploy to Vercel (Recommended)

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository. Vercel automatically detects **Vite** and uses the included [`vercel.json`](./vercel.json):
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your site will be live on a global edge CDN with instant HTTPS.

Alternatively, deploy using the [Vercel CLI](https://vercel.com/docs/cli):
```bash
npx vercel
```

---

### Deploy to Netlify

1. Push your code to your Git provider.
2. Log in to [Netlify](https://www.netlify.com/) and choose **"Add new site"** $\rightarrow$ **"Import an existing project"**.
3. Select your repository. Netlify will detect [`netlify.toml`](./netlify.toml) automatically:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**.

Alternatively, drag and drop the compiled `dist/` folder directly into the Netlify Dashboard, or use the [Netlify CLI](https://docs.netlify.com/cli/get-started/):
```bash
npx netlify deploy --prod --dir=dist
```

---

## ⚙️ Customization & Updating Content

### Updating Personal Information, Projects, or Skills
All portfolio content is decoupled from UI components and cleanly typed in [`src/data/portfolio.ts`](./src/data/portfolio.ts):
- Modify `personalInfo` to update bio, phone, email, or degrees.
- Modify `skillCategories` to append or reorder skills and tools.
- Modify `experiences` to edit roles, periods, or bullet points.
- Modify `projects` to add or update projects and metrics.
- Modify `certifications` to add new verified credentials.

### Updating Your Resume
Replace [`public/Tanuj_Mistry_Resume.pdf`](./public/Tanuj_Mistry_Resume.pdf) with your updated resume PDF file. The filename is referenced by the Navbar and mobile drawer.

### Wiring the Contact Form to an Email Service
The contact form in [`src/sections/Contact.tsx`](./src/sections/Contact.tsx) currently generates a pre-filled `mailto:` client payload upon client validation. To connect a direct backend API, refer to the `// TODO` block inside `handleSubmit`:
- **[Resend](https://resend.com)**: Call a serverless function (`/api/send`) using their Node.js SDK.
- **[Formspree](https://formspree.io)**: Point the form `action` directly to your Formspree endpoint.
- **[EmailJS](https://www.emailjs.com)**: Call `emailjs.send()` directly from the client.

---

## 📄 License & Attribution

Designed and engineered for **Tanuj Mistry**.  
Licensed under the [MIT License](LICENSE).
