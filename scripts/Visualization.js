window.setTimeout(function() {
//console.log($('.placeHolder').innerWidth());
//const WIDTH = Math.round($('.placeHolder').innerWidth());
//const HEIGHT = Math.round($('.placeHolder').innerHeight());
//$('div.placeHolder').replaceWith("<div  id='container'></div>");
//class='row content mx-auto'
//console.log($('#placeHolderImg').innerHeight());
var context = new AudioContext();
var theAudio = document.querySelector(".jw-video");
var source = context.createMediaElementSource(theAudio);
var analyse = context.createAnalyser(source);

source.connect(analyse);

analyse.fftSize = 4096*2;
console.log(analyse.fftSize);
var bufferLength = analyse.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyse.getByteTimeDomainData(dataArray);

const SphereAmmountTrue = analyse.fftSize/2;
console.log(SphereAmmountTrue);
    

/*window.setInterval(function(){
    console.log(dataArray);
}, 1000)*/


console.log("Hello World!");
analyse.connect(context.destination);

console.log(source);

// Set the scene size.

//const WIDTH = Math.round($('#placeHolderImg').innerWidth());
//const HEIGHT = Math.round($('#placeHolderImg').innerHeight());

//const WIDTH = window.innerWidth;
//const HEIGHT = window.innerHeight;

const WIDTH = 1920;
const HEIGHT = 1080;

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
const SEGMENTS = 8;
const RINGS = 8;
var ball = new THREE.SphereBufferGeometry(RADIUS,SEGMENTS,RINGS);
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
var Xoff = -WIDTH;
var Zoff = -1200;
var Yoff = HEIGHT;
var pipStrain = (WIDTH/RADIUS);
var pipGap = RADIUS*2;
var linegap = pipGap;
var zup = 0
const pipOverlap = SphereAmmountTrue%pipStrain;
const SphereAmmountRender = SphereAmmountTrue-pipOverlap;
for (i = 0; i < SphereAmmountRender; i++) {
        //if (i % 2 == 0){
            this['mulSphere-' + i] =  new THREE.Mesh(   
                ball,
                sphereMaterial1);
            this['mulSphere-' + i].position.z = Zoff
            this['mulSphere-' + i].position.y = Yoff;
            this['mulSphere-' + i].position.x = Xoff+(b*pipGap);
            b = b + 1;
        /*}else{
            this['mulSphere-' + i] =  new THREE.Mesh(   
                ball,
                sphereMaterial2);
            this['mulSphere-' + i].position.z = Zoff-((zup+1)*50);
            this['mulSphere-' + i].position.y = Yoff-200;
            this['mulSphere-' + i].position.x = Xoff+((b-1)*pipGap);
        }*/
        this['mulSphere-' + i].givenName = 'mulSphere-' + i;
        scene.add(this['mulSphere-' + i]);
        if(b >= pipStrain) {
            Yoff = Yoff - linegap;
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
    for (i = 0; i < SphereAmmountRender; i++) {
    /*    if (dataArray[i] === 128){
    this['mulSphere-' + i].scale.x = 0;
    this['mulSphere-' + i].scale.y = 0;
    this['mulSphere-' + i].scale.z = 0;
        }else{ */
    this['mulSphere-' + i].scale.x = dataArray[i]/128;
    this['mulSphere-' + i].scale.y = dataArray[i]/128;
    //this['mulSphere-' + i].scale.z = dataArray[i]/128;
       // }
    }
}
var col = 0;
function Coloriser () {
    for (i = 0; i < SphereAmmountRender; i++) {
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
    for (i = 0; i < SphereAmmountTrue; i++) {
        console.log(this['mulSphere-' + i])
    }
}
// Schedule the first frame.
//sphereCalc();

document.querySelector('canvas').removeAttribute('style');
requestAnimationFrame(update);

}, 1000);

