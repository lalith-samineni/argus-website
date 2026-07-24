# Argus — website

Marketing site for Argus, a privacy-first edge-AI camera that watches for the
moments that matter (a drowsy driver, a fallen parent, an intruder) and alerts
instantly — without a single video frame ever leaving the device.

## Run it

Static site — any file server works:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Add your demo videos

Drop H.264 `.mp4` files (16:9) into `assets/` — the players pick them up
automatically, no code changes:

| File | Where it plays |
|------|----------------|
| `assets/demo.mp4` | Hero bench demo (FIG. 01) |
| `assets/demo-drive.mp4` | Field clip, Drive mode (FIG. 03) |
| `assets/demo-care.mp4` | Field clip, Care mode |
| `assets/demo-watch.mp4` | Field clip, Watch mode |

Until a file exists, the slot shows a styled "NO SIGNAL" frame.

## The design

**The engineering dossier.** Argus is an optical instrument, so the site is styled
as its documentation: lab-white paper, ink rules, numbered figures (FIG. 01–06),
dimension-line section dividers, camera-calibration checkers on the video frames, and a
real title block on the enclosure drawing.

- **Type** — Archivo (expanded/black) display · Hanken Grotesk body · IBM Plex Mono annotations
- **Color** — paper `#F6F6F2`, ink `#15181A`, safety orange `#E8500A` (signal/alerts),
  verification green `#17694A` (private/working). Tokens at the top of `styles.css`.
- **No decorative animation.** The only motion is functional: the mode switcher
  (mirrors remote mode switching in the iOS app) and native video playback.
  Diagrams that used to animate are now static engineering drawings — the numbers
  themselves carry the weight.

## Files

| File | Purpose |
|------|---------|
| `index.html` | All markup and content, including the SVG figures |
| `styles.css` | Full visual system |
| `script.js`  | Mobile nav, mode switcher, reserve form — nothing else |
| `assets/` | Drop demo videos here |

## Before launch

- Benchmark scores in TBL. 01 (94 / 88 / 79) are illustrative — substitute published
  run figures (the table footnote says so on-page too).
- Enclosure dimensions in FIG. 06 are placeholders — set them to the real Rev C numbers.
- The reserve form is front-end only — wire it to a backend or email provider.
