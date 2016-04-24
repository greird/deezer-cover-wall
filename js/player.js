var MY_USER_ID = "34466551",
  PLAYER = {
    CURRENT_TRACK: {}
  };

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

  var currentTrack;

  switch (type) {
    case "track":

      if (DZ.player.isPlaying()) {
        currentTrack = DZ.player.getCurrentTrack();
        if (currentTrack.id == id) {
          DZ.player.pause();
          $("#player").slideUp("fast");
        } else {
          DZ.player.playTracks([id]);
        }
      } else {
        DZ.player.playTracks([id]);
        riot.mount('player');
      }
      break;

    case "album":
      DZ.player.playAlbum(id);
      break;

    case "playlist":
      DZ.player.playTracks(id);
      break;

    default:
      console.error("Invalid type or id.");
      console.log("Type: " + type);
      console.log("Id: " + id);
  }

}

// Update player data on status change
DZ.Event.subscribe('current_track', function(track, evt_name){
  PLAYER.CURRENT = track;
  riot.update("player");
	console.log("Currently playing: ", PLAYER.CURRENT.track);
});
