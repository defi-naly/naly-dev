# anime.js v4 API Quick Reference

> Source: animejs.com/documentation — anime.js v4.0+

---

## Installation

```bash
npm install animejs
```

## Imports

```ts
// Main module (tree-shakeable)
import { animate, stagger, createTimeline, onScroll, splitText } from 'animejs';

// Subpath imports (smaller bundles)
import { animate } from 'animejs/animation';
import { createTimeline } from 'animejs/timeline';
import { createTimer } from 'animejs/timer';
import { createAnimatable } from 'animejs/animatable';
import { createDraggable } from 'animejs/draggable';
import { createScope } from 'animejs/scope';
import { createLayout } from 'animejs/layout';
import { engine } from 'animejs/engine';
import { onScroll } from 'animejs/events';
import { splitText } from 'animejs/text';

// Namespace imports
import * as utils from 'animejs/utils';
import * as easings from 'animejs/easings';
import * as svg from 'animejs/svg';
```

---

## animate()

Creates an animation on one or more targets.

```ts
const animation = animate(targets, parameters);
```

### Targets

- CSS selector string: `'.box'`, `'#hero'`, `'div.card'`
- DOM element: `document.querySelector('.box')`
- NodeList / Array of elements
- JavaScript object (animates its numeric properties)

### Animatable Properties

Any CSS property, CSS transform, CSS variable, object property, or HTML/SVG attribute:

```ts
animate('.box', {
  // Transforms (use camelCase)
  translateX: 100,          // or x shorthand in some contexts
  translateY: 50,
  rotate: '1turn',          // supports units: deg, turn, rad
  scale: 1.5,
  skewX: 15,

  // CSS properties
  opacity: [0, 1],          // [from, to] array syntax
  width: '200px',
  backgroundColor: '#ff0000',
  borderRadius: '50%',

  // CSS variables
  '--custom-prop': 100,
});
```

### Property Object Syntax

For per-property control, pass an object:

```ts
animate('.box', {
  translateX: { to: 200, duration: 1000, ease: 'outExpo' },
  rotate: { from: -180, to: 0, ease: 'outCirc' },
  opacity: { to: 1, duration: 500 },
});
```

Property-level parameters: `to`, `from`, `delay`, `duration`, `ease`, `modifier`, `composition`

### Playback Settings

| Parameter       | Type              | Default  | Description                                  |
| --------------- | ----------------- | -------- | -------------------------------------------- |
| `duration`      | `number`          | `1000`   | Duration in ms                               |
| `delay`         | `number`          | `0`      | Delay before start in ms                     |
| `ease`          | `string/function` | `'out'`  | Easing function (see Easings section)        |
| `loop`          | `number/boolean`  | `false`  | Number of repetitions (`true` = infinite)    |
| `loopDelay`     | `number`          | `0`      | Delay between loops in ms                    |
| `alternate`     | `boolean`         | `false`  | Reverse direction each loop                  |
| `reversed`      | `boolean`         | `false`  | Play animation backwards                     |
| `autoplay`      | `boolean/ScrollObserver` | `true` | Auto-start or bind to scroll          |
| `frameRate`     | `number`          | —        | Custom frame rate                            |
| `playbackRate`  | `number`          | `1`      | Speed multiplier                             |
| `playbackEase`  | `string`          | —        | Easing for playback rate changes             |

### Callbacks

```ts
animate('.box', {
  translateX: 200,
  onBegin:    (anim) => {},  // Animation starts (respects delay)
  onUpdate:   (anim) => {},  // Each tick
  onRender:   (anim) => {},  // Each render frame
  onLoop:     (anim) => {},  // Each loop iteration
  onComplete: (anim) => {},  // Animation finishes
});
```

### Promise

```ts
await animate('.box', { opacity: [0, 1], duration: 500 }).then(() => {
  console.log('done');
});
```

### Playback Controls (returned JSAnimation)

```ts
const anim = animate('.box', { translateX: 200 });

anim.play();       // Play forward
anim.pause();      // Pause
anim.reverse();    // Play backward
anim.restart();    // Reset and play
anim.seek(500);    // Jump to 500ms
anim.complete();   // Jump to end
anim.reset();      // Jump to start
anim.alternate();  // Toggle direction
anim.resume();     // Continue from pause in original direction
```

---

## stagger()

Distributes values across multiple targets.

```ts
import { stagger } from 'animejs';

// Time stagger (delay)
animate('.item', {
  translateY: [20, 0],
  delay: stagger(100),        // 0, 100, 200, 300...
});

// Value stagger
animate('.item', {
  scale: stagger([1, 0.5]),   // Range from 1 → 0.5 across elements
  rotate: stagger(45),        // 0, 45, 90, 135...
});
```

