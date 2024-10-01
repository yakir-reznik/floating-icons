export type FloatingIconsElementRecord = {
    content: HTMLElement | string;
    probability: number;
};
type CssUnit = "px" | "em" | "rem" | "%" | "vh" | "vw" | "vmin" | "vmax" | "cm" | "mm" | "in" | "pt" | "pc" | "ex" | "ch";
type CssValue = `${number}${CssUnit}`;
type CssSelector = string;
type RequiredArgs = {
    /** The target element/position where the animation will start from (Example: '#my-element', {x:'10rem, y:'300px})*/
    target: HTMLElement | CssSelector | {
        x: CssValue;
        y: CssValue;
    };
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
type Simplify<T> = T extends object ? {
    [P in keyof T as string extends P ? never : P]: T[P] extends object ? Simplify<T[P]> : T[P];
} : T;
export type FloatingIconsArgs = Simplify<RequiredArgs & Partial<OptionalArgs>>;
declare class FloatingIcons {
    #private;
    constructor(args: FloatingIconsArgs);
    destroy(): void;
}
export type CreateFloatingIcons = (args: Simplify<FloatingIconsArgs>) => FloatingIcons;
export declare const createFloatingIcons: CreateFloatingIcons;
export default createFloatingIcons;
