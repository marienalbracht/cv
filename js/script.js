/* ============================================================
   MARIEN ALBRACHT — CV WEBSITE
   script.js — Interactivity, Animations & DOM Rendering
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  populateContent();
  initParticles();
  initTypewriter();
  initNavbar();
  initScrollAnimations();
  initBackToTop();
  initModal();
  initPrintButtons();
  initAskMarien();
  initSollicitatie();

  // Sollicitatie shortcuts op alle secties
  document.querySelectorAll('.soll-shortcut').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = '#sollicitatie';
    });
  });

  // Footer year
  const fyEl = document.getElementById('footer-year');
  if (fyEl) fyEl.textContent = new Date().getFullYear();
});

/* ============================================================
   POPULATE CONTENT FROM data.js
   ============================================================ */
function populateContent() {
  const p = cvData.personal;

  // Hero summary (right panel)
  const heroSummaryEl = document.getElementById('hero-summary');
  if (heroSummaryEl) heroSummaryEl.textContent = cvData.summary || p.subtitle;

  // About summary (section)
  const summaryEl = document.getElementById('about-summary');
  if (summaryEl) summaryEl.textContent = cvData.summary || p.subtitle;

  // Footer name
  const fnEl = document.getElementById('footer-name');
  if (fnEl) fnEl.textContent = p.name;

  // Hero highlights + Dashboard
  buildHeroHighlights();
  buildDashboard();

  // Stats
  buildStats();

  // Timelines
  buildExperience();
  buildEducation();

  // Skills
  buildSkills();

  // Projects
  buildProjects();

  // Certificates
  buildCertificates();

  // Hobbies
  buildHobbies();

  // References
  buildReferences();

  // Contact
  buildContact();
}

/* ---- Hero Highlights (4 stat cards in hero right panel) ---- */
function buildHeroHighlights() {
  const el = document.getElementById('hero-highlights');
  if (!el || !cvData.stats || !cvData.stats.length) return;
  const show = cvData.stats.slice(0, 4);
  el.innerHTML = show.map(s => `
    <div class="hero-highlight-card">
      <div class="hero-highlight-number">${s.number}${escHtml(s.suffix)}</div>
      <div class="hero-highlight-label">${escHtml(s.label)}</div>
    </div>
  `).join('');
}

/* ---- Dashboard tiles ---- */
function buildDashboard() {
  const grid = document.getElementById('dashboard-grid');
  if (!grid) return;

  const d = cvData;
  const p = d.personal;

  // Current job
  const currentJob = d.experience && d.experience[0];
  // Highest edu
  const topEdu = d.education && d.education[0];
  // Top 3 skills from first category
  const topSkillCat = d.skills && d.skills[0];
  const topSkills = topSkillCat ? topSkillCat.items.slice(0, 3) : [];

  const tiles = [
    {
      id: 'about',
      icon: '👤',
      title: 'Over mij',
      preview: '32 jr · Zwolle · getrouwd met Charlotte<br>Consultant HRM &amp; Payroll bij AFAS<br>Master Change Management · Bachelor Psychologie',
      cta: 'Lees meer →',
    },
    {
      id: 'experience',
      icon: '💼',
      title: 'Werkervaring',
      preview: currentJob
        ? `<strong>${escHtml(currentJob.role.split('|')[0].trim())}</strong><br><span style="color:var(--color-blue);font-size:.8rem;">${escHtml(currentJob.company)}</span> · <span style="color:var(--color-muted);font-size:.76rem;">${escHtml(currentJob.period)}</span><br><span style="font-size:.76rem;color:var(--color-muted);">+ ${d.experience.length - 1} eerdere functies</span>`
        : '',
      cta: `${d.experience ? d.experience.length : 0} functies bekijken →`,
    },
    {
      id: 'education',
      icon: '🎓',
      title: 'Opleiding',
      preview: '<strong>Master Change Management</strong><br><span style="color:var(--color-blue);font-size:.8rem;">Rijksuniversiteit Groningen</span><br><strong>Bachelor Psychologie</strong><br><span style="color:var(--color-blue);font-size:.8rem;">Rijksuniversiteit Groningen</span>',
      cta: `${d.education ? d.education.length : 0} opleidingen bekijken →`,
    },
    {
      id: 'skills',
      icon: '⚡',
      title: 'Competenties',
      preview: (d.skills || []).map(cat => {
        const avg = cat.items.reduce((s, i) => s + (i.score || 0), 0) / (cat.items.length || 1);
        const rounded = Math.round(avg);
        const dots = Array.from({length: 5}, (_, i) =>
          `<span class="dash-skill-dot${i < rounded ? ' dash-skill-dot--on' : ''}"></span>`
        ).join('');
        const shortName = cat.category.replace('Projectmanagement', 'Projectman.');
        return `<div class="dash-skill-cat"><span class="dash-skill-cat-name">${escHtml(shortName)}</span><span class="dash-skill-dots">${dots}</span></div>`;
      }).join(''),
      cta: 'Alle competenties →',
    },
    {
      id: 'projects',
      icon: '🏛️',
      title: 'Projecten',
      preview: `<span class="dash-badge dash-badge--edu">🏫 Onderwijs</span><span class="dash-badge dash-badge--gov">🏦 Overheid</span><br><span style="color:var(--color-muted);font-size:.78rem;margin-top:.4rem;display:inline-block;">30+ organisaties begeleid</span>`,
      cta: 'Bekijk alle klanten →',
    },
    {
      id: 'hobbies',
      icon: '🎸',
      title: "Persoonlijk",
      previewFn: () => `<div class="dash-hobbies">${
        (d.hobbies || []).map(h => `<span class="dash-hobby" title="${escHtml(h.name)}"><span class="dash-hobby-icon">${h.icon}</span><span class="dash-hobby-name">${escHtml(h.name)}</span></span>`).join('')
      }</div>`,
      cta: 'Bekijk interesses →',
    },
    {
      id: 'references',
      icon: '🔒',
      title: 'Referenties',
      preview: `<span style="color:var(--color-muted);font-size:.84rem;">${d.references ? d.references.length : 0} referenties beschikbaar<br><span style="font-size:.76rem;">Verborgen · klik om te onthullen</span></span>`,
      cta: 'Bekijk referenties →',
    },
    {
      id: 'contact',
      icon: '✉️',
      title: 'Contact',
      preview: [
        p.email    ? `<div>✉️ ${escHtml(p.email)}</div>`    : '',
        p.phone    ? `<div>📞 ${escHtml(p.phone)}</div>`    : '',
        p.location ? `<div>📍 ${escHtml(p.location)}</div>` : '',
      ].filter(Boolean).join(''),
      cta: 'Neem contact op →',
    },
  ];

  grid.innerHTML = tiles.map(tile => {
    const previewHtml = tile.previewFn ? tile.previewFn() : (tile.preview || '');
    return `
      <a class="dashboard-tile" href="#${tile.id}" aria-label="Ga naar ${tile.title}">
        <div class="dashboard-tile-header">
          <span class="dashboard-tile-icon">${tile.icon}</span>
          <span class="dashboard-tile-title">${escHtml(tile.title)}</span>
        </div>
        <div class="dashboard-tile-preview">${previewHtml}</div>
        <div class="dashboard-tile-cta">${tile.cta}</div>
      </a>
    `;
  }).join('');
}

/* ---- Stats ---- */
function buildStats() {
  const grid = document.getElementById('stats-grid');
  if (!grid) return;
  grid.innerHTML = cvData.stats.map(s => `
    <a class="stat-card${s.link ? ' stat-card--link' : ''}" ${s.link ? `href="${s.link}"` : ''} role="${s.link ? 'link' : 'presentation'}">
      <div class="stat-number" data-target="${s.number}" data-suffix="${s.suffix}">0${s.suffix}</div>
      <div class="stat-label">${s.label}</div>
    </a>
  `).join('');
}

