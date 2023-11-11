/* eslint-disable */
'use strict';

import utils from './Utils';

/*-----------------------------------------------
|   Inertia
-----------------------------------------------*/
(function triggeringInertia($) {
  $.fn.inertia = function () {
    const element = this;
    let offset = element.offset().top;
    const winHeight = utils.$window.height();
    const controller = $.extend({ weight: 1, y: 0, ease: 'Expo.easeOut', duration: 2, delay: 0}, this.data('inertia'));
    controller.constant = controller.weight * 100 / winHeight;
    element.css({ transform: `translateY(${controller.y}px)` });
    const baseY = controller.y || 0;

    const inertia = (y) => {
      return window.TweenMax.to(element, controller.duration, {
        y: baseY + y, ease: controller.ease
      }).delay(controller.delay).pause()
    };
    const triggeringInertia = () => {
      controller.y = controller.constant * (offset -utils.$window.scrollTop());
      inertia(controller.y).play();
    };

    /*-----------------------------------------------
    |   Triggering inertia
    -----------------------------------------------*/
    triggeringInertia();
    utils.$window.on('scroll', () => {
      // Utils.isScrolledIntoView(element) && triggeringInertia();
      // console.debug(`${Utils.$window.height()} + ${Utils.$window.scrollTop()} = ${
      // Utils.$window.height() + Utils.$window.scrollTop()} [${offset}]`);
      if (offset <= utils.$window.height() + utils.$window.scrollTop()) triggeringInertia();
    });
  };
}(jQuery));

/*-----------------------------------------------
|   Initiate Inertia
-----------------------------------------------*/
utils.$document.ready(() => {
  // if (!Detector.isPuppeteer) {
  const elements = $('[data-inertia]');
  elements.each((index, element) => {
    $(element).inertia();
  });
  // }
});
