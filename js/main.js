riot.mount('thumbnail');

var
  MY_USER_ID = 34466551,
  ITEMS_LIMIT = 100,
  PLAYER = {
    CURRENT_TRACK: {}
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

    $("#loader").fadeOut("fast", function () {
        $("#results").fadeIn("fast");
    });
}

function setAnimations() {
  $(".track-information").hide();
  $(".controls").hide();
  $(".overlay").hide();
  $("#player").hide();

  $(".thumbnail")
    .hover(function() {
      $(".overlay", this).fadeTo("fast" , 0.8);
      $(".track-information", this).fadeIn("fast");
      $(".controls", this).fadeIn("fast");
    }, function() {
      $(".overlay", this).stop().fadeOut("fast");
      $(".track-information", this).stop().fadeOut("fast");
      $(".controls", this).stop().fadeOut("fast");
  });
}

/** Retun the value of a GET variable in the URL
 * @param {String} key | Required | The name of the GET var to search for
 * @param {String} default_ | Optional | The default value to return if no match
 * @return {String}
 * @author http://www.bloggingdeveloper.com/post/JavaScript-QueryString-ParseGet-QueryString-with-Client-Side-JavaScript.aspx
*/
function getQueryString(key, default_) {
  if (default_===null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs === null)
    return default_;
  else
    return qs[1];
}
