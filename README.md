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
AAC, ~20 MB) and plays in the hero. `assets/demo-poster.jpg` is the still shown
before playback — frame 40 s, the assembled unit.

To swap in a new cut, replace both files and update two things in `index.html`:
the `<span class="demo__time">` label and the duration in `README`. If the new
clip is landscape, change `aspect-ratio: 9 / 16` on `.demo__video` in
`styles.css` to `16 / 9` — the hero grid handles either.

## Page order

| Section | What it does |
|---------|--------------|
| Hero | The claim, the price, the walkthrough, the reserve button |
| Spec strip | Five facts a buyer checks first |
| The device | What it is and what's in the box, with the Rev C drawing (FIG. 01) |
| What it watches | Drive / Care / Watch, the alert as it lands, plain-language setup, the 2 s threshold (FIG. 02) |
| How it sees | Signal chain (FIG. 03) and the egress boundary (FIG. 04) |
| Setup | The three steps from box to watching |
| Price | $150 + $12/mo, split by what each buys, and who it's for |
| Reserve | Email form, what happens next, and the six questions people ask first |

## The design

A quiet paper page around one loud thing: the walkthrough. Lab-white stock, ink
rules, numbered figures and dimension-line dividers — the product is an optical
instrument, so the page is set like its documentation. The only dark surfaces are
where the product itself appears: the video well and the phone notification.

- **Type** — Archivo (expanded/black) display · Hanken Grotesk body · IBM Plex Mono for data
- **Color** — paper `#F6F6F2`, ink `#15181A`, safety orange `#E8500A` (signal),
  verification green `#17694A` (private/working). Tokens at the top of `styles.css`.
- **No decorative animation.** The only motion is the profile switcher (which
  mirrors the remote switch in the iOS app) and video playback.

## Files

| File | Purpose |
|------|---------|
| `index.html` | All markup and content, including the SVG figures |
| `styles.css` | Full visual system |
| `script.js`  | Mobile nav, profile switcher, reserve form — nothing else |
| `assets/` | Walkthrough video, poster still, favicon |

## Before launch

- **The reserve form is front-end only.** `script.js` validates the address and
  prints a confirmation; nothing is stored. Wire the submit handler to a backend
  or email provider before taking real reservations.
- **Enclosure dimensions in FIG. 01** are Rev C as printed — confirm them against
  the production parts.
- **Claims to keep honest:** the 30-day return window, "first production run",
  and the $12/mo feature split are all stated as fact on the page. Make sure they
  match what you actually intend to offer.
