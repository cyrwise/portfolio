uniform sampler2D texture; // Texture uniform
varying vec2 vUv; // UV coordinates

void main() {
    vec4 texColor = texture2D(texture, vUv); // Sample the texture using UV coordinates
    gl_FragColor = texColor; // Set the fragment color
}