### Parameters

```ts
stagger(value, {
  start:    0,           // Offset for first value
  from:     'first',     // Origin: 'first' | 'last' | 'center' | number (index)
  reversed: false,       // Reverse stagger order
  ease:     'linear',    // Easing across distribution
  grid:     [cols, rows],// 2D grid stagger
  axis:     undefined,   // 'x' | 'y' (with grid)
  modifier: (val) => val,// Transform computed values
  total:    undefined,   // Override element count
});
```

### Common Patterns

```ts
// Stagger from center
delay: stagger(80, { from: 'center' })

// Grid stagger with axis
delay: stagger(50, { grid: [10, 10], from: 'center', axis: 'x' })

// Eased stagger distribution
delay: stagger(200, { ease: 'inOutQuad' })
```

---

## createTimeline()

Orchestrates sequenced animations.

```ts
import { createTimeline } from 'animejs';

const tl = createTimeline({
  defaults: { duration: 600, ease: 'outExpo' },
  loop: true,
  alternate: true,
  autoplay: true,
});
```

### .add()

```ts
// Add animation at default position (after previous)
tl.add(targets, parameters);

// Add at specific time position
tl.add(targets, parameters, timePosition);
```

### Time Positions

| Syntax         | Meaning                                          |
| -------------- | ------------------------------------------------ |
| `500`          | Absolute: starts at 500ms                        |
| `'+=200'`      | Relative: 200ms after previous ends              |
| `'-=300'`      | Relative: 300ms before previous ends (overlap)   |
| `'<'`          | Start of previous animation                      |
| `'>'`          | End of previous animation                        |
| `'<+=100'`     | 100ms after start of previous                    |
| `'<-=100'`     | 100ms before start of previous                   |
| `'myLabel'`    | At named label position                          |
| `'myLabel+=200'` | 200ms after label                              |

### .set()

Instantly set values (zero-duration):

```ts
tl.set('.box', { opacity: 0 });
```

### .label()

Create named time markers:

```ts
tl.label('intro')
  .add('.title', { opacity: [0, 1] })
  .add('.subtitle', { opacity: [0, 1] }, 'intro+=200');
```

### Playback Controls

Same as `animate()`: `.play()`, `.pause()`, `.reverse()`, `.restart()`, `.seek()`, `.complete()`, `.reset()`

---

## onScroll()

Scroll observer that triggers or syncs animations.

```ts
import { onScroll } from 'animejs';
```

### As autoplay Value

```ts
// Trigger animation on scroll into view
animate('.section', {
  opacity: [0, 1],
  translateY: [40, 0],
  duration: 800,
  ease: 'outExpo',
  autoplay: onScroll({
    target: '.section',   // Element to observe (defaults to animated target)
  }),
});
```

### Standalone

```ts
const observer = onScroll({
  target: '.section',
  container: window,       // Scroll container (default: window)
  axis: 'y',              // 'x' | 'y'
  repeat: true,           // Re-trigger on multiple scrolls
  debug: false,           // Show debug overlay
});
```

### Sync Modes

```ts
// Sync animation progress to scroll position
autoplay: onScroll({
  target: '.section',
  // sync: 'play',        // Trigger play method
  // sync: 'playback',    // Sync progress to scroll %
  // sync: { smooth: 5 }, // Smoothed scroll sync
  // sync: { ease: 'outExpo' }, // Eased scroll sync
})
```

### Callbacks

```ts
onScroll({
  target: '.section',
  onEnter:          (observer) => {},
  onEnterForward:   (observer) => {},
  onEnterBackward:  (observer) => {},
  onLeave:          (observer) => {},
  onLeaveForward:   (observer) => {},
  onLeaveBackward:  (observer) => {},
  onUpdate:         (observer) => {},
  onSyncComplete:   (observer) => {},
  onResize:         (observer) => {},
});
```

### Methods

```ts
observer.link(animation);  // Link to an animation
observer.refresh();        // Recalculate positions
observer.revert();         // Remove observer
```

---

## splitText()

Split text elements for character/word/line animation.

```ts
import { splitText } from 'animejs';

const { lines, words, chars } = splitText('.heading', {
  lines: true,
  words: true,
  chars: true,
});
```

### Parameters

```ts
splitText(target, {
  lines: true | { class: 'line', wrap: 'clip' },
  words: true | { class: 'word', wrap: 'clip' },
  chars: true | { class: 'char' },
  includeSpaces: false,   // Include whitespace chars
  accessible: true,       // Maintain screen reader access
  debug: false,           // Visual debug mode
});
```

