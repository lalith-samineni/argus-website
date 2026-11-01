demo.mp4            the walkthrough that plays in the hero
                    (portrait 540x960, H.264/AAC, 2:31)
prototype.jpg       "Rev C prototype" plate
                    (a still from demo.mp4 at 0:40 — swap for a real photo)
render-1-unit.jpg   retail puck, three-quarter  -- paired with prototype.jpg
render-2-side.jpg   edge-on                     -- the six below sit in the
render-3-back.jpg   USB-C and mount pads           three-up grid, in this order
render-4-vehicle.jpg  vehicle mount
render-5-tabletop.jpg tabletop stand
render-6-wall.jpg     wall plate
render-7-corner.jpg   corner mount
favicon.svg         the Argus mark

Renders came from "Argus Retail Puck.pdf", rasterised at 2x and cropped with a
single shared rect (x274 y150 653x490 at 1x) so every plate holds the same
scale. The sheet header and disclaimer footer were cropped off; the disclaimer
is shown once under the grid instead.

New product shots: landscape 4:3, 1306x980 or similar. A plate whose file is
missing hides itself rather than showing a broken image, and a figure stays
hidden until at least one of its plates is there.

The video sits on a plain black well — no poster image, and preload="none" so
no frame is decoded before playback. Replacing it: swap demo.mp4 and update the
duration label in index.html (span.demo__time). If the new clip is landscape,
change aspect-ratio on .demo__video in styles.css from 9/16 to 16/9.
