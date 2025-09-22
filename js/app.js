(function initProjects() {
  const container = document.querySelector('.project-container');
  if (!container) return;

  const slides = Array.from(container.querySelectorAll('.project'));
  const left = container.querySelector('.arrow-left');
  const right = container.querySelector('.arrow-right');
  const dotsWrap = container.querySelector('.dots');

  let dots = [];
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      d.setAttribute('role', 'tab');
      dotsWrap.appendChild(d);
    });
    dots = Array.from(dotsWrap.querySelectorAll('.dot'));
  }

  let index = slides.findIndex(s => s.classList.contains('active'));
  if (index < 0) index = 0;

  function show(i) {
    slides.forEach((s, si) => s.classList.toggle('active', si === i));
    if (dots.length) dots.forEach((d, di) => d.classList.toggle('active', di === i));
    index = i;
  }

  function next() { show((index + 1) % slides.length); }
  function prev() { show((index - 1 + slides.length) % slides.length); }

  right?.addEventListener('click', () => {
    next();
    resetInterval();
  });

  left?.addEventListener('click', () => {
    prev();
    resetInterval();
  });

  dots.forEach((d, di) => {
    d.addEventListener('click', () => {
      show(di);
      resetInterval();
    });
  });

  // Auto-advance slides every 5 seconds
  let slideInterval = setInterval(next, 5000);

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(next, 5000);
  }

  // Modal logic
  const modal = document.getElementById('lighthouse');
  const modalImg = document.getElementById('lighthouse-img');
  const modalTitle = document.getElementById('lighthouse-title');
  const closeBtn = modal.querySelector('.close');

  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const src = slide.getAttribute('data-full');
      const title = slide.getAttribute('data-title') || '';
      modalImg.src = src;
      modalTitle.textContent = title;
      modal.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

  modal.addEventListener('click', e => {
    if (e.target.id === 'lighthouse') {
      modal.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.classList.add('hidden');
  });
})();
