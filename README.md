# Argus website

Product site for Argus, a $150 camera that runs its AI on board. It tells you a
driver's eyes left the road, or that someone fell, without a single frame of
video leaving the device. The site's job is to explain the product and take
reservations.

## Run it

Static site, so any file server works:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## The walkthrough video

`assets/demo.mp4` is the 2:31 hands-on walkthrough (portrait, 540x960, H.264 /
AAC, ~20 MB) and plays in the hero.

It sits on a plain black well: no poster image, and `preload="none"` so the
browser decodes no frame before you press play. That also keeps the 20 MB off
the initial page load. To swap in a new cut, replace the file and update the
`<span class="demo__time">` label in `index.html`. If the new clip is landscape,
change `aspect-ratio: 9 / 16` on `.demo__video` in `styles.css` to `16 / 9`.

## Product shots

**The device** section carries three pieces of imagery, all driven by files in
`assets/`:

| Block | Files | Behaviour |
|-------|-------|-----------|
| FIG. 01 | inline SVG | The *prototype* enclosure drawing (Rev C, printed) |
| `#unitViewer` | `render-1-unit`, `render-2-side`, `render-3-back` | Click through the angles |
| `#mountViewer` | `render-4` to `render-7` | Click through the mounts |
| `#shots` | `prototype.jpg` | A plain plate for the prototype photo |

### The viewer

One component, `.viewer`, used twice. Markup is a `<figure data-viewer>`
holding a stage of `<img class="viewer__img">` elements plus two arrow buttons,
and a meta panel with a counter, a name, a description and an empty
`.viewer__picker`.

**Each slide's copy rides on its own `<img>`**, in `data-name` and `data-desc`,
so there is a single source for it. `script.js` reads those to fill the meta
panel and to build the picker buttons, which means adding or reordering a
slide is a pure markup edit: drop an `<img>` into the stage with its two data
attributes and everything else follows.

Arrows wrap in both directions. The picker jumps straight to a slide. Left and
right arrow keys work once something inside the viewer has focus. An image that
fails to load drops out of the rotation, and a viewer whose images all fail
hides itself.

The first slide is marked `is-active` in the HTML and its copy is written into
the meta panel, so the viewer shows the right thing before the script runs.

> `loading="lazy"` is deliberately *not* set on these images. Inactive slides
> are `display:none`, and a lazy image inside a hidden element never loads.

### The renderings

They come from `Argus Retail Puck-2.pdf` (7 pages). Each page is rasterised at
2x and cropped with **one shared rect**, `x274 y150 653x490` at 1x, so every
render holds the same scale and the puck doesn't change size between slides.
The crop drops the sheet's burned-in "ARGUS / RETAIL RENDERING" header and its
disclaimer footer; the disclaimer is reinstated once, under the mount viewer.

Order is carried in the filenames: unit, side, back, vehicle, tabletop, wall,
corner.

New shots should be landscape at 4:3. The renders are 1306x980.

## How the unit connects

The camera has no port. It holds to its mount magnetically and takes power
through two contacts on its back; the cable runs out of the mount, not the
camera. The renderings show this: four magnetic pads, a central alignment slot,
and two gold contacts, matched on every mount.

The FIG. 01 drawing is the *prototype* enclosure, which was a printed box with a
¼-20 boss. It is captioned as such so it isn't read as the retail puck.

## Page order

| Section | What it does |
|---------|--------------|
| Hero | The claim, the price, the walkthrough, the reserve button |
| Spec strip | Five facts a buyer checks first |
| The device | What it is, the prototype drawing, and the two rendering viewers |
| How it sees | Signal chain (FIG. 02) and the egress boundary (FIG. 03) |
| Setup | The three steps from box to watching |
| Price | $150 plus $12/mo, split by what each buys, and who it's for |
| Reserve | Email form, what happens next, and the six questions people ask first |

## The design

A quiet paper page around one loud thing: the walkthrough. Lab-white stock, ink
rules, numbered figures and dimension-line dividers. The product is an optical
instrument, so the page is set like its documentation. The only dark surfaces
are where the product itself appears.

- **Type**: Archivo (expanded/black) display, Hanken Grotesk body, IBM Plex Mono for data
- **Color**: paper `#F6F6F2`, ink `#15181A`, safety orange `#E8500A` (signal),
  verification green `#17694A` (private/working). Tokens at the top of `styles.css`.
- **No animation at all.** The only motion left on the page is video playback.
- **No em dashes.** Prose uses commas, colons or full stops instead. The price
  table uses filled and hollow circles rather than a dash for "not included".

## Files

| File | Purpose |
|------|---------|
| `index.html` | All markup and content, including the SVG figures |
| `styles.css` | Full visual system |
| `script.js`  | Mobile nav, the two viewers, the plate loader, and the reserve form |
| `assets/` | Walkthrough video, renderings, prototype photo, favicon |

## Before launch

- **The reserve form is front-end only.** `script.js` validates the address and
  prints a confirmation; nothing is stored. Wire the submit handler to a backend
  or email provider before taking real reservations.
- **The prototype image is a still lifted from the walkthrough video**, not a
  photograph. It holds up at the size it's shown, but a real photo of the Rev C
  unit would be better. Replace `assets/prototype.jpg`.
- **Drive, Care and Watch are named but never explained.** The section that
  described them was removed. They are still referenced in the spec strip, in
  setup step 3 and in the price table. Either reintroduce an explanation or
  reword those three places.
- **Which mounts ship in the box is unconfirmed.** The spec list says "Vehicle,
  wall, corner and tabletop", which names every mount rendered, but says nothing
  about which are included against sold separately.
- **Claims to keep honest:** the 30-day return window, "first production run",
  the 12 V car adapter, and the $12/mo feature split are all stated as fact.
  Make sure they match what you intend to offer.
