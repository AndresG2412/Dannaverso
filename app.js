import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

const SPACE_PURPLE = 0x0d071c;
const bodies = [
  { id: "sun", name: "El Sol", type: "Estrella", description: "La estrella que ilumina y mantiene unido todo el sistema solar.", colorName: "DORADO", preview: "radial-gradient(circle at 30% 27%, #fff4be 0 5%, #ffd477 24%, #ff9e31 62%, #b83d14 100%)", image: "/planets/Sol.png", color: 0xffb52f, labelColor: "#ffd477", radius: 1.55, distance: 0, emissive: 0xff7614 },
  { id: "planet-1", name: "Noviembre", type: "Planeta", description: "Nuestro segundo mes, este es un mes lleno de emociones tanto dulces como tristes, por segunda vez en mi vida me golpean con la pérdida de uno de mis familiares, y la verdad agradezco haberte encontrado antes de que pasara, aunque justamente el día para nada que lo agradezca, pero será por algo, no sé cómo trabaja Dios pero no dudo de él, agradezco que estuvieras conmigo esa noche porque sin ti no quiero ni imaginar qué habría hecho en definitiva, gracias por ayudarme a sobrellevar la situación que a pesar de que hasta el sol de hoy me afecte, sé que contigo al menos esa carga no la tengo que cargar solo, que sé que cuando sienta que no puedo más, puedo contar contigo, te amo", colorName: "LILA", preview: "radial-gradient(circle at 30% 25%, #e9d5ff 0 5%, #a76bea 45%, #3d1b72 100%)", image: "/planets/Noviembre.png", color: 0x9a62d6, labelColor: "#d6b3ff", radius: 0.28, distance: 2.65, phase: 0.42, inclination: 0.08, node: 0.2, spinAxis: [1, 0.2, 0.1], spinSpeed: 0.42 },
  { id: "planet-2", name: "Diciembre", type: "Planeta", description: "Nuestra primera navidad y año nuevo! Y la verdad me encantó pasarlo contigo, a pesar que no pudimos pasar mi cumpleaños juntos, agradezco tanto que hayas estado en año nuevo, porque como mencioné antes, gracias a eso pude llevar esa noche tan dolorosa más amena, más tranquilo al saber que puedo contar contigo, no sabes lo mucho que te amo y que agradezco cada mínima cosa, me encantó ir a Cristo Rey juntos, pasar año nuevo juntos, que conozcas más de mi familia, más de mí, y seguir creando experiencias, momentos y recuerdos contigo es lo que más me hace feliz", colorName: "AZUL", preview: "radial-gradient(circle at 30% 25%, #b8e7ff 0 5%, #3d8ac5 46%, #12345e 100%)", image: "/planets/Diciembre.png", color: 0x3c83bb, labelColor: "#8ed4ff", radius: 0.36, distance: 3.85, phase: 2.56, inclination: -0.2, node: -0.34, spinAxis: [0.2, 1, 0.15], spinSpeed: 0.54 },
  { id: "planet-3", name: "Enero", type: "Planeta", description: "Cuarto mes juntos mi amor, qué más que decir que me da felicidad recordar que lo pasé contigo, que desperté contigo y era año nuevo, nuevo año para proponerme mejorar y avanzar, caer y levantarme, aceptar y seguir, gracias a ti los dolores se han hecho más llevaderos aunque sigan estando; en este mes no hay mucho que decir, empezamos el mes juntos y a pesar que tuve que volver a Pitalito fui feliz porque me propuse también que no fuera el primero y el último, porque sé que quiero tenerte a mi lado por el resto de mi vida, mejorar día a día para ser la mejor pareja, el mejor hombre y lo mejor que te hayas topado en este camino llamado vida", colorName: "CORAL", preview: "radial-gradient(circle at 29% 24%, #ffd0c7 0 4%, #e16f68 42%, #6b252d 100%)", image: "/planets/Enero.png", color: 0xd76968, labelColor: "#ffaaa1", radius: 0.48, distance: 5.05, phase: 4.2, inclination: 0.14, node: 0.46, spinAxis: [0.3, 0.1, 1], spinSpeed: 0.36 },
  { id: "planet-4", name: "Febrero", type: "Planeta", description: "El mes con mi número favorito, Quinto mes mi amor! Feliz de haber pasado este mes tan lleno de amor contigo, haber disfrutado San Valentín contigo, haber tenido nuestra pequeña cita, ir a comer juntos por primera vez en ese restaurante, habernos tomado muchas fotos juntos, y espero que para ti haya sido igual de feliz que para mí, intenté que fuera un día bonito, que a pesar de que la distancia nos estaba separando siempre buscar un lugar para ti, darte tu tiempo y tu espacio como mi mujer que lo mereces, no hay mucho que decir más que gracias por darme la oportunidad de darte todo lo que tengo, y a su vez nuestra segunda cita por primera vez probando Herreros que nos quedó encantando, y llegar a casa dormir contigo fue lo mejor, volver a sentir eso después de tanto tiempo, te amo", colorName: "VERDE", preview: "radial-gradient(circle at 30% 25%, #d2ffd7 0 5%, #4eaa76 40%, #194b42 100%)", image: "/planets/Febrero.png", color: 0x50a875, labelColor: "#9affc2", radius: 0.58, distance: 6.3, phase: 1.06, inclination: 0.3, node: -0.1, spinAxis: [1, 0.4, 0.2], spinSpeed: 0.47 },
  { id: "planet-11", name: "Marzo", type: "Planeta", description: "Llegamos a la mitad de nuestro aniversario, Sexto mes juntos amor, aquí ya no estamos hablando de algo pasajero sino de medio año, un semestre, 6 meses completos! Igual yo sabía que yo no quería algo pasajero contigo pero aún así, todos los días agradezco a Dios por traerte a mi vida, y le pido que me dé fortaleza, inteligencia y paciencia para poder llevar nuestra relación, que con esto cada día ser mejor pareja, aún me acuerdo salir de la universidad y hacer vueltas y que vengas por mí, no tuvimos muchas salidas por la ocasión pero fui muy feliz contigo hablando todas las noches por llamada", colorName: "MAGENTA", preview: "radial-gradient(circle at 30% 25%, #ffd0fa 0 5%, #c34fa9 44%, #5a164d 100%)", image: "/planets/Marzo.png", color: 0xc34fa9, labelColor: "#ff9be7", radius: 0.63, distance: 14.65, phase: 3.65, inclination: -0.14, node: 0.18, spinAxis: [0.6, 1, 0.2], spinSpeed: 0.5 },
  { id: "planet-5", name: "Abril", type: "Planeta", description: "Siete meses juntos, y contando aún, este mes fue para mí uno de los más difíciles de llevar porque me gradué al fin de la universidad y el no tener a mi padre me dolió tanto, a pesar de ello me apoyaste en todo, recuerdo ir juntos a mi barbería, presentarte ante mi barbero, ir a la universidad contigo y tantas salidas juntos, a pesar de que no pudiste estar en mi graduación sé que estuviste todo el rato a mi lado, apoyándome, porque estaba ahogado en nervios pero imaginarme conmigo me ayudó mucho, a estar tranquilo y no caerme mientras caminaba yendo por ese diploma (que ay ni sé dónde está) pero fui feliz, por las salidas que tuvimos, recuerdas que fuimos por pizza un día, luego al único y combinamos mi camiseta con tu pelo, y que nos tomamos fotos con máscaras de dinosaurio, me encantó mucho", colorName: "AMARILLO", preview: "radial-gradient(circle at 28% 24%, #fff6b8 0 5%, #d8ad42 43%, #704724 100%)", image: "/planets/Abril.png", color: 0xd8ad42, labelColor: "#ffe58c", radius: 0.7, distance: 7.55, phase: 3.02, inclination: -0.17, node: 0.6, spinAxis: [0.2, 1, 0.4], spinSpeed: 0.31 },
  { id: "planet-9", name: "Mayo", type: "Planeta", description: "Octavo mes mi amor, este mes tampoco hay mucho que decir, lamentablemente la distancia nos separó por mucho tiempo, pero aún así seguimos firmes, seguimos creciendo, eligiéndonos, estando juntos y apoyándonos diariamente, a pesar de las dificultades que hubieron puedo asegurar que cada día me encantas más, que me sigues gustando, enamorando, que a pesar de que no vivimos mucho en un mes como este es increíble cómo seguimos estando juntos, aún así recuerdo que te di a nuestro primer hijo y así llegó Stefano, cuando lo vi y pensé en ti, en que quería regalártelo y sin duda fue el primer peluche que compró y regalo, que en serio me siento feliz de dar, gracias por darme esa experiencia y muchas primeras veces más, también el casco que sé que fue duro para ti perderlo pero me dio tanta felicidad tener la solvencia para regalarte uno, que en definitiva me propuse darte muchos regalos más, porque te hacen feliz y me hace feliz dártelos", colorName: "VIOLETA", preview: "radial-gradient(circle at 30% 25%, #e8c9ff 0 5%, #8951c9 45%, #30164f 100%)", image: "/planets/Mayo.png", color: 0x8951c9, labelColor: "#d7a9ff", radius: 0.76, distance: 12.45, phase: 2.4, inclination: -0.26, node: 0.37, spinAxis: [0.7, 0.1, 1], spinSpeed: 0.45 },
  { id: "planet-6", name: "Junio", type: "Planeta", description: "Noveno mes mi amor! Y es justo donde conoces Pitalito! Espero te haya gustado, intenté hacer tu visita muy agradable, darte lo mejor y mostrarte la mejor cara de el pueblo, que hayas disfrutado todos los días como yo lo disfruté contigo, gracias por acompañarme a todo como mi garrapatita que me encanta que así haya sido, me sentí feliz yendo a hacer las cosas contigo porque sin ti lo hago pero sin ganas, disfruté mucho nuestras salidas en el pueblo, conocer restaurantes juntos como el de osos, tener nuestra cita de mes en un restaurante bonito, que conozcas donde estudié, mi familia de parte de padre, la finca de mis abuelos, me encantó todo contigo este mes, fue el mejor que deseaba que nunca se hubiera acabado porque por mí ni te dejaba ir de Pitalito, estuve tan triste esa noche cuando te fuiste porque me acostumbré tanto a ti que no me imaginaba ya sin ti y confirmé que me encantaría vivir contigo, y es mi meta a cumplir", colorName: "ROJO", preview: "radial-gradient(circle at 30% 25%, #ffbaa7 0 5%, #bd4f63 43%, #521f3b 100%)", image: "/planets/Junio.png", color: 0xbd4f63, labelColor: "#ff9bb0", radius: 0.82, distance: 8.85, phase: 4.82, inclination: 0.25, node: -0.46, spinAxis: [0.4, 0.2, 1], spinSpeed: 0.39 },
  { id: "planet-7", name: "Julio", type: "Planeta", description: "Un nuevo mes, aqui ya cumplimos 10 meses, Decimo mes!, el tiempo pasa volando y mas cuando cada dia es felicidad contigo, no sabes cuanta felcidad me brindas dia a dia; eres la tranquilidad que jamas cambiaria ni dejaría, desd del primer dia, desde el primer momento supe que eras tu, y que siempre serás tu la luz que quiero que ilumine mis dias. De este mes no hay mucho que decir ya que no estuvimos juntos, aunque pasamos por mucho, problemas, bajadas de animo, dudas del futuro, aun asi me gusta pasar esto mientras sea contigo porque se que nos fortalece, y en realidad me asusta pero prefiero abrirme de formas sentimentales contigo, porque se que puedo hacerlo, sin mas que añadir, solo queda agradecer por aguantar me desde lejos, mis noches que no se ni que hablar, o que este con dudas sobre mi futuro, sobre como ayudar a mi familia, gracias por escucharme, apoyarme, comprenderme aunque no sepas de lo que hablo, te amo.", colorName: "TURQUESA", preview: "radial-gradient(circle at 30% 25%, #c7ffff 0 5%, #45b9b3 44%, #164d62 100%)", image: "/planets/Julio.png", color: 0x45b9b3, labelColor: "#8fffea", radius: 0.94, distance: 10.1, phase: 1.7, inclination: -0.33, node: 0.26, spinAxis: [1, 0.7, 0.1], spinSpeed: 0.28 },
  { id: "planet-8", name: "Agosto", type: "Planeta", description: "11 meses mi amor, Onceavo mes, un mes dificil, trabajando en la buseta sin poder vernos por mucho tiempo, sin contar el error y desvío que cometí, me creo muy hombre y fuerte, pero ante ti me desarmo completamente, este mes sinceramente siento que fue una revelación para mi, un error que me cuesta aun perdonarme por lastimar a la persona que mas amo, aunque se que en parte gracias a ello pude analizarme desde otra perspectiva, ver mis falencias y en definitiva mejorar, se que me convertí en un mejor hombre, pareja y humano, no gracias a lo que paso sino por ti, por mis por nosotros, sera algo de lo que me lamentare todo los dias pero de lamentos no se vive y por eso decidí actuar y en definitiva cortar ese error de raíz, porque se lo que tengo y no esperare a pederlo para valorarlo, lo valorare cada dia mas, se que eres tu quien quiero en mi vida, se lo que quiero en mi vida, y aunque por unos dias perdí ese enfoque, ahora lo tengo mas que claro, que se que es una mentalidad que por errores míos no supe llevar pero que se que no volverá a salirse de mi, porque mi pareja, tu, eres el amor de mi vida y lo mas preciado que tengo, solo me queda seguir demostrando que si cambio para bien, que si cumplo lo que digo, que gracias por dejarme mostrártelo, por permitirme la oportunidad y que a pesar de estar desarmado no tener miedo ante ti; por algo existe un dicho que aunque los doctores crean las heridas, algo arreglaran dentro de uno, ayudan a cerrar la herida que ellos provocaron y que poco a poco se cierre aunque quede visible.", colorName: "NARANJA", preview: "radial-gradient(circle at 29% 24%, #ffe0a9 0 5%, #df7d39 43%, #6e2b24 100%)", image: "/planets/Agosto.png", color: 0xdf7d39, labelColor: "#ffc185", radius: 1.06, distance: 11.3, phase: 5.66, inclination: 0.17, node: -0.62, spinAxis: [0.1, 1, 0.7], spinSpeed: 0.34 },
  { id: "planet-10", name: "Septiembre", type: "Planeta", description: "Decimo Segundo mes, 12 meses, un año, 2 semestres, y el primero de muchos, en verdad no existen palabras para decirte lo que siento pero de alguna forma debo describirlo, para empezar seria felicidad porque enserio, me hace muy feliz saber que desde el dia 1 supe que esto pasaría, que nos unía una conexión tan pero tan fuerte que no lo dude ni un segúndo, que aunque no tuviera palabras o algo para decir, se que con solo verte ya te diría que eres a quien he estado esperando no solo esta vida sino durante mucho tiempo, porque eres tu, desde el primer dia y segundo que te encontré, cuando dios me ayudo a ponerte en mi camino; otra cosa que lo describe es tranquilidad, esto porque se que contigo es quien finaliza algo que andaba buscando pero que no sabia que era; y la otra seria la sensación del amor, peor no uno pasajero sino uno puro, uno que se que puedo caer rendido y estar ahi para sostenerme, y quiero que vuelvas a confiar de este modo en mi, que aunque vamos poco a poco, cada dia contigo se siente mágico, se siente unico, se siente todo perfecto, al final también somos humanos imperfectos pero contigo me siento perfectamente imperfecto, te amo con todo mi corazón, Danna, eres el amor de mi vida, y se que la primera vez que te dije que te amaba te dije que era dificil para mi decirlo, pero tu lo haces tan fácil, que jamas quieres dejar de decirtelo.", colorName: "PLATA", preview: "radial-gradient(circle at 29% 25%, #ffffff 0 5%, #aab7c9 44%, #3d4a61 100%)", image: "/planets/Septiembre.png", color: 0xaab7c9, labelColor: "#d8e4ff", radius: 1.18, distance: 13.55, phase: 5.1, inclination: 0.12, node: -0.72, spinAxis: [1, 0.3, 0.8], spinSpeed: 0.26 },
  { id: "planet-12", name: "Octubre", type: "Planeta", description: "Primer mes, aquí comienza nuestra historia, la historia de C y D, Camilo y Danna, todo fue tan normal pero a la vez nuevo contigo, y no hablo de normal aburrido sino que contigo todo se sintió como si ya lo hubiese esperado o vivido, aunque para ser sincero, sí lo soñé y lo pedí mucho a Dios, un amor como el tuyo, como el que tenemos, que me enseñara a llevarlo y mantenerlo, y así fue, Dios me escuchó y me dio exactamente lo que pedí, porque él miró mis sueños y te trajo a mi vida, y no hay día en que no lo agradezca, a pesar de todo esto el primer mes fue mágico, y jamás lo olvidaré, la primera sensación de verte, de abrazarte, de tomarnos de la mano, de nuestro primer beso, y aquí comienza nuestra historia — 16/10/2025", colorName: "AZUL PROFUNDO", preview: "radial-gradient(circle at 29% 25%, #bcd8ff 0 5%, #4169c1 44%, #14245f 100%)", image: "/planets/Octubre.png", color: 0x4169c1, labelColor: "#91b3ff", radius: 1.3, distance: 15.75, phase: 0.9, inclination: 0.32, node: -0.5, spinAxis: [0.3, 0.7, 1], spinSpeed: 0.3 },
];

