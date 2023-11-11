window.utils.$document.ready(() => {
  const navBar = $('.navbar-raven'); // Targets nav element
  // Scroll operation
  const scrollHandler = () => {
    window.utils.$window.on('scroll', function scroller() {
      const scrollTop = $(this).scrollTop();
      if (scrollTop > 60) {
        navBar.addClass('shadow fixed-top');
      } else {
        navBar.removeClass('shadow fixed-top');
      }
    });
  };
  // take current width and operation
  const resizeHandler = (currentWindowWidth) => {
    if (currentWindowWidth > 995) {
      scrollHandler(currentWindowWidth);
      if ($(this).scrollTop() > 60) {
        navBar.addClass('shadow fixed-top');
      }
    } else {
      window.utils.$window.off('scroll');
      navBar.removeClass('shadow fixed-top');
    }
  };
  const currentWindowWidth = window.utils.$window.innerWidth();
  resizeHandler(currentWindowWidth);

  // operation after resize window
  window.utils.$window.on('resize', () => {
    const windowSize = window.utils.$window.width();
    resizeHandler(windowSize);
  }).trigger('scroll');
});
