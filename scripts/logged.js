/*function onLoad() {
    console.log('loaded');
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
};

window.setTimeout(function(){
console.log(gapi.auth2);
}, 5000);
*/

function openNav() {
    document.getElementById("myPlaylist").style.width = "280px";
}

function closeNav() {
    document.getElementById("myPlaylist").style.width = "0";
}

var profile2 = JSON.parse(localStorage['userProfile']);
console.log("Welcome, " + profile2.ig);

var likeCount = 1;

function like(x) {
    var liked = true;
    //likeCount + 1;
    likeCount ++;
    console.log(likeCount);
    //x.classList.toggle("fa-heart");
    document.getElementById("likes").innerHTML = likeCount;
    x.classList.remove("fa-heart-o");
    x.classList.add("fa-heart");
}