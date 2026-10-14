# SWSOFT · SIGNWELL DESIGN.

Official preview website for SIGNWELL DESIGN. — website design, immersive web experiences and custom digital systems.

## Preview
GitHub Pages URL (when Pages is enabled): https://easylearnfromtw.github.io/SWSOFT/

## Structure
- `index.html` — cinematic brand narrative and WebGL 3D
- `works.html` — related projects and portfolio
- `services.html` — capabilities, workflow and FAQ
- `contact.html` — project inquiry (opens an email draft)
- `privacy.html` — privacy notice
- `assets/css/style.css` — design system and responsive layout
- `assets/js/app.js` — navigation, module demos and mailto inquiry
- `assets/js/visuals.js` — custom WebGL 3D scenes

GitHub Pages is deployed with `.github/workflows/deploy.yml` from `main`. If the repository has not enabled Pages, check Settings → Pages and choose GitHub Actions.

**Demo note:** Portfolio entries are related brands and digital projects, not necessarily paying client work. Verify descriptions, team credits, brand history and service terms before public advertising.

**Inquiry:** The form creates a mail draft for luca.sinwell@gmail.com. It does not automatically store or submit messages.


## Immersive experience refinement (2026-10-14)
- A fixed six-chapter navigator on desktop and a restrained mobile inquiry shortcut.
- Optional 3D mouse tilt for the interactive module demo (desktop pointer devices only).
- An inquiry shortcut that carries service selection to `contact.html?service=...`.
- Copy-to-clipboard inquiry fallback when the visitor does not want to use a `mailto:` draft.
- WebGL render loop sleeps whenever both scenes are offscreen or the tab is hidden; respects Reduce Motion, and uses static CSS fallbacks.
- Focus indicators, mobile refinements, related-page styling and an XML sitemap.

Additional assets: `assets/css/experience.css`, `assets/js/experience.js`.

### Checks before using as a public commercial site
- Test the GitHub Pages preview on your actual iPhone and desktop browser.
- Add approved client work and replace concept/demo metrics with verifiable examples before publishing claims.
- Connect a real form backend if inquiries must be delivered without requiring the visitor to press Send in their mail app.
- Update sitemap, canonical URLs and structured data if a custom domain replaces the GitHub Pages preview.
