(() => {
  const status = document.getElementById('status');
  const clock = document.getElementById('clock');
  const notes = document.getElementById('notes');
  const form = document.getElementById('demo-form');
  const cta = document.getElementById('primary-cta');
  const key = 'forge-preview-notes:' + "Act As A Principal Full Stack Engineer And";

  const setStatus = (msg) => { if (status) status.textContent = msg; };
  const tick = () => { if (clock) clock.textContent = new Date().toLocaleString(); };
  tick();
  setInterval(tick, 1000);

  const load = () => {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
  };
  const save = (items) => localStorage.setItem(key, JSON.stringify(items.slice(0, 20)));
  const render = () => {
    if (!notes) return;
    const items = load();
    notes.innerHTML = items.length
      ? items.map((n) => '<li><strong>' + escapeHtml(n.name) + '</strong> — ' + escapeHtml(n.goal || '') + '</li>').join('')
      : '<li>No notes yet — submit the form.</li>';
  };
  const escapeHtml = (s) => String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  cta?.addEventListener('click', () => {
    setStatus('Demo launched · ' + new Date().toLocaleTimeString());
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  });
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const entry = { name: String(data.get('name') || 'Guest'), goal: String(data.get('goal') || '') };
    const next = [entry, ...load()];
    save(next);
    form.reset();
    render();
    setStatus('Saved locally · ' + entry.name);
  });
  render();
  setStatus('Interactive preview ready');
})();