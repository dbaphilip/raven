window.utils.$document.ready(() => {
  const backToTop = $('.bottom-to-top');
  window.utils.$window.on('scroll', () => {
    if (window.utils.$window.scrollTop() > 1600) {
      backToTop.slideDown('slow');
    } else {
      backToTop.slideUp('slow');
    }
  });
});
