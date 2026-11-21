(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = 'system';
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch { /* Theme switching also works when storage is unavailable. */ }
  let button;
  const apply = () => {
    const theme = preference === 'system' ? (system.matches ? 'dark' : 'light') : preference;
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f5f1e8' : '#24231f');
    if (button) {
      const next = preference === 'system' ? 'light' : preference === 'light' ? 'dark' : 'system';
      button.textContent = `Theme: ${preference[0].toUpperCase()}${preference.slice(1)}`;
      button.setAttribute('aria-label', `Theme: ${preference}. Switch to ${next} theme`);
      button.title = `Switch to ${next} theme`;
    }
  };
  apply();
  system.addEventListener('change', () => { if (preference === 'system') apply(); });
  document.addEventListener('DOMContentLoaded', () => {
    button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.hidden = false;
    apply();
    button.addEventListener('click', () => {
      preference = preference === 'system' ? 'light' : preference === 'light' ? 'dark' : 'system';
      apply();
      try {
        if (preference === 'system') localStorage.removeItem('theme');
        else localStorage.setItem('theme', preference);
      } catch {}
    });
  });
})();
