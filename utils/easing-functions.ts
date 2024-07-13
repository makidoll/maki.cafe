export enum Easing {
	None,
	Out,
	In,
	InQuad,
	OutQuad,
	InOutQuad,
	InCubic,
	OutCubic,
	InOutCubic,
	InQuart,
	OutQuart,
	InOutQuart,
	InQuint,
	OutQuint,
	InOutQuint,
	InSine,
	OutSine,
	InOutSine,
	InExpo,
	OutExpo,
	InOutExpo,
	InCirc,
	OutCirc,
	InOutCirc,
	InElastic,
	OutElastic,
	OutElasticHalf,
	OutElasticQuarter,
	InOutElastic,
	InBack,
	OutBack,
	InOutBack,
	InBounce,
	OutBounce,
	InOutBounce,
	OutPow10,
}

const ElasticConst = (2 * Math.PI) / 0.3;
const ElasticConst2 = 0.3 / 4;

const BackConst = 1.70158;
const BackConst2 = BackConst * 1.525;

const BounceConst = 1 / 2.75;

const ExpoOffset = Math.pow(2, -10);
const ElasticOffsetFull = Math.pow(2, -11);

const ElasticOffsetHalf =
	Math.pow(2, -10) * Math.sin((0.5 - ElasticConst2) * ElasticConst);

const ElasticOffsetQuarter =
	Math.pow(2, -10) * Math.sin((0.25 - ElasticConst2) * ElasticConst);

const InOutElasticOffset =
	Math.pow(2, -10) *
	Math.sin(((1 - ElasticConst2 * 1.5) * ElasticConst) / 1.5);

export function ease(t: number, easing: Easing): number {
	switch (easing) {
		default:
		case Easing.None:
			return t;

		case Easing.In:
		case Easing.InQuad:
			return t * t;

		case Easing.Out:
		case Easing.OutQuad:
			return t * (2 - t);

		case Easing.InOutQuad:
			if (t < 0.5) return t * t * 2;

			return --t * t * -2 + 1;

		case Easing.InCubic:
			return t * t * t;

		case Easing.OutCubic:
			return --t * t * t + 1;

		case Easing.InOutCubic:
			if (t < 0.5) return t * t * t * 4;
			return --t * t * t * 4 + 1;

		case Easing.InQuart:
			return t * t * t * t;

		case Easing.OutQuart:
			return 1 - --t * t * t * t;

		case Easing.InOutQuart:
			if (t < 0.5) return t * t * t * t * 8;
			return --t * t * t * t * -8 + 1;

		case Easing.InQuint:
			return t * t * t * t * t;

		case Easing.OutQuint:
			return --t * t * t * t * t + 1;

		case Easing.InOutQuint:
			if (t < 0.5) return t * t * t * t * t * 16;
			return --t * t * t * t * t * 16 + 1;

		case Easing.InSine:
			return 1 - Math.cos(t * Math.PI * 0.5);

		case Easing.OutSine:
			return Math.sin(t * Math.PI * 0.5);

		case Easing.InOutSine:
			return 0.5 - 0.5 * Math.cos(Math.PI * t);

		case Easing.InExpo:
			return Math.pow(2, 10 * (t - 1)) + ExpoOffset * (t - 1);

		case Easing.OutExpo:
			return -Math.pow(2, -10 * t) + 1 + ExpoOffset * t;

		case Easing.InOutExpo:
			if (t < 0.5)
				return (
					0.5 * (Math.pow(2, 20 * t - 10) + ExpoOffset * (2 * t - 1))
				);
			return (
				1 -
				0.5 * (Math.pow(2, -20 * t + 10) + ExpoOffset * (-2 * t + 1))
			);

		case Easing.InCirc:
			return 1 - Math.sqrt(1 - t * t);

		case Easing.OutCirc:
			return Math.sqrt(1 - --t * t);

		case Easing.InOutCirc:
			if ((t *= 2) < 1) return 0.5 - 0.5 * Math.sqrt(1 - t * t);
			return 0.5 * Math.sqrt(1 - (t -= 2) * t) + 0.5;

		case Easing.InElastic:
			return (
				-Math.pow(2, -10 + 10 * t) *
					Math.sin((1 - ElasticConst2 - t) * ElasticConst) +
				ElasticOffsetFull * (1 - t)
			);

		case Easing.OutElastic:
			return (
				Math.pow(2, -10 * t) *
					Math.sin((t - ElasticConst2) * ElasticConst) +
				1 -
				ElasticOffsetFull * t
			);

		case Easing.OutElasticHalf:
			return (
				Math.pow(2, -10 * t) *
					Math.sin((0.5 * t - ElasticConst2) * ElasticConst) +
				1 -
				ElasticOffsetHalf * t
			);

		case Easing.OutElasticQuarter:
			return (
				Math.pow(2, -10 * t) *
					Math.sin((0.25 * t - ElasticConst2) * ElasticConst) +
				1 -
				ElasticOffsetQuarter * t
			);

		case Easing.InOutElastic:
			if ((t *= 2) < 1) {
				return (
					-0.5 *
					(Math.pow(2, -10 + 10 * t) *
						Math.sin(
							((1 - ElasticConst2 * 1.5 - t) * ElasticConst) /
								1.5,
						) -
						InOutElasticOffset * (1 - t))
				);
			}

			return (
				0.5 *
					(Math.pow(2, -10 * --t) *
						Math.sin(
							((t - ElasticConst2 * 1.5) * ElasticConst) / 1.5,
						) -
						InOutElasticOffset * t) +
				1
			);

		case Easing.InBack:
			return t * t * ((BackConst + 1) * t - BackConst);

		case Easing.OutBack:
			return --t * t * ((BackConst + 1) * t + BackConst) + 1;

		case Easing.InOutBack:
			if ((t *= 2) < 1)
				return 0.5 * t * t * ((BackConst2 + 1) * t - BackConst2);
			return (
				0.5 * ((t -= 2) * t * ((BackConst2 + 1) * t + BackConst2) + 2)
			);

		case Easing.InBounce:
			t = 1 - t;
			if (t < BounceConst) return 1 - 7.5625 * t * t;
			if (t < 2 * BounceConst)
				return 1 - (7.5625 * (t -= 1.5 * BounceConst) * t + 0.75);
			if (t < 2.5 * BounceConst)
				return 1 - (7.5625 * (t -= 2.25 * BounceConst) * t + 0.9375);
			return 1 - (7.5625 * (t -= 2.625 * BounceConst) * t + 0.984375);

		case Easing.OutBounce:
			if (t < BounceConst) return 7.5625 * t * t;
			if (t < 2 * BounceConst)
				return 7.5625 * (t -= 1.5 * BounceConst) * t + 0.75;
			if (t < 2.5 * BounceConst)
				return 7.5625 * (t -= 2.25 * BounceConst) * t + 0.9375;
			return 7.5625 * (t -= 2.625 * BounceConst) * t + 0.984375;

		case Easing.InOutBounce:
			if (t < 0.5) return 0.5 - 0.5 * ease(1 - t * 2, Easing.OutBounce);
			return ease((t - 0.5) * 2, Easing.OutBounce) * 0.5 + 0.5;

		case Easing.OutPow10:
			return --t * Math.pow(t, 10) + 1;
	}
}
