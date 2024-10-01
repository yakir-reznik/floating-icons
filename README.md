# Floating Icons

**Floating Icons** is a JavaScript library that allows you to create an engaging animation effect where emojis or icons float out and up from a specified target element on your webpage. This package is perfect for adding fun and interactive visual effects to your web projects.

## Quick links

[Features](#features)  
[Installation](#installation)  
[Basic usage](#basic-usage)  
[Options](#options)  
[How to customize the behavior](#how-to-customize-the-behavior)  
[How to use with existing element or with fixed screen coordinates](#how-to-use-with-existing-element-or-with-fixed-screen-coordinates)  
[How to use with your own html content](#how-to-use-with-your-own-html-content)  
[Methods](#methods)

## Features

[x] Animate multiple icons or emojis or any other HTML elements with configurable properties.
[x] Control amount of elements, density, distance, delay, duration, size, and rotation of the elements.
[x] Randomized rendering based on defined probabilities.
[x] Support for various CSS units for position, speed and animation.
[x] Supports positioning on existing HTML elements or via specifiying fixed x & y values (like position:fixed)
[x] Framework agnostic - works with any typescript and plain javascript project. (React, Vue, Svelte, Solid, ...)

## Installation

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

## Basic usage

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

## Options

Here's a list of all the options.
Please read below the table for further explanation of how this package works and how you can customize its behaviour to your liking.

| Option             | Description                                                                                                                                                                                                                                                                             | Type                                                                | Required | Default value                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `target`           | The place on which to render to elements. Accepts HTMLElement, selector for and HTML element, or screen coordinates like {x:'100px', y:'200px'} that will be used to position the element using "position:fixed". The rendering of the effect will be centered in the specified target. | HTMLElement / CSS Selector / {x: '100px', y:'200px'}                | ✅       | null                                                                                                                                      |
| `elements`         | Array of elements to render. Random element will be rendered based on probability / totalProbability.                                                                                                                                                                                   | [{ content: '🙂', probability: 1},{ content: '🤪', probability: 2}] |          | [{ content: "❤️", probability: 3 },{ content: "😄", probability: 1 },{ content: "👍🏻", probability: 1 },{ content: "✌🏻", probability: 1 }] |
| `debug`            | If "true" renders borders on all elements. helpfull for development.                                                                                                                                                                                                                    | boolean                                                             |          | false                                                                                                                                     |
| `density`          | Controls the density in which the elements will render. Accepts a range between 0-1. 1 being most dense.                                                                                                                                                                                | number                                                              |          | 0.6                                                                                                                                       |
| `distanceToTravel` | The distance elements will travel before fading out.                                                                                                                                                                                                                                    | Any valid css length value ("10px", "2rem", "5vw", ...)             |          | "100px"                                                                                                                                   |
| `minDelay`         | Minimum delay (in ms) to start animating an element. Each element gets a random animation delay value within the range                                                                                                                                                                  | number                                                              |          | 0                                                                                                                                         |
| `maxDelay`         | Maximum delay (in ms) to start animating an element. Each element gets a random animation delay value within the range                                                                                                                                                                  | number                                                              |          | 800                                                                                                                                       |
| `minDuration`      | Minimum duration (in ms) of the animation. Each element gets a random animation duration value within the range                                                                                                                                                                         | number                                                              |          | 500                                                                                                                                       |
| `maxDuration`      | Maximum duration (in ms) of the animation. Each element gets a random animation duration value within the range                                                                                                                                                                         | number                                                              |          | 1500                                                                                                                                      |
| `minElementCount`  | Minimum amount of elements to render. A random amount will be rendered between the min and max range                                                                                                                                                                                    | number                                                              |          | 8                                                                                                                                         |
| `maxElementCount`  | Maximum amount of elements to render. A random amount will be rendered between the min and max range                                                                                                                                                                                    | number                                                              |          | 12                                                                                                                                        |
| `minRotation`      | Minimum rotation per element (in degrees). A random value within the range will be selected for each element                                                                                                                                                                            | number                                                              |          | -15                                                                                                                                       |
| `maxRotation`      | Maximum rotation per element (in degrees). A random value within the range will be selected for each element                                                                                                                                                                            | number                                                              |          | 15                                                                                                                                        |
| `minSize`          | Minimum size for a single element. A random value within the range will be selected for each element                                                                                                                                                                                    | Any valid css length value ("10px", "2rem", "5vw", ...)             |          | "20px"                                                                                                                                    |
| `maxSize`          | Maximum size for a single element. A random value within the range will be selected for each element                                                                                                                                                                                    | Any valid css length value ("10px", "2rem", "5vw", ...)             |          | "40px"                                                                                                                                    |
| `opacity`          | Maximum opacity for all elements                                                                                                                                                                                                                                                        | number / string                                                     |          | 1                                                                                                                                         |
| `wiggle`           | The amount of which elements will wiggle from side to side                                                                                                                                                                                                                              | Any valid css length value ("10px", "2rem", "5vw", ...)             |          | "10px"                                                                                                                                    |
| `zIndex`           | The z-index for the containing element                                                                                                                                                                                                                                                  | number / string                                                     |          | 0                                                                                                                                         |

## How to customize the behavior

Some of the options have a `min` and `max` value (`minDelay` and `maxDelay` for example).
This means when each element is rendered a random value from the range (min to max) will be assigned.

## How to change which emojis (or elements) the function renders

Use the `elements` option to pass an array of possible elements to render.

```typescript
[
	{ content: "❤️", probability: 3 },
	{ content: "😄", probability: 2 },
	{ content: "👍🏻", probability: 1 },
	{ content: "✌🏻", probability: 1 },
];
```

For each item in the array specify the "content" to render and a probability to render the item.

When elements are being rendered a random element item will be selected from the array based on its probability divided by the total probability value.

For the example above theres a 3 / 6 chance a "❤️" will be selected.
a 2/6 chance that a "😄" will be selected.
and 1/6 chance for the rest of the items.

That means that if you render 6 elements you would most likely get 3 "❤️", 2 "😄", 1, "👍🏻", "✌🏻".
Since the selection is random the amounts and their location in the animation will change for each invocation of the function.

This results in an effect that appears new and exciting every time.

## How to use with existing element or with fixed screen coordinates

In order to render the effect on an existing element you can specify the elments selector or a reference to the element.

```typescript
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

## How to use with your own html content

Instead of using emojis you can specify your own html elements in the elements.content option.

```typescript
const myFirstHTMLElement = document.querySelector("my-first-html-element");
const mySecondHTMLElement = document.querySelector("my-second-html-element");

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

## Methods

`destroy`: destroys the animation element.
this function is called automatically after the animation has finished.
You can call it manually if you want to destory the element before the animation is complete.

```typescript
const floatingIcons = useFloatingIcons({ target: "#my-btn" });
setTimeout(() => {
	floatingIcons.destroy();
}, 1000);
```

## Basic usage with React

```jsx
import useFloatingIcons from "floating-icons";

export function MyBtn() {
	return (
		<div className="App">
			<button
				onClick={useFloatingIcons({
					target: "#my-btn",
					/* options */
				})}
			>
				Click me!
			</button>
		</div>
	);
}
```
