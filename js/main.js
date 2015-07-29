$( document ).ready(function() {

dzrRequest("http://api.deezer.com/user/34466551/albums?limit=1000&output=jsonp");

window.onload = setCanvaSize;
window.addEventListener('resize', setCanvaSize);

function setCanvaSize() {

    var itemSize = 250;     // item default size
    var browser = {};       // browser info
    var itemNumber = {};    // number of items that can fit in the window size

    // Get window's width and height
    browser = {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
    }

    // Calculate how many items can fit in the window's width and height
    itemNumber = {
        width: (Math.ceil(browser.width / itemSize)),
        height: (Math.ceil(browser.height / itemSize))
    }

    // Re-set the item size to fit the page width
    itemSize = browser.width / itemNumber.width;

    // Set thumbnail and cover (img) size
    $(".thumbnail").css( "width", itemSize).css( "height", itemSize);
    $(".cover").css( "width", itemSize).css( "height", itemSize);

    $("#loader").fadeOut("fast", function () {
        $("#results").fadeIn("fast");
    });

    console.log('New item size: '+itemSize+'px');
    console.log('New widow size: '+browser.width+'x'+browser.height+'px');
};

function dzrRequest(request){

    $.ajax({
        dataType: "jsonp",
        url : request,
        data : {},
        jsonp : 'callback',
        success : function(data) { 
            data.data.reverse(); // Get latest favourites first

        	for (var i = 0; i < 50; i++) {
                $("#results").append('<a href="'+data.data[i].link+'" target="_blank"><div class="thumbnail"><img class="cover" src="'+data.data[i].cover_medium+'" alt="" /><ul><li class="title">'+data.data[i].title+'</li></ul></div></a>');
        	};

            console.log('Results :'+data.data.length);
        	console.log(data.data); 

            $(".thumbnail ul").hide();
            $(".thumbnail").mouseover( function () {
                console.log("plop");
                $("ul", this).stop(true, true).toggle();
            }).mouseout( function() {
                $("ul", this).stop(true, true).toggle();
            });
    	}
    });
};

// Soundcloud API
/*
$.get("http://api.soundcloud.com/playlists/405726.json?client_id=b11bdb8808fd0887155b4978f2ff269f", function(data) {
	console.log("data loaded" + data['kind']);
});
*/

});