// Typing Effect
const text = "Hi, I'm Premomayee";
let i = 0;

function typeEffect(){
  if(i < text.length){
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect,120);
  }
}
typeEffect();

// Scroll Reveal
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 100){
      el.classList.add("active");
    }
  });
});

// ===== FLOATING LIGHT FOG BACKGROUND =====

const canvas = document.getElementById("three-bg");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 60;

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Fog
scene.fog = new THREE.FogExp2(0x05070f, 0.02);

// Particles
const count = 1200;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);

for(let i=0;i<count*3;i++){
  positions[i] = (Math.random() - 0.5) * 400;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions,3));

const material = new THREE.PointsMaterial({
  color: 0x00f7ff,
  size: 1.2,
  transparent: true,
  opacity: 0.6
});

const points = new THREE.Points(geometry, material);
scene.add(points);

// Animate
function animate(){
  requestAnimationFrame(animate);

  points.rotation.y += 0.0006;
  points.rotation.x += 0.0003;

  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener("resize", ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
