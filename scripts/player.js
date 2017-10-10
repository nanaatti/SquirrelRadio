var context;
var theAudio;
var source;
var analyse;
var bufferLength;
var dataArray;

function INIT() { 
    context = new AudioContext();
    theAudio = document.querySelector(".jw-video");
    source = context.createMediaElementSource(theAudio);
    analyse = context.createAnalyser(source);
    
    source.connect(analyse);
    
    analyse.fftSize = 8192;
    bufferLength = analyse.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    analyse.getByteTimeDomainData(dataArray);
    };

//^Visualization
//vJWPlayer


if (localStorage['userPlaylist']) {
    var saved = JSON.parse(localStorage['userPlaylist']);
} else {
    var saved = {
    "playlist":[]
};
}

var json;

var playerInstance = jwplayer("audioPlayer");
/* playerInstance.setup({
    width: 640,
	height: 40,
    repeat: false,
    autostart: false,
    playlist: "playlist.json",
    "skin": {
        "name": "customskin"
    },
    volume: 100
}); */

loadPlaylist('playlist.json');

function onPlay(){
    jwplayer("audioPlayer").on('play', function(){
        var audio = jwplayer().getPlaylistItem();
        document.getElementById("nowPlaying").innerHTML = "Now Playing: " + audio.title + " | " + audio.duration + "<br> <img src=\"" + audio.poster + "\" style=\"width:200px;height:200px;\">";
    });
}
    
jwplayer("audioPlayer").on('complete', function(){
    clearInfo();
});

function loadPlaylist(name){
    clearList();
    clearInfo();

    console.log(name);
    if (/\w*.json/.test(name) == true) {

        playerInstance.setup({
        width: 640,
	    height: 40,
        repeat: false,
        autostart: false,
        playlist: name,
        "skin": {
            "name": "customskin"
        },
        volume: 100
        });

        $("#clear").attr("hidden", true);
        $("#audioPlayer").attr("style", "width: 100%; height: 40px;")

        window.setTimeout(function () {
        INIT();
        },500);

        $.getJSON(name)
        .done(function(data) {
            console.log(data);
            for (i = 0; i < data.playlist.length; i++) {
                document.getElementById("songList").innerHTML += "</br>" + data.playlist[i].mediaid + " | " + "<button type=\"button\" onclick=\"playSong(" + data.playlist[i].mediaid + ")\">" + data.playlist[i].title + "</button>" + " | " + data.playlist[i].duration;
            }
        })
        .fail(function() {
            console.log( "error" );
        });
        onPlay();
    }

    else {

        playerInstance.setup({
            width: 640,
	        height: 40,
            repeat: false,
            autostart: false,
            playlist: saved,
            "skin": {
                "name": "customskin"
            },
            volume: 100
        });

        $("#clear").attr("hidden", false);
        $("#audioPlayer").attr("style", "width: 100%; height: 40px;")

        window.setTimeout(function () {
            INIT();
            },500);

        for (i = 0; i < saved.playlist.length; i++) {
            document.getElementById("songList").innerHTML += "</br>" + saved.playlist[i].mediaid + " | " + "<button type=\"button\" onclick=\"playSong(" + saved.playlist[i].mediaid + ")\">" + saved.playlist[i].title + "</button>" + " | " + saved.playlist[i].duration;
        }
        
        onPlay();
    }
}

function playSong(x) {
    jwplayer().playlistItem(x-1);
}

function clearList(){
    document.getElementById("songList").innerHTML = "Playlist:";
}

function clearInfo(){
    document.getElementById("nowPlaying").innerHTML = "";
}
    


var mid = 0;
    
function addSong() {
    mid = mid+1;

    var audio = jwplayer().getPlaylistItem();

    saved.playlist.push({
    "mediaid": mid,
    "file": audio.file,
    "title": audio.title,
    "duration": audio.duration,
    "type": audio.type,
    "poster": audio.poster
    });
}

function savePlaylist() {
    localStorage.setItem('userPlaylist', JSON.stringify(saved));
    console.log(saved);
}

function clearPlaylist() {
    localStorage.removeItem('userPlaylist');
    saved = {
        "playlist":[]
    };
    clearList();
}

// ^ JWPlayer
// v Visualization





window.setTimeout(function() {
const SphereAmmountTrue = analyse.fftSize/2;
    

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


  // Set up the sphere vars
  var RADIUS = 20;
  const SEGMENTS = 8;
  const RINGS = 8;

var pipStrain = (WIDTH/RADIUS);
var pipGap = RADIUS*2;
var linegap = pipGap;

const pipOverlap = SphereAmmountTrue%pipStrain;
const SphereAmmountRender = SphereAmmountTrue-pipOverlap;
console.log(SphereAmmountRender);

const HEIGHT = (SphereAmmountRender/pipStrain)*RADIUS;

// Set some camera attributes.
const VIEW_ANGLE = 80;
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
    camera.position.y = 50;

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
var zup = 0
for (i = 0; i < SphereAmmountRender; i++) {
        //if (i % 2 == 0){
            this['mulSphere' + i] =  new THREE.Mesh(   
                ball,
                sphereMaterial1);
            this['mulSphere' + i].position.z = Zoff
            this['mulSphere' + i].position.y = Yoff;
            this['mulSphere' + i].position.x = Xoff+(b*pipGap);
            b = b + 1;
        /*}else{
            this['mulSphere' + i] =  new THREE.Mesh(   
                ball,
                sphereMaterial2);
            this['mulSphere' + i].position.z = Zoff-((zup+1)*50);
            this['mulSphere' + i].position.y = Yoff-200;
            this['mulSphere' + i].position.x = Xoff+((b-1)*pipGap);
        }*/
        this['mulSphere' + i].givenName = 'mulSphere' + i;
        scene.add(this['mulSphere' + i]);
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
    this['mulSphere' + i].scale.x = 0;
    this['mulSphere' + i].scale.y = 0;
    this['mulSphere' + i].scale.z = 0;
        }else{ */
    this['mulSphere' + i].scale.x = dataArray[i]/128;
    this['mulSphere' + i].scale.y = dataArray[i]/128;
    //this['mulSphere' + i].scale.z = dataArray[i]/128;
    this['mulSphere' + i].position.z = Zoff+((dataArray[i]-128));
       // }
    }
}
var col = 0;
function Coloriser () {
    for (i = 0; i < SphereAmmountRender; i++) {
                this['mulSphere' + i].material.color.b = Math.random();
                this['mulSphere' + i].material.color.g = Math.random();
                this['mulSphere' + i].material.color.r = Math.random();
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
        console.log(this['mulSphere' + i])
    }
}
// Schedule the first frame.
//sphereCalc();

document.querySelector('canvas').removeAttribute('style');
requestAnimationFrame(update);

}, 1000);