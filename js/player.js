// Initialize player
DZ.init({
  appId  : '16dd244abec147dac3d6155c6a5383e4',
  channelUrl : 'http://localhost:8888/deezer-cover-wall/channel.html',
  player: {
		onload: function(response) {
      var dzrRequest;
			console.log('DZ.player is ready', response);

      if (!isNaN(getQueryString("id"))) {

        var id = getQueryString("id");

        switch (getQueryString("type")) {
          case "album":
            dzrRequest = "/album/" + id + "/tracks?limit=" + ITEMS_LIMIT;
            break;
          case "playlist":
            dzrRequest = "/playlist/" + id + "/tracks?limit=" + ITEMS_LIMIT;
            break;
          case "artist":
            dzrRequest = "/artist/" + id + "/albums?limit=" + ITEMS_LIMIT;
            break;
          case "user":
            dzrRequest = "/user/" + id + "/flow?limit=" + ITEMS_LIMIT;
            break;
          default:
            dzrRequest = "/user/" + MY_USER_ID + "/flow?limit=" + ITEMS_LIMIT;
        }
      } else {
          dzrRequest = "/user/" + MY_USER_ID + "/flow?limit=" + ITEMS_LIMIT;
      }

      DZ.api(dzrRequest, function(response) {
        var opts = response.data.reverse(); // Get latest tracks first

        for (var i in opts) {
          DZ.player.addToQueue([opts[i].id]);
        }
        riot.mount('thumbnail', opts);

        setCanvaSize();
        setAnimations();
      });
		}
	}
});

// Play any track, album or playlist
function play(id, type) {

  var currentTrackId = parseInt(DZ.player.getTrackList()[0].id);

  switch (type) {

    case "track":
      if (DZ.player.isPlaying()) {
        if (currentTrackId === id) {
          DZ.player.pause();
          $("#player").slideUp("fast");
        } else {
          DZ.player.playTracks([id]);
        }
      } else {
        if (currentTrackId === id) {
          DZ.player.play();
          $("#player").slideDown("fast");
        } else {
          DZ.player.playTracks([id]);
          riot.mount('player');
        }
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

// Update player information on status change
DZ.Event.subscribe('current_track', function(track, evt_name) {
  PLAYER.CURRENT = track;
  riot.update("player");
  $("#player").slideDown("fast");
});
