var context = new AudioContext();
var theAudio = document.getElementById("audioPlayer");
var source = context.createMediaElementSource(theAudio);
var analyse = context.createAnalyser(source);

source.connect(analyse);

analyse.fftSize = 256;
console.log(analyse.fftSize);
var bufferLength = analyse.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyse.getByteTimeDomainData(dataArray);

const SphereAmmount = analyse.fftSize/2;
console.log(SphereAmmount);
    

/*window.setInterval(function(){
    console.log(dataArray);
}, 1000)*/


console.log("Hello World!");
analyse.connect(context.destination);

console.log(source);

// Set the scene size.
const WIDTH = 1900;
const HEIGHT = 600;

// Set some camera attributes.
const VIEW_ANGLE = 90;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.01;
const FAR = 20000;

// Get the DOM element to attach to
const container =
    document.querySelector('#container');

// Create a WebGL renderer, camera
// and a scene
const renderer = new THREE.WebGLRenderer();
const camera =
    new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );

const scene = new THREE.Scene();

// Add the camera to the scene.
scene.add(camera);


// Attach the renderer-supplied
// DOM element.
container.appendChild(renderer.domElement);

// create the sphere's material
const sphereMaterial =
new THREE.MeshStandardMaterial(
  {
    color: 0xffffff
  });

  // Set up the sphere vars
  var RADIUS = 20;
const SEGMENTS = 16;
const RINGS = 16;
var ball = new THREE.SphereGeometry(RADIUS,SEGMENTS,RINGS);
/*const sphere = new THREE.Mesh(
    
      new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS),
    
      sphereMaterial);


      sphere.position.z = -300;
      sphere.position.x = -100;
      
scene.add(sphere);*/
      

var b = 0;
var Xoff = -1800;
for (i = 0; i < SphereAmmount; i++) {
    this['mulSphere' + i] =  new THREE.Mesh(   
        ball,
        sphereMaterial);
        if (i % 2 == 0){
            this['mulSphere' + i].position.z = -600;
            this['mulSphere' + i].position.y = 100;
            this['mulSphere' + i].position.x = Xoff+(b*60);
            b = b + 1;
                }else{
                    this['mulSphere' + i].position.z = -600;
                    this['mulSphere' + i].position.y = -100;
                    this['mulSphere' + i].position.x = Xoff+(b*60);
                }
        scene.add(this['mulSphere' + i]);
};
// create a point light
const pointLight =
new THREE.PointLight(0xFFBF00);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);
// Start the renderer.
renderer.setSize(WIDTH, HEIGHT);


function former () {
    for (i = 0; i < SphereAmmount; i++) {
    /*    if (i % 2 == 0){
    this['mulSphere' + i].scale.x = dataArray[i]/256*2;
    this['mulSphere' + i].scale.y = dataArray[i]/128;
    this['mulSphere' + i].scale.z = dataArray[i]/128;
        }else{*/
    this['mulSphere' + i].scale.x = dataArray[i]/128;
    this['mulSphere' + i].scale.y = dataArray[i]/128*4;
    this['mulSphere' + i].scale.z = dataArray[i]/128;
       // }
    }
}

function update () {
    
analyse.getByteTimeDomainData(dataArray);
  // Draw!
  renderer.render(scene, camera);
  former();

  // Schedule the next frame.
  requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);



console.log(scene);