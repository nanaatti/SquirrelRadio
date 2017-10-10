if (localStorage['userPlaylist']) {
    var saved = JSON.parse(localStorage['userPlaylist']);
} else {
    var saved = {
    "playlist":[]
};
}

var json;

var playerInstance = jwplayer("audioPlayer");
playerInstance.setup({
    width: 640,
	height: 40,
    repeat: false,
    autostart: false,
    playlist: "playlist.json",
    volume: 100
});

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
        volume: 100
        });

        $("#clear").attr("hidden", true);

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
            volume: 100
        });

        $("#clear").attr("hidden", false);

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