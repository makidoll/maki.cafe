export class GlobalRef<T> {
	private readonly sym: symbol;

	constructor(uniqueName: string, initialValue: T | null = null) {
		this.sym = Symbol.for(uniqueName);

		if (initialValue != null) {
			this.value = initialValue;
		}
	}

	get value() {
		return (global as any)[this.sym] as T;
	}

	set value(value: T) {
		(global as any)[this.sym] = value;
	}
}
