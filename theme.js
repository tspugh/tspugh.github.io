(() => {
  const root = document.documentElement;
  let theme = 'dark';
  try {
    if (localStorage.getItem('theme') === 'light') theme = 'light';
  } catch { /* Theme switching also works when storage is unavailable. */ }
  const apply = () => {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f5f1e8' : '#24231f');
  };
  apply();
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    const update = () => {
      button.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
      button.title = button.getAttribute('aria-label');
      button.firstElementChild.textContent = theme === 'light' ? '☾' : '☀';
    };
    button.hidden = false;
    update();
    button.addEventListener('click', () => {
      theme = theme === 'light' ? 'dark' : 'light';
      apply();
      update();
      try { localStorage.setItem('theme', theme); } catch {}
    });
  });
})();
