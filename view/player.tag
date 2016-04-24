<player>
  <h3>
    <i class="fa fa-play" aria-hidden="true"></i>
    { PLAYER.CURRENT.track.title }
    <em>by</em> { PLAYER.CURRENT.track.artist.name }
  </h3>

  <script>
    var title = "blu";
    this.on("mount", function() {
      $("#player").slideDown("fast");
    })

    this.on("update", function() {
      console.log("player tag updated. Opts: ");
      console.log(opts);
    });
  </script>
</player>