`wrap: 'clip'` wraps each split element in a clipping container — essential for slide-up/down text reveals.

### Returns

Object with arrays: `{ lines: Element[], words: Element[], chars: Element[] }`

### Methods

```ts
const split = splitText('.heading', { chars: true });

split.addEffect(animation);  // Bind animation effect
split.revert();              // Restore original HTML
split.refresh();             // Re-split after DOM changes
```

### Common Text Animation

```ts
// Character reveal with clip
const { chars } = splitText('.heading', {
  chars: { wrap: 'clip' },
});

animate(chars, {
  translateY: ['100%', '0%'],
  opacity: [0, 1],
  delay: stagger(25),
  duration: 600,
  ease: 'outExpo',
});
```

---

## Easings

### Built-in Easing Strings

| Family      | In          | Out          | InOut          | OutIn          |
| ----------- | ----------- | ------------ | -------------- | -------------- |
| **Default** | `'in'`      | `'out'`      | `'inOut'`      | `'outIn'`      |
| **Quad**    | `'inQuad'`  | `'outQuad'`  | `'inOutQuad'`  | `'outInQuad'`  |
| **Cubic**   | `'inCubic'` | `'outCubic'` | `'inOutCubic'` | `'outInCubic'` |
| **Quart**   | `'inQuart'` | `'outQuart'` | `'inOutQuart'` | `'outInQuart'` |
| **Quint**   | `'inQuint'` | `'outQuint'` | `'inOutQuint'` | `'outInQuint'` |
| **Sine**    | `'inSine'`  | `'outSine'`  | `'inOutSine'`  | `'outInSine'`  |
| **Expo**    | `'inExpo'`  | `'outExpo'`  | `'inOutExpo'`  | `'outInExpo'`  |
| **Circ**    | `'inCirc'`  | `'outCirc'`  | `'inOutCirc'`  | `'outInCirc'`  |
| **Back**    | `'inBack'`  | `'outBack'`  | `'inOutBack'`  | `'outInBack'`  |
| **Bounce**  | `'inBounce'`| `'outBounce'`| `'inOutBounce'`| `'outInBounce'`|
| **Elastic** | `'inElastic'`|`'outElastic'`|`'inOutElastic'`|`'outInElastic'`|

**Linear:** `'linear'`

### Custom Easings

```ts
import { spring, cubicBezier } from 'animejs';

// Spring physics
ease: spring({ bounce: 0.35 })

// Cubic bezier
ease: cubicBezier(0.7, 0.1, 0.5, 0.9)

// Steps
ease: steps(5)
```

---

## createDraggable()

```ts
import { createDraggable } from 'animejs';

const draggable = createDraggable('.box', {
  // Snap, bounds, and physics parameters
});
```

---

## createScope()

Scoped animation cleanup for components.

```ts
import { createScope } from 'animejs';

const scope = createScope(containerElement, {
  mediaQueries: { mobile: '(max-width: 768px)' },
});

// All animations created within scope auto-cleanup on revert
scope.revert();
```

---

## Utility Functions

```ts
import * as utils from 'animejs/utils';

utils.random(min, max);       // Random number in range
utils.round(value, decimals); // Round to decimals
utils.clamp(val, min, max);   // Clamp value
utils.lerp(a, b, t);          // Linear interpolation
utils.mapRange(val, inMin, inMax, outMin, outMax);
utils.damp(current, target, smoothing, dt);
```

---

## SVG Utilities

```ts
import * as svg from 'animejs/svg';

svg.createMotionPath(pathElement);   // Follow SVG path
svg.createDrawable(svgElement);      // Stroke draw animation
svg.morphTo(fromShape, toShape);     // Shape morphing
```

---

## v3 → v4 Migration Cheat Sheet

| v3 Syntax                  | v4 Syntax                          |
| -------------------------- | ---------------------------------- |
| `anime({ targets, ... })` | `animate(targets, { ... })`        |
| `anime.timeline()`        | `createTimeline()`                 |
| `easing: 'easeOutExpo'`   | `ease: 'outExpo'`                  |
| `direction: 'alternate'`  | `alternate: true`                  |
| `direction: 'reverse'`    | `reversed: true`                   |
| `endDelay: 500`           | `loopDelay: 500`                   |
| `begin: () => {}`         | `onBegin: () => {}`                |
| `complete: () => {}`      | `onComplete: () => {}`             |
| `update: () => {}`        | `onUpdate: () => {}`               |
| `change: () => {}`        | `onRender: () => {}`               |
| `round: 10`               | `modifier: utils.round(10)`        |
| `anime.path()`            | `svg.createMotionPath()`           |
| `anime.setDashoffset()`   | `svg.createDrawable()`             |