const container = document.querySelector("#scene-container");
const scene = new THREE.Scene();
scene.background = new THREE.Color(SPACE_PURPLE);
scene.fog = new THREE.FogExp2(SPACE_PURPLE, 0.0058);

const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 140);
camera.position.set(0, 19, 36);

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
const meteorHitboxes = [];

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
  const meteorName = meteorNames[Math.floor(Math.random() * meteorNames.length)];
  labelElement.textContent = meteorName;
  const label = new CSS2DObject(labelElement);
  group.add(label);
  scene.add(group);
  const meteor = {
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
    paused: false,
    name: meteorName,
    description: "Y aqui estamos, 12 meses después, se que nuestra relación no ah sido color de rosas pero créeme que si me dicen que debo repetir todos estos meses, lo haría sin duda alguna ya que por mi parte jamas me arrepentiré y soy muy feliz esperando el futuro con ansias que deseo contigo, al pasar felicidades, tristezas, momentos donde uno de los dos o ambos nos vemos acorralados por la vida, agradezco a dios que llegases tu para no pasar por todo solo, y que me permitió llegar a ti para que no pases por todo sola, y se que hay momentos que es complicado estar juntos pero jamas lo veré como imposible por mas distancia que se interponga, porque yo jamas me rendiría en asuntos que estes tu, tu eres esa energía y mi motor para seguir y seguir dia a dia, por ti es que he avanzado mas de lo que había imaginado, por tu apoyo, amor, palabras, y mucho mas, me encanta cada dia contigo, cada relato, mensaje, llamada, beso, todo, me encanta todo en definitiva.\n\nY aunque no se que nos espere en el futuro, estaré feliz porque se que es contigo, aunque yo diga que no se que nos espera en el futuro yo se muy bien lo que tu y yo queremos, y se que lo cumpliré cueste lo que me cueste, por el amor de mi vida, por ti, amor de mi alma, gracias por dar vida a mi vida, por ser el sol que me ilumina, por ser el ángel que llego a mi vida, por ser mi soporte cuando mas lo necesito, por ser todo para mi, gracias, se que los te amo se quedan cortos pero si el camino pequeño pudiera hablarte, te diríamos si quieres comer con nosotros, si quieres de mi pan con arequipe, si quieres que juguemos juntos, y el Camilo grande solo te dice que eres el amor de su alma, que nunca te vayas de su lado, que gracias por todo, por llegar a la vida de el, y que tomes su mano y caminemos al futuro.\n\nPide un deseo por cierto, al final es una estrella fugaz, y debes pedir el deseo, Te Amo Danna.",
  };
  const hitbox = new THREE.Sprite(new THREE.SpriteMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  }));
  hitbox.scale.setScalar(8);
  hitbox.userData.meteor = meteor;
  meteor.hitbox = hitbox;
  group.add(hitbox);
  meteorHitboxes.push(hitbox);
  meteors.add(meteor);
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
    if (meteor.paused) continue;
    if (meteor.phase === "travel") {
      meteor.elapsed += delta;
      const progress = Math.min(meteor.elapsed / meteor.duration, 1);
      const position = meteor.start.clone().lerp(meteor.end, progress);
      const fadeIn = Math.min(meteor.elapsed / 0.85, 1);
      const fadeOut = Math.min((meteor.duration - meteor.elapsed) / 0.9, 1);
      const visibility = Math.max(0, Math.min(fadeIn, fadeOut));
      meteor.glow.position.copy(position);
      meteor.head.position.copy(position);
      meteor.hitbox.position.copy(position);
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
        meteor.group.remove(meteor.glow, meteor.head, meteor.trail, meteor.trailDust, meteor.label, meteor.hitbox);
        const hitboxIndex = meteorHitboxes.indexOf(meteor.hitbox);
        if (hitboxIndex !== -1) meteorHitboxes.splice(hitboxIndex, 1);
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
        const hitboxIndex = meteorHitboxes.indexOf(meteor.hitbox);
        if (hitboxIndex !== -1) meteorHitboxes.splice(hitboxIndex, 1);
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


const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const MOBILE_QUERY = window.matchMedia("(max-width: 900px)");
const ORBIT_COLOR = new THREE.Color(0x5a4a7a);
const orbitMaterials = new Map();
const labelElements = new Map();

function createRingTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  context.strokeStyle = "rgba(255, 255, 255, 0.95)";
  context.shadowColor = "rgba(255, 255, 255, 0.9)";
  context.shadowBlur = 10;
  context.lineWidth = 3;
  context.beginPath();
  context.arc(128, 128, 104, 0, Math.PI * 2);
  context.stroke();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createGlowSprite(color, opacity, scale) {
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: starGlowTexture,
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  sprite.scale.setScalar(scale);
  return sprite;
}

function createOrbit(body, index) {
  const curve = new THREE.EllipseCurve(0, 0, body.distance, body.distance * (0.97 + index * 0.002), 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(160).map((point) => new THREE.Vector3(point.x, 0, point.y));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: ORBIT_COLOR,
    transparent: true,
    opacity: 0.34,
  });
  const orbit = new THREE.LineLoop(geometry, material);
  orbit.rotation.set(body.inclination, body.node, 0);
  orbitMaterials.set(body.id, material);
  systemGroup.add(orbit);
}

