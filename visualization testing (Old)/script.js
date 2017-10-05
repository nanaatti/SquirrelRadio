var context = new AudioContext();
var theAudio = document.getElementById("audioPlayer");
var source = context.createMediaElementSource(theAudio);
var analyse = context.createAnalyser(source);

source.connect(analyse);

analyse.fftSize = 4096;
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

const WIDTH = 1280;
const HEIGHT = 720;

//const WIDTH = window.innerWidth;
//const HEIGHT = window.innerHeight;

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
const sphereMaterial1 =
new THREE.MeshStandardMaterial(
    {
    color: 0xff0000
    });
const sphereMaterial2 =
new THREE.MeshStandardMaterial(
    {
    color: 0x00ff00
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
var Xoff = -2750;
var Zoff = -1600;
var Yoff = 1400;
var pipGap = 65;
var pipStrain = WIDTH/RADIUS;
var zup = 0
for (i = 0; i < SphereAmmount; i++) {
        if (i % 2 == 0){
            this['mulSphere-' + i] =  new THREE.Mesh(   
                ball,
                sphereMaterial1);
            this['mulSphere-' + i].position.z = Zoff-(zup*50);
            this['mulSphere-' + i].position.y = Yoff;
            this['mulSphere-' + i].position.x = Xoff+(b*pipGap);
            b = b + 1;
        }else{
            this['mulSphere-' + i] =  new THREE.Mesh(   
                ball,
                sphereMaterial2);
            this['mulSphere-' + i].position.z = Zoff-((zup+1)*50);
            this['mulSphere-' + i].position.y = Yoff-200;
            this['mulSphere-' + i].position.x = Xoff+((b-1)*pipGap);
        }
        this['mulSphere-' + i].givenName = 'mulSphere-' + i;
        scene.add(this['mulSphere-' + i]);
        if(b > pipStrain) {
            Yoff = Yoff - 400;
            b = 0;
            zup = zup + 1;
        }
};
// create a point light
const pointLight =
new THREE.PointLight(0xFFFFFF);

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
    this['mulSphere-' + i].scale.x = dataArray[i]/256*2;
    this['mulSphere-' + i].scale.y = dataArray[i]/128;
    this['mulSphere-' + i].scale.z = dataArray[i]/128;
        }else{ */
    this['mulSphere-' + i].scale.x = dataArray[i]/128;
    this['mulSphere-' + i].scale.y = dataArray[i]/128*4;
    this['mulSphere-' + i].scale.z = dataArray[i]/128;
       // }
    }
}
var col = 0;
function Coloriser () {
    for (i = 0; i < SphereAmmount; i++) {
    if (i % 2 == 0){
        switch (col) {
            case 0: 
                this['mulSphere-' + i].material.color.b = Math.random();
                col = col++;
            case 1:
                this['mulSphere-' + i].material.color.g = Math.random();
                col = col++;
            case 2:
                this['mulSphere-' + i].material.color.r = Math.random();
                col = 0;
        }
    }else{
    this['mulSphere-' + i].material.color.b = Math.random();
    this['mulSphere-' + i].material.color.g = Math.random();
    this['mulSphere-' + i].material.color.r = Math.random();
    }
    }
}


window.setInterval(function() {
    Coloriser();
},2000)

function update () {
    
analyse.getByteTimeDomainData(dataArray);
  // Draw!
  renderer.render(scene, camera);
  former();

  // Schedule the next frame.
  requestAnimationFrame(update);
}

function sphereCalc () {
    for (i = 0; i < SphereAmmount; i++) {
        console.log(this['mulSphere-' + i])
    }
}
// Schedule the first frame.
//sphereCalc();
requestAnimationFrame(update);


