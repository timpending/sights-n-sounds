// Broadening for broader browser support
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

var record = document.querySelector('.record');
var record = document.querySelector('.stop');
var record = document.querySelector('.output');

if (navigator.getUserMedia){
  // Base Support
  console.log('getMedia supported');
}
  navigator.getUserMedia({audio: true},

    // Successful cb
    function(stream){

      



    },
    function(err){
      console.log('This error occured: '+ err);
    } else {
      console.log('getUserMedia not supported');
    }
  )
