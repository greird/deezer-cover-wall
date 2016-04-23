$( document ).ready(function() {

  dzrRequest("http://api.deezer.com/user/34466551/flow?limit=200&output=jsonp");

  window.onload = function() {
    setCanvaSize();

    $(".track-information").hide();
    $(".overlay").hide();

    $(".thumbnail")
      .hover(function() {
        $(".overlay", this).fadeTo("fast" , 0.8);
        $(".track-information", this).fadeIn("fast");
      }, function() {
        $(".overlay", this).stop().fadeOut("fast");
        $(".track-information", this).stop().fadeOut("fast");
   });
  };
  window.addEventListener('resize', setCanvaSize);

  function setCanvaSize() {

      var itemSize = 250;     // item default size
      var browser = {};       // browser info
      var itemNumber = {};    // number of items that can fit in the window size

      // Get window's width and height
      browser = {
          width: window.innerWidth || document.body.clientWidth,
          height: window.innerHeight || document.body.clientHeight
      };

      // Calculate how many items can fit in the window's width and height
      itemNumber = {
          width: (Math.ceil(browser.width / itemSize)),
          height: (Math.ceil(browser.height / itemSize))
      };

      // Re-set the item size to fit the page width
      itemSize = browser.width / itemNumber.width;

      // Set thumbnail and cover (img) size
      $(".thumbnail").css( "width", itemSize).css( "height", itemSize);
      $(".cover").css( "width", itemSize).css( "height", itemSize);
      $(".track-information").css( "width", itemSize-40);
      $("#cover").css( "width", itemSize*itemNumber.width).css( "height", itemSize*itemNumber.height);

      $("#loader").fadeOut("fast", function () {
          $("#results").fadeIn("fast");
      });
  }

  function dzrRequest(request){
    var opts;

    $.ajax({
        dataType: "jsonp",
        url : request,
        data : {},
        jsonp : 'callback',
        success : function(data) {
          opts = data.data.reverse(); // Get latest favourites first
          riot.mount('thumbnail', opts);
    	}
    });
  }
});