/* ---- Experience — proportionele Gantt-tijdlijn ---- */
function buildExperience() {
  const container = document.getElementById('experience-timeline');
  if (!container) return;

  const now     = new Date();
  const NOW_YR  = now.getFullYear() + now.getMonth() / 12; // bijv. 2026.33
  const MIN_YR  = 2017.8;  // iets ruimte links
  const MAX_YR  = Math.ceil(NOW_YR) + 0.3; // iets ruimte rechts
  const RANGE   = MAX_YR - MIN_YR;
  const ROW_H   = 64;  // px hoogte per balk
  const ROW_GAP = 10;  // px ruimte tussen rijen

  function typeClass(t) { return t ? t.toLowerCase().replace(/\s+/g, '-') : 'vast'; }

  function parseRange(period) {
    const MONTHS = {
      januari:1,februari:2,maart:3,april:4,mei:5,juni:6,
      juli:7,augustus:8,september:9,oktober:10,november:11,december:12
    };
    function toYr(str) {
      if (!str) return null;
      str = str.trim().toLowerCase();
      if (str === 'heden') return NOW_YR;
      // "april 2024" of "2024"
      const mMatch = str.match(/([a-z]+)\s+(\d{4})/);
      if (mMatch && MONTHS[mMatch[1]]) {
        return parseInt(mMatch[2], 10) + (MONTHS[mMatch[1]] - 1) / 12;
      }
      const yMatch = str.match(/(\d{4})/);
      return yMatch ? parseInt(yMatch[1], 10) : null;
    }
    // Splits op streepje of dash, met optionele maandnaam
    const parts = period.split(/\s*[-\u2013]\s*(?=(?:[a-z]+\s+)?(?:\d{4}|heden))/i);
    if (parts.length >= 2) {
      const s = toYr(parts[0]);
      const e = toYr(parts[parts.length - 1]);
      if (s !== null && e !== null) return { start: s, end: e };
    }
    const s = toYr(period);
    return { start: s ?? MIN_YR, end: (s ?? MIN_YR) + 0.75 };
  }

  function durLabel(start, end) {
    const mo = Math.round((end - start) * 12);
    const y = Math.floor(mo / 12), m = mo % 12;
    if (y === 0) return `${m} mnd`;
    if (m === 0) return `${y} jr`;
    return `${y} jr ${m} mnd`;
  }

  // Bereid jobs voor
  const jobs = cvData.experience.map(job => ({
    ...job,
    range: parseRange(job.period),
    tc: typeClass(job.type),
  }));

  // Wijs rijen toe op volgorde van startdatum → hoofdlijn op rij 0, alleen echte overlaps op rijen eronder
  const sortedForRows = [...jobs].sort((a, b) => a.range.start - b.range.start);
  const rowEnds = [];
  sortedForRows.forEach(job => {
    let r = 0;
    while (r < rowEnds.length && rowEnds[r] > job.range.start + 0.05) r++;
    job.row = r;
    rowEnds[r] = job.range.end;
  });

  const numRows = rowEnds.length;
  const bodyH = numRows * ROW_H + (numRows - 1) * ROW_GAP;

  // Jaar-assen
  const years = [];
  for (let y = Math.ceil(MIN_YR); y <= Math.floor(MAX_YR); y++) years.push(y);

  // Omgekeerde coördinaten: MAX_YR = links (heden), MIN_YR = rechts (oudste)
  const axisTicks = years.map(y => {
    const pct = ((MAX_YR - y) / RANGE * 100).toFixed(3);
    return `<span class="exp-gantt-year" style="left:${pct}%">${y}</span>`;
  }).join('');

  const gridLines = years.map(y => {
    const pct = ((MAX_YR - y) / RANGE * 100).toFixed(3);
    return `<div class="exp-gantt-gridline" style="left:${pct}%"></div>`;
  }).join('');

  const nowPct = ((MAX_YR - NOW_YR) / RANGE * 100).toFixed(3);
  const nowLine = `<div class="exp-gantt-now-line" style="left:${nowPct}%">
    <span class="exp-gantt-now-label">Heden</span>
  </div>`;

  const bars = jobs.map((job, idx) => {
    const l = ((MAX_YR - job.range.end)   / RANGE * 100).toFixed(3);
    const w = ((job.range.end - job.range.start) / RANGE * 100).toFixed(3);
    const t = (job.row * (ROW_H + ROW_GAP)).toFixed(0);
    const dur = durLabel(job.range.start, job.range.end);
    return `
      <div class="exp-bar exp-bar--${job.tc}${idx === 0 ? ' active' : ''}"
           style="left:${l}%;width:${w}%;top:${t}px;height:${ROW_H}px"
           data-id="${job.id}"
           onclick="showExpDetail(${job.id})"
           role="button" tabindex="0"
           onkeypress="if(event.key==='Enter')showExpDetail(${job.id})"
           title="${job.role} \u2014 ${job.company}">
        <div class="exp-bar-role">${escHtml(job.role.split('|')[0].trim())}</div>
        <div class="exp-bar-company">${escHtml(job.company)}</div>
        <div class="exp-bar-dur">${escHtml(dur)}</div>
      </div>`;
  }).join('');

  // Legenda
  const typesSeen = [...new Set(jobs.map(j => j.tc))];
  const legendLabels = { vast: 'Vast', ondernemer: 'Ondernemer', bijbaan: 'Bijbaan', tijdelijk: 'Tijdelijk' };
  const legend = typesSeen.map(tc => `
    <div class="exp-legend-item">
      <span class="exp-legend-dot exp-legend-dot--${tc}"></span>
      ${escHtml(legendLabels[tc] || tc)}
    </div>`).join('');

  container.innerHTML = `
    <div class="exp-gantt">
      <div class="exp-gantt-axis">${axisTicks}</div>
      <div class="exp-gantt-body" style="height:${bodyH}px">
        ${gridLines}
        ${nowLine}
        ${bars}
      </div>
      <div class="exp-legend">${legend}</div>
    </div>`;

  // Initialiseer draggable scrubber
  const ganttBody = container.querySelector('.exp-gantt-body');
  initGanttScrubber(ganttBody, jobs, MIN_YR, MAX_YR, RANGE, NOW_YR);

  // Open eerste balk direct
  if (jobs.length > 0) showExpDetail(jobs[0].id);

  // Print-lijst (verborgen op scherm, zichtbaar bij afdrukken)
  const printList = document.getElementById('exp-print-list');
  if (printList) {
    printList.innerHTML = jobs.map(job => `
      <div class="print-cv-item">
        <div class="print-cv-header">
          ${job.logo ? `<img src="${job.logo}" class="print-cv-logo" alt="">` : ''}
          <div class="print-cv-title">${escHtml(job.role)}</div>
        </div>
        <div class="print-cv-meta">${escHtml(job.company)} &nbsp;&middot;&nbsp; ${escHtml(job.period)} &nbsp;&middot;&nbsp; ${escHtml(job.location)} &nbsp;&middot;&nbsp; ${escHtml(job.type)}</div>
        <p class="print-cv-summary">${escHtml(job.summary)}</p>
        <ul class="print-cv-list">${job.details.map(d => `<li>${escHtml(d)}</li>`).join('')}</ul>
        <div class="print-cv-tags">${job.tags.join(' &middot; ')}</div>
      </div>`).join('');
  }
}
function showExpDetail(id) {
  const job   = cvData.experience.find(j => j.id === id);
  const panel = document.getElementById('exp-detail-panel');
  if (!job || !panel) return;

  function typeClass(t) { return t ? t.toLowerCase().replace(/\s+/g, '-') : 'vast'; }
  function calcDuration(period) {
    const now = new Date();
    const cur = now.getFullYear() + now.getMonth() / 12;
    const m   = period.match(/(\d{4})\s*[-–]\s*(heden|\d{4})/i);
    if (!m) return '';
    const start = parseInt(m[1], 10);
    const end   = m[2].toLowerCase() === 'heden' ? cur : parseInt(m[2], 10);
    const mo    = Math.round((end - start) * 12);
    const y = Math.floor(mo / 12), mn = mo % 12;
    if (y === 0) return `${mn} mnd`;
    if (mn === 0) return `${y} jaar`;
    return `${y} jaar ${mn} mnd`;
  }

  const tc  = typeClass(job.type);
  const dur = calcDuration(job.period);

  // Actieve balk markeren
  document.querySelectorAll('.exp-bar').forEach(n =>
    n.classList.toggle('active', parseInt(n.dataset.id) === id)
  );

  // Herstart animatie via reflow
  panel.classList.remove('visible');
  void panel.offsetWidth;
  panel.innerHTML = `
    <div class="exp-detail-inner">
      <div class="exp-detail-header">
        <div class="exp-detail-header-left">
          ${job.logo ? `<img src="${job.logo}" class="exp-detail-logo" alt="${escHtml(job.company)} logo">` : ''}
          <div class="exp-detail-role">${escHtml(job.role)}</div>
          <div class="exp-detail-meta">🏢 ${escHtml(job.company)}</div>
          <div class="exp-detail-location">📍 ${escHtml(job.location)}</div>
        </div>
        <div class="exp-detail-header-right">
          <span class="exp-period-badge">${escHtml(job.period)}</span>
          <span class="exp-type-badge exp-type-badge--${tc}">${escHtml(job.type)}</span>
          ${dur ? `<span class="exp-duration">⏱ ${escHtml(dur)}</span>` : ''}
        </div>
      </div>
      <p class="exp-detail-summary">${escHtml(job.summary)}</p>
      <ul class="exp-detail-list">
        ${job.details.map(d => `<li>${escHtml(d)}</li>`).join('')}
      </ul>
      <div class="exp-detail-tags">
        ${job.tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('')}
      </div>
    </div>`;
  panel.classList.add('visible');

  // Sync scrubber naar deze functie (alleen als scrubber niet zelf aan het slepen is)
  if (typeof window._moveScrubberToJob === 'function' && !window._scrubberMoving) {
    window._moveScrubberToJob(id);
  }
}

