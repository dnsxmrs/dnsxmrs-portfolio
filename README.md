# 🌐 Erice Marial's Developer Portfolio

Welcome to the repository of my personal portfolio—a modern, dynamic, and premium developer showcase built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**. 

This portfolio isn't just a static resume page; it is a live web application featuring real-time capabilities, interactive elements, and API integrations that demonstrate my expertise in full-stack architecture and system development.

---

## ⚡ Live Features & Integrations

The portfolio home page features a modern **Bento Grid** layout displaying several interactive widgets:

*   **🖱️ Global Real-Time Click Counter:** 
    *   An interactive widget that displays the total number of clicks across all visitors globally.
    *   Powered by **Upstash Redis** (for atomic persistent counting) and **Pusher** (for server-to-client real-time web-socket broadcasts).
    *   Optimized with client-side click batching (to prevent server flooding) and optimistic updates for instant UI feedback.
*   **📍 Interactive Dark Map ("Based In"):**
    *   A custom styled **Leaflet** map showing my current location (San Isidro, Montalban, Philippines).
    *   Integrates a live, running clock synchronized to the `Asia/Manila` timezone.
*   **💻 GitHub Activity & Live Commits Widget:**
    *   Fetches real-time commits across my public and private repositories using the GitHub REST API.
    *   Features server-side caching (with isolation for repository failures) and lists commit addition/deletion statistics.
*   **🎵 Last.fm "Now Playing" Widget:**
    *   Integrates the Last.fm API to dynamically show what I am currently listening to (or last played) with zero API caching for true live updates.

---

## 🛠️ Tech Stack & Architecture

*   **Core:** [Next.js 15 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Database & Cache:** [Upstash Redis](https://upstash.com/)
*   **Real-time Layer:** [Pusher Channels](https://pusher.com/)
*   **Mapping API:** [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
*   **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

---

## 📂 Featured Project Suites

My latest work consists of complete, interconnected software ecosystems designed to solve complex real-world workflows:

### ⚡ PowerTrack (Smart Energy Analytics & Technopreneurship Pitch)
An appliance-level energy analytics and decision-support system designed as a cost-effective energy mitigation solution for Philippine Small and Medium Enterprises (SMEs).
*   **[PowerTrack Web Portal](https://github.com/dnsxmrs/power-track)** — Multi-branch administrative and coordination dashboard built with Next.js and TypeScript.
*   **[PowerTrack Mobile App](https://github.com/dnsxmrs/power-track-mobile)** — Client-facing dashboard built with React Native and Expo (featuring live overload alerts, historical analytics, and automated recommendation insights depending on subscription tier).
*   **Edge Hardware & Telemetry:** Streams safe, 100% accurate breaker line load data via an **ESP32 Edge Gateway** (equipped with local network error buffers) and **Split-Core Current Transformers (CT Sensors)**.

### 💼 MGSI Systems (Internship at GreatWork Global)
Enterprise platforms built to manage premium co-working spaces and corporate logistics:
*   **[Booking Management System (BMS)](https://github.com/dnsxmrs/mgsi-bms-client)** — Full-stack booking engine using Next.js, Supabase, and Redis. Features automated scheduling, Zapier webhook integrations, branch occupancy rate analytics, and full RBAC security. (See also: [BMS Staff](https://github.com/dnsxmrs/mgsi-bms-staff) and [BMS Superadmin](https://github.com/BenJr23/mgsi-bms-superadmin)).
*   **[Inventory Management System (IMS)](https://github.com/BenJr23/mgsi-ims)** — Logistics and asset-auditing platform built with Prisma and Next.js Server Actions. Deployed on-site at the Ortigas Center Branch (SM Mega Tower) with an integrated QR code scanner pipeline stress-tested for optical facility lighting.

### 🎓 SJSFI Suite (School Management System)
*   **[Registrar System](https://github.com/dnsxmrs/sjsfi-sis-registrar)** — High-fidelity administration portal for student records and class schedules.
*   **[Student Portal](https://github.com/dnsxmrs/sjsfi-sis-student)** — Integrated platform for students to track grades, enrollment status, and curriculum progress.
*   **[School Website](https://github.com/dnsxmrs/sjsfi-website)** — Modern frontend interface for the school community.
*   **[AI & Content Management Admin](https://github.com/dnsxmrs/sjsfi-website-admin)** — Administrative hub powered by AI integration for site updates and communications.

### 🍔 Restaurant Operations Suite
*   **[Kitchen Display System (KDS)](https://github.com/dnsxmrs/kds)** — Real-time kitchen order tracker for line cooks and kitchen staff.
*   **[Online Ordering Website](https://github.com/dnsxmrs/fiweb)** — Customer-facing digital menu and checkout web app.
*   **[Point of Sale (POS)](https://github.com/dnsxmrs/fipos)** — POS terminal system for in-store operations and transaction recording.

---

## ⚙️ Environment Configuration

To run the application locally, you will need a `.env.local` file in the root directory containing the following variables:

```env
# Last.fm API
LASTFM_API_KEY=your_lastfm_api_key
LASTFM_USERNAME=your_lastfm_username

# GitHub API
GITHUB_TOKEN=your_github_personal_access_token

# Pusher Credentials
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster
PUSHER_APP_ID=your_pusher_app_id
PUSHER_SECRET=your_pusher_secret

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

---

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then, start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Build and Production

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

---

## 📬 Connect with Me

*   **GitHub:** [@dnsxmrs](https://github.com/dnsxmrs)
*   **LinkedIn:** [Erice Michael Marial](https://www.linkedin.com/in/erice-michael-marial-76b74a300/)
*   **Email:** [ericemarial@gmail.com](mailto:ericemarial@gmail.com)