function createLabel(body) {
  const element = document.createElement("button");
  element.type = "button";
  element.className = `planet-label${body.id === "sun" ? " sun-label" : ""}`;
  element.textContent = body.name;
  element.style.setProperty("--label-color", body.labelColor);
  element.addEventListener("click", () => openPlanetPanel(body, { returnFocus: element }));
  labelElements.set(body.id, element);
  const label = new CSS2DObject(element);
  label.position.y = body.radius + (body.id === "sun" ? 0.28 : 0.18);
  return label;
}

function createSun(body) {
  const group = new THREE.Group();
  const label = createLabel(body);
  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(body.radius * 1.25, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffa51e, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(body.radius, 48, 48),
    new THREE.MeshStandardMaterial({ color: body.color, emissive: body.emissive, emissiveIntensity: 1.8, roughness: 0.72 }),
  );
  const corona = createGlowSprite(0xffa53a, 0.5, body.radius * 6.5);
  group.add(glow, mesh, corona);
  label.position.set(0, body.radius + 0.28, 0);
  mesh.userData.body = body;
  group.userData.pressScale = 1;
  systemGroup.add(group);
  systemGroup.add(label);
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
  group.userData.spinAxis = new THREE.Vector3(...body.spinAxis).normalize();
  group.userData.spinSpeed = body.spinSpeed;
  group.userData.pressScale = 1;
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(body.radius, 32, 24),
    new THREE.MeshStandardMaterial({ color: body.color, roughness: 0.78, metalness: 0.02 }),
  );
  mesh.userData.body = body;
  group.add(mesh, createGlowSprite(body.color, 0.2, body.radius * 3.4));

  const label = createLabel(body);
  const labelPosition = group.position.clone().applyEuler(orbitPlane.rotation);
  const labelOffset = new THREE.Vector3(0, body.radius + 0.18, 0).applyEuler(orbitPlane.rotation);
  label.position.copy(labelPosition.add(labelOffset));
  orbitPlane.add(group);
  systemGroup.add(label);
  planetGroups.set(body.id, group);
  clickableMeshes.push(mesh);
}

