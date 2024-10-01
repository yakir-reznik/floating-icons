# Floating Icons

An easy to use package to create an engaging animation effect with emojis or icons that float out and up from a specified target element on your webpage.

This effect is perfect for adding fun and interactive visual effects to your project.

![Demo gif](https://github.com/user-attachments/assets/3528e188-63af-4c75-b949-6f4f47873367 "Demo gif")

### Live demos

javascript / typescript: [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/edit/vitejs-vite-s5jhbb?file=index.html,src%2Fmain.ts)

React: [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/edit/vitejs-vite-8vcbsi?file=src%2FApp.tsx)

Vue 3: [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/edit/vitejs-vite-7ty7bc?file=src%2FApp.vue)

### Quick links

[Live demos](#live-demos)  
[Features](#features)  
[Installation](#installation)  
[Basic usage](#basic-usage)  
[Basic usage with React](#basic-usage-with-react)  
[Options](#options)  
[How to customize the behavior](#how-to-customize-the-behavior)  
[How to use with existing element or with fixed screen coordinates](#how-to-use-with-existing-element-or-with-fixed-screen-coordinates)  
[How to use with your own html content](#how-to-use-with-your-own-html-content)  
[Methods](#methods)

### Features

-   [x] Animate multiple icons or emojis or any other HTML elements with configurable properties.
-   [x] Control amount of elements, density, distance, delay, duration, size, and rotation of the elements.
-   [x] Randomized rendering based on defined probabilities.
-   [x] Support for various CSS units for position, speed and animation.
-   [x] Supports positioning on existing HTML elements or via specifiying fixed x & y values (like position:fixed)
-   [x] Framework agnostic - works with any typescript and plain javascript project. (React, Vue, Svelte, Solid, ...)
-   [x] Super performat animations using CSS animations.
-   [x] Less than 4kb when minified and Gzipped

### Installation

Simple installation via common package managers:

npm:

```bash
npm install floating-icons
```

pnpm:

```bash
pnpm install floating-icons
```

yarn:

```bash
yarn add floating-icons
```

Or install manually by copying the code from the [FloatingIcons.js](https://github.com/yakir-reznik/floating-icons/blob/master/dist/FloatingIcons.js) and pasting it to your project.

### Basic usage

HTML:

```html
<button id="#my-btn">Click me!</button>
```

Script:

```typescript
import useFloatingIcons from "floating-icons";

const myBtn = document.querySelector("#my-btn");
myBtn.addEventListener("click", () => {
  useFloatingIcons({
    target: "#my-btn",
    /* options */
  });
});
```

### Options

Here's a list of all the options.
Please read below the table for further explanation of how this package works and how you can customize its behaviour to your liking.

| Option             | Description                                                                                                            | Type                                                    | Required | Default value                                                                                                                             |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `target`           | The element or screen coordinates on which to render the effect. The effect will be centered in the specified target.  | HTMLElement / CSS Selector / {x: '100px', y:'200px'}    | ✅       | null                                                                                                                                      |
| `elements`         | Array of elements to render. Random element will be rendered based on probability / totalProbability.                  | { content: string / HTMLElement, probability: number}[] |          | [{ content: "❤️", probability: 3 },{ content: "😄", probability: 1 },{ content: "👍🏻", probability: 1 },{ content: "✌🏻", probability: 1 }] |
| `debug`            | If "true" renders borders on all elements. helpfull for development.                                                   | boolean                                                 |          | false                                                                                                                                     |
| `density`          | Controls the density in which the elements will render. Accepts a range between 0-1. 1 being most dense.               | number                                                  |          | 0.6                                                                                                                                       |
| `distanceToTravel` | The distance elements will travel before fading out.                                                                   | Any valid css length value ("10px", "2rem", "5vw", ...) |          | "100px"                                                                                                                                   |
| `minDelay`         | Minimum delay (in ms) to start animating an element. Each element gets a random animation delay value within the range | number                                                  |          | 0                                                                                                                                         |
| `maxDelay`         | Maximum delay (in ms) to start animating an element. Each element gets a random animation delay value within the range | number                                                  |          | 800                                                                                                                                       |
| `minDuration`      | Minimum duration (in ms) of the animation. Each element gets a random animation duration value within the range        | number                                                  |          | 500                                                                                                                                       |
| `maxDuration`      | Maximum duration (in ms) of the animation. Each element gets a random animation duration value within the range        | number                                                  |          | 1500                                                                                                                                      |
| `minElementCount`  | Minimum amount of elements to render. A random amount will be rendered between the min and max range                   | number                                                  |          | 8                                                                                                                                         |
| `maxElementCount`  | Maximum amount of elements to render. A random amount will be rendered between the min and max range                   | number                                                  |          | 12                                                                                                                                        |
| `minRotation`      | Minimum rotation per element (in degrees). A random value within the range will be selected for each element           | number                                                  |          | -15                                                                                                                                       |
| `maxRotation`      | Maximum rotation per element (in degrees). A random value within the range will be selected for each element           | number                                                  |          | 15                                                                                                                                        |
| `minSize`          | Minimum size for a single element. A random value within the range will be selected for each element                   | Any valid css length value ("10px", "2rem", "5vw", ...) |          | "20px"                                                                                                                                    |
| `maxSize`          | Maximum size for a single element. A random value within the range will be selected for each element                   | Any valid css length value ("10px", "2rem", "5vw", ...) |          | "40px"                                                                                                                                    |
| `opacity`          | Maximum opacity for all elements                                                                                       | number / string                                         |          | 1                                                                                                                                         |
| `wiggle`           | The amount of which elements will wiggle from side to side                                                             | Any valid css length value ("10px", "2rem", "5vw", ...) |          | "10px"                                                                                                                                    |
| `zIndex`           | The z-index for the containing element                                                                                 | number / string                                         |          | 0                                                                                                                                         |

### How to customize the behavior

Some of the options have a `min` and `max` value (`minDelay` and `maxDelay` for example).
This means when each element is rendered a random value from the range (min to max) will be assigned.

### How to change which emojis (or elements) the function renders

Use the `elements` option to pass an array of possible elements to render.

```typescript
import useFloatingIcons from "floating-icons";

useFloatingIcons({
  target: "#my-el",
  elements: [
    { content: "❤️", probability: 3 },
    { content: "😄", probability: 2 },
    { content: "👍🏻", probability: 1 },
    { content: "✌🏻", probability: 1 },
  ],
});
```

For each item in the array specify the "content" to render and a probability to render the item.

When elements are being rendered a random element item will be selected from the array based on its probability divided by the total probability value.

For the example above theres a 3 / 6 chance a "❤️" will be selected.
a 2/6 chance that a "😄" will be selected.
and 1/6 chance for the rest of the items.

That means that if you render 6 elements you would most likely get 3 "❤️", 2 "😄", 1, "👍🏻", "✌🏻".
Since the selection is random the amounts and their location in the animation will change for each invocation of the function.

This results in an effect that appears new and exciting every time.

### How to use with existing element or with fixed screen coordinates

In order to render the effect on an existing element you can specify the elments selector or a reference to the element.

```typescript
import useFloatingIcons from "floating-icons";

// Using with a selector
useFloatingIcons({
  target: "#my-btn",
});

// Using with an element reference
const myBtn = document.querySelector("#my-btn");
useFloatingIcons({
  target: myBtn,
});

// Using with coordinates (positioned using positin:fixed)
useFloatingIcons({
  target: {
    x: "200px",
    y: "300px",
  },
});
```

The effect will be rendered in the center on the target element or the specified screen coordinates as shown in the image below.

![Centering example](https://github.com/user-attachments/assets/5369b829-33a5-453d-8b0d-5316a141aab8)

### How to use with your own html content

Instead of using emojis you can specify your own html elements in the elements.content option.

```typescript
import useFloatingIcons from "floating-icons";

const myFirstHTMLElement = document.querySelector("#my-first-html-element");
const mySecondHTMLElement = document.querySelector("#my-second-html-element");

useFloatingIcons({
  target: "#my-el",
  elements: [
    {
      content: myFirstHTMLElement,
      probability: 1,
    },
    {
      content: mySecondHTMLElement,
      probability: 1,
    },
  ],
});
```

### Methods

`destroy`: destroys the animation element.
this function is called automatically after the animation has finished.
You can call it manually if you want to destory the element before the animation is complete.

```typescript
import useFloatingIcons from "floating-icons";

const floatingIcons = useFloatingIcons({ target: "#my-btn" });

setTimeout(() => {
  floatingIcons.destroy();
}, 1000);
```

### Basic usage with React

```jsx
import useFloatingIcons from "floating-icons";

export function MyBtn() {
  return (
    <div className="App">
     <button onClick={(e) => {
          useFloatingIcons({
            target: e.currentTarget as HTMLElement,
            debug: false,
            density: 0.6, // range from 0.0 - 1
            distanceToTravel: '100px',
            minDelay: 0, // ms
            maxDelay: 800, // ms
            minDuration: 500, // ms
            maxDuration: 1500, // ms
            minElementCount: 8, // number
            maxElementCount: 12, // number
            minRotation: -15, // degrees
            maxRotation: 15, // degrees
            minSize: '20px',
            maxSize: '40px',
            opacity: 1, // range from 0.0 - 1
            wiggle: '10px', // sizeUnit
            zIndex: 0,
          });
        }}
      >
      Click me!
    </button>
    </div>
  );
}
```
