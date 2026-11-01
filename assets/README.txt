demo.mp4         the walkthrough that plays in the hero
                 (portrait 540x960, H.264/AAC, 2:31)
demo-poster.jpg  the still shown before it plays (frame 40s)
favicon.svg      the Argus mark

Replacing the walkthrough: swap both demo.mp4 and demo-poster.jpg, then update
the duration label in index.html (span.demo__time). If the new clip is
landscape, change aspect-ratio on .demo__video in styles.css from 9/16 to 16/9.