createSun(bodies[0]);
bodies.slice(1).forEach(createPlanet);

// Selection halo: one ring that moves to whichever body is open.
const halo = new THREE.Sprite(new THREE.SpriteMaterial({
  map: createRingTexture(),
  transparent: true,
  opacity: 0,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
}));
let haloTargetOpacity = 0;
let selectedId = null;

function setSelected(body) {
  if (selectedId) {
    const material = orbitMaterials.get(selectedId);
    if (material) {
      material.color.copy(ORBIT_COLOR);
      material.opacity = 0.34;
    }
    labelElements.get(selectedId)?.classList.remove("is-selected");
  }
  selectedId = body ? body.id : null;
  if (!body) {
    haloTargetOpacity = 0;
    return;
  }
  const material = orbitMaterials.get(body.id);
  if (material) {
    material.color.set(body.labelColor);
    material.opacity = 0.8;
  }
  labelElements.get(body.id)?.classList.add("is-selected");
  planetGroups.get(body.id).add(halo);
  halo.material.color.set(body.labelColor);
  halo.scale.setScalar(body.radius * (body.id === "sun" ? 2.5 : 3));
  halo.material.opacity = 0;
  haloTargetOpacity = 0.85;
}

// Panel content

const MONTH_ORDER = ["Octubre", "Noviembre", "Diciembre", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre"];
const story = [bodies[0], ...MONTH_ORDER.map((name) => bodies.find((body) => body.name === name))];

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const solarStage = document.querySelector("#solar-stage");
const planetPanel = document.querySelector("#planet-panel");
const panelScroll = document.querySelector("#panel-scroll");
const previewSphere = document.querySelector("#planet-preview-sphere");
const panelPlanetImage = document.querySelector("#panel-planet-image");
const panelName = document.querySelector("#panel-name");
const panelMeta = document.querySelector("#panel-meta");
const panelDescription = document.querySelector("#panel-description");
const panelNav = document.querySelector("#panel-nav");
const navPrev = document.querySelector("#nav-prev");
const navNext = document.querySelector("#nav-next");
let activeMeteor = null;
let activeIndex = -1;
let returnFocusTo = null;

const METEOR_PREVIEW = "radial-gradient(circle at 30% 25%, #ffffff 0 4%, #e9caff 22%, #a86bff 56%, #2b1160 100%)";
const METEOR_IMAGE = "/planets/Estrella-fugaz.png";

function showImage(src, alt) {
  planetPanel.classList.remove("has-image");
  panelPlanetImage.style.display = "none";
  panelPlanetImage.onload = () => {
    panelPlanetImage.style.display = "block";
    planetPanel.classList.add("has-image");
  };
  panelPlanetImage.onerror = () => { panelPlanetImage.style.display = "none"; };
  panelPlanetImage.alt = alt;
  if (src) panelPlanetImage.src = src;
  else panelPlanetImage.removeAttribute("src");
}

function setStep(button, nameElement, body) {
  button.disabled = !body;
  nameElement.textContent = body ? body.name : "";
  button.onclick = body ? () => openPlanetPanel(body) : null;
}

function revealPanel() {
  const wasOpen = solarStage.classList.contains("is-panel-open");
  planetPanel.inert = false;
  solarStage.classList.add("is-panel-open");
  panelScroll.scrollTop = 0;
  if (MOBILE_QUERY.matches) {
    if (!wasOpen || sheetTarget === sheetSnaps().closed) moveSheet(sheetSnaps().half);
  }
  if (!wasOpen) planetPanel.focus({ preventScroll: true });
}

function openPlanetPanel(body, { returnFocus } = {}) {
  if (activeMeteor) {
    activeMeteor.paused = false;
    activeMeteor = null;
  }
  if (returnFocus) returnFocusTo = returnFocus;
  activeIndex = story.indexOf(body);
  const month = activeIndex;
  panelName.textContent = body.name;
  panelMeta.textContent = body.id === "sun" ? "El centro de nuestro universo" : `Mes ${month} de ${MONTH_ORDER.length}`;
  panelDescription.textContent = body.description;
  planetPanel.style.setProperty("--accent", body.labelColor);
  previewSphere.style.setProperty("--planet-preview", body.preview);
  previewSphere.style.setProperty("--planet-shadow", `18px 18px 28px rgba(0, 0, 0, 0.52), -10px -12px 24px ${body.labelColor}55`);
  showImage(body.image, `Recuerdo de ${body.name.toLowerCase()}`);
  planetPanel.classList.remove("is-meteor");
  panelNav.hidden = false;
  setStep(navPrev, document.querySelector("#nav-prev-name"), story[activeIndex - 1]);
  setStep(navNext, document.querySelector("#nav-next-name"), story[activeIndex + 1]);
  setSelected(body);
  revealPanel();
}

function openMeteorPanel(meteor) {
  if (activeMeteor && activeMeteor !== meteor) activeMeteor.paused = false;
  meteor.paused = true;
  activeMeteor = meteor;
  activeIndex = -1;
  panelName.textContent = "El futuro, Pasado y Presente";
  panelMeta.textContent = "De paso por nuestro cielo";
  panelDescription.textContent = meteor.description;
  planetPanel.style.setProperty("--accent", "#d8b8ff");
  previewSphere.style.setProperty("--planet-preview", METEOR_PREVIEW);
  showImage(METEOR_IMAGE, "Estrella fugaz");
  planetPanel.classList.add("is-meteor");
  panelNav.hidden = true;
  setSelected(null);
  revealPanel();
}

function closePlanetPanel({ velocity = 0 } = {}) {
  if (!solarStage.classList.contains("is-panel-open")) return;
  if (activeMeteor) {
    activeMeteor.paused = false;
    activeMeteor = null;
  }
  setSelected(null);
  planetPanel.inert = true;
  solarStage.classList.remove("is-panel-open");
  if (MOBILE_QUERY.matches) moveSheet(sheetSnaps().closed, { velocity });
  if (returnFocusTo?.isConnected) returnFocusTo.focus({ preventScroll: true });
  returnFocusTo = null;
}

document.querySelector("#panel-close").addEventListener("click", () => closePlanetPanel());
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePlanetPanel();
  if (!solarStage.classList.contains("is-panel-open") || activeIndex < 0) return;
  const focus = document.activeElement;
  if (focus && focus !== document.body && focus !== planetPanel && !planetPanel.contains(focus)) return;
  if (event.key === "ArrowRight" && story[activeIndex + 1]) openPlanetPanel(story[activeIndex + 1]);
  if (event.key === "ArrowLeft" && story[activeIndex - 1]) openPlanetPanel(story[activeIndex - 1]);
});

// Picking in the scene: feedback on press, commit on release (a drag rotates instead).

function findTarget(event) {
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects([...clickableMeshes, ...meteorHitboxes], false)[0];
  if (!hit) return null;
  if (hit.object.userData.meteor) return { kind: "meteor", meteor: hit.object.userData.meteor };
  return { kind: "planet", body: hit.object.userData.body };
}

let pressed = null;

function setPressed(target, isPressed) {
  if (target?.kind !== "planet") return;
  planetGroups.get(target.body.id).userData.pressScale = isPressed ? 0.9 : 1;
}

renderer.domElement.addEventListener("pointermove", (event) => {
  if (event.pointerType === "mouse" && event.buttons === 0) {
    renderer.domElement.style.cursor = findTarget(event) ? "pointer" : "grab";
  }
  if (pressed && Math.hypot(event.clientX - pressed.x, event.clientY - pressed.y) > 6) {
    setPressed(pressed.target, false);
    pressed = null;
  }
});

renderer.domElement.addEventListener("pointerdown", (event) => {
  const target = findTarget(event);
  pressed = target ? { target, x: event.clientX, y: event.clientY } : null;
  setPressed(target, true);
});

renderer.domElement.addEventListener("pointerup", () => {
  if (!pressed) return;
  const { target } = pressed;
  pressed = null;
  setPressed(target, false);
  if (target.kind === "meteor") openMeteorPanel(target.meteor);
  else openPlanetPanel(target.body);
});

