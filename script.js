/* =========================================================================
   Argus — interaction layer.
   Functional only: mobile nav, mode switcher (mirrors the iOS app's remote
   mode switching), reserve form. No decorative animation.
   ========================================================================= */
(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------- mobile nav ---------- */
  const nav = $(".nav");
  const navMenu = $("#navMenu");
  if (navMenu) {
    navMenu.addEventListener("click", () => {
      const open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      navMenu.setAttribute("aria-expanded", String(!open));
    });
    $$(".nav__links a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.setAttribute("data-open", "false");
        navMenu.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- mode switcher ---------- */
  const MODES = {
    drive: {
      forText: "In the car, for a teen or a tired commuter.",
      rows: [
        ["WATCHES", "Eyes drifting off the road; microsleep and heavy eyelids (PERCLOS); a phone picked up at the wheel"],
        ["RESPONDS", "Audible nudge in the cab, alert to your phone with the reason and duration"],
        ["SIGNALS", "Gaze · PERCLOS · NHTSA glance budget · YOLO phone detection"],
      ],
      alert: "“Eyes off road 2.1 s — nudge sent to driver, notice sent to you.”",
      clipName: "FIELD CLIP — DRIVE MODE",
      clipFile: "assets/demo-drive.mp4",
    },
    care: {
      forText: "In the home, for a parent living alone.",
      rows: [
        ["WATCHES", "A fall, the instant it happens; someone who hasn't moved in too long; an unusual absence from a room"],
        ["RESPONDS", "Immediate alert to family with room and time — never a video feed"],
        ["SIGNALS", "Pose estimation · motion baseline · presence windows"],
      ],
      alert: "“Fall detected in the kitchen, 6:42 pm — no motion since. Call now?”",
      clipName: "FIELD CLIP — CARE MODE",
      clipFile: "assets/demo-care.mp4",
    },
    watch: {
      forText: "At the door, for an empty house.",
      rows: [
        ["WATCHES", "An unknown person in a secured zone; motion after hours; a door or window opened while you're away"],
        ["RESPONDS", "Instant alert with zone and time — the footage itself never exists to steal"],
        ["SIGNALS", "Person detection · zone rules · schedule awareness"],
      ],
      alert: "“Unrecognized person at the side door, 11:03 pm.”",
      clipName: "FIELD CLIP — WATCH MODE",
      clipFile: "assets/demo-watch.mp4",
    },
  };

  const modesPanel = $("#modesPanel");
  const modeTabs = $$(".mtab");
  const modeFor = $("#modeFor");
  const modeRows = $("#modeRows");
  const modeAlert = $("#modeAlert");
  const clipName = $("#modeClipName");
  const clipFile = $("#modeClipFile");
  const modeVideo = $("#modeVideo");
  const modeVideoSrc = $("#modeVideoSrc");

  function setMode(mode) {
    const cfg = MODES[mode];
    if (!cfg || !modesPanel) return;
    modesPanel.setAttribute("data-mode", mode);
    modeTabs.forEach((t) => {
      const on = t.dataset.mode === mode;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
    });
    modeFor.textContent = cfg.forText;
    modeRows.innerHTML = cfg.rows
      .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
      .join("");
    modeAlert.textContent = cfg.alert;
    clipName.textContent = cfg.clipName;
    clipFile.textContent = cfg.clipFile;
    // swap the field-clip source for the selected mode
    if (modeVideoSrc.getAttribute("src") !== cfg.clipFile) {
      modeVideoSrc.setAttribute("src", cfg.clipFile);
      modeVideo.load();
    }
  }

  modeTabs.forEach((t) => t.addEventListener("click", () => setMode(t.dataset.mode)));
  setMode("drive");

  /* ---------- reserve form ---------- */
  const form = $("#reserveForm");
  if (form) {
    const input = $("#reserveEmail");
    const msg = $("#reserveMsg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = input.value.trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!ok) {
        msg.style.color = "var(--signal)";
        msg.textContent = "Enter a valid email and we'll hold your spot.";
        input.focus();
        return;
      }
      msg.style.color = "var(--ok)";
      msg.textContent = "Reserved. Watch your inbox — we'll email you when your unit ships.";
      input.value = "";
      input.blur();
    });
  }
})();
