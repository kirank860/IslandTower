# Island Tower - Technical Project Summary Note

This document summarizes the architectural upgrades, animations, optimizations, and tools implemented to transform the Island Tower website into a premium, high-performance web experience.

---

## 🚀 Overview of Upgrades

We implemented a modern, interactive design system featuring 3D rendering engines, advanced scroll effects, and performance optimizations tailored for high-speed deployment on hosting services like Vercel.

---

## 🛠️ Tech Stack & Key Libraries Used

1. **React 19 & Vite**: Selected for extremely fast HMR (Hot Module Replacement) and optimized production compilation.
2. **TailwindCSS**: Used for utility-first styling, curated color palettes, and glassmorphism.
3. **Framer Motion**: Powering fluid, hardware-accelerated animations, scroll-triggered triggers, dynamic transitions, and coordinate interpolation.
4. **Lenis**: Integrated for smooth, inertial scrolling across desktop and mobile devices.
5. **Lucide React**: Clean SVG vector icons for dashboards and overlays.
6. **HTML5 Canvas (Vanilla 2D)**: Used for procedural 3D wireframe projections instead of massive libraries like Three.js, saving ~1MB of bundle size.
7. **Sips Image Compression Engine**: Compressed heavy `.png` cards into highly optimized `.jpg` images to improve loading speeds.

---

## 💡 Implemented Features & How They Work

### 1. Interactive 3D Blueprint Showroom
* **Components**: `ThreeDShowcase.jsx` & `ThreeDModal.jsx`
* **How it works**: Uses a **custom procedural 3D math engine** written in vanilla Canvas2D. It projects 3D mathematical coordinates of structural models (Civil Skyscraper, MEP Piping network, Solar grid array) onto a 2D screen coordinate space in real-time.
* **Control Panels**: Added interactive mouse-drag tracking to update `yaw` (horizontal) and `pitch` (vertical) angles, mouse-wheel scroll listening to scale zoom, and button clicks to trigger camera viewpoints (Perspective, Isometric, Top, Front). Includes animated neon fluid particles inside MEP tubes.

### 2. Multi-Layer Scroll Parallax
* **Component**: `Hero.jsx`
* **How it works**: Listens to page scroll positions to translate elements at varying velocities relative to the scrollbar:
  * Background video moves down slowly.
  * Holographic wireframe grid rotates and shifts down at a moderate pace.
  * Hero text shifts upwards slightly to create realistic layers of depth.

### 3. Infinite Scrolling Partner Marquee
* **Component**: `Sponsors.jsx`
* **How it works**: Uses an infinite linear keyframe animation track in CSS to slide partner client cards continuously.
* **Aesthetics**: Integrated linear gradients on the left and right edges (`marquee-fade-mask`) to make logos seamlessly fade in and out at viewport borders. Includes a `hover:pause` listener to halt scrolling when inspected.

### 4. Interactive Legacy History Timeline
* **Component**: `About.jsx` (Section `#history`)
* **How it works**: Displays selector tabs corresponding to historical milestone years. Selecting a milestone uses Framer Motion's `AnimatePresence` to cross-fade and translate historical text. Accompanied by rotating SVG grid blueprints.

### 5. 3D Card Tilt Effects
* **Component**: `Solutions.jsx`
* **How it works**: Solution service cards measure cursor offsets from their center points during hover to dynamically update 3D rotation angles along `rotateX` and `rotateY` vectors. Styled with glassmorphic layers, coordinate telemetry text, and neon boundary bracket highlights.

---

## 🪝 React Hooks Implemented

* **`useState`**: Used to track active tabs, modal states, manual rotation positions (`yaw`/`pitch`), zoom levels (`scale`), current slider index, video play states, and 3D card tilt values.
* **`useRef`**: Binds canvas references, container bounding boxes, animation frame counters, dragging flags, swipe drag coordinate buffers, and video elements.
* **`useEffect`**:
  * Powers the 3D Canvas Projection Engine loop, registering animation frames via `requestAnimationFrame(render)` and cleaning them up dynamically.
  * Handles window resizing events to update canvas resolutions based on `window.devicePixelRatio`.
* **`useScroll` & `useTransform`** (Framer Motion hooks): 
  * Captures container scroll progression values (`scrollYProgress`) and maps them to vertical translations (parallax offsets) or blur filter gradients (opposite glow trajectories).

---

## ⚡ Performance & Vercel Optimizations

We applied the following metrics to ensure the site scores highly on PageSpeed Web Vitals:

1. **JS Code-Splitting (`React.lazy` / `React.Suspense`)**:
   Split out all below-the-fold pages (`Stats`, `Solutions`, `ThreeDShowcase`, `Sponsors`, `Footer`) into separate code chunks. This decreased the main JavaScript bundle size from **448.74 kB** to **397.64 kB**, saving initial download time.
2. **Video Stream Preload Throttling**:
   Changed video preload attributes from `auto` to `metadata` on background hero loops and vimeo layers, blocking the browser from downloading heavy video data in parallel during initial render.
3. **Asset Lazy-Loading**:
   Enabled native browser `loading="lazy"` on all cards, partner logs, and blueprint graphics.
4. **Sips Quality Compression**:
   Compressed structural images (e.g. `legacy_worker` and `collaboration_mep`) by converting them from PNG to JPEG at 65% quality, reducing file weights from ~930KB down to ~190KB.
