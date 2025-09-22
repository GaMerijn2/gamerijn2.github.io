document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.cardbuttons .button');
  const cards = document.querySelectorAll('.options .card');

  console.debug('[cards.js] Loaded');
  console.debug(`Found ${buttons.length} buttons and ${cards.length} cards.`);

  if (buttons.length === 0 || cards.length === 0) {
    console.warn('[cards.js] No buttons or cards found. Check class names or script order.');
    return;
  }

  buttons.forEach((button, idx) => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'), 10);

      if (isNaN(index)) {
        console.error(`[cards.js] Invalid index on button ${idx}`);
        return;
      }

      console.log(`[cards.js] Button ${index} clicked.`);

      cards.forEach((card, i) => {
        if (i === index) {
          console.log(`→ Activating card ${i}`);
          card.classList.add('activecard');
          card.classList.remove('inactivecard');
        } else {
          card.classList.remove('activecard');
          card.classList.add('inactivecard');
        }
      });
    });
  });
});
