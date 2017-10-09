var playerInstance = jwplayer("audioPlayer");
playerInstance.setup({
    width: 640,
	height: 40,
    repeat: false,
    autostart: false,
    playlist: "playlist.json",
    "skin": {
        "name": "customskin"
    }
});

loadAll();
    
jwplayer("audioPlayer").on('play', function(){
    var audio = jwplayer().getPlaylistItem();
    document.getElementById("nowPlaying").innerHTML = "Now Playing: " + audio.title + " | " + audio.duration + "<br> <img src=\"" + audio.poster + "\" style=\"width:200px;height:200px;\">";
});
    
jwplayer("audioPlayer").on('complete', function(){
    document.getElementById("nowPlaying").innerHTML = "";
});

function loadAll(){
    $.getJSON("playlist.json")
    .done(function(data) {
        for (i = 0; i < data.playlist.length; i++) {
            document.getElementById("songList").innerHTML += "</br>" + data.playlist[i].mediaid + " | " + "<button type=\"button\" onclick=\"playSong(" + data.playlist[i].mediaid + ")\">" + data.playlist[i].title + "</button>" + " | " + data.playlist[i].duration;
        }
    })
    .fail(function() {
        console.log( "error" );
    });
}

function loadCustom(){
    $.getJSON("custom.json")
    .done(function(data) {
        for (i = 0; i < data.playlist.length; i++) {
            document.getElementById("songList").innerHTML += "</br>" + data.playlist[i].mediaid + " | " + "<button type=\"button\" onclick=\"playSong(" + data.playlist[i].mediaid + ")\">" + data.playlist[i].title + "</button>" + " | " + data.playlist[i].duration;
        }
    })
    .fail(function() {
        console.log( "error" );
    });
}

function playSong(x) {
    jwplayer().playlistItem(x-1);
}

function clearList(){
    document.getElementById("songList").innerHTML = "Playlist:";
}

function playlistAll() { 
    playerInstance.load("playlist.json");
    clearList();
    loadAll();
    document.getElementById("nowPlaying").innerHTML = "";
}

function playlistCustom() { 
    playerInstance.load("custom.json");
    clearList();
    loadCustom();
    document.getElementById("nowPlaying").innerHTML = "";
}