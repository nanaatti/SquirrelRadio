var sorsa = document.getElementById('audioPlayer').getAttribute('src')
var fftSize = 32;


// Set the scene size.
const WIDTH = 1200;
const HEIGHT = 900;

// Set some camera attributes.
const VIEW_ANGLE = 90;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;


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

var audioLoader = new THREE.AudioLoader();
var listener = new THREE.AudioListener();
camera.add( listener );
var audio = new THREE.Audio( listener );
audioLoader.load( sorsa, function( buffer ) {
    audio.setBuffer( buffer );
    audio.setLoop( true );
    audio.play();
});
analyser = new THREE.AudioAnalyser( audio, fftSize );
//
var size = fftSize / 2;
uniforms = {
    tAudioData: { value: new THREE.DataTexture( analyser.data, size, 1, THREE.LuminanceFormat ) }
};
animate();

window.setInterval(function(){
    console.log(analyser.data)
}, 5000)

function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    var data = analyser.getFrequencyData();
    uniforms.tAudioData.value.needsUpdate = true;
    renderer.render( scene, camera );
}