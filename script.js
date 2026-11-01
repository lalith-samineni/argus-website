/* =========================================================================
   Argus — interaction layer.
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
