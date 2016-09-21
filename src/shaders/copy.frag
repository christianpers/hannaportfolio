precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uTexturePos;

uniform float uFadeAmount;

void main(void) {
	vec3 colorBase = texture2D(uTexturePos, vec2(vTextureCoord.s, vTextureCoord.t)).rgb;
	// vec3 colorOffset = texture2D(uTexturePos, vec2(vTextureCoord.s + .2, vTextureCoord.t)).rgb;
	// colorOffset -= vec3(1.0, 1.0 ,.1);
	// // colorOffset = mix(colorOffset, vec3(1.0, .23, .45), .3);

	// colorBase = mix(colorBase, vec3(.5, 1.0 , 2.0), .9);

	// vec3 color = colorBase + colorOffset;
	// vec3 color = mix(colorBase, colorOffset, .5);
	// color -= (uFadeAmount / 6.0) * 1.5;
	// color += colorOffset;
    // gl_FragColor = texture2D(uTexturePos, vec2(vTextureCoord.s, vTextureCoord.t));
    gl_FragColor = vec4(colorBase, 1.0);
}