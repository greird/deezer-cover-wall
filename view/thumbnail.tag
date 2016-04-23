<thumbnail>

  <div class="thumbnail" id="" each={ items } >
    <div class="track-information">
      <h1>{ albumName }</h1>
      <h2><em>by</em> { artistName}</h2>
    </div>
    <!--<img class="btn-play" src="img/btn_play.svg" alt="Play" />-->
    <img class="cover" src="http://cdn-images.deezer.com/images/cover/2589a27bd07d0398dc63b3ce1bddc672/250x250-000000-80-0-0.jpg" alt="" />
    <div class="overlay"></div>
  </div>

  <script>
    this.items = [
      {
      cover: 'http://cdn-images.deezer.com/images/cover/2589a27bd07d0398dc63b3ce1bddc672/250x250-000000-80-0-0.jpg',
      albumName: 'Diamonds And Despair',
      artistName: 'Okta Logue'
      },
      {
        cover: 'http://cdn-images.deezer.com/images/cover/2589a27bd07d0398dc63b3ce1bddc672/250x250-000000-80-0-0.jpg',
        albumName: 'Diamonds And Despair',
        artistName: 'Okta Logue'
      }
    ];

    this.on("update", function() {
      console.log("thumbnail tag updated.");
    });
  </script>

</thumbnail>
