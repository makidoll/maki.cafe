import { Ease as ease, Easing } from "./easing-functions";

function lerp(a: number, b: number, alpha: number) {
	return a + alpha * (b - a);
}

type TransitionFunction<T> = (t: T, tweener: Tweener<T>) => any;

class TweenerBase {
	public update() {}
}

class Tweener<T> implements TweenerBase {
	public from: T;
	public to: T;

	private startTime: number;
	private endTime: number;

	public current: T;
	public finished = true;

	private easingFunction: Easing;
	private transitionFunction: TransitionFunction<T>;

	constructor(transitionFunction: TransitionFunction<T>, initial: T) {
		this.transitionFunction = transitionFunction;
		this.from = initial;
		this.to = initial;
		this.current = initial;
		transitionFunction(initial, this);
	}

	public tween(to: T, ms: number, easingFunction: Easing) {
		this.from = this.current;
		this.to = to;

		this.startTime = Date.now();
		this.endTime = Date.now() + ms;

		this.easingFunction = easingFunction;
		this.finished = false;
	}

	public update() {
		if (this.finished) return;

		const now = Date.now();

		if (now > this.endTime) {
			this.current = this.to;
			this.finished = true;
			this.transitionFunction(this.to, this);
			return;
		}

		const duration = this.endTime - this.startTime;

		let t = (now - this.startTime) / duration;
		t = ease(t, this.easingFunction);

		// only works with floats for now
		const n: T = lerp(this.from as any, this.to as any, t) as any;

		this.current = n;
		this.transitionFunction(n, this);
	}
}

export class TweenManager {
	private tweeners: TweenerBase[] = [];

	public newTweener<T>(transition: TransitionFunction<T>, initial: T) {
		const tweener = new Tweener<T>(transition, initial);
		this.tweeners.push(tweener);
		return tweener;
	}

	public removeAllTweeners() {
		this.tweeners = [];
	}

	public update() {
		for (const tweener of this.tweeners) {
			tweener.update();
		}
	}
}
