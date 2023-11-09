#version 300 es
precision mediump float;

out vec4 outColor;

uniform float u_time;
uniform float u_time_for_gif;

uniform vec2 u_resolution;

uniform sampler2D u_tex_blue_noise_1024;

// #define _paletteDitherIterations 128
// #define _paletteDitherErrorFactor 1.0

// const int paletteSize = 64;
// const vec3 palette[paletteSize] = vec3[](
// 	vec3(0x2e, 0x22, 0x2f) / 255.0,
// 	vec3(0x3e, 0x35, 0x46) / 255.0,
// 	vec3(0x62, 0x55, 0x65) / 255.0,
// 	vec3(0x96, 0x6c, 0x6c) / 255.0,
// 	vec3(0xab, 0x94, 0x7a) / 255.0,
// 	vec3(0x69, 0x4f, 0x62) / 255.0,
// 	vec3(0x7f, 0x70, 0x8a) / 255.0,
// 	vec3(0x9b, 0xab, 0xb2) / 255.0,
// 	vec3(0xc7, 0xdc, 0xd0) / 255.0,
// 	vec3(0xff, 0xff, 0xff) / 255.0,
// 	vec3(0x6e, 0x27, 0x27) / 255.0,
// 	vec3(0xb3, 0x38, 0x31) / 255.0,
// 	vec3(0xea, 0x4f, 0x36) / 255.0,
// 	vec3(0xf5, 0x7d, 0x4a) / 255.0,
// 	vec3(0xae, 0x23, 0x34) / 255.0,
// 	vec3(0xe8, 0x3b, 0x3b) / 255.0,
// 	vec3(0xfb, 0x6b, 0x1d) / 255.0,
// 	vec3(0xf7, 0x96, 0x17) / 255.0,
// 	vec3(0xf9, 0xc2, 0x2b) / 255.0,
// 	vec3(0x7a, 0x30, 0x45) / 255.0,
// 	vec3(0x9e, 0x45, 0x39) / 255.0,
// 	vec3(0xcd, 0x68, 0x3d) / 255.0,
// 	vec3(0xe6, 0x90, 0x4e) / 255.0,
// 	vec3(0xfb, 0xb9, 0x54) / 255.0,
// 	vec3(0x4c, 0x3e, 0x24) / 255.0,
// 	vec3(0x67, 0x66, 0x33) / 255.0,
// 	vec3(0xa2, 0xa9, 0x47) / 255.0,
// 	vec3(0xd5, 0xe0, 0x4b) / 255.0,
// 	vec3(0xfb, 0xff, 0x86) / 255.0,
// 	vec3(0x16, 0x5a, 0x4c) / 255.0,
// 	vec3(0x23, 0x90, 0x63) / 255.0,
// 	vec3(0x1e, 0xbc, 0x73) / 255.0,
// 	vec3(0x91, 0xdb, 0x69) / 255.0,
// 	vec3(0xcd, 0xdf, 0x6c) / 255.0,
// 	vec3(0x31, 0x36, 0x38) / 255.0,
// 	vec3(0x37, 0x4e, 0x4a) / 255.0,
// 	vec3(0x54, 0x7e, 0x64) / 255.0,
// 	vec3(0x92, 0xa9, 0x84) / 255.0,
// 	vec3(0xb2, 0xba, 0x90) / 255.0,
// 	vec3(0x0b, 0x5e, 0x65) / 255.0,
// 	vec3(0x0b, 0x8a, 0x8f) / 255.0,
// 	vec3(0x0e, 0xaf, 0x9b) / 255.0,
// 	vec3(0x30, 0xe1, 0xb9) / 255.0,
// 	vec3(0x8f, 0xf8, 0xe2) / 255.0,
// 	vec3(0x32, 0x33, 0x53) / 255.0,
// 	vec3(0x48, 0x4a, 0x77) / 255.0,
// 	vec3(0x4d, 0x65, 0xb4) / 255.0,
// 	vec3(0x4d, 0x9b, 0xe6) / 255.0,
// 	vec3(0x8f, 0xd3, 0xff) / 255.0,
// 	vec3(0x45, 0x29, 0x3f) / 255.0,
// 	vec3(0x6b, 0x3e, 0x75) / 255.0,
// 	vec3(0x90, 0x5e, 0xa9) / 255.0,
// 	vec3(0xa8, 0x84, 0xf3) / 255.0,
// 	vec3(0xea, 0xad, 0xed) / 255.0,
// 	vec3(0x75, 0x3c, 0x54) / 255.0,
// 	vec3(0xa2, 0x4b, 0x6f) / 255.0,
// 	vec3(0xcf, 0x65, 0x7f) / 255.0,
// 	vec3(0xed, 0x80, 0x99) / 255.0,
// 	vec3(0x83, 0x1c, 0x5d) / 255.0,
// 	vec3(0xc3, 0x24, 0x54) / 255.0,
// 	vec3(0xf0, 0x4f, 0x78) / 255.0,
// 	vec3(0xf6, 0x81, 0x81) / 255.0,
// 	vec3(0xfc, 0xa7, 0x90) / 255.0,
// 	vec3(0xfd, 0xcb, 0xb0) / 255.0
// );