renderer.domElement.addEventListener("pointercancel", () => {
  setPressed(pressed?.target, false);
  pressed = null;
});

// Mobile bottom sheet: 1:1 drag, momentum projection, spring settle.

function createSpring(initial, onUpdate) {
  let value = initial;
  let velocity = 0;
  let target = initial;
  let damping = 1;
  let response = 0.35;
  let frame = 0;
  let last = 0;

  function step(now) {
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    const stiffness = (2 * Math.PI / response) ** 2;
    const friction = (4 * Math.PI * damping) / response;
    const substeps = 4;
    const h = dt / substeps;
    for (let index = 0; index < substeps; index += 1) {
      velocity += (-stiffness * (value - target) - friction * velocity) * h;
      value += velocity * h;
    }
    if (Math.abs(velocity) < 4 && Math.abs(value - target) < 0.5) {
      value = target;
      velocity = 0;
      frame = 0;
      onUpdate(value);
      return;
    }
    onUpdate(value);
    frame = requestAnimationFrame(step);
  }

  return {
    get value() { return value; },
    set(next) {
      cancelAnimationFrame(frame);
      frame = 0;
      value = next;
      target = next;
      velocity = 0;
      onUpdate(value);
    },
    to(next, options = {}) {
      target = next;
      if (options.velocity !== undefined) velocity = options.velocity;
      damping = options.damping ?? 1;
      response = options.response ?? 0.35;
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    },
  };
}

