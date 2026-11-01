demo.mp4         the walkthrough that plays in the hero
                 (portrait 540x960, H.264/AAC, 2:31)
prototype.jpg    "Rev C prototype" plate in The device section
                 (currently a still from demo.mp4 at 0:40 — swap for a photo)
retail-render.png  "Retail unit" plate — NOT PRESENT YET, add it and the
                 plate appears on its own
favicon.svg      the Argus mark

Product shots: landscape, around 4:3 (1200x900 or larger). A plate whose file
is missing hides itself rather than showing a broken image, and the figure
stays hidden entirely until at least one of the two is there.

The video sits on a plain black well — no poster image, and preload="none" so
no frame is decoded before playback. Replacing it: swap demo.mp4 and update the
duration label in index.html (span.demo__time). If the new clip is landscape,
change aspect-ratio on .demo__video in styles.css from 9/16 to 16/9.
