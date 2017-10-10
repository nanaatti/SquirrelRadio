
var playerInstance = jwplayer("audioPlayer");
playerInstance.setup({
    width: 640,
	height: 40,
    repeat: false,
    autostart: false,
    playlist: "playlist.json"
});
    
jwplayer("audioPlayer").on('play', function(){
    var audio = jwplayer().getPlaylistItem();
    document.getElementById("nowPlaying").innerHTML = audio.title + "<br>" + audio.duration + "<br> <img src=\"" + audio.poster + "\" style=\"width:300px;height:300px;\">";
});
    
jwplayer("audioPlayer").on('complete', function(){
    document.getElementById("nowPlaying").innerHTML = "";
});
