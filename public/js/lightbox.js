"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const imgEl = lightbox.querySelector(".lightbox-image");
  const captionEl = lightbox.querySelector(".lightbox-caption");
  const counterEl = lightbox.querySelector(".lightbox-counter");
  const closeBtn = lightbox.querySelector("[data-close]");
  const nextBtn = lightbox.querySelector("[data-next]");
  const prevBtn = lightbox.querySelector("[data-prev]");

  let images = [];
  let idx = 0;
  let caption = "";

  const setAria = (open) => {
    lightbox.setAttribute("aria-hidden", open ? "false" : "true");
  };

  const show = (i) => {
    if (!images.length) return;
    idx = (i + images.length) % images.length;
    imgEl.src = images[idx];
    counterEl.textContent = `${idx + 1} / ${images.length}`;
    captionEl.textContent = caption || "";
    const navVisible = images.length > 1 ? "" : "none";
    nextBtn.style.display = navVisible;
    prevBtn.style.display = navVisible;
  };

  const open = (arr, startIndex = 0, cap = "") => {
    images = arr;
    caption = cap;
    show(startIndex);
    lightbox.classList.add("open");
    document.body.classList.add("no-scroll");
    setAria(true);
    closeBtn.focus();
  };

  const close = () => {
    lightbox.classList.remove("open");
    document.body.classList.remove("no-scroll");
    setAria(false);
    // Clear src to free memory on mobile
    imgEl.removeAttribute("src");
  };

  nextBtn.addEventListener("click", () => show(idx + 1));
  prevBtn.addEventListener("click", () => show(idx - 1));
  closeBtn.addEventListener("click", close);

  // click outside image closes
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  // keyboard support
  window.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
  });

  // open from any trigger
  document.querySelectorAll(".gallery-trigger").forEach((el) => {
    el.addEventListener("click", () => {
      let arr = [];
      try {
        // data-images is URI-encoded JSON
        const encoded = el.dataset.images || "";
        arr = encoded ? JSON.parse(decodeURIComponent(encoded)) : [];
      } catch (_) { /* ignore */ }

      const startIndex = Number(el.dataset.startIndex) || 0;
      const cap = el.dataset.caption || el.alt || "";
      if (!arr.length) arr = [el.currentSrc || el.src];
      open(arr, startIndex, cap);
    });
  });

  // simple swipe on the image (mobile)
  let startX = 0;
  imgEl.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].clientX;
  }, { passive: true });

  imgEl.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50 && images.length > 1) {
      if (dx < 0) show(idx + 1); else show(idx - 1);
    }
  }, { passive: true });
});
