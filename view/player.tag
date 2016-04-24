<player>
  <h3>Currently playing : { title }</h3>

  <script>
    this.on("mount", function() {
      $("#player").slideDown("fast");
    })

    DZ.Event.subscribe('current_track', function(track, evt_name){
      
    });

    this.on("update", function() {
      console.log("player tag updated. Opts: ");
      console.log(opts);
    });
  </script>
</player>