function sheetSnaps() {
  const height = window.innerHeight;
  return { expanded: Math.round(height * 0.06), half: Math.round(height * 0.5), closed: height };
}

function applySheet(y) {
  if (!MOBILE_QUERY.matches) return;
  const height = window.innerHeight;
  const visible = Math.max(0, height - y);
  planetPanel.style.transform = `translate3d(0, ${y}px, 0)`;
  container.style.transform = `translate3d(0, ${-Math.min(visible, height * 0.5) * 0.5}px, 0)`;
}

const sheet = createSpring(window.innerHeight, applySheet);
let sheetTarget = window.innerHeight;

function moveSheet(target, { velocity = 0 } = {}) {
  sheetTarget = target;
  solarStage.classList.toggle("is-panel-expanded", target === sheetSnaps().expanded);
  if (prefersReducedMotion.matches) {
    sheet.set(target);
    return;
  }
  sheet.to(target, { velocity, damping: Math.abs(velocity) > 400 ? 0.8 : 1, response: 0.38 });
}

function project(velocity, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

let sheetDrag = null;

function onSheetPointerDown(event) {
  if (!MOBILE_QUERY.matches || !solarStage.classList.contains("is-panel-open")) return;
  sheet.set(sheet.value); // grab it mid-flight from where it is on screen
  sheetDrag = { id: event.pointerId, startY: event.clientY, origin: sheet.value, history: [{ y: event.clientY, t: event.timeStamp }] };
  event.currentTarget.setPointerCapture(event.pointerId);
}

function onSheetPointerMove(event) {
  if (!sheetDrag || event.pointerId !== sheetDrag.id) return;
  const { expanded } = sheetSnaps();
  let y = sheetDrag.origin + (event.clientY - sheetDrag.startY);
  if (y < expanded) y = expanded - rubberband(expanded - y, window.innerHeight);
  sheet.set(y);
  sheetDrag.history.push({ y: event.clientY, t: event.timeStamp });
  while (sheetDrag.history.length > 2 && event.timeStamp - sheetDrag.history[0].t > 100) sheetDrag.history.shift();
}

function onSheetPointerUp(event) {
  if (!sheetDrag || event.pointerId !== sheetDrag.id) return;
  const { history } = sheetDrag;
  sheetDrag = null;
  const first = history[0];
  const last = history[history.length - 1];
  const elapsed = (last.t - first.t) / 1000;
  const velocity = elapsed > 0 ? (last.y - first.y) / elapsed : 0;
  const snaps = sheetSnaps();
  const projected = sheet.value + project(velocity);
  const target = [snaps.expanded, snaps.half, snaps.closed]
    .reduce((best, snap) => (Math.abs(snap - projected) < Math.abs(best - projected) ? snap : best));
  if (target === snaps.closed) closePlanetPanel({ velocity });
  else moveSheet(target, { velocity });
}

for (const zone of [document.querySelector("#panel-grip"), document.querySelector("#panel-photo")]) {
  zone.addEventListener("pointerdown", onSheetPointerDown);
  zone.addEventListener("pointermove", onSheetPointerMove);
  zone.addEventListener("pointerup", onSheetPointerUp);
  zone.addEventListener("pointercancel", onSheetPointerUp);
}

// Layout

const homePosition = new THREE.Vector3();
let lastLayout = null;

function resize() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const mobile = width < 600;
  camera.fov = mobile ? 54 : 44;
  homePosition.set(0, mobile ? 28 : 19, mobile ? 68 : 36);
  if (lastLayout !== mobile && !intro) camera.position.copy(homePosition);
  lastLayout = mobile;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  labelRenderer.setSize(width, height);

  if (MOBILE_QUERY.matches) {
    const snaps = sheetSnaps();
    const open = solarStage.classList.contains("is-panel-open");
    const expanded = solarStage.classList.contains("is-panel-expanded");
    sheetTarget = open ? (expanded ? snaps.expanded : snaps.half) : snaps.closed;
    sheet.set(sheetTarget);
  } else {
    planetPanel.style.transform = "";
    container.style.transform = "";
  }
}

