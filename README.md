# Argus — website

Product site for Argus, a $150 camera that runs its AI on board. It tells you a
driver's eyes left the road, or that someone fell — without a single frame of
video leaving the device. The site's job is to explain the product and take
reservations.

## Run it

Static site — any file server works:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## The walkthrough video

`assets/demo.mp4` is the 2:31 hands-on walkthrough (portrait, 540×960, H.264 /
AAC, ~20 MB) and plays in the hero.

It sits on a plain black well: no poster image, and `preload="none"` so the
browser decodes no frame before you press play (it also keeps the 20 MB off the
initial page load). To swap in a new cut, replace the file and update the
`<span class="demo__time">` label in `index.html`. If the new clip is landscape,
change `aspect-ratio: 9 / 16` on `.demo__video` in `styles.css` to `16 / 9` —
the hero grid handles either.

## Product shots

Two plates sit in **The device** section, each tied to a file in `assets/`:

| File | Plate | Fit |
|------|-------|-----|
| `assets/retail-render.png` | Retail unit — how it ships | `contain`, so the whole render shows on white |
| `assets/prototype.jpg` | Rev C prototype — what's running today | `cover`, cropped to 4:3 |

Drop a file in and its plate appears; no code change. A plate whose file is
missing removes itself instead of showing a broken image, and the whole figure
stays hidden until at least one has landed — so the page never shows an empty
slot in public. With one plate the figure goes single-column and the caption
changes from the pairing line to just "The hardware".

Landscape images around 4:3 work best (roughly 1200×900 or larger).

> `loading="lazy"` is deliberately *not* set on these images. The figure starts
> `display:none`, and a lazy image inside a hidden element never loads, so the
> reveal would never fire.

## Page order

| Section | What it does |
|---------|--------------|
| Hero | The claim, the price, the walkthrough, the reserve button |
| Spec strip | Five facts a buyer checks first |
| The device | What it is and what's in the box, with the Rev C drawing (FIG. 01) |
| How it sees | Signal chain (FIG. 02) and the egress boundary (FIG. 03) |
| Setup | The three steps from box to watching |
| Price | $150 + $12/mo, split by what each buys, and who it's for |
| Reserve | Email form, what happens next, and the six questions people ask first |

## The design

A quiet paper page around one loud thing: the walkthrough. Lab-white stock, ink
rules, numbered figures and dimension-line dividers — the product is an optical
instrument, so the page is set like its documentation. The only dark surfaces are
where the product itself appears.

- **Type** — Archivo (expanded/black) display · Hanken Grotesk body · IBM Plex Mono for data
- **Color** — paper `#F6F6F2`, ink `#15181A`, safety orange `#E8500A` (signal),
  verification green `#17694A` (private/working). Tokens at the top of `styles.css`.
- **No animation at all.** The only motion left on the page is video playback.

## Files

| File | Purpose |
|------|---------|
| `index.html` | All markup and content, including the SVG figures |
| `styles.css` | Full visual system |
| `script.js`  | Mobile nav and the reserve form — nothing else |
| `assets/` | Walkthrough video, product shots, favicon |

## Before launch

- **The reserve form is front-end only.** `script.js` validates the address and
  prints a confirmation; nothing is stored. Wire the submit handler to a backend
  or email provider before taking real reservations.
- **The retail rendering is missing.** `assets/retail-render.png` has no file
  behind it, so that plate is hidden. Add the render and it appears.
- **The prototype image is a still lifted from the walkthrough video**, not a
  photograph. It's sharp enough at the size it's shown, but a real photo of the
  Rev C unit would be better — replace `assets/prototype.jpg`.
- **Drive / Care / Watch are named but no longer explained.** The section that
  described them was removed. They are still referenced in the spec strip, in
  setup step 3, and in the price table — either reintroduce an explanation or
  reword those three places.
- **Enclosure dimensions in FIG. 01** are Rev C as printed — confirm them against
  the production parts.
- **Claims to keep honest:** the 30-day return window, "first production run",
  and the $12/mo feature split are all stated as fact on the page. Make sure they
  match what you actually intend to offer.
