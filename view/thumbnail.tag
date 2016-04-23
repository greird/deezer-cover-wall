<thumbnail>

  <div class="thumbnail" id="{ id }" each={ opts } onclick={ play } >
    <div class="track-information">
      <h1>{ title }</h1>
      <h2><em>by</em> { artist.name}</h2>
    </div>
    <!--<img class="btn-play" src="img/btn_play.svg" alt="Play" />-->
    <img class="cover" src="{ album.cover_medium }" alt="" />
    <div class="overlay"></div>
  </div>

  <script>

    this.play = function (e) {
        console.log(this.opts.id);
        DZ.player.playTrack(this.opts.id);
    }

    this.on("update", function() {
      console.log("thumbnail tag updated.");
    });
  </script>

</thumbnail>
