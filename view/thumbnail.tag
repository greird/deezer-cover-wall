<thumbnail>

  <div class="thumbnail" id="{ id }" each={ opts } >
    <div class="track-information">
      <h1><a href="http://www.deezer.com/album/{ album.id }">{ title }</a></h1>
      <h2><em>by</em> <a href="http://www.deezer.com/album/{ artist.id }">{ artist.name}</a></h2>
    </div>
    <!--<img class="btn-play" src="img/btn_play.svg" alt="Play" />-->
    <img class="cover" src="{ album.cover_medium }" alt="" />
    <div class="overlay" onclick="play({ id }, 'track')"></div>
  </div>

  <script>
    this.on("update", function() {
      console.log("thumbnail tag updated.");
    });
  </script>

</thumbnail>
