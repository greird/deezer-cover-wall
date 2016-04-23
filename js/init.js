/** This script is executed everytime the page is loaded
*/

var MY_USER_ID = "34466551";

riot.mount('thumbnail');

DZ.init({
  appId  : '16dd244abec147dac3d6155c6a5383e4',
  channelUrl : 'http://localhost:8888/deezer-cover-wall/channel.html',
  player: {
		onload: function(response) {
			console.log('DZ.player is ready', response);
		}
	}
});

console.log("Initialized.");
console.log("USER_ID:"+MY_USER_ID);
