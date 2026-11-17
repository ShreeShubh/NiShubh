export const themeStorageKey = "nishubh-theme";

export const themeColors = {
  light: "#f8fafc",
  dark: "#090e1a",
} as const;

export type Theme = keyof typeof themeColors;

export const themeInitScript = `(() => {
  try {
    const storageKey = ${JSON.stringify(themeStorageKey)};
    const colors = ${JSON.stringify(themeColors)};
    const stored = localStorage.getItem(storageKey);
    const theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const color = colors[theme];
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", color);
  } catch {}
})();`;

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

export function getStoredTheme() {
  try {
    const stored = localStorage.getItem(themeStorageKey);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function getActiveTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function applyTheme(theme: Theme, persist = true) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", themeColors[theme]);
  }

  if (!persist) {
    return;
  }

  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Preference still applies for this visit when storage is unavailable.
  }
}
