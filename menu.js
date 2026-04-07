(() => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("site-menu");

  if (!toggle || !menu) {
    return;
  }

  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  if (!toggle.hasAttribute("onclick")) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
      closeMenu();
    }
  });
})();
