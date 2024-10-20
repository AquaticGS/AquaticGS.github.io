// Written by Dor Verbin, October 2021
// This is based on: http://thenewcode.com/364/Interactive-Before-and-After-Video-Comparison-in-HTML5-Canvas
// With additional modifications based on: https://jsfiddle.net/7sk5k4gp/13/

function playVids(vid, videoMerge) {
    var position = 0.5;
    var vidWidth = vid.videoWidth / 2;
    var vidHeight = vid.videoHeight;

    var mergeContext = videoMerge.getContext("2d");

    function trackLocation(e) {
        var bcr = videoMerge.getBoundingClientRect();
        position = ((e.pageX - bcr.x) / bcr.width);
    }

    function trackLocationTouch(e) {
        var bcr = videoMerge.getBoundingClientRect();
        position = ((e.touches[0].pageX - bcr.x) / bcr.width);
    }

    videoMerge.addEventListener("mousemove", trackLocation, false);
    videoMerge.addEventListener("touchstart", trackLocationTouch, false);
    videoMerge.addEventListener("touchmove", trackLocationTouch, false);

        function drawLoop() {
            mergeContext.drawImage(vid, 0, 0, vidWidth, vidHeight, 0, 0, vidWidth, vidHeight);
            var colStart = (vidWidth * position).clamp(0.0, vidWidth);
            var colWidth = (vidWidth - (vidWidth * position)).clamp(0.0, vidWidth);
            mergeContext.drawImage(vid, colStart+vidWidth, 0, colWidth, vidHeight, colStart, 0, colWidth, vidHeight);
            requestAnimationFrame(drawLoop);

            // Draw comparison line and arrow (existing code)
        }
        requestAnimationFrame(drawLoop);
    } 
}

function resizeAndPlay(element)
{
    var cv = element.parentElement.querySelector('canvas');
    if (!cv) {
        console.error('Cannot find corresponding canvas element.');
        return;
    }
    cv.width = element.videoWidth / 2;
    cv.height = element.videoHeight;
    element.play();
    element.style.height = "0px";  // Hide video without stopping it

    playVids(element, cv);
}

// Ensure this function is available
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};
