uniform sampler2D cloudTexture;

varying vec2 vertexUV;

void main() {
    vec3 clouds = texture2D(cloudTexture, vertexUV).xyz;

    gl_FragColor = vec4(clouds-0.3, 1);
}