#version 300 es
precision mediump float;

out vec4 outColor;

uniform float u_time;
uniform vec2 u_resolution;

void main()
{
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;

	outColor = vec4(uv, 0.0, 1.0);
}