[![Banner](assets/banner-wide.png)](#)


# Portofolio Project ─ dnlmn-web

This is my portfolio website project, live at [dnlmn.dev](https://dnlmn.dev). It's a single-page, motion-driven portfolio where each featured project demonstrates itself with a small interactive piece: vote on a game for Gallery Exhibition CSUI, calculate a GPA in TemanKuliah, pick a mood in MoodTune, and drag from research to prototype in Rakyat Bisa!. Along the way, I also learned 3D modeling with [Blender](https://www.blender.org/), and the 404 page still shows an animated 3D Furina built with [Three.js](https://threejs.org/).

### Stack

- [Next.js](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 3.4, with design tokens as CSS variables in `src/styles/globals.css`
- [GSAP](https://gsap.com/) + ScrollTrigger + SplitText for scroll choreography, [Lenis](https://lenis.darkroom.engineering/) for smooth scroll, [Motion](https://motion.dev/) for UI and layout animation
- MDX blog with `next-mdx-remote` and `rehype-pretty-code`
- API routes for Spotify (now playing) and EmailJS (contact form)

Every animation has a `prefers-reduced-motion` path: no smooth scroll, no pinning or scrubbing, just short fades.

### Where things live

```
src/data/        # all copy, links and project facts (typed)
src/sections/    # home, about, work (+ demos), experience, writing, contact
src/components/  # motion system (MotionProvider, SectionShell, …), nav, ui
src/content/blog # blog posts (MDX)
docs/redesign/   # redesign brief, content, design spec and build plan
```

Special credits to some assets I used in this website:
- Genshin Wiki [(Link)](https://genshin-impact.fandom.com/wiki/Furina/Gallery/)
- Lucide [(Link)](https://lucide.dev/)
- Furina MMD Model from 好想吃番茄味肥牛饭 [(Link)](https://www.aplaybox.com/details/model/e19BJnS8sZxH)

### Recent Change

- (2026/10/07) Full redesign: motion-driven single page, one interactive demo per featured project, typed content in `src/data`, the hero video replaced by an interactive particle field
- (2026/01/18) Moved 3D Model from home page to 404 page and replace it with a video instead

<br>

## ⚙️ Development Setup

To run the project in your local workspace, configure the `.env.local` file to set up enviroment variable and secrets. You can use the `.env.example` template that I put in the root directory.

```.env
# Spotify API
SPOTIFY_CLIENT_ID=xxxx
SPOTIFY_CLIENT_SECRET=xxxx
SPOTIFY_REFRESH_TOKEN=xxxx

# EmailJS
EMAILJS_SERVICE_ID=xxxx
EMAILJS_TEMPLATE_ID=xxxx
EMAILJS_PUBLIC_KEY=xxxx
EMAILJS_PRIVATE_KEY=xxxx
```
Kindly sets your own Spotify API App on the [Spotify Developer](https://developer.spotify.com/) dashboard and [Email.js](https://www.emailjs.com/) account for emailing system.


After configurating the environment variable, install the required package with `npm` or `pnpm`,
```bash
npm install
#or
pnpm install
```

and finally, run the development version of the website using commands below:
```bash
npm run dev
# or
pnpm dev
```
(... or with the other package manager!)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Before committing, make sure both of these pass:
```bash
npm run build
npm run lint
```