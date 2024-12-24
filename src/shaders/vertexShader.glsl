varying vec2 vUv;

void main() {
    // Pass UV coordinates to fragment shader
    vUv = uv; // Using the default UV coordinates
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