// uses the palette
const int gradientSize = 15;
const vec3 gradient[gradientSize] = vec3[](
	vec3(0x7a, 0x30, 0x45) / 255.0,
	vec3(0x75, 0x3c, 0x54) / 255.0,
	vec3(0x6b, 0x3e, 0x75) / 255.0,
	vec3(0x48, 0x4a, 0x77) / 255.0,
	vec3(0x4d, 0x65, 0xb4) / 255.0,
	vec3(0x0b, 0x8a, 0x8f) / 255.0,
	vec3(0x0e, 0xaf, 0x9b) / 255.0,
	vec3(0x1e, 0xbc, 0x73) / 255.0,
	vec3(0x91, 0xdb, 0x69) / 255.0,
	vec3(0xd5, 0xe0, 0x4b) / 255.0,
	vec3(0xf9, 0xc2, 0x2b) / 255.0,
	vec3(0xf7, 0x96, 0x17) / 255.0,
	vec3(0xfb, 0x6b, 0x1d) / 255.0,
	vec3(0xe8, 0x3b, 0x3b) / 255.0,
	vec3(0xae, 0x23, 0x34) / 255.0
);

float luminance(vec3 c) {
	// its faster if you dont pow and sqrt?? cant see the difference between the two
	// return sqrt(0.299 * pow(c.r, 2) + 0.587 * pow(c.g, 2) + 0.114 * pow(c.b, 2));
	return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
}

float colorDistance(vec3 a, vec3 b) {
	// idk the name of this algorithm or where i even found it;
	float luma1 = luminance(a) / 1000.0;
	float luma2 = luminance(b) / 1000.0;
	float lumaDiff = luma1 - luma2;
	float rDiff = a.r - b.r;
	float gDiff = a.g - b.g;
	float bDiff = a.b - b.b;
	return (
		rDiff * rDiff * 0.299 +
		gDiff * gDiff * 0.587 +
		bDiff * bDiff * 0.114
	) * 0.75 + lumaDiff * lumaDiff;
}

/*
int paletteClosestIndex(vec3 inputColor) {
	float closestDistance = 1e6;
	int closestColor = 0;
	
	for (int i = 0; i < paletteSize; i++) {
		float d = colorDistance(inputColor, palette[i]);
		
		if (d < closestDistance) {
			closestDistance = d;
			closestColor = i;
		}
	}
	
	return closestColor;
}
*/

float dither4x4bayer(ivec2 uv) {
	const int dither[16] = int[](
		1, 9, 3, 11,
		13, 5, 15, 7,
		4, 12, 2, 10,
		16, 8, 14, 6
	);
	int r = (uv.y % 4) * 4 + (uv.x % 4);
	return float(dither[r]) / 16.0; // same # of instructions as pre-dividing due to compiler magic
}

float dither8x8bayer(ivec2 uv) {
	const int dither[64] = int[](
		1, 49, 13, 61, 4, 52, 16, 64,
		33, 17, 45, 29, 36, 20, 48, 32,
		9, 57, 5, 53, 12, 60, 8, 56,
		41, 25, 37, 21, 44, 28, 40, 24,
		3, 51, 15, 63, 2, 50, 14, 62,
		35, 19, 47, 31, 34, 18, 46, 30,
		11, 59, 7, 55, 10, 58, 6, 54,
		43, 27, 39, 23, 42, 26, 38, 22
	);
	int r = (uv.y % 8) * 8 + (uv.x % 8);
	return float(dither[r]) / 64.0; // same # of instructions as pre-dividing due to compiler magic
}