function initGanttScrubber(body, jobs, minYr, maxYr, range, nowYr) {
  const scr = document.createElement('div');
  scr.className = 'exp-scrubber exp-scrubber--hint';
  scr.setAttribute('role', 'slider');
  scr.setAttribute('aria-label', 'Tijdlijn schuifregelaar — sleep om periode te selecteren');
  scr.innerHTML = `
    <div class="exp-scrubber-head">
      <span class="exp-scrubber-badge">Heden</span>
      <span class="exp-scrubber-tip"></span>
    </div>`;
  body.appendChild(scr);

  let dragging = false;

  function yearLabel(yr) {
    return (nowYr - yr) < 0.15 ? 'Heden' : Math.round(yr).toString();
  }

  function pctFromEvent(e) {
    const rect = body.getBoundingClientRect();
    const cx = e.clientX;
    return (cx - rect.left) / rect.width * 100;
  }

  function moveTo(newPct, fromBarClick) {
    newPct = Math.max(0, Math.min(100, newPct));
    scr.style.left = newPct + '%';
    const yr = maxYr - (newPct / 100) * range;
    scr.querySelector('.exp-scrubber-badge').textContent = yearLabel(yr);

    if (fromBarClick) return;

    // Vind de balk op deze positie (heden=links, oud=rechts)
    // balk: left=(maxYr-end)/range*100 tot right=(maxYr-start)/range*100
    let best = null;
    jobs.forEach(job => {
      const l = (maxYr - job.range.end)   / range * 100;
      const r = (maxYr - job.range.start) / range * 100;
      if (newPct >= l - 0.3 && newPct <= r + 0.3) {
        if (!best || job.row < best.row ||
            (job.row === best.row && job.range.start > best.range.start))
          best = job;
      }
    });
    if (best) {
      window._scrubberMoving = true;
      showExpDetail(best.id);
      window._scrubberMoving = false;
    }
  }

  // Drag via Pointer Events API
  scr.addEventListener('pointerdown', e => {
    dragging = true;
    scr.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  scr.addEventListener('pointermove', e => {
    if (!dragging) return;
    moveTo(pctFromEvent(e));
  });
  scr.addEventListener('pointerup', () => { dragging = false; });
  scr.addEventListener('pointercancel', () => { dragging = false; });

  // Klik op de achtergrond (niet op balk of scrubber) verplaatst scrubber
  body.addEventListener('click', e => {
    if (e.target.closest('.exp-scrubber') || e.target.closest('.exp-bar')) return;
    moveTo(pctFromEvent(e));
  });

  // API: showExpDetail roept dit aan na directe balkclick
  window._moveScrubberToJob = function(jobId) {
    if (dragging) return;
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    const centerPct = (maxYr - (job.range.start + job.range.end) / 2) / range * 100;
    moveTo(centerPct, true);
  };

  // Startpositie: heden
  const initPct = (maxYr - nowYr) / range * 100;
  scr.style.left = initPct + '%';
}
function buildEducation() {
  const container = document.getElementById('education-timeline');
  if (!container) return;

  const MONTHS = {
    januari:1,februari:2,maart:3,april:4,mei:5,juni:6,
    juli:7,augustus:8,september:9,oktober:10,november:11,december:12
  };
  function toYr(str) {
    if (!str) return null;
    str = str.trim().toLowerCase();
    const mMatch = str.match(/([a-z]+)\s+(\d{4})/);
    if (mMatch && MONTHS[mMatch[1]]) return parseInt(mMatch[2], 10) + (MONTHS[mMatch[1]] - 1) / 12;
    const yMatch = str.match(/(\d{4})/);
    return yMatch ? parseInt(yMatch[1], 10) : null;
  }
  function parseRange(period) {
    const parts = period.split(/\s*[-\u2013]\s*(?=(?:[a-z]+\s+)?(?:\d{4}|heden))/i);
    if (parts.length >= 2) {
      const s = toYr(parts[0]), e = toYr(parts[parts.length - 1]);
      if (s !== null && e !== null) return { start: s, end: e };
    }
    const s = toYr(period);
    return { start: s ?? 2012, end: (s ?? 2012) + 0.75 };
  }

  // Categorieën voor kleur
  function catClass(degree) {
    const d = degree.toLowerCase();
    if (d.includes('master'))  return 'edu--master';
    if (d.includes('bachelor')) return 'edu--bachelor';
    if (d.includes('mbo') || d.includes('pdl')) return 'edu--mbo';
    if (d.includes('cursus') || d.includes('training') || d.includes('spreken')) return 'edu--training';
    return 'edu--hbo';
  }

  const edu = cvData.education.map((e, i) => ({
    ...e, id: i, range: parseRange(e.period), cc: catClass(e.degree)
  }));

  const MIN_YR = 2011.8;
  const MAX_YR = 2023.5;
  const RANGE  = MAX_YR - MIN_YR;
  const ROW_H  = 64;
  const ROW_GAP = 10;

  // Rij-toewijzing op chronologische volgorde
  const sorted = [...edu].sort((a, b) => a.range.start - b.range.start);
  const rowEnds = [];
  sorted.forEach(e => {
    let r = 0;
    while (r < rowEnds.length && rowEnds[r] > e.range.start + 0.05) r++;
    e.row = r;
    rowEnds[r] = e.range.end;
  });

  const numRows = rowEnds.length;
  const bodyH = numRows * ROW_H + (numRows - 1) * ROW_GAP;

  const years = [];
  for (let y = Math.ceil(MIN_YR); y <= Math.floor(MAX_YR); y++) years.push(y);

  // Omgekeerde as: recent = links
  const axisTicks = years.map(y => {
    const pct = ((MAX_YR - y) / RANGE * 100).toFixed(3);
    return `<span class="exp-gantt-year" style="left:${pct}%">${y}</span>`;
  }).join('');
  const gridLines = years.map(y => {
    const pct = ((MAX_YR - y) / RANGE * 100).toFixed(3);
    return `<div class="exp-gantt-gridline" style="left:${pct}%"></div>`;
  }).join('');

  const bars = edu.map((e, idx) => {
    const l = ((MAX_YR - e.range.end)   / RANGE * 100).toFixed(3);
    const w = ((e.range.end - e.range.start) / RANGE * 100).toFixed(3);
    const t = (e.row * (ROW_H + ROW_GAP)).toFixed(0);
    const dur = (() => {
      const mo = Math.round((e.range.end - e.range.start) * 12);
      const y = Math.floor(mo / 12), m = mo % 12;
      if (y === 0) return `${m} mnd`;
      if (m === 0) return `${y} jr`;
      return `${y} jr ${m} mnd`;
    })();
    return `
      <div class="exp-bar edu-bar ${e.cc}${idx === 0 ? ' active' : ''}"
           style="left:${l}%;width:${w}%;top:${t}px;height:${ROW_H}px"
           data-edu-id="${e.id}"
           onclick="showEduDetail(${e.id})"
           role="button" tabindex="0"
           onkeypress="if(event.key==='Enter')showEduDetail(${e.id})"
           title="${e.degree}">
        <div class="exp-bar-role">${escHtml(e.degree.split('|')[0].trim())}</div>
        <div class="exp-bar-company">${escHtml(e.school)}</div>
        <div class="exp-bar-dur">${escHtml(dur)}</div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="exp-gantt">
      <div class="exp-gantt-axis">${axisTicks}</div>
      <div class="exp-gantt-body" style="height:${bodyH}px">
        ${gridLines}${bars}
      </div>
    </div>`;

  // Scrubber voor opleiding
  const eduBody = container.querySelector('.exp-gantt-body');
  initEduScrubber(eduBody, edu, MIN_YR, MAX_YR, RANGE);

  if (edu.length > 0) showEduDetail(0);

  // Print-lijst (verborgen op scherm, zichtbaar bij afdrukken)
  const printEduList = document.getElementById('edu-print-list');
  if (printEduList) {
    printEduList.innerHTML = cvData.education.map(e => `
      <div class="print-cv-item">
        <div class="print-cv-header">
          ${e.logo ? `<img src="${e.logo}" class="print-cv-logo" alt="">` : ''}
          <div class="print-cv-title">${escHtml(e.degree)}</div>
        </div>
        <div class="print-cv-meta">${escHtml(e.school)} &nbsp;&middot;&nbsp; ${escHtml(e.period)}</div>
        <p class="print-cv-summary">${escHtml(e.description)}</p>
      </div>`).join('');
  }

  // Diploma-badges onderaan opleiding
  const diplomaWrap = document.getElementById('edu-diplomas');
  if (diplomaWrap) {
    diplomaWrap.innerHTML = '<h3 class="edu-diplomas-title">Diploma\'s &amp; Certificaten</h3>' +
      cvData.certificates.map(c => `
        <div class="edu-diploma-badge">
          <span class="edu-diploma-icon">${c.icon}</span>
          <div class="edu-diploma-info">
            <div class="edu-diploma-name">${escHtml(c.name)}</div>
            <div class="edu-diploma-issuer">${escHtml(c.issuer)} &middot; ${escHtml(c.year)}</div>
          </div>
        </div>`).join('');
  }
}

function initEduScrubber(body, items, minYr, maxYr, range) {
  const scr = document.createElement('div');
  scr.className = 'exp-scrubber edu-scrubber exp-scrubber--hint';
  scr.setAttribute('role', 'slider');
  scr.setAttribute('aria-label', 'Tijdlijn schuifregelaar — sleep om periode te selecteren');
  scr.innerHTML = `
    <div class="exp-scrubber-head">
      <span class="exp-scrubber-badge">2023</span>
      <span class="exp-scrubber-tip"></span>
    </div>`;
  body.appendChild(scr);

  let dragging = false;

  function pctFromEvent(e) {
    const rect = body.getBoundingClientRect();
    return (e.clientX - rect.left) / rect.width * 100;
  }

  function moveTo(newPct, fromBarClick) {
    newPct = Math.max(0, Math.min(100, newPct));
    scr.style.left = newPct + '%';
    const yr = maxYr - (newPct / 100) * range;
    scr.querySelector('.exp-scrubber-badge').textContent = Math.round(yr).toString();
    if (fromBarClick) return;
    let best = null;
    items.forEach(item => {
      const l = (maxYr - item.range.end)   / range * 100;
      const r = (maxYr - item.range.start) / range * 100;
      if (newPct >= l - 0.3 && newPct <= r + 0.3) {
        if (!best || item.row < best.row) best = item;
      }
    });
    if (best) {
      window._eduScrubberMoving = true;
      showEduDetail(best.id);
      window._eduScrubberMoving = false;
    }
  }

  scr.addEventListener('pointerdown', e => {
    dragging = true;
    scr.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  scr.addEventListener('pointermove', e => { if (dragging) moveTo(pctFromEvent(e)); });
  scr.addEventListener('pointerup',     () => { dragging = false; });
  scr.addEventListener('pointercancel', () => { dragging = false; });

  body.addEventListener('click', e => {
    if (e.target.closest('.exp-scrubber') || e.target.closest('.exp-bar')) return;
    moveTo(pctFromEvent(e));
  });

  window._moveScrubberToEdu = function(id) {
    if (dragging) return;
    const item = items.find(i => i.id === id);
    if (!item) return;
    const centerPct = (maxYr - (item.range.start + item.range.end) / 2) / range * 100;
    moveTo(centerPct, true);
  };

  // Startpositie: meest recent (links)
  scr.style.left = '0%';
}

function showEduDetail(id) {
  const edu = cvData.education[id];
  const panel = document.getElementById('edu-detail-panel');
  if (!edu || !panel) return;

  document.querySelectorAll('.edu-bar').forEach(n =>
    n.classList.toggle('active', parseInt(n.dataset.eduId) === id)
  );

  panel.classList.remove('edu-visible');
  void panel.offsetWidth;
  panel.innerHTML = `
    <div class="exp-detail-inner">
      <div class="exp-detail-header">
        <div class="exp-detail-header-left">
          ${edu.logo ? `<img src="${edu.logo}" class="exp-detail-logo" alt="${escHtml(edu.school)} logo">` : ''}
          <div class="exp-detail-role">${escHtml(edu.degree)}</div>
          <div class="exp-detail-meta">🏫 ${escHtml(edu.school)}</div>
        </div>
        <div class="exp-detail-header-right">
          <span class="exp-period-badge">${escHtml(edu.period)}</span>
        </div>
      </div>
      <p class="exp-detail-summary" style="grid-column:1/-1">${escHtml(edu.description)}</p>
    </div>`;
  panel.classList.add('edu-visible');

  if (typeof window._moveScrubberToEdu === 'function' && !window._eduScrubberMoving) {
    window._moveScrubberToEdu(id);
  }
}

/* ---- Skills ---- */
function buildSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  grid.innerHTML = cvData.skills.map(cat => `
    <div class="skill-category">
      <div class="skill-category-title">${escHtml(cat.category)}</div>
      ${cat.items.map(skill => {
        const dots = skill.score ?? Math.round(skill.level / 20); // 1-5
        const dotsHtml = Array.from({length: 5}, (_, i) =>
          `<span class="skill-dot${i < dots ? ' skill-dot--filled' : ''}"></span>`
        ).join('');
        return `
        <div class="skill-item">
          <div class="skill-info">
            <span class="skill-name">${escHtml(skill.name)}</span>
            <span class="skill-dots">${dotsHtml}</span>
          </div>
        </div>`;
      }).join('')}
    </div>
  `).join('');
}

/* ---- Projects ---- */
function buildProjects() {
  const wrap = document.getElementById('clients-cards');
  if (!wrap) return;

  const rows = [
    {
      jaar: '2024–2025',
      onderwijs: ['CPOW','International School of Amsterdam','Lentiz','Lorentz Casimir Lyceum','Porteum','ROC Nova College','SCVOA','Stichting Lucas','Universiteit voor Humanistiek'],
      overheid:  ['Fryske Marren','Gemeente Heerlen','Omgevingsdienst ODRU','SWB Midden Twente'],
    },
    {
      jaar: '2025–2026',
      onderwijs: ['Albeda','NTI','Sarkon','Universiteit Twente'],
      overheid:  ['Delft Imaging Systems','DUO+','Gemeente Ede','Gemeente Rhenen','NRG Pallas','Nunspeet','Veiligheidsregio Midden West-Brabant'],
    },
    {
      jaar: '2026–2027',
      onderwijs: ['iRiS','SOL Ambacht','SURF'],
      overheid:  ['Bunschoten','Gemeente Houten','Gemeente Oss','Lansingerland','Merces','OD Veluwe','Regio Rivierenland','Valkenburg','Voerendaal'],
    },
  ];

  wrap.innerHTML = rows.map(r => `
    <div class="client-card">
      <div class="client-card-year">${escHtml(r.jaar)}</div>
      <div class="client-card-cols">
        <div class="client-col client-col--edu">
          <div class="client-col-label">🏫 Onderwijs</div>
          <div class="client-col-tags">
            ${r.onderwijs.map(n => `<span class="client-tag client-tag--edu">${escHtml(n)}</span>`).join('')}
          </div>
        </div>
        <div class="client-col client-col--gov">
          <div class="client-col-label">🏛️ Overheid / Publiek</div>
          <div class="client-col-tags">
            ${r.overheid.map(n => `<span class="client-tag client-tag--gov">${escHtml(n)}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ---- Certificates ---- */
function buildCertificates() {
  const grid = document.getElementById('certificates-grid');
  if (!grid) return;
  grid.innerHTML = cvData.certificates.map(cert => `
    <div class="certificate-badge">
      <span class="cert-icon">${cert.icon}</span>
      <div class="cert-name">${escHtml(cert.name)}</div>
      <div class="cert-issuer">${escHtml(cert.issuer)}</div>
      <span class="cert-year">${escHtml(cert.year)}</span>
    </div>
  `).join('');
}

/* ---- Hobbies ---- */
function buildHobbies() {
  const grid = document.getElementById('hobbies-grid');
  if (!grid) return;
  grid.innerHTML = cvData.hobbies.map((h, i) => `
    <div class="hobby-item${(h.photo || h.video) ? ' hobby-item--clickable' : ''}" data-hobby-idx="${i}"
         role="${(h.photo || h.video) ? 'button' : 'listitem'}" tabindex="${(h.photo || h.video) ? '0' : '-1'}">
      <span class="hobby-icon">${h.icon}</span>
      <div class="hobby-item-text">
        <span class="hobby-name">${escHtml(h.name)}</span>
        ${(h.photo || h.video) ? `<span class="hobby-item-hint">${h.video ? 'Klik voor video' : 'Klik voor foto'}</span>` : ''}
      </div>
    </div>
  `).join('');

  const photoBox      = document.getElementById('hobby-photo-box');
  const placeholder   = document.getElementById('hobby-photo-placeholder');
  const photoImg      = document.getElementById('hobby-photo-img');
  const photoVideo    = document.getElementById('hobby-photo-video');
  const photoCaption  = document.getElementById('hobby-photo-caption');

  function selectHobby(item) {
    const h = cvData.hobbies[parseInt(item.dataset.hobbyIdx)];
    if (!h || (!h.photo && !h.video)) return;
    grid.querySelectorAll('.hobby-item').forEach(el => el.classList.remove('active'));
    item.classList.add('active');
    if (h.video) {
      photoImg.hidden = true;
      photoImg.src = '';
      if (photoVideo.src !== h.video) photoVideo.src = h.video;
      photoVideo.hidden = false;
    } else {
      photoVideo.pause();
      photoVideo.removeAttribute('src');
      photoVideo.load();
      photoVideo.hidden = true;
      photoImg.src = h.photo;
      photoImg.alt = h.name;
      photoImg.hidden = false;
    }
    photoCaption.textContent = h.funfact || h.caption || '';
    if (placeholder) placeholder.hidden = true;
    photoBox.hidden = false;
  }

  grid.addEventListener('click', e => {
    const item = e.target.closest('[data-hobby-idx]');
    if (item) selectHobby(item);
  });

  // Selecteer direct de eerste hobby
  const firstItem = grid.querySelector('[data-hobby-idx]');
  if (firstItem) selectHobby(firstItem);
}

/* ---- References ---- */
function buildReferences() {
  const grid = document.getElementById('references-grid');
  if (!grid) return;
  grid.innerHTML = cvData.references.map(ref => `
    <div class="reference-card" onclick="toggleReference(this)"
         role="button" tabindex="0"
         onkeypress="if(event.key==='Enter')toggleReference(this)"
         aria-label="Klik om referentie te onthullen">
      <div class="reference-reveal-label">
        🔒&nbsp; Klik om te onthullen
        <span>Privacybescherming actief</span>
      </div>
      <div class="reference-blur">
        <div class="reference-name">${escHtml(ref.name)}</div>
        <div class="reference-role">${escHtml(ref.role)}</div>
        <div class="reference-company">${escHtml(ref.company)}</div>
        <div class="reference-relation">${escHtml(ref.relation)}</div>
      </div>
    </div>
  `).join('');
}

/* ---- Contact ---- */
function buildContact() {
  const grid = document.getElementById('contact-grid');
  if (!grid) return;
  const p = cvData.personal;
  const items = [
    p.email    ? { icon: '✉️', label: p.email,    href: `mailto:${p.email}`              } : null,
    p.phone    ? { icon: '📞', label: p.phone,    href: `tel:${p.phone.replace(/\s/g,'')}` } : null,
    p.location ? { icon: '📍', label: p.location, href: null                               } : null,
    p.linkedin ? { icon: '💼', label: 'LinkedIn', href: `https://${p.linkedin}`            } : null,
  ].filter(Boolean);

  grid.innerHTML = items.map(c => {
    const inner = `<span class="contact-icon">${c.icon}</span><span>${escHtml(c.label)}</span>`;
    return c.href
      ? `<a href="${c.href}" target="_blank" rel="noopener noreferrer" class="contact-item">${inner}</a>`
      : `<div class="contact-item">${inner}</div>`;
  }).join('');
}

/* ============================================================
   PARTICLE SYSTEM
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const PARTICLE_COUNT = 65;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = [
    'rgba(0, 95, 170, 0.55)',   /* AFAS blauw */
    'rgba(0, 116, 208, 0.5)',   /* AFAS lichtblauw */
    'rgba(245, 159, 57, 0.4)',  /* AFAS oranje */
  ];

  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:     Math.random() * window.innerWidth,
    y:     Math.random() * window.innerHeight,
    vx:    (Math.random() - 0.5) * 0.38,
    vy:    (Math.random() - 0.5) * 0.38,
    size:  Math.random() * 1.4 + 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 115) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 95, 170, ${0.055 * (1 - dist / 115)})`;
          ctx.lineWidth   = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Dots
    particles.forEach(pt => {
      pt.x += pt.vx;
      pt.y += pt.vy;
      if (pt.x < 0) pt.x = canvas.width;
      if (pt.x > canvas.width)  pt.x = 0;
      if (pt.y < 0) pt.y = canvas.height;
      if (pt.y > canvas.height) pt.y = 0;

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fillStyle = pt.color;
      ctx.fill();
    });

    requestAnimationFrame(frame);
  }

  frame();
}

/* ============================================================
   TYPEWRITER EFFECT
   ============================================================ */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const texts    = (cvData.typewriterTexts && cvData.typewriterTexts.length)
                    ? cvData.typewriterTexts
                    : ['Consultant HRM & Payroll'];
  let textIndex  = 0;
  let charIndex  = 0;
  let deleting   = false;
  let delay      = 100;

  function tick() {
    const current = texts[textIndex];
    if (deleting) {
      charIndex--;
      el.textContent = current.substring(0, charIndex);
      delay = 48;
    } else {
      charIndex++;
      el.textContent = current.substring(0, charIndex);
      delay = 100;
    }

    if (!deleting && charIndex === current.length) {
      delay    = 2200;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting   = false;
      textIndex  = (textIndex + 1) % texts.length;
      delay      = 380;
    }

    setTimeout(tick, delay);
  }

  setTimeout(tick, 1600);
}

/* ============================================================
   NAVBAR — scroll class + active links + mobile menu
   ============================================================ */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const backdrop  = document.getElementById('nav-backdrop');
  const sections  = document.querySelectorAll('section[id]');
  const allLinks  = document.querySelectorAll('.nav-links a');

  // Verberg sidebar op hero én dashboard, toon daarna
  const hero      = document.getElementById('home');
  const dashboard = document.getElementById('dashboard');
  function updateNav(inHero, inDash) {
    const hide = inHero || inDash;
    navbar.classList.toggle('nav-hidden', hide);
    document.body.classList.toggle('hero-active', hide);
  }
  let heroVisible = false, dashVisible = false;
  if (hero && navbar) {
    new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      updateNav(heroVisible, dashVisible);
    }, { threshold: 0.15 }).observe(hero);
  }
  if (dashboard && navbar) {
    new IntersectionObserver(entries => {
      dashVisible = entries[0].isIntersecting;
      updateNav(heroVisible, dashVisible);
    }, { threshold: 0.15 }).observe(dashboard);
  }

  // Scroll events — active section highlight
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.getAttribute('id');
    });
    allLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  // Hamburger — opent/sluit sidebar op mobiel
  function closeSidebar() {
    navbar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('visible');
    hamburger.textContent = '☰';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = navbar.classList.toggle('open');
      if (backdrop) backdrop.classList.toggle('visible', open);
      hamburger.textContent = open ? '✕' : '☰';
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  // Sluit sidebar na klik op link (mobiel)
  allLinks.forEach(a => a.addEventListener('click', closeSidebar));
}

/* ============================================================
   INTERSECTION OBSERVER — scroll reveal + skill bars + counters
   ============================================================ */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.section-title, .timeline-item, .exp-item, .skill-category, .project-card, ' +
    '.certificate-badge, .hobby-item, .stat-card, .about-text, .stats-grid, .contact-item, ' +
    '.dashboard-tile, .dashboard-intro'
  );

  let countersTriggered = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');

      // Counters — trigger once when stats-grid enters view
      if (entry.target.classList.contains('stats-grid') && !countersTriggered) {
        countersTriggered = true;
        animateCounters();
      }

      // Skill dots — geen animatie nodig
      if (entry.target.classList.contains('skill-category')) {
        // dots zijn statisch, niets te doen
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  targets.forEach(t => observer.observe(t));
}

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target  = parseInt(el.dataset.target, 10);
    const suffix  = el.dataset.suffix || '';
    let   current = 0;
    const step    = target / 55;
    const timer   = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + suffix;
    }, 22);
  });
}

/* ============================================================
   TIMELINE EXPAND / COLLAPSE
   ============================================================ */
function toggleTimeline(card) {
  const details = card.querySelector('.timeline-details');
  if (!details) return;

  const opening = !details.classList.contains('open');

  // Close all open items first
  document.querySelectorAll('.timeline-details.open').forEach(d => {
    d.classList.remove('open');
    d.setAttribute('aria-hidden', 'true');
    d.closest('.timeline-card').classList.remove('expanded');
    d.closest('.timeline-card').setAttribute('aria-expanded', 'false');
  });

  if (opening) {
    details.classList.add('open');
    details.setAttribute('aria-hidden', 'false');
    card.classList.add('expanded');
    card.setAttribute('aria-expanded', 'true');
  }
}

/* ============================================================
   PROJECT MODAL
   ============================================================ */
function openProjectModal(id) {
  const project = cvData.projects.find(p => p.id === id);
  if (!project) return;

  const content = document.getElementById('modal-content');
  if (!content) return;

  content.innerHTML = `
    <div style="margin-bottom:.6rem;">
      <span style="font-size:.78rem;font-family:var(--font-mono);color:var(--color-cyan);
                   text-transform:uppercase;letter-spacing:.1em;">
        ${escHtml(project.category)} &nbsp;·&nbsp; ${escHtml(project.period)}
      </span>
    </div>
    <h2 style="font-size:1.35rem;font-weight:900;margin-bottom:.3rem;line-height:1.25;">${escHtml(project.name)}</h2>
    <p style="color:var(--color-muted);font-size:.85rem;margin-bottom:1.5rem;">
      Klant: ${escHtml(project.client)}
    </p>
    <p style="color:rgba(240,240,240,.82);line-height:1.82;font-size:.93rem;margin-bottom:1.6rem;">${escHtml(project.details)}</p>
    <div style="display:flex;flex-wrap:wrap;gap:.45rem;">
      ${project.tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('')}
    </div>
  `;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay)  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ============================================================
   REFERENCE REVEAL
   ============================================================ */
function toggleReference(card) {
  const opening = !card.classList.contains('revealed');
  card.classList.toggle('revealed', opening);
  card.setAttribute('aria-label', opening ? 'Referentie zichtbaar — klik om te verbergen' : 'Klik om referentie te onthullen');
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 420);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   PRINT BUTTONS
   ============================================================ */
function initPrintButtons() {
  document.querySelectorAll('.btn-print').forEach(btn => {
    btn.addEventListener('click', () => window.print());
  });
}

/* ============================================================
   UTILITIES
   ============================================================ */
function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? `${parseInt(m[1],16)}, ${parseInt(m[2],16)}, ${parseInt(m[3],16)}` : '0, 245, 255';
}

/** Minimal HTML escaping to prevent XSS from data.js values. */
function escHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ============================================================
   ASK MARIEN — CV Chatbot (keyword matching op CV-data)
   ============================================================ */
function initAskMarien() {
  const input    = document.getElementById('ask-input');
  const btn      = document.getElementById('ask-btn');
  const chatWin  = document.getElementById('chat-window');
  const chatMsgs = document.getElementById('chat-messages');
  const followup = document.getElementById('chat-followup');
  const sendBtn  = document.getElementById('chat-send');
  const closeBtn    = document.getElementById('chat-close');
  const minimizeBtn = document.getElementById('chat-minimize');
  if (!input || !btn || !chatWin || !chatMsgs) return;

  function addMessage(text, type, result) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg--' + type + (result && result.blocked ? ' chat-msg--blocked' : '');
    msg.innerHTML = `<div class="chat-msg-bubble">${escHtml(text)}</div>`;
    if (result && result.section && !result.blocked) {
      const goBtn = document.createElement('button');
      goBtn.className = 'chat-goto';
      goBtn.textContent = result.sectionLabel + ' bekijken →';
      goBtn.addEventListener('click', () => {
        document.getElementById(result.section)
          .scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      msg.appendChild(goBtn);
    }
    chatMsgs.appendChild(msg);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }

  function openChat() {
    chatWin.hidden = false;
    chatWin.classList.remove('chat-window--minimized');
    if (followup) followup.focus();
  }

  function ask(raw) {
    const q = raw.trim();
    if (!q) return;
    openChat();
    addMessage(q, 'user');
    const result = matchQuestion(q.toLowerCase());
    setTimeout(() => {
      addMessage(result.text, 'bot', result);
      if (result.section && !result.blocked) {
        setTimeout(() => {
          document.getElementById(result.section)
            .scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 800);
      }
    }, 280);
    // reset invoerveld
    if (document.getElementById('ask-input') === document.activeElement ||
        raw === input.value) input.value = '';
    if (followup) {
      followup.value = '';
      followup.placeholder = 'Vervolgvraag stellen…';
    }
  }

  // Hero-balk
  btn.addEventListener('click', () => ask(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') ask(input.value); });

  // Vervolgvragen in chatvenster
  if (sendBtn) sendBtn.addEventListener('click', () => ask(followup.value));
  if (followup) followup.addEventListener('keydown', e => { if (e.key === 'Enter') ask(followup.value); });

  // Minimaliseer knop
  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
      chatWin.classList.toggle('chat-window--minimized');
    });
  }
  // Klik op header-zone herstelt geminimaliseerd venster
  chatWin.querySelector('.chat-header').addEventListener('click', e => {
    if (chatWin.classList.contains('chat-window--minimized') &&
        e.target.closest('.chat-minimize, .chat-close') === null) {
      chatWin.classList.remove('chat-window--minimized');
      if (followup) followup.focus();
    }
  });

  // Sluit knop
  if (closeBtn) closeBtn.addEventListener('click', () => { chatWin.hidden = true; });

  // Standaard ingeklapt tonen
  chatWin.hidden = false;
  chatWin.classList.add('chat-window--minimized');
}

function matchQuestion(q) {
  const p    = cvData.personal;
  const exps = cvData.experience;
  const edus = cvData.education;
  const skls = cvData.skills;

  function has(...words) { return words.some(w => q.includes(w)); }

  // ── KWALITEITEN / FEEDBACK ANDEREN ─────────────────────
  if (has('kwaliteit', 'sterkste punt', 'sterk punt', 'anderen zeggen', 'collega',
          'feedback', 'wat zeggen', 'hoe omschrijven', 'omschrijven', 'sterke kant',
          'eigenschap', 'kracht', 'onderscheid')) {
    const cl = cvData.coverLetter;
    return {
      text: cl
        ? cl.colleaguesFeedback + ' Sterkste punten: ' + cl.strengths.slice(0, 3).join('; ') + '.'
        : 'Collega\'s omschrijven mij als rustig, overtuigend en communicatief sterk.',
      section: 'about', sectionLabel: 'Over mij',
    };
  }

  // ── AMBITIE ─────────────────────────────────────────────
  if (has('ambitie', 'droom', 'toekomst', 'volgende stap', 'groei', 'doorgroeien', 'wil worden')) {
    return {
      text: 'Ik wil doorgroeien naar projectleider — regisseur van verandering zijn tussen consultancy, productontwikkeling en klant.',
      section: 'about', sectionLabel: 'Over mij',
    };
  }

  // ── PROJECTLEIDER ───────────────────────────────────────
  if (has('projectleid', 'projectmanag', 'projectrol', 'projectverantwoordelijk',
          'leidinggeven', 'regisseur', 'projectbegeleiding', 'pl ')) {
    return {
      text: 'Ik maak de overstap al in de praktijk: complexe implementaties met fusies en meertalige teams, escalaties opgelost met relatie intact. Rustig, overtuigend, communicatief sterk.',
      section: 'experience', sectionLabel: 'Mijn werkervaring',
    };
  }

  // ── PERSOONLIJK ─────────────────────────────────────────
  if (has('getrouwd', 'partner', 'charlotte', 'vrouw', 'relatie',
          'oud', 'leeftijd', 'jaar', 'geboren', 'woon', 'zwolle', 'woont')) {
    return {
      text: '32 jaar, woonachtig in Zwolle, getrouwd met Charlotte. Consultant HRM & Payroll bij AFAS in het team Overheid & Onderwijs.',
      section: 'about', sectionLabel: 'Over mij',
    };
  }

  // ── WERKERVARING ────────────────────────────────────────
  if (has('werk', 'ervaring', 'functie', 'baan', 'job', 'afas', 'consultant',
          'trainee', 'heroes', 'kerksterk', 'team050', 'b&b', 'hoop',
          'overheid', 'onderwijs', 'hrm', 'payroll', 'implementat',
          'klant', 'aanbesteding', 'salarisadminist', 'loopbaan', 'carrière')) {
    const m = exps.find(e =>
      q.includes(e.company.toLowerCase()) ||
      e.role.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w))
    ) || exps[0];
    return {
      text: `${m.role} bij ${m.company} (${m.period}). ${m.summary}`,
      section: 'experience', sectionLabel: 'Mijn werkervaring',
    };
  }

  // ── OPLEIDING ───────────────────────────────────────────
  if (has('opleid', 'studie', 'school', 'universiteit', 'rug', 'groningen',
          'master', 'bachelor', 'psycholog', 'mbo', 'pdl', 'viaa',
          'diploma', 'afstuder', 'change management', 'scriptie', 'thesis', 'hbo')) {
    const m = edus.find(e =>
      q.includes(e.school.toLowerCase()) ||
      e.degree.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w))
    ) || edus[0];
    return {
      text: `${m.degree} — ${m.school} (${m.period}).`,
      section: 'education', sectionLabel: 'Mijn opleiding',
    };
  }

  // ── VAARDIGHEDEN ────────────────────────────────────────
  if (has('vaardigheid', 'skill', 'goed in', 'expertise', 'kennis', 'software',
          'scrum', 'agile', 'communicat', 'leiderschap', 'presentat', 'tool')) {
    return {
      text: `Specialisaties: ${skls.map(c => c.category).join(' · ')}.`,
      section: 'skills', sectionLabel: 'Mijn competenties',
    };
  }

  // ── PROJECTEN ───────────────────────────────────────────
  if (has('project', 'platform', 'app', 'website', 'arbeidsmarkt', 'portef', 'gebouwd', 'gerealiseerd')) {
    return {
      text: `40+ AFAS-implementaties bij overheid & onderwijs. Daarnaast: co-founder Heroes of Work en organisatieadvies via KerkSterk.`,
      section: 'projects', sectionLabel: 'Mijn projecten',
    };
  }

  // ── CERTIFICATEN ────────────────────────────────────────
  if (has('certif', 'cursus', 'training', 'badge', 'behaald', 'geloofwaardig', 'spreken')) {
    return {
      text: `Diploma's: ${cvData.certificates.map(c => c.name + ' (' + c.year + ')').join(', ')}.`,
      section: 'certificates', sectionLabel: 'Mijn certificaten',
    };
  }

  // ── HOBBY'S ─────────────────────────────────────────────
  if (has('hobby', 'vrij', 'passie', 'muziek', 'sport', 'gitaar', 'zingen', 'lezen', 'reizen', 'kook')) {
    return {
      text: `Buiten werk: ${cvData.hobbies.map(h => h.name).join(', ')}.`,
      section: 'hobbies', sectionLabel: "Mijn hobby's",
    };
  }

  // ── CONTACT ─────────────────────────────────────────────
  if (has('contact', 'email', 'telefoon', 'bellen', 'mail', 'bereikbaar', 'linkedin')) {
    return {
      text: `📧 ${p.email} · 📞 ${p.phone} · LinkedIn: ${p.linkedin}`,
      section: 'contact', sectionLabel: 'Contactgegevens',
    };
  }

  // ── OVER MIJ ────────────────────────────────────────────
  if (has('wie ben', 'wie is marien', 'over mij', 'jezelf', 'profiel', 'introduc',
          'vertel over', 'samenvatting', 'achtergrond')) {
    return {
      text: 'Consultant HRM & Payroll bij AFAS (Overheid & Onderwijs). Master Change Management + Bachelor Psychologie (RUG). 7+ jaar ervaring, 40+ projecten.',
      section: 'about', sectionLabel: 'Over mij',
    };
  }

  // ── REFERENTIES ─────────────────────────────────────────
  if (has('referentie', 'aanbeveling', 'zegt over', 'review', 'collega')) {
    return {
      text: 'Referenties beschikbaar op aanvraag — klik op de kaarten om ze te onthullen.',
      section: 'references', sectionLabel: 'Referenties',
    };
  }

  // ── BUITEN CV-SCOPE (ludiek blokkeren) ──────────────────
  const grappig = [
    'Dat staat niet in mijn CV. Vraag me iets over mijn werk of opleiding! 🤷',
    'Goede vraag — maar het antwoord heb ik niet. Probeer iets over mijn ervaring!',
    'Als consultant weet ik: een goed antwoord begint met goede data. Die data heb ik hier niet. 😄',
    'Hmm, dat weet ik niet. Stel een CV-vraag en ik help je verder!',
    'Buiten mijn scope. Vraag me iets wat wél in mijn CV staat!',
  ];
  const idx = q.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % grappig.length;
  return { text: grappig[idx], blocked: true };
}

/* ============================================================
   SOLLICITATIE OVERLAY
   ============================================================ */
function initSollicitatie() {
  const stage       = document.getElementById('soll-stage');
  const trigger     = document.getElementById('soll-trigger');
  const backBtn     = document.getElementById('soll-back');
  const introVideo  = document.getElementById('spider-intro');
  const centerLabel = document.getElementById('spider-center-label');
  const centerPoster= document.getElementById('spider-center-poster');
  const videoLink   = document.getElementById('soll-video-link');
  const spiderWrap  = document.getElementById('video-spider');
  const svgLines    = document.getElementById('spider-lines');
  const sats        = Array.from(document.querySelectorAll('.spider-sat'));

  if (!stage || !trigger) return;

  const watchedVideos = new Set();
  let outroLoaded = false;

  /* ── Toon outro-poster op center-video ── */
  function showOutroPoster() {
    if (centerPoster) { centerPoster.hidden = false; }
  }

  /* ── Wissel center-video naar outro ── */
  function switchToOutro() {
    if (outroLoaded || !introVideo) return;
    outroLoaded = true;
    introVideo.pause();
    introVideo.src = 'assets/Outro.mov';
    introVideo.classList.add('outro-active');
    introVideo.load();
    if (centerLabel) { centerLabel.textContent = 'Outro'; centerLabel.style.color = 'var(--color-green)'; }
    showOutroPoster();
  }

  /* ── Reset alles terug naar intro-staat ── */
  function resetSpider() {
    sats.forEach(s => {
      const v = s.querySelector('.spider-video');
      if (v) { v.pause(); v.currentTime = 0; }
      s.classList.remove('playing', 'watched');
    });
    watchedVideos.clear();
    outroLoaded = false;
    if (centerPoster) { centerPoster.hidden = true; }
    if (introVideo) {
      introVideo.pause();
      introVideo.src = 'assets/Intro.mov';
      introVideo.classList.remove('outro-active');
      introVideo.load();
    }
    if (centerLabel) { centerLabel.textContent = 'Intro'; centerLabel.style.color = ''; }
    if (svgLines) {
      svgLines.querySelectorAll('.spider-line').forEach(l => {
        l.classList.remove('active');
        l.style.stroke = '';
        l.style.strokeDasharray = '';
      });
    }
  }

  /* ── SVG verbindingslijnen tekenen ── */
  function drawLines() {
    if (!svgLines || !spiderWrap) return;
    svgLines.innerHTML = '';

    const wRect  = spiderWrap.getBoundingClientRect();
    const cx     = wRect.width / 2;
    const cy     = wRect.height / 2;

    sats.forEach((sat, i) => {
      const sRect  = sat.getBoundingClientRect();
      const sx     = sRect.left - wRect.left + sRect.width / 2;
      const sy     = sRect.top  - wRect.top  + sRect.height / 2;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', sx); line.setAttribute('y2', sy);
      line.classList.add('spider-line');
      line.dataset.lineIdx = i;
      svgLines.appendChild(line);
    });
  }

  /* ── Eén video tegelijk ── */
  function pauseAllExcept(keepSat) {
    // Pauzeer intro als het speelt (maar wissel nog niet naar outro)
    if (keepSat && introVideo && !introVideo.paused) introVideo.pause();

    sats.forEach(sat => {
      if (sat === keepSat) return;
      const v = sat.querySelector('.spider-video');
      if (v && !v.paused) v.pause();
      sat.classList.remove('playing');
    });
    // Update SVG lijnen
    if (svgLines) {
      svgLines.querySelectorAll('.spider-line').forEach((l, i) => {
        const sat = sats[i];
        l.classList.toggle('active', sat === keepSat);
      });
    }
  }

  /* ── Open overlay ── */
  function openStage(scrollToVideo) {
    stage.hidden = false;
    requestAnimationFrame(() => { stage.classList.add('active'); });
    document.body.style.overflow = 'hidden';
    if (scrollToVideo) {
      // Scroll naar video-paneel na transitie
      setTimeout(() => {
        const vs = document.getElementById('soll-video-section');
        if (vs) vs.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(drawLines, 400);
        // Start intro direct — wacht niet op IntersectionObserver
        if (introVideo) {
          introVideo.currentTime = 0;
          introVideo.play().catch(() => {});
        }
      }, 350);
      history.replaceState(null, '', '#visie');
    } else {
      stage.scrollTop = 0;
      setTimeout(drawLines, 120);
      history.replaceState(null, '', '#sollicitatie');
    }
  }

  /* ── Sluit overlay ── */
  function closeStage() {
    stage.classList.remove('active');
    document.body.style.overflow = '';
    history.replaceState(null, '', '#');
    resetSpider();
    if (svgLines) svgLines.innerHTML = '';
    stage.addEventListener('transitionend', () => {
      if (!stage.classList.contains('active')) stage.hidden = true;
    }, { once: true });
  }

  trigger.addEventListener('click', () => openStage(false));
  backBtn.addEventListener('click', closeStage);

  /* ── Nav-link Sollicitatie ── */
  const navSoll = document.getElementById('nav-sollicitatie');
  if (navSoll) {
    navSoll.addEventListener('click', e => {
      e.preventDefault();
      // Sluit mobiele sidebar indien open
      const sidebar = document.getElementById('navbar');
      if (sidebar) sidebar.classList.remove('open');
      const backdrop = document.getElementById('nav-backdrop');
      if (backdrop) backdrop.classList.remove('active');
      document.body.classList.remove('nav-open');
      openStage(false);
    });
  }

  /* ── Deep-link: open overlay direct op juiste paneel bij laden pagina ── */
  function checkDeepLink() {
    const hash = location.hash;
    if (hash === '#sollicitatie') { openStage(false); }
    else if (hash === '#visie')   { openStage(true); }
  }
  checkDeepLink();
  window.addEventListener('hashchange', checkDeepLink);

  /* ── Naar sollicitatiebrief knop (vanuit video-paneel) ── */
  const toLetterBtn = document.getElementById('soll-to-letter-btn');
  if (toLetterBtn) {
    toLetterBtn.addEventListener('click', () => {
      document.getElementById('soll-stage').scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Start intro wanneer video-paneel in beeld scrollt ── */
  const videoSection = document.getElementById('soll-video-section');
  if (videoSection && introVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && stage.classList.contains('active')) {
          introVideo.currentTime = 0;
          introVideo.play().catch(() => {});
          setTimeout(drawLines, 80);
        } else if (!entry.isIntersecting && stage.classList.contains('active')) {
          // Uit beeld: reset spider naar beginstaat
          resetSpider();
        }
      });
    }, { threshold: 0.25 });
    videoObserver.observe(videoSection);
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && stage.classList.contains('active')) closeStage();
  });
  window.addEventListener('resize', drawLines);

  /* ── Scroll naar video paneel ── */
  if (videoLink) {
    videoLink.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('soll-video-section')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#visie');
      setTimeout(drawLines, 600);
    });
  }

  /* ── Satelliet hover: play/pause + één tegelijk ── */
  sats.forEach(sat => {
    const video = sat.querySelector('.spider-video');
    if (!video) return;

    function startPlay() {
      pauseAllExcept(sat);
      sat.classList.add('playing');
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    function stopPlay() {
      if (!video.ended) { video.pause(); sat.classList.remove('playing'); }
      pauseAllExcept(null); // lijn uitschakelen
    }

    sat.addEventListener('mouseenter', startPlay);
    sat.addEventListener('mouseleave', stopPlay);
    sat.addEventListener('click', () => {
      if (video.paused) startPlay(); else stopPlay();
    });

    video.addEventListener('ended', () => {
      sat.classList.remove('playing');
      sat.classList.add('watched');
      markWatched(sat);
    });

    // Tel als 'gezien' na 0,5 seconden afspelen
    const satKey = sat.dataset.sat;
    video.addEventListener('timeupdate', function onTime() {
      if (video.currentTime >= 0.5) {
        video.removeEventListener('timeupdate', onTime);
        markWatched(sat);
      }
    });
  });

  function markWatched(sat) {
    if (watchedVideos.has(sat.dataset.sat)) return;
    sat.classList.add('watched');
    watchedVideos.add(sat.dataset.sat);
    if (svgLines) {
      const line = svgLines.querySelector(`[data-line-idx="${sats.indexOf(sat)}"]`);
      if (line) {
        line.classList.remove('active');
        line.style.stroke = 'rgba(60,198,88,.4)';
        line.style.strokeDasharray = 'none';
      }
    }
    checkAllWatched();
  }

  /* ── Alle 5 gezien → speel outro af (alleen als geen film speelt) ── */
  function checkAllWatched() {
    if (watchedVideos.size < 5 || !introVideo) return;

    // Wacht tot geen enkel satelliet-filmpje meer afspeelt
    const anyPlaying = sats.some(s => {
      const v = s.querySelector('.spider-video');
      return v && !v.paused;
    });
    if (anyPlaying) {
      // Probeer opnieuw zodra het actieve filmpje stopt
      const waiting = sats.find(s => {
        const v = s.querySelector('.spider-video');
        return v && !v.paused;
      });
      if (waiting) {
        const wv = waiting.querySelector('.spider-video');
        wv.addEventListener('pause', checkAllWatched, { once: true });
        wv.addEventListener('ended', checkAllWatched, { once: true });
      }
      return;
    }

    if (!outroLoaded) switchToOutro();
    // Verberg poster zodat outro direct zichtbaar is
    if (centerPoster) centerPoster.hidden = true;
    introVideo.currentTime = 0;
    const playPromise = introVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        introVideo.addEventListener('canplay', () => {
          introVideo.currentTime = 0;
          introVideo.play().catch(() => {});
        }, { once: true });
      });
    }
  }

  /* ── Center video: intro afgelopen → switch naar outro; hover op poster start outro ── */
  if (introVideo) {
    // Intro volledig afgespeeld → laad outro + toon poster
    introVideo.addEventListener('ended', () => {
      if (!outroLoaded) switchToOutro();
    });

    const spiderCenter = document.querySelector('.spider-center');

    if (centerPoster) {
      centerPoster.addEventListener('mouseenter', () => {
        if (outroLoaded) {
          introVideo.currentTime = 0;
          introVideo.play().catch(() => {});
        }
      });
    }

    // Muis verlaat het hele center-gebied → pauze
    if (spiderCenter) {
      spiderCenter.addEventListener('mouseleave', () => {
        if (outroLoaded && !introVideo.paused) {
          introVideo.pause();
          introVideo.currentTime = 0;
        }
      });
    }

    introVideo.addEventListener('click', () => {
      if (introVideo.paused) introVideo.play().catch(() => {});
      else introVideo.pause();
    });
  }
}
