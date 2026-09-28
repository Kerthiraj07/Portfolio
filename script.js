// Theme toggle: remembers the choice, otherwise follows the system setting.
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (e) {}

document.getElementById("theme").addEventListener("click", () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// Highlight the nav link for the section in view.
const links = [...document.querySelectorAll("nav a")];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
