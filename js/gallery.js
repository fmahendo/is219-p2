// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/



var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		goNext();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

// Counter for the mImages array
var mCurrentIndex = 1;
// Array holding GalleryImage objects (see below).
var mImages = [];

var mRequest = new XMLHttpRequest();

mRequest.onreadystatechange = function() {
	if(mRequest.readyState == 4 && mRequest.status == 200) {

	    mImages = JSON.parse(mRequest.responseText);
	    console.info(mImages);

	    $('#prevPhoto').on('click', goPrev);
	    $('#nextPhoto').on('click', goNext);

	    animate();
	}
};
mRequest.open("GET", "images.json", true);
mRequest.send();


function goPrev(event){

	mCurrentIndex++;	
	if(mCurrentIndex < 0){
		mCurrentIndex = mImages.images.length - 1;
	}
	var photo = $('#photo');

	$('#loc_detail').html(mImages.images[mCurrentIndex].imgLocation);
	$('#desc_detail').html(mImages.images[mCurrentIndex].description);
	$('#date_detail').html(mImages.images[mCurrentIndex].date);
    photo.attr('src', mImages.images[mCurrentIndex].imgPath);

}

function goNext(event){
	mCurrentIndex++;

	if(mCurrentIndex === mImages.images.length){
		mCurrentIndex = 0;
	}
	var photo = $('#photo');

	$('#loc_detail').html(mImages.images[mCurrentIndex].imgLocation);
	$('#desc_detail').html(mImages.images[mCurrentIndex].description);
	$('#date_detail').html(mImages.images[mCurrentIndex].date);

    photo.attr('src',mImages.images[mCurrentIndex].imgPath);

}

$(function(){
	$('#show_detail').on('click', function(){
		console.info('hello world');
		$('.details').toggle();
	});
})

