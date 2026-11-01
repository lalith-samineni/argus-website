demo.mp4     the walkthrough that plays in the hero
             (portrait 540x960, H.264/AAC, 2:31)
favicon.svg  the Argus mark

The video sits on a plain black well — no poster image, and preload="none" so
no frame is decoded before playback. Replacing it: swap demo.mp4 and update the
duration label in index.html (span.demo__time). If the new clip is landscape,
change aspect-ratio on .demo__video in styles.css from 9/16 to 16/9.