vec3 ditherBlueNoise(ivec2 uv) {
	return texture(u_tex_blue_noise_1024, vec2(uv % 1024) / 1024.0).rgb;
}

/*
float ditherByPreference(ivec2 ditherUv) {
	return dither4x4bayer(ditherUv);
	// return dither8x8bayer(ditherUv);
	// return ditherBlueNoise(ditherUv).r;
}

vec3 ditherPalette(vec3 color, ivec2 ditherUv) {
	// https://www.shadertoy.com/view/dlcGzN
	
	// number of iterations per fragment (higher N means more samples)
	int iterations = _paletteDitherIterations;
	// quantization error coefficient (0 is no dithering)
	float errorFactor = _paletteDitherErrorFactor;
	
	// create a mapping from sorted palette indices to actual indices;
	
	int mapLuminanceToIndex[paletteSize];
	
	for (int i = 0; i < paletteSize; i++)
	{
		mapLuminanceToIndex[i] = i;
	}
	
	// sort the index array by the corresponding palette colors' luminance (bubble sort)
	// TODO: this is expensive, we should move palette outside to renderer pass or something
	
	// for (int i = paletteSize - 1; i > 0; i--) {
	// 	for (int j = 0; j < 1; j++) {
	// 		if (
	// 			luminance(palette[mapLuminanceToIndex[j]]) >
	// 			luminance(palette[mapLuminanceToIndex[j + 1]])	
	// 		) {
	// 			// swap indices
	// 			int t = mapLuminanceToIndex[j];
	// 			mapLuminanceToIndex[j] = mapLuminanceToIndex[j + 1];
	// 			mapLuminanceToIndex[j + 1] = t;
	// 		}
	// 	}
	// }
	
	// accumulate the frequencies for each palette color
	int frequency[paletteSize];
	vec3 quantError = vec3(0.0, 0.0, 0.0);
	
	for (int i = 0; i < paletteSize; i++) {
		frequency[i] = 0;
	}
	
	for (int i = 0; i < iterations; i++) {
		vec3 goalColor = color + quantError * errorFactor;
		int closestColor = paletteClosestIndex(goalColor);
		
		frequency[closestColor] += 1;
		quantError += color - palette[closestColor];
	}
	
	// select the output color by accumulating the frequencies until the candidate is found
	
	int ditherValue = int(ditherByPreference(ditherUv) * float(iterations - 1));
	
	int cumulativeSum = 0;
	
	for (int i = 0; i < paletteSize; i++) {
		cumulativeSum += frequency[mapLuminanceToIndex[i]];
		
		if (ditherValue < cumulativeSum) {
			return palette[mapLuminanceToIndex[i]];
		}
	}
	
	return vec3(0.0, 0.0, 0.0);
}
*/

vec3 saturate(vec3 v) {
	return vec3(clamp(v.x, 0.0, 1.0), clamp(v.y, 0.0, 1.0), clamp(v.z, 0.0, 1.0));
}

vec3 HSVToRGB(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, saturate(p - K.xxx), c.y);
}

void main()
{
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;

	// float scale = 4.0;

	// vec2 screenSize = vec2(u_resolution.xy / scale);
	// uv *= screenSize;
	// uv = floor(uv);
	// uv /= screenSize;

	// vec3 color = HSVToRGB(vec3(uv.y,1,1));

	// NOTE: to get length in seconds do 1 / last number

	float time = u_time_for_gif;

	float y = (uv.y * 0.2) + time * -0.33333333333; 
	float i = mod(y, 1.0) * float(gradientSize);
	int floorI = int(i);

	vec3 color = mix(
		gradient[floorI],
		gradient[(floorI + 1) % gradientSize],
		// mod(i, 1.0)
		dither4x4bayer(ivec2(uv * u_resolution.xy)) < mod(i, 1.0) ? 1.0 : 0.0
	);

	outColor = vec4(color, 1.0);
}