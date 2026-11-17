(() => {
  const practice = document.getElementById('practice');
  const frame = document.getElementById('quiz-frame');
  const title = document.getElementById('practice-title');
  const topicNames = {
    'PSMA Core': 'Petroleum (Safety Measures) Act',
    'Group 1: Petroleum & Gas Supply': 'Group 1 — Petroleum & Gas Supply',
    'Group 2: Environment & Pesticides': 'Group 2 — Environment & Pesticide',
    'Group 3: Uniform Building By-Laws': 'Group 3 — Uniform Building'
  };

  function selectTopic(filter) {
    practice.hidden = false;
    title.textContent = topicNames[filter] || 'Full quiz';

    const applyFilter = () => {
      try {
        const quizWindow = frame.contentWindow;
        const filterButton = [...quizWindow.document.querySelectorAll('.filter-btn')]
          .find(button => button.getAttribute('onclick')?.includes(`'${filter}'`));
        if (typeof quizWindow.setFilter === 'function' && filterButton) {
          quizWindow.setFilter(filter, filterButton);
        }
      } catch (error) {
        // If the quiz cannot be embedded, its standalone link remains available.
        console.warn('Could not apply the selected quiz filter.', error);
      }
    };

    if (frame.contentDocument?.readyState === 'complete') applyFilter();
    else frame.addEventListener('load', applyFilter, { once: true });
    practice.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('click', () => selectTopic(card.dataset.filter));
  });
})();
