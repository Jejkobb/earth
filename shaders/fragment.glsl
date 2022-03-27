uniform sampler2D globeTexture;
uniform sampler2D cloudTexture;
uniform float u_time;

varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
    vec3 clouds = texture2D(cloudTexture, vec2(vertexUV.x, vertexUV.y)).xyz;

    gl_FragColor = vec4(atmosphere + clouds + texture2D(globeTexture, vertexUV).xyz, 1.0);
}