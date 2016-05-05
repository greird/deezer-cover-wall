// Initialize player
DZ.init({
  appId  : '16dd244abec147dac3d6155c6a5383e4',
  channelUrl : 'http://localhost:8888/deezer-cover-wall/channel.html',
  player: {
		onload: function(response) {

      var id = parseInt(getQueryString("id")) || null;
      var type = getQueryString("type") || null;
      var dzrRequest;

			console.log('DZ.player is ready', response);

      if (!isNaN(id) && type !== null) {

        switch (type) {
          case "album":
            dzrRequest = "/album/" + id + "?limit=" + ITEMS_LIMIT;
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
        var i;
        var y;
        var albumsData = {};
        var tracksData = {};

        switch (type) {

          case "album":
            tracksData = response.tracks.data;

            for (i in tracksData) {
              DZ.player.addToQueue([tracksData[i].id]);

              tracksData[i].album = {};
              tracksData[i].album.cover_medium = response.cover_medium;
              tracksData[i].album.id = response.id;
            }
            break;

          // NOTE: DOESN'T WORK.. :( Needs to be fixed !
            case "artist":
              albumsData = response.data;

              for (i in albumsData) {

                DZ.api('/album/'+albumsData[i].id, function(responseAlbum) { 
                  tracksData = responseAlbum.tracks.data;

                  for (y in tracksData) {

                    DZ.player.addToQueue([tracksData[y].id]);

                    albumsData[i].tracks = {};
                    albumsData[i].tracks.data = tracksData[y];
                  }
                  riot.mount('thumbnail', albumsData);
                  setCanvaSize();
                  setAnimations();
                });
              }
            break;

          default:
            tracksData = response.data.reverse(); // Get latest tracks first

            for (i in tracksData) {
              DZ.player.addToQueue([tracksData[i].id]);
            }
        }

        riot.mount('thumbnail', tracksData);

        setCanvaSize();
        setAnimations();
      });
		}
	}
});

// Play any track, album or playlist
function play(id, type) {

  var currentTrackId = parseInt(DZ.player.getTrackList()[0].id);
  var queueList = DZ.player.getTrackList();
  var newTrackList = [];
  var saveTracks = false;

  // remove playing track from queuelist and add it to the first position
  function resetQueuelistAndPlay() {
    newTrackList.push(id);
    for (var i in queueList) {
      if (saveTracks === true) newTrackList.push(queueList[i].id);
      else if (queueList[i].id == id) saveTracks = true;
    }
    DZ.player.playTracks(newTrackList);
  }

  switch (type) {

    case "track":
      if (DZ.player.isPlaying()) {
        if (currentTrackId === id) {
          DZ.player.pause();
          $("#player").slideUp("fast");
        } else {
          resetQueuelistAndPlay();
        }
      } else {
        if (currentTrackId === id) {
          DZ.player.play();
          $("#player").slideDown("fast");
        } else {
          resetQueuelistAndPlay();
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
