export type FloatingIconsElementRecord = {
	content: HTMLElement | string;
	probability: number;
};

type CssUnit =
	| "px"
	| "em"
	| "rem"
	| "%"
	| "vh"
	| "vw"
	| "vmin"
	| "vmax"
	| "cm"
	| "mm"
	| "in"
	| "pt"
	| "pc"
	| "ex"
	| "ch";

type CssValue = `${number}${CssUnit}`;
type CssSelector = string;

type RequiredArgs = {
	/** The target element/position where the animation will start from (Example: '#my-element', {x:'10rem, y:'300px})*/
	target: HTMLElement | CssSelector | { x: CssValue; y: CssValue };
};
type OptionalArgs = {
	/** Render debugging borders around elements */
	debug: boolean;
	/** How close together to render the elements. Range from 0 to 1. 1 is more dense 0 is less dense. (Default: 0.6) */
	density: number;
	/** The distance the elements will travel. (Default: "100px") */
	distanceToTravel: CssValue;
	/** Minimum delay to start animating an element. Each element gets a random animation delay within the range */
	minDelay: number;
	/** Maximum delay to start animating an element. Each element gets a random animation delay within the range */
	maxDelay: number;
	/** Minimum duration of animation. Each element gets a random animation duration within the range). (Default: 500) */
	minDuration: number;
	/** Minimum duration of animation. Each element gets a random animation duration within the range). (Default: 1500) */
	maxDuration: number;
	/** Minimum amount of elements to render. A random amount will be rendered between the min and max range. (Default: 8) */
	minElementCount: number;
	/** Maximum amount of elements to render. A random amount will be rendered between the min and max range. (Default: 12) */
	maxElementCount: number;
	/** Minimum rotation of each element in degrees. (Default: -15) */
	minRotation: number;
	/** Maximum rotation of each element in degrees. (Default: 15) */
	maxRotation: number;
	/** Minimum size of each element. (Default: "20px") */
	minSize: CssValue;
	/** Maximum size of each element. (Default: "40px") */
	maxSize: CssValue;

	/** Max opacity of the elements. (Default: 1) */
	opacity: number | string;
	/** How much the elements will wiggle from side to side. (Default: "10px") */
	wiggle: CssValue;
	/** The z-index of the container element. (Default: 0) */
	zIndex: number | string;

	/** Array of elements to render. Random element will be rendered based on probability / totalProbability. (Example: [{ content: '🙂', probability: 1},{ content: '🤪', probability: 2}]) */
	elements: FloatingIconsElementRecord[];
};

type Simplify<T> = T extends object
	? {
			[P in keyof T as string extends P ? never : P]: T[P] extends object
				? Simplify<T[P]>
				: T[P];
	  }
	: T;

export type FloatingIconsArgs = Simplify<RequiredArgs & Partial<OptionalArgs>>;

class FloatingIcons {
	#args: Required<FloatingIconsArgs> = {
		target: "",
		debug: false,
		density: 0.6, // range from 0.0 - 1
		distanceToTravel: "100px",
		minDelay: 0, // ms
		maxDelay: 800, // ms
		minDuration: 500, // ms
		maxDuration: 1500, // ms
		minElementCount: 8, // number
		maxElementCount: 12, // number
		minRotation: -15, // degrees
		maxRotation: 15, // degrees
		minSize: "20px",
		maxSize: "40px",
		opacity: 1, // range from 0.0 - 1
		wiggle: "10px", // sizeUnit
		zIndex: 0,

		elements: [
			{ content: "❤️", probability: 3 },
			{ content: "😄", probability: 1 },
			{ content: "👍🏻", probability: 1 },
			{ content: "✌🏻", probability: 1 },
		],
	};

	#uuid: string = Math.random().toString(36).substring(6);
	#targetType: null | "element" | "selector" | "position" = null;
	#targetEl: HTMLElement | null = null;
	#containerEl: HTMLElement | null = null;
	#cssEl: HTMLStyleElement | null = null;

	constructor(args: FloatingIconsArgs) {
		this.#args = { ...this.#args, ...args };

		// Make sure all args are valid
		this.#validateArgs();

		// Assign target element
		this.#createTargetEl();

		// CSS Animations
		this.#injectCss();

		// Create container element
		this.#createContainerEl();

		this.#createElements();

		// Cleanup after animation is done
		const maxDuration = this.#args.maxDelay + this.#args.maxDuration;
		setTimeout(this.#destroy.bind(this), maxDuration);
	}

	#validateArgs() {
		// minSize and maxSize are in the same unit
		const [minSizeVal, minSizeUnit] = parseCssValue(this.#args.minSize);
		const [maxSizeVal, maxSizeUnit] = parseCssValue(this.#args.maxSize);
		if (minSizeUnit !== maxSizeUnit) {
			throw new Error(
				`minSize and maxSize must be of the same unit.\n (minSize: "${
					this.#args.minSize
				}", maxSize: "${
					this.#args.maxSize
				}").\n This could happen if you've specified only one of the values and the other one is using the default value.`
			);
		}

		// min element count must be smaller or equal to max element count
		if (this.#args.minElementCount > this.#args.maxElementCount) {
			throw new Error(
				"minElementCount must be less than or equal to maxElementCount"
			);
		}
	}

	#createTargetEl() {
		if (
			typeof this.#args.target === "object" &&
			this.#args.target instanceof HTMLElement === false
		) {
			const el = document.createElement("div");
			el.style.position = "fixed";
			if (
				"x" in this.#args.target === false ||
				"y" in this.#args.target === false
			) {
				throw new Error("x and y are not valid properties");
			}
			el.style.left = this.#args.target.x;
			el.style.top = this.#args.target.y;
			document.body.appendChild(el);
			this.#targetEl = el;
			this.#targetType = "position";
		} else if (typeof this.#args.target === "string") {
			const el = document.querySelector(this.#args.target);
			if (!el) throw new Error("container element not found");
			this.#targetEl = el as HTMLElement;
			this.#targetType = "selector";
		} else {
			this.#targetEl = this.#args.target;
			this.#targetType = "element";
		}
	}

	#injectCss() {
		const exists = document.head.querySelector(
			`#floating-icons-css-${this.#uuid}`
		);
		if (exists) return;

		const [wiggleValue, wiggleUnit] = parseCssValue(this.#args.wiggle);
		const drifts = [
			`${Math.random() * wiggleValue}${wiggleUnit}`,
			`${Math.random() * wiggleValue}${wiggleUnit}`,
			`${Math.random() * wiggleValue}${wiggleUnit}`,
			`${Math.random() * wiggleValue}${wiggleUnit}`,
		];

		const [distanceValue, distanceUnit] = parseCssValue(
			this.#args.distanceToTravel
		);
		const distances = [
			`${distanceValue * 0.25}${distanceUnit}`,
			`${distanceValue * 0.5}${distanceUnit}`,
			`${distanceValue * 0.75}${distanceUnit}`,
			`${distanceValue}${distanceUnit}`,
		];

		const css = `
			@keyframes floating-icons-animation-${this.#uuid} {
				0% {
					opacity: 0;
					transform: translate(0,0) scale(0) rotate(0deg);
				}
				25% {
					opacity: 1;
					transform: translate(-${drifts[0]},-${distances[0]}) scale(0.9) rotate(-10deg);
				}
				50% {
					opacity: 1;
					transform: translate(${drifts[1]},-${distances[1]}) scale(0.8) rotate(-10deg);
				}
				75% {
					opacity: 1;
					transform: translate(-${drifts[2]},-${distances[2]}) scale(0.7) rotate(0deg);
				}
				100% {
					opacity: 0;
					transform: translate(${drifts[3]},-${distances[3]}) scale(0.25) rotate(10deg);
				}
			}
		`;
		const el = document.createElement("style");
		el.id = `floating-icons-css-${this.#uuid}`;
		el.innerHTML = css;
		document.head.appendChild(el);
		this.#cssEl = el;
	}

	#createContainerEl() {
		if (!this.#targetEl) throw new Error("target element not found");

		const el = document.createElement("div");
		el.id = `floating-icons-${this.#uuid}`;
		el.classList.add("floating-icons");

		if (this.#args.debug) {
			el.style.border = "3px solid yellow";
		}

		if (this.#targetType === "position") {
			this.#positionFixedContainerEl(el);
		} else {
			this.#positionRelativeContainerEl(el);
		}

		this.#containerEl = el;
	}

	#positionRelativeContainerEl(el: HTMLElement) {
		if (!this.#targetEl) throw new Error("target element not found");

		el.style.position = "absolute";
		el.style.top = "50%";
		el.style.left = "50%";
		el.style.whiteSpace = "nowrap";
		el.style.transform = "translate(-50%, -50%)";
		el.style.zIndex = this.#args.zIndex.toString();
		this.#targetEl.style.overflow = "visible";

		const targetStyles = getComputedStyle(this.#targetEl);

		// Set position to relative if it's static
		if (targetStyles.position === "static") {
			this.#targetEl.style.position = "relative";
		}

		this.#targetEl.appendChild(el);
	}

	#positionFixedContainerEl(el: HTMLElement) {
		if (!this.#targetEl) throw new Error("target element not found");

		el.style.position = "fixed";
		document.body.appendChild(el);

		// Position the container element (has to happend after it's added to the DOM)
		setTimeout(() => {
			const targetRect =
				this.#targetEl!.getBoundingClientRect() as DOMRect;
			const containerRect = el.getBoundingClientRect() as DOMRect;
			const targetLeft =
				targetRect.left - (containerRect.width - targetRect.width) / 2;
			const targetTop =
				targetRect.top - (containerRect.height - targetRect.height) / 2;

			el.style.top = `${targetTop}px`;
			el.style.left = `${targetLeft}px`;
			el.style.pointerEvents = "none";
			el.style.zIndex = this.#args.zIndex.toString();
			el.style.opacity = this.#args.opacity.toString();
		}, 0);
	}

	#randomElement() {
		const totalProbability = this.#args.elements.reduce(
			(acc, { probability }) => acc + probability,
			0
		);
		let random = Math.random() * totalProbability;
		for (const { content, probability } of this.#args.elements) {
			if (random < probability) return content;
			random -= probability;
		}
		return this.#args.elements[0].content; // Fallback if something goes wrong
	}

	#createElements() {
		const randomElementCount = randomBetween(
			this.#args.minElementCount,
			this.#args.maxElementCount
		);
		for (let i = 0; i < randomElementCount; i++) {
			const randomElement = this.#randomElement();
			this.#createElement(randomElement);
		}
	}

	#createElement(elementContent: HTMLElement | string) {
		let el: HTMLElement;

		if (typeof elementContent === "string") {
			el = document.createElement("span");
			el.innerHTML = elementContent;
		} else {
			el = elementContent.cloneNode(true) as HTMLElement;
		}

		const duration = randomBetween(
			this.#args.minDuration,
			this.#args.maxDuration
		);
		const delay = randomBetween(this.#args.minDelay, this.#args.maxDelay);

		el.style.display = "inline-block";
		el.style.animationName = `floating-icons-animation-${this.#uuid}`;
		el.style.animationDuration = `${duration}ms`;
		el.style.animationDelay = `${delay}ms`;
		el.style.animationTimingFunction = "linear";
		el.style.animationIterationCount = "1";
		el.style.animationFillMode = "forwards";
		el.style.opacity = "0";
		el.style.transform = "transltate(0,0) scale(0) rotate(0deg)";

		if (this.#args.debug) {
			el.style.border = "3px solid cyan";
		}

		const [minSizeVal, minSizeUnit] = parseCssValue(this.#args.minSize);
		const [maxSizeVal, maxSizeUnit] = parseCssValue(this.#args.maxSize);

		const margin = (0.5 - this.#args.density) * 2 * maxSizeVal;
		el.style.margin = `0 ${margin}${maxSizeUnit}`;

		const wrapper = document.createElement("div");
		wrapper.style.display = "inline-block";

		// Random size

		const size = randomBetween(minSizeVal, maxSizeVal);

		if (typeof elementContent === "string") {
			el.style.fontSize = `${size}${minSizeUnit}`;
		} else {
			wrapper.style.width = `${size}${minSizeUnit}`;
		}

		wrapper.style.transform = `rotate(${randomBetween(
			this.#args.minRotation,
			this.#args.maxRotation
		)}deg)`;

		wrapper.appendChild(el);

		this.#containerEl?.appendChild(wrapper);
	}

	// Clean up
	#destroy() {
		this.#containerEl?.remove();
		this.#cssEl?.remove();

		if (this.#targetType === "position") {
			this.#targetEl?.remove();
		}
	}
}

function randomBetween(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

/**
 * Parses a CSS value string into a numeric value and its unit.
 *
 * @param cssValue - The CSS value string to parse. Example valid values include "10px", "1em", "100%", "5vw", etc.
 * @returns A tuple where the first element is the numeric value and the second element is the unit as a string.
 *          If the input is invalid, it returns [0, 'px'] and logs an error message to the console.
 */
function parseCssValue(cssValue: string): [number, string] {
	const regex = /^(-?\d*\.?\d+)([a-zA-Z%]+)$/;
	const match = cssValue.match(regex);
	if (match) {
		const value = parseFloat(match[1]);
		const unit = match[2];
		return [value, unit];
	}
	console.log(
		`Invalid CSS value: "${cssValue}". Example for valid values: "10px", "1em", "100%", "5vw", ...`
	);
	return [0, "px"];
}

export type CreateFloatingIcons = (
	args: Simplify<FloatingIconsArgs>
) => FloatingIcons;
export const createFloatingIcons: CreateFloatingIcons = (args) =>
	new FloatingIcons(args);
export default createFloatingIcons;
