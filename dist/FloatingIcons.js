var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _FloatingIcons_instances, _FloatingIcons_args, _FloatingIcons_uuid, _FloatingIcons_targetType, _FloatingIcons_targetEl, _FloatingIcons_containerEl, _FloatingIcons_cssEl, _FloatingIcons_validateArgs, _FloatingIcons_createTargetEl, _FloatingIcons_injectCss, _FloatingIcons_createContainerEl, _FloatingIcons_positionRelativeContainerEl, _FloatingIcons_positionFixedContainerEl, _FloatingIcons_randomElement, _FloatingIcons_createElements, _FloatingIcons_createElement, _FloatingIcons_destroy;
class FloatingIcons {
    constructor(args) {
        _FloatingIcons_instances.add(this);
        _FloatingIcons_args.set(this, {
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
        });
        _FloatingIcons_uuid.set(this, Math.random().toString(36).substring(6));
        _FloatingIcons_targetType.set(this, null);
        _FloatingIcons_targetEl.set(this, null);
        _FloatingIcons_containerEl.set(this, null);
        _FloatingIcons_cssEl.set(this, null);
        __classPrivateFieldSet(this, _FloatingIcons_args, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _FloatingIcons_args, "f")), args), "f");
        // Make sure all args are valid
        __classPrivateFieldGet(this, _FloatingIcons_instances, "m", _FloatingIcons_validateArgs).call(this);
        // Assign target element
        __classPrivateFieldGet(this, _FloatingIcons_instances, "m", _FloatingIcons_createTargetEl).call(this);
        // CSS Animations
        __classPrivateFieldGet(this, _FloatingIcons_instances, "m", _FloatingIcons_injectCss).call(this);
        // Create container element
        __classPrivateFieldGet(this, _FloatingIcons_instances, "m", _FloatingIcons_createContainerEl).call(this);
        __classPrivateFieldGet(this, _FloatingIcons_instances, "m", _FloatingIcons_createElements).call(this);
        // Cleanup after animation is done
        const maxDuration = __classPrivateFieldGet(this, _FloatingIcons_args, "f").maxDelay + __classPrivateFieldGet(this, _FloatingIcons_args, "f").maxDuration;
        setTimeout(__classPrivateFieldGet(this, _FloatingIcons_instances, "m", _FloatingIcons_destroy).bind(this), maxDuration);
    }
    // Public method to destroy the animation
    destroy() {
        __classPrivateFieldGet(this, _FloatingIcons_instances, "m", _FloatingIcons_destroy).call(this);
    }
}
_FloatingIcons_args = new WeakMap(), _FloatingIcons_uuid = new WeakMap(), _FloatingIcons_targetType = new WeakMap(), _FloatingIcons_targetEl = new WeakMap(), _FloatingIcons_containerEl = new WeakMap(), _FloatingIcons_cssEl = new WeakMap(), _FloatingIcons_instances = new WeakSet(), _FloatingIcons_validateArgs = function _FloatingIcons_validateArgs() {
    // minSize and maxSize are in the same unit
    const [minSizeVal, minSizeUnit] = parseCssValue(__classPrivateFieldGet(this, _FloatingIcons_args, "f").minSize);
    const [maxSizeVal, maxSizeUnit] = parseCssValue(__classPrivateFieldGet(this, _FloatingIcons_args, "f").maxSize);
    if (minSizeUnit !== maxSizeUnit) {
        throw new Error(`minSize and maxSize must be of the same unit.\n (minSize: "${__classPrivateFieldGet(this, _FloatingIcons_args, "f").minSize}", maxSize: "${__classPrivateFieldGet(this, _FloatingIcons_args, "f").maxSize}").\n This could happen if you've specified only one of the values and the other one is using the default value.`);
    }
    // min element count must be smaller or equal to max element count
    if (__classPrivateFieldGet(this, _FloatingIcons_args, "f").minElementCount > __classPrivateFieldGet(this, _FloatingIcons_args, "f").maxElementCount) {
        throw new Error("minElementCount must be less than or equal to maxElementCount");
    }
}, _FloatingIcons_createTargetEl = function _FloatingIcons_createTargetEl() {
    if (typeof __classPrivateFieldGet(this, _FloatingIcons_args, "f").target === "object" &&
        __classPrivateFieldGet(this, _FloatingIcons_args, "f").target instanceof HTMLElement === false) {
        const el = document.createElement("div");
        el.style.position = "fixed";
        if ("x" in __classPrivateFieldGet(this, _FloatingIcons_args, "f").target === false ||
            "y" in __classPrivateFieldGet(this, _FloatingIcons_args, "f").target === false) {
            throw new Error("x and y are not valid properties");
        }
        el.style.left = __classPrivateFieldGet(this, _FloatingIcons_args, "f").target.x;
        el.style.top = __classPrivateFieldGet(this, _FloatingIcons_args, "f").target.y;
        document.body.appendChild(el);
        __classPrivateFieldSet(this, _FloatingIcons_targetEl, el, "f");
        __classPrivateFieldSet(this, _FloatingIcons_targetType, "position", "f");
    }
    else if (typeof __classPrivateFieldGet(this, _FloatingIcons_args, "f").target === "string") {
        const el = document.querySelector(__classPrivateFieldGet(this, _FloatingIcons_args, "f").target);
        if (!el)
            throw new Error("container element not found");
        __classPrivateFieldSet(this, _FloatingIcons_targetEl, el, "f");
        __classPrivateFieldSet(this, _FloatingIcons_targetType, "selector", "f");
    }
    else {
        __classPrivateFieldSet(this, _FloatingIcons_targetEl, __classPrivateFieldGet(this, _FloatingIcons_args, "f").target, "f");
        __classPrivateFieldSet(this, _FloatingIcons_targetType, "element", "f");
    }
}, _FloatingIcons_injectCss = function _FloatingIcons_injectCss() {
    const exists = document.head.querySelector(`#floating-icons-css-${__classPrivateFieldGet(this, _FloatingIcons_uuid, "f")}`);
    if (exists)
        return;
    const [wiggleValue, wiggleUnit] = parseCssValue(__classPrivateFieldGet(this, _FloatingIcons_args, "f").wiggle);
    const drifts = [
        `${Math.random() * wiggleValue}${wiggleUnit}`,
        `${Math.random() * wiggleValue}${wiggleUnit}`,
        `${Math.random() * wiggleValue}${wiggleUnit}`,
        `${Math.random() * wiggleValue}${wiggleUnit}`,
    ];
    const [distanceValue, distanceUnit] = parseCssValue(__classPrivateFieldGet(this, _FloatingIcons_args, "f").distanceToTravel);
    const distances = [
        `${distanceValue * 0.25}${distanceUnit}`,
        `${distanceValue * 0.5}${distanceUnit}`,
        `${distanceValue * 0.75}${distanceUnit}`,
        `${distanceValue}${distanceUnit}`,
    ];
    const css = `
			@keyframes floating-icons-animation-${__classPrivateFieldGet(this, _FloatingIcons_uuid, "f")} {
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
    el.id = `floating-icons-css-${__classPrivateFieldGet(this, _FloatingIcons_uuid, "f")}`;
    el.innerHTML = css;
    document.head.appendChild(el);
    __classPrivateFieldSet(this, _FloatingIcons_cssEl, el, "f");
}, _FloatingIcons_createContainerEl = function _FloatingIcons_createContainerEl() {
    if (!__classPrivateFieldGet(this, _FloatingIcons_targetEl, "f"))
        throw new Error("target element not found");
    const el = document.createElement("div");
    el.id = `floating-icons-${__classPrivateFieldGet(this, _FloatingIcons_uuid, "f")}`;
    el.classList.add("floating-icons");
    if (__classPrivateFieldGet(this, _FloatingIcons_args, "f").debug) {
        el.style.border = "3px solid yellow";
    }
    if (__classPrivateFieldGet(this, _FloatingIcons_targetType, "f") === "position") {
        __classPrivateFieldGet(this, _FloatingIcons_instances, "m", _FloatingIcons_positionFixedContainerEl).call(this, el);
    }
    else {
        __classPrivateFieldGet(this, _FloatingIcons_instances, "m", _FloatingIcons_positionRelativeContainerEl).call(this, el);
    }
    __classPrivateFieldSet(this, _FloatingIcons_containerEl, el, "f");
}, _FloatingIcons_positionRelativeContainerEl = function _FloatingIcons_positionRelativeContainerEl(el) {
    if (!__classPrivateFieldGet(this, _FloatingIcons_targetEl, "f"))
        throw new Error("target element not found");
    el.style.position = "absolute";
    el.style.top = "50%";
    el.style.left = "50%";
    el.style.whiteSpace = "nowrap";
    el.style.transform = "translate(-50%, -50%)";
    el.style.zIndex = __classPrivateFieldGet(this, _FloatingIcons_args, "f").zIndex.toString();
    __classPrivateFieldGet(this, _FloatingIcons_targetEl, "f").style.overflow = "visible";
    const targetStyles = getComputedStyle(__classPrivateFieldGet(this, _FloatingIcons_targetEl, "f"));
    // Set position to relative if it's static
    if (targetStyles.position === "static") {
        __classPrivateFieldGet(this, _FloatingIcons_targetEl, "f").style.position = "relative";
    }
    __classPrivateFieldGet(this, _FloatingIcons_targetEl, "f").appendChild(el);
}, _FloatingIcons_positionFixedContainerEl = function _FloatingIcons_positionFixedContainerEl(el) {
    if (!__classPrivateFieldGet(this, _FloatingIcons_targetEl, "f"))
        throw new Error("target element not found");
    el.style.position = "fixed";
    document.body.appendChild(el);
    // Position the container element (has to happend after it's added to the DOM)
    setTimeout(() => {
        const targetRect = __classPrivateFieldGet(this, _FloatingIcons_targetEl, "f").getBoundingClientRect();
        const containerRect = el.getBoundingClientRect();
        const targetLeft = targetRect.left - (containerRect.width - targetRect.width) / 2;
        const targetTop = targetRect.top - (containerRect.height - targetRect.height) / 2;
        el.style.top = `${targetTop}px`;
        el.style.left = `${targetLeft}px`;
        el.style.pointerEvents = "none";
        el.style.zIndex = __classPrivateFieldGet(this, _FloatingIcons_args, "f").zIndex.toString();
        el.style.opacity = __classPrivateFieldGet(this, _FloatingIcons_args, "f").opacity.toString();
    }, 0);
}, _FloatingIcons_randomElement = function _FloatingIcons_randomElement() {
    const totalProbability = __classPrivateFieldGet(this, _FloatingIcons_args, "f").elements.reduce((acc, { probability }) => acc + probability, 0);
    let random = Math.random() * totalProbability;
    for (const { content, probability } of __classPrivateFieldGet(this, _FloatingIcons_args, "f").elements) {
        if (random < probability)
            return content;
        random -= probability;
    }
    return __classPrivateFieldGet(this, _FloatingIcons_args, "f").elements[0].content; // Fallback if something goes wrong
}, _FloatingIcons_createElements = function _FloatingIcons_createElements() {
    const randomElementCount = randomBetween(__classPrivateFieldGet(this, _FloatingIcons_args, "f").minElementCount, __classPrivateFieldGet(this, _FloatingIcons_args, "f").maxElementCount);
    for (let i = 0; i < randomElementCount; i++) {
        const randomElement = __classPrivateFieldGet(this, _FloatingIcons_instances, "m", _FloatingIcons_randomElement).call(this);
        __classPrivateFieldGet(this, _FloatingIcons_instances, "m", _FloatingIcons_createElement).call(this, randomElement);
    }
}, _FloatingIcons_createElement = function _FloatingIcons_createElement(elementContent) {
    var _a;
    let el;
    if (typeof elementContent === "string") {
        el = document.createElement("span");
        el.innerHTML = elementContent;
    }
    else {
        el = elementContent.cloneNode(true);
    }
    const duration = randomBetween(__classPrivateFieldGet(this, _FloatingIcons_args, "f").minDuration, __classPrivateFieldGet(this, _FloatingIcons_args, "f").maxDuration);
    const delay = randomBetween(__classPrivateFieldGet(this, _FloatingIcons_args, "f").minDelay, __classPrivateFieldGet(this, _FloatingIcons_args, "f").maxDelay);
    el.style.display = "inline-block";
    el.style.animationName = `floating-icons-animation-${__classPrivateFieldGet(this, _FloatingIcons_uuid, "f")}`;
    el.style.animationDuration = `${duration}ms`;
    el.style.animationDelay = `${delay}ms`;
    el.style.animationTimingFunction = "linear";
    el.style.animationIterationCount = "1";
    el.style.animationFillMode = "forwards";
    el.style.opacity = "0";
    el.style.transform = "transltate(0,0) scale(0) rotate(0deg)";
    if (__classPrivateFieldGet(this, _FloatingIcons_args, "f").debug) {
        el.style.border = "3px solid cyan";
    }
    const [minSizeVal, minSizeUnit] = parseCssValue(__classPrivateFieldGet(this, _FloatingIcons_args, "f").minSize);
    const [maxSizeVal, maxSizeUnit] = parseCssValue(__classPrivateFieldGet(this, _FloatingIcons_args, "f").maxSize);
    const margin = (0.5 - __classPrivateFieldGet(this, _FloatingIcons_args, "f").density) * 2 * maxSizeVal;
    el.style.margin = `0 ${margin}${maxSizeUnit}`;
    const wrapper = document.createElement("div");
    wrapper.style.display = "inline-block";
    // Random size
    const size = randomBetween(minSizeVal, maxSizeVal);
    if (typeof elementContent === "string") {
        el.style.fontSize = `${size}${minSizeUnit}`;
    }
    else {
        wrapper.style.width = `${size}${minSizeUnit}`;
    }
    wrapper.style.transform = `rotate(${randomBetween(__classPrivateFieldGet(this, _FloatingIcons_args, "f").minRotation, __classPrivateFieldGet(this, _FloatingIcons_args, "f").maxRotation)}deg)`;
    wrapper.appendChild(el);
    (_a = __classPrivateFieldGet(this, _FloatingIcons_containerEl, "f")) === null || _a === void 0 ? void 0 : _a.appendChild(wrapper);
}, _FloatingIcons_destroy = function _FloatingIcons_destroy() {
    var _a, _b, _c;
    (_a = __classPrivateFieldGet(this, _FloatingIcons_containerEl, "f")) === null || _a === void 0 ? void 0 : _a.remove();
    (_b = __classPrivateFieldGet(this, _FloatingIcons_cssEl, "f")) === null || _b === void 0 ? void 0 : _b.remove();
    if (__classPrivateFieldGet(this, _FloatingIcons_targetType, "f") === "position") {
        (_c = __classPrivateFieldGet(this, _FloatingIcons_targetEl, "f")) === null || _c === void 0 ? void 0 : _c.remove();
    }
};
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}
/**
 * Parses a CSS value string into a numeric value and its unit.
 *
 * @param cssValue - The CSS value string to parse. Example valid values include "10px", "1em", "100%", "5vw", etc.
 * @returns A tuple where the first element is the numeric value and the second element is the unit as a string.
 *          If the input is invalid, it returns [0, 'px'] and logs an error message to the console.
 */
function parseCssValue(cssValue) {
    const regex = /^(-?\d*\.?\d+)([a-zA-Z%]+)$/;
    const match = cssValue.match(regex);
    if (match) {
        const value = parseFloat(match[1]);
        const unit = match[2];
        return [value, unit];
    }
    console.log(`Invalid CSS value: "${cssValue}". Example for valid values: "10px", "1em", "100%", "5vw", ...`);
    return [0, "px"];
}
export const createFloatingIcons = (args) => new FloatingIcons(args);
export default createFloatingIcons;
