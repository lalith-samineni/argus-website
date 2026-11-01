demo.mp4            the walkthrough that plays in the hero
                    (portrait 540x960, H.264/AAC, 2:31)
prototype.jpg       "Rev C prototype" plate
                    (a still from demo.mp4 at 0:40, swap for a real photo)
render-1-unit.jpg     front      -- the unit viewer, in this order
render-2-side.jpg     side
render-3-back.jpg     back, magnetic pads and contacts
render-4-vehicle.jpg  vehicle mount  -- the mount viewer, in this order
render-5-tabletop.jpg tabletop stand
render-6-wall.jpg     wall plate
render-7-corner.jpg   corner mount
favicon.svg         the Argus mark

Renders come from "Argus Retail Puck-2.pdf", rasterised at 2x and cropped with
a single shared rect (x274 y150 653x490 at 1x) so every plate holds the same
scale. The sheet header and disclaimer footer are cropped off; the disclaimer
shows once under the grid instead.

The camera has no port. It holds to its mount magnetically and draws power
through two contacts on its back, so the cable belongs to the mount.

New product shots: landscape 4:3, 1306x980 or similar. Adding a slide to a
viewer is a markup edit: drop an <img class="viewer__img"> into the stage with
data-name and data-desc, and the counter and picker follow. An image that fails
to load drops out of the rotation rather than showing broken.

The video sits on a plain black well: no poster image, and preload="none" so no
frame is decoded before playback. Replacing it: swap demo.mp4 and update the
duration label in index.html (span.demo__time). If the new clip is landscape,
change aspect-ratio on .demo__video in styles.css from 9/16 to 16/9.
