import gsap from 'gsap';
import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';
import cloudFragmentShader from './shaders/cloudFragment.glsl';
import { Float32BufferAttribute } from 'three';

const canvasContainer = document.querySelector('#canvas-container');

const scene = new THREE.Scene();
const camera = new THREE.
  PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  );

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('canvas')
});

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./img/globe.jpg')
      },
      cloudTexture: {
        value: new THREE.TextureLoader().load('./img/clouds.jpg')
      }
    }
  }));

// create atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader:atmosphereVertexShader,
    fragmentShader:atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  }));

atmosphere.scale.set(1.1,1.1,1.1);

scene.add(atmosphere);

const group = new THREE.Group();
group.add(sphere);
scene.add(group);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({color: 0xFFFFFF});

const starVertices = [];
for(let i = 0; i < 10000; i++){
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 2000;
  starVertices.push(x,y,z);
}

starGeometry.setAttribute('position', new Float32BufferAttribute(starVertices, 3));

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

camera.position.z = 10;

var mouseDown = false;
const mouse = {
  x: 0,
  y: 0
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  stars.rotation.z += 0.0001;

  if(mouseDown){
    gsap.to(group.rotation, {
      x: -(mouse.y/10) * 0.3,
      y: (mouse.x/10) * 0.5,
      duration: 2
    });
  }
}

animate();

addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = -e.clientY;
})

document.body.onmousedown = function() { 
  mouseDown = true;
}
document.body.onmouseup = function() {
  mouseDown = false;
}