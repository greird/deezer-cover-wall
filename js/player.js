var MY_USER_ID = "34466551";

// Initialize player
DZ.init({
  appId  : '16dd244abec147dac3d6155c6a5383e4',
  channelUrl : 'http://localhost:8888/deezer-cover-wall/channel.html',
  player: {
		onload: function(response) {
			console.log('DZ.player is ready', response);
		}
	}
});

// Play any track, album or playlist
function play(id, type) {
  switch (type) {
    case "track":
      DZ.player.playTracks([id]);
      console.log("..Playing " + type + " " + id);
      break;
    case "album":
      DZ.player.playAlbum(id);
      console.log("..Playing " + type + " " + id);
      break;
    case "playlist":
      DZ.player.playTracks(id);
      console.log("..Playing " + type + " " + id);
      break;
    default:
      console.error("Invalid type or id.");
      console.log("Type: " + type);
      console.log("Id: " + id);
  }

}