// One orchestrated opening: the camera drifts in from deep space, then the names appear.
let intro = prefersReducedMotion.matches ? null : { elapsed: 0, duration: 3.2 };
const introStart = new THREE.Vector3();
const yAxis = new THREE.Vector3(0, 1, 0);

function finishIntro() {
  intro = null;
  solarStage.classList.remove("is-intro");
}

if (!intro) finishIntro();
controls.addEventListener("start", () => { if (intro) finishIntro(); });

const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(container);
resize();

function updateIntro(delta) {
  if (!intro) return;
  intro.elapsed += delta;
  const t = Math.min(intro.elapsed / intro.duration, 1);
  const ease = 1 - (1 - t) ** 4;
  introStart.copy(homePosition).multiplyScalar(1 + (1 - ease) * 1.1).applyAxisAngle(yAxis, (1 - ease) * -0.7);
  camera.position.copy(introStart);
  if (t > 0.55) solarStage.classList.remove("is-intro");
  if (t >= 1) finishIntro();
}

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.1);
  const elapsed = clock.elapsedTime;
  updateIntro(delta);
  stars.rotation.y = elapsed * 0.0018;
  const sun = planetGroups.get("sun");
  sun.rotation.y = elapsed * 0.04;
  sun.children[0].scale.setScalar(1 + Math.sin(elapsed * 1.55) * 0.035);
  const ease = 1 - Math.exp(-delta * 18);
  for (const body of bodies) {
    const planet = planetGroups.get(body.id);
    planet.scale.setScalar(THREE.MathUtils.lerp(planet.scale.x, planet.userData.pressScale, ease));
    if (body.spinAxis) planet.rotateOnAxis(planet.userData.spinAxis, planet.userData.spinSpeed * delta);
  }
  halo.material.opacity = THREE.MathUtils.lerp(halo.material.opacity, haloTargetOpacity, 1 - Math.exp(-delta * 6));
  if (haloTargetOpacity === 0 && halo.material.opacity < 0.01) halo.removeFromParent();
  updateMeteors(delta);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();
window.addEventListener("beforeunload", () => resizeObserver.disconnect());
