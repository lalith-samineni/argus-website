/* =========================================================================
   Argus: interaction layer.
   Functional only: mobile nav and the reserve form. No decorative animation.
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

  /* ---------- product shots ----------
     Each plate is tied to a file in assets/. If the file isn't there the
     plate takes itself out rather than showing a broken image, and the whole
     figure stays hidden until at least one of them has loaded. */
  $$(".shots").forEach((group) => {
    const slots = $$(".shot", group);
    let pending = slots.length;

    const settle = () => {
      if (--pending > 0) return;
      group.dataset.loaded = String(
        slots.filter((s) => s.dataset.missing !== "true").length
      );
    };

    slots.forEach((slot) => {
      const img = $(".shot__img", slot);
      if (img.complete) {
        if (!img.naturalWidth) slot.dataset.missing = "true";
        settle();
      } else {
        img.addEventListener("load", settle, { once: true });
        img.addEventListener(
          "error",
          () => {
            slot.dataset.missing = "true";
            settle();
          },
          { once: true }
        );
      }
    });
  });

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
        msg.textContent = "That email doesn't look right. Check it and try again.";
        input.focus();
        return;
      }
      msg.style.color = "var(--ok)";
      msg.textContent = "Reserved. We'll email you when your unit is built. No charge until you confirm.";
      input.value = "";
      input.blur();
    });
  }
})();
