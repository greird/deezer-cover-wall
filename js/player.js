DZ.init({
  appId  : '16dd244abec147dac3d6155c6a5383e4',
  channelUrl : 'http://localhost:8888/deezer-cover-wall/channel.html',
  player: {
		onload: function(response) {
			console.log('DZ.player is ready', response);
      //DZ.player.playRadio(34466551, 'user');
		}
	}
});
