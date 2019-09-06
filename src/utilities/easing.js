// eslint-disable-next-line no-restricted-properties
const { pow } = Math;

/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
const easing = {
  // no easing, no acceleration
  linear: t => t,
  // accelerating from zero velocity
  easeInQuad: t => pow(t, 2),
  // decelerating to zero velocity
  easeOutQuad: t => t * (2 - t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: t => (t < 0.5 ? 2 * pow(t, 2) : -1 + (4 - 2 * t) * t),
  // accelerating from zero velocity
  easeInCubic: t => pow(t, 3),
  // decelerating to zero velocity
  easeOutCubic: t => --t * pow(t, 2) + 1,
  // acceleration until halfway, then deceleration
  easeInOutCubic: t =>
    t < 0.5 ? 4 * pow(t, 3) : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // accelerating from zero velocity
  easeInQuart: t => pow(t, 4),
  // decelerating to zero velocity
  easeOutQuart: t => 1 - --t * pow(t, 3),
  // acceleration until halfway, then deceleration
  easeInOutQuart: t => (t < 0.5 ? 8 * pow(t, 4) : 1 - 8 * --t * pow(t, 3)),
  // accelerating from zero velocity
  easeInQuint: t => pow(t, 5),
  // decelerating to zero velocity
  easeOutQuint: t => 1 + --t * pow(t, 4),
  // acceleration until halfway, then deceleration
  easeInOutQuint: t => (t < 0.5 ? 16 * pow(t, 5) : 1 + 16 * --t * pow(t, 4)),
};

export default easing;
