import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

const SPACE_PURPLE = 0x0d071c;
const bodies = [
  { id: "sun", name: "El Sol", color: 0xffb52f, labelColor: "#ffd477", radius: 1.55, distance: 0, emissive: 0xff7614 },
  { id: "mercury", name: "Mercurio", color: 0x9b9991, labelColor: "#bdb9ae", radius: 0.23, distance: 2.8, phase: 0.55, inclination: 0.06, node: 0.22 },
  { id: "venus", name: "Venus", color: 0xd79c59, labelColor: "#e1b979", radius: 0.36, distance: 4.05, phase: 2.5, inclination: -0.18, node: -0.34 },
  { id: "earth", name: "La Tierra", color: 0x3f80a8, labelColor: "#75c4e7", radius: 0.42, distance: 5.35, phase: 4.25, inclination: 0.12, node: 0.46 },
  { id: "mars", name: "Marte", color: 0xb65b42, labelColor: "#e07b5b", radius: 0.31, distance: 6.65, phase: 1.18, inclination: 0.3, node: -0.1 },
  { id: "jupiter", name: "Júpiter", color: 0xc89d78, labelColor: "#e2bb91", radius: 0.88, distance: 8.7, phase: 3.05, inclination: -0.16, node: 0.6 },
  { id: "saturn", name: "Saturno", color: 0xcab27e, labelColor: "#ebd39c", radius: 0.73, distance: 10.65, phase: 4.9, inclination: 0.23, node: -0.46, rings: true },
  { id: "uranus", name: "Urano", color: 0x74c1c4, labelColor: "#9be4e2", radius: 0.54, distance: 12.35, phase: 5.65, inclination: -0.34, node: 0.26 },
  { id: "neptune", name: "Neptuno", color: 0x466dc1, labelColor: "#82a6f5", radius: 0.53, distance: 14.05, phase: 2.1, inclination: 0.14, node: -0.68 },
];

const container = document.querySelector("#scene-container");
const scene = new THREE.Scene();
scene.background = new THREE.Color(SPACE_PURPLE);
scene.fog = new THREE.FogExp2(SPACE_PURPLE, 0.0058);

const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 140);
camera.position.set(0, 16, 29);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
container.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.inset = "0";
labelRenderer.domElement.style.pointerEvents = "none";
container.appendChild(labelRenderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.enablePan = false;
controls.minDistance = 13;
controls.maxDistance = 80;
controls.maxPolarAngle = Math.PI * 0.9;
controls.minPolarAngle = Math.PI * 0.1;
controls.target.set(0, 0, 0);

scene.add(new THREE.AmbientLight(0x8893a9, 0.42));
const sunLight = new THREE.PointLight(0xffc46a, 48, 58, 1.75);
sunLight.position.set(0, 0.35, 0);
scene.add(sunLight);

const systemGroup = new THREE.Group();
scene.add(systemGroup);
const planetGroups = new Map();
const clickableMeshes = [];

function createStarTexture(type) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  const center = 64;

  if (type === "glow") {
    const gradient = context.createRadialGradient(center, center, 0, center, center, 62);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    gradient.addColorStop(0.12, "rgba(255, 255, 255, 0.6)");
    gradient.addColorStop(0.36, "rgba(255, 255, 255, 0.18)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    context.save();
    context.translate(center, center);
    context.shadowColor = "rgba(255, 255, 255, 0.95)";
    context.shadowBlur = 9;
    context.fillStyle = "rgba(255, 255, 255, 0.98)";
    context.beginPath();
    for (let point = 0; point < 8; point += 1) {
      const angle = -Math.PI / 2 + (point * Math.PI) / 4;
      const radius = point % 2 === 0 ? 55 : 8;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (point === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.closePath();
    context.fill();
    context.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const starGlowTexture = createStarTexture("glow");
const starCoreTexture = createStarTexture("core");

function createStars() {
  const positions = [];
  const colors = [];
  const starColors = [0xd8c2ff, 0xf3ddff, 0xa77bff, 0xffb8f4];

  for (let i = 0; i < 2300; i += 1) {
    const radius = 38 + Math.random() * 70;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    );
    const color = new THREE.Color(starColors[Math.floor(Math.random() * starColors.length)]);
    colors.push(color.r, color.g, color.b);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const glowMaterial = new THREE.PointsMaterial({
    map: starGlowTexture,
    size: 19,
    vertexColors: true,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: false,
  });
  const coreMaterial = new THREE.PointsMaterial({
    map: starCoreTexture,
    size: 5.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.98,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: false,
  });
  const stars = new THREE.Group();
  stars.add(new THREE.Points(geometry, glowMaterial), new THREE.Points(geometry, coreMaterial));
  scene.add(stars);
  return stars;
}

const stars = createStars();

const meteorNames = ["$@%_=?&", "@#&_==?", "$%&@_??", "@=^$%&?", "#@$_%=?"];
const meteors = new Set();

function getMeteorPath() {
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
  const up = new THREE.Vector3().crossVectors(right, forward).normalize();
  const cameraDistance = camera.position.distanceTo(controls.target);
  const distance = Math.min(Math.max(cameraDistance * 0.86, 27), 60);
  const center = controls.target.clone().add(forward.multiplyScalar(distance));
  const halfHeight = distance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const halfWidth = halfHeight * camera.aspect;
  const height = halfHeight * (0.72 + Math.random() * 0.12);
  const start = center.clone()
    .add(right.clone().multiplyScalar(-halfWidth * 1.14))
    .add(up.clone().multiplyScalar(height));
  const end = center.clone()
    .add(right.clone().multiplyScalar(halfWidth * 1.14))
    .add(up.clone().multiplyScalar(height - halfHeight * 0.16));
  return { start, end };
}

function createDustCloud(position, direction) {
  const count = 52;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const velocities = [];

  for (let index = 0; index < count; index += 1) {
    const spread = 0.25 + Math.random() * 0.45;
    positions[index * 3] = position.x + (Math.random() - 0.5) * spread;
    positions[index * 3 + 1] = position.y + (Math.random() - 0.5) * spread;
    positions[index * 3 + 2] = position.z + (Math.random() - 0.5) * spread;
    const color = new THREE.Color([0xb58aff, 0xe0bfff, 0x8c55e8][index % 3]);
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
    velocities.push(new THREE.Vector3(
      direction.x * (0.5 + Math.random() * 1.1) + (Math.random() - 0.5) * 1.7,
      (Math.random() - 0.5) * 1.7,
      direction.z * (0.5 + Math.random() * 1.1) + (Math.random() - 0.5) * 1.7,
    ));
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    map: starCoreTexture,
    size: 3.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: false,
  });
  return { points: new THREE.Points(geometry, material), velocities };
}

function spawnMeteor() {
  if (meteors.size > 0) return;
  const { start, end } = getMeteorPath();
  const direction = end.clone().sub(start).normalize();
  const group = new THREE.Group();
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: starGlowTexture,
    color: 0xb77aff,
    transparent: true,
    opacity: 0.88,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  glow.scale.setScalar(3.7);
  const head = new THREE.Sprite(new THREE.SpriteMaterial({
    map: starCoreTexture,
    color: 0xf2ddff,
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  head.scale.setScalar(1.12);
  group.add(glow, head);

  const trailPointCount = 9;
  const trailGeometry = new THREE.BufferGeometry();
  trailGeometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(trailPointCount * 3), 3));
  const trail = new THREE.Line(trailGeometry, new THREE.LineBasicMaterial({
    color: 0xc188ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  group.add(trail);

  const trailDustGeometry = new THREE.BufferGeometry();
  trailDustGeometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(26 * 3), 3));
  const trailDust = new THREE.Points(trailDustGeometry, new THREE.PointsMaterial({
    map: starGlowTexture,
    color: 0xb47cff,
    size: 0.22,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  group.add(trailDust);

  const labelElement = document.createElement("div");
  labelElement.className = "meteor-label";
  labelElement.textContent = meteorNames[Math.floor(Math.random() * meteorNames.length)];
  const label = new CSS2DObject(labelElement);
  group.add(label);
  scene.add(group);
  meteors.add({
    group,
    glow,
    head,
    trail,
    trailDust,
    label,
    start,
    end,
    direction,
    elapsed: 0,
    duration: 6.2,
    phase: "travel",
    dust: null,
    dustElapsed: 0,
  });
}

function updateMeteorTrail(meteor, position) {
  const trailPositions = meteor.trail.geometry.attributes.position.array;
  const tailLength = 9.5;
  for (let index = 0; index < 9; index += 1) {
    const trailPosition = position.clone().addScaledVector(meteor.direction, -tailLength * (index / 8));
    trailPositions[index * 3] = trailPosition.x;
    trailPositions[index * 3 + 1] = trailPosition.y;
    trailPositions[index * 3 + 2] = trailPosition.z;
  }
  meteor.trail.geometry.attributes.position.needsUpdate = true;

  const dustPositions = meteor.trailDust.geometry.attributes.position.array;
  for (let index = 0; index < 26; index += 1) {
    const distance = Math.random() * tailLength;
    const dustPosition = position.clone().addScaledVector(meteor.direction, -distance);
    dustPositions[index * 3] = dustPosition.x + (Math.random() - 0.5) * 0.16;
    dustPositions[index * 3 + 1] = dustPosition.y + (Math.random() - 0.5) * 0.16;
    dustPositions[index * 3 + 2] = dustPosition.z + (Math.random() - 0.5) * 0.16;
  }
  meteor.trailDust.geometry.attributes.position.needsUpdate = true;
  meteor.label.position.copy(position);
  meteor.label.position.y += 0.62;
}

function updateMeteors(delta) {
  for (const meteor of meteors) {
    if (meteor.phase === "travel") {
      meteor.elapsed += delta;
      const progress = Math.min(meteor.elapsed / meteor.duration, 1);
      const position = meteor.start.clone().lerp(meteor.end, progress);
      const fadeIn = Math.min(meteor.elapsed / 0.85, 1);
      const fadeOut = Math.min((meteor.duration - meteor.elapsed) / 0.9, 1);
      const visibility = Math.max(0, Math.min(fadeIn, fadeOut));
      meteor.glow.position.copy(position);
      meteor.head.position.copy(position);
      meteor.glow.material.opacity = 0.88 * visibility;
      meteor.head.material.opacity = visibility;
      meteor.trail.material.opacity = 0.8 * visibility;
      meteor.trailDust.material.opacity = 0.75 * visibility;
      meteor.label.element.style.opacity = visibility;
      updateMeteorTrail(meteor, position);

      if (progress >= 1) {
        meteor.phase = "dust";
        meteor.dust = createDustCloud(meteor.end, meteor.direction);
        meteor.group.add(meteor.dust.points);
        meteor.group.remove(meteor.glow, meteor.head, meteor.trail, meteor.trailDust, meteor.label);
      }
    } else {
      meteor.dustElapsed += delta;
      const dustPosition = meteor.dust.points.geometry.attributes.position.array;
      for (let index = 0; index < meteor.dust.velocities.length; index += 1) {
        dustPosition[index * 3] += meteor.dust.velocities[index].x * delta;
        dustPosition[index * 3 + 1] += meteor.dust.velocities[index].y * delta;
        dustPosition[index * 3 + 2] += meteor.dust.velocities[index].z * delta;
      }
      meteor.dust.points.geometry.attributes.position.needsUpdate = true;
      meteor.dust.points.material.opacity = Math.max(0, 0.9 * (1 - meteor.dustElapsed / 1.15));
      if (meteor.dustElapsed >= 1.15) {
        scene.remove(meteor.group);
        meteors.delete(meteor);
      }
    }
  }
}

function scheduleMeteor() {
  window.setTimeout(() => {
    spawnMeteor();
    scheduleMeteor();
  }, 6000 + Math.random() * 4500);
}

scheduleMeteor();

function createOrbit(body, index) {
  const curve = new THREE.EllipseCurve(0, 0, body.distance, body.distance * (0.97 + index * 0.002), 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(160).map((point) => new THREE.Vector3(point.x, 0, point.y));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: index > 5 ? 0x434850 : 0x353b40,
    transparent: true,
    opacity: 0.38,
  });
  const orbit = new THREE.LineLoop(geometry, material);
  orbit.rotation.set(body.inclination, body.node, 0);
  systemGroup.add(orbit);
}

function createLabel(body) {
  const element = document.createElement("div");
  element.className = `planet-label${body.id === "sun" ? " sun-label" : ""}`;
  element.textContent = body.name;
  element.style.setProperty("--label-color", body.labelColor);
  const label = new CSS2DObject(element);
  label.position.y = body.radius + (body.id === "sun" ? 0.28 : 0.18);
  return label;
}

function createSun(body) {
  const group = new THREE.Group();
  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(body.radius * 1.25, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffa51e, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(body.radius, 48, 48),
    new THREE.MeshStandardMaterial({ color: body.color, emissive: body.emissive, emissiveIntensity: 1.8, roughness: 0.72 }),
  );
  group.add(glow, mesh, createLabel(body));
  mesh.userData.body = body;
  systemGroup.add(group);
  planetGroups.set(body.id, group);
  clickableMeshes.push(mesh);
}

function createPlanet(body, index) {
  createOrbit(body, index);
  const orbitPlane = new THREE.Group();
  orbitPlane.rotation.set(body.inclination, body.node, 0);
  systemGroup.add(orbitPlane);

  const group = new THREE.Group();
  group.position.set(Math.cos(body.phase) * body.distance, 0, Math.sin(body.phase) * body.distance);
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(body.radius, 32, 24),
    new THREE.MeshStandardMaterial({ color: body.color, roughness: 0.78, metalness: 0.02 }),
  );
  mesh.userData.body = body;
  group.add(mesh);

  if (body.id === "earth") {
    group.add(new THREE.Mesh(
      new THREE.SphereGeometry(body.radius * 1.08, 32, 24),
      new THREE.MeshBasicMaterial({ color: 0x7fd7ff, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, side: THREE.BackSide }),
    ));
  }

  if (body.rings) {
    const rings = new THREE.Mesh(
      new THREE.RingGeometry(body.radius * 1.38, body.radius * 2.2, 64),
      new THREE.MeshBasicMaterial({ color: 0xcbb889, transparent: true, opacity: 0.65, side: THREE.DoubleSide }),
    );
    rings.rotation.x = Math.PI / 2;
    rings.rotation.z = THREE.MathUtils.degToRad(-13);
    group.add(rings);
  }

  group.add(createLabel(body));
  orbitPlane.add(group);
  planetGroups.set(body.id, group);
  clickableMeshes.push(mesh);
}

createSun(bodies[0]);
bodies.slice(1).forEach(createPlanet);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let lastPointerDown = { x: 0, y: 0 };

function findBody(event) {
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  return raycaster.intersectObjects(clickableMeshes, false)[0]?.object.userData.body;
}

renderer.domElement.addEventListener("pointermove", (event) => {
  renderer.domElement.style.cursor = findBody(event) ? "pointer" : "grab";
});

renderer.domElement.addEventListener("pointerdown", (event) => {
  lastPointerDown = { x: event.clientX, y: event.clientY };
});

renderer.domElement.addEventListener("pointerup", (event) => {
  const moved = Math.hypot(event.clientX - lastPointerDown.x, event.clientY - lastPointerDown.y);
  if (moved < 7 && findBody(event)) renderer.domElement.style.cursor = "pointer";
});

function resize() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const mobile = width < 600;
  camera.fov = mobile ? 54 : 42;
  camera.position.set(0, mobile ? 24 : 16, mobile ? 56 : 29);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  labelRenderer.setSize(width, height);
}

const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(container);
resize();

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  const elapsed = clock.elapsedTime;
  stars.rotation.y = elapsed * 0.0018;
  const sun = planetGroups.get("sun");
  sun.rotation.y = elapsed * 0.04;
  sun.children[0].scale.setScalar(1 + Math.sin(elapsed * 1.55) * 0.035);
  updateMeteors(delta);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();
window.addEventListener("beforeunload", () => resizeObserver.disconnect());
