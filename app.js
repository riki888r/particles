/** @format */

const container = document.querySelector('.rugCont');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.5,
  1000,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Kreiranje objekta
const geometry = new THREE.PlaneGeometry(5, 5, 50, 50);
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true
// });

const loader = new THREE.TextureLoader();

loader.load(
  //s
  './img/FM.svg',

  // onLoad callback
  function (texture) {
    // in this example we create the material when the texture is loaded
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      wireframe: true,
      // envMaps: texture,
      wireframeLinecap: 'butt',
      wireframeLinejoin: 'butt',
      reflectivity: 50,
      wireframeLinewidth: 5000,
      // alpha: true,
      // vertexColors: true,
    });
    // const material = new THREE.PointsMaterial({ color: 0x332244 });

    const rug = new THREE.Mesh(geometry, material);

    rug.rotation.set(-1, 0, 1);

    camera.position.z = 5;

    //Vertices
    let pos = rug.geometry.attributes.position;

    const clock = new THREE.Clock();
    let v = new THREE.Vector3();

    function animate() {
      const t = clock.getElapsedTime();

      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        const wavex1 = 0.1 * Math.sin(v.x * 1 + t);
        const wavex2 = 0.1 * Math.sin(v.x * 3 + t * 2);
        const wavex3 = 0.1 * Math.sin(v.y + t);

        pos.setZ(i, wavex1 + wavex2 + wavex3);
      }
      pos.needsUpdate = true;

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    scene.add(rug);
    //var scene = new THREE.Scene(); // initialising the scene
    // scene.background = new THREE.Color(0x000);
    // var geo = new THREE.EdgesGeometry(mesh.geometry); // or WireframeGeometry
    // var mat = new THREE.LineBasicMaterial({ color: 0xffffff });
    // var wireframe = new THREE.LineSegments(geo, mat);
    mesh.add(wireframe);
  },

  // onProgress callback currently not supported
  undefined,

  // onError callback
  function (err) {
    console.error('An error happened.');
  },
);
