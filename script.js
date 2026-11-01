/* =========================================================================
   Argus — interaction layer.
   Functional only: mobile nav, the profile switcher (the same switch the
   iOS app makes), and the reserve form. No decorative animation.
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

  /* ---------- watch profiles ----------
     Each profile is what the device is looking for, what it does about it,
     and the notification that lands on your phone. */
  const MODES = {
    drive: {
      forText: "For a teen driver, or anyone driving tired.",
      rows: [
        ["WATCHES", "Eyes drifting off the road, heavy eyelids and microsleep, a phone picked up at the wheel"],
        ["RESPONDS", "Sounds a nudge in the car, then tells you what happened and how long it lasted"],
        ["READS", "Gaze, eye closure, glance budget, phone detection"],
      ],
      time: "8:14",
      head: "Eyes off road — 2.1 s",
      body: "Nudge sounded in the car. Car unit, Drive profile.",
    },
    care: {
      forText: "For a parent living on their own.",
      rows: [
        ["WATCHES", "A fall the moment it happens, someone who hasn't moved in too long, a room left empty longer than usual"],
        ["RESPONDS", "Alerts everyone on the list with the room and the time — never a video feed"],
        ["READS", "Body pose, movement baseline, how long a room stays empty"],
      ],
      time: "6:42",
      head: "Fall detected — kitchen",
      body: "No movement since 6:42. Mom's kitchen, Care profile.",
    },
    watch: {
      forText: "For a door, a garage, or a house with nobody in it.",
      rows: [
        ["WATCHES", "An unfamiliar person in a zone you marked, movement after hours, a door opened while you're away"],
        ["RESPONDS", "Alerts you with the zone and the time. There is no footage afterwards for anyone to take"],
        ["READS", "Person detection, zone rules, the schedule you set"],
      ],
      time: "11:03",
      head: "Someone at the side door",
      body: "Not a face you've saved. Side door unit, Watch profile.",
    },
  };

  const modesPanel = $("#modesPanel");
  const modeTabs = $$(".mtab");
  const modeBody = $("#modeBody");
  const modeFor = $("#modeFor");
  const modeRows = $("#modeRows");
  const phoneTime = $("#phoneTime");
  const phoneHead = $("#phoneHead");
  const phoneBody = $("#phoneBody");

  function setMode(mode) {
    const cfg = MODES[mode];
    if (!cfg || !modesPanel) return;

    modesPanel.setAttribute("data-mode", mode);
    modeTabs.forEach((t) => {
      const on = t.dataset.mode === mode;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      if (on) modeBody.setAttribute("aria-labelledby", t.id);
    });

    modeFor.textContent = cfg.forText;
    modeRows.replaceChildren(
      ...cfg.rows.map(([k, v]) => {
        const tr = document.createElement("tr");
        const th = document.createElement("td");
        const td = document.createElement("td");
        th.textContent = k;
        td.textContent = v;
        tr.append(th, td);
        return tr;
      })
    );

    phoneTime.textContent = cfg.time;
    phoneHead.textContent = cfg.head;
    phoneBody.textContent = cfg.body;
  }

  modeTabs.forEach((tab, i) => {
    tab.addEventListener("click", () => setMode(tab.dataset.mode));
    // arrow keys move between tabs, as a tablist is expected to
    tab.addEventListener("keydown", (e) => {
      const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      const next = modeTabs[(i + step + modeTabs.length) % modeTabs.length];
      next.focus();
      setMode(next.dataset.mode);
    });
  });
  setMode("drive");

  /* ---------- reserve form ----------
     Front end only. Wire the submit to your backend or email provider. */
  const form = $("#reserveForm");
  if (form) {
    const input = $("#reserveEmail");
    const msg = $("#reserveMsg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        msg.style.color = "var(--signal)";
        msg.textContent = "That email doesn't look right — check it and try again.";
        input.focus();
        return;
      }
      msg.style.color = "var(--ok)";
      msg.textContent = "Reserved. We'll email you when your unit is built — no charge until you confirm.";
      input.value = "";
      input.blur();
    });
  }
})();
