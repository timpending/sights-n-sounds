// Broadening for broader browser support
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia;

var record = document.querySelector('.record');
var stop = document.querySelector('.stop');
var soundClips = document.querySelector('.sound-clips');

stop.disabled = true;

if (navigator.getUserMedia){
  // Base Support
  console.log('getMedia supported');

  var audioOnly = {audio: true};
  var pieces = [];

    // Successful cb
    var onSuccess = function(stream){
      var mediaRecorder = new MediaRecorder(stream);

      //visualize(stream);

      // Start recording
      record.onclick = function(){
        mediaRecorder.start();
        console.log('start state -'+ mediaRecorder.state);
        console.log('recording started');
        record.style.background = 'red';

        stop.disabled = false;
        record.disabled = true;
      }

      stop.onclick = function(){
        mediaRecorder.stop();
        console.log('stop state -'+ mediaRecorder.state);
        console.log('recording stopped');
        // mediaRecord.requestData();

        stop.disabled = true;
        record.disabled = false;
      }


      mediaRecorder.onstop = function(e){
        console.log('stopped it.  Data avail after clicking stop');

        var clipName = prompt('Name your sound clip.', 'Your soundclip');
        console.log('clipname: '+ clipName);

        var clipContainer = document.createElement('article');
        var clipLabel = document.createElement('p');
        var audio = document.createElement('audio');
        var deleteButton = document.createElement('button');

        clipContainer.classList.add('clip');
        audio.setAttribute('controls', '');
        deleteButton.textContent = "Delete";
        deleteButton.className = 'delete';

        if (clipName === null) {
          clipName.textContent = 'Your soundclip';
        } else {
          clipLabel.textContent = clipName;
        }

        clipContainer.appendChild(audio);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        soundClips.appendChild(clipContainer);


        audio.controls = true;
        var blob = new Blob(pieces, { 'type' : 'audio/ogg; codecs=opus' });
        pieces = [];
        var audioURL = window.URL.createObjectURL(blob);
        audio.src = audioURL;
        console.log('recording stopped');

        // Delete Clips
        deleteButton.onclick = function(e) {
          evtTgt = e.target;
          evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        }
        clipLabel.onclick = function() {
        var existingName = clipLabel.textContent;
        var newClipName = prompt('Enter a new name for your sound clip?');
        if(newClipName === null) {
          clipLabel.textContent = existingName;
        } else {
          clipLabel.textContent = newClipName;
        }
      }
    }

    mediaRecorder.ondataavailable = function(e){
      pieces.push(e)
    }
  }
      var onError = function(err){
        console.log('The following error has occured: ' + err);
      }

    navigator.getUserMedia(audioOnly, onSuccess, onError);

    } else {
      console.log('getUserMedia not support by browser');
    }

      // Add the audio data bit by bit after stopped


      // stop.onclick = function() {
      //   mediaRecorder.stop();
      //   console.log('new state: ' + mediaRecorder.state);
      //   console.log('recording stopped');
      //   record.style.border('');
      //   record.style.color('black');
      // }


    //
    // },
    // function(err){
    //   console.log('This error occured: '+ err);
    // } else {
    //   console.log('getUserMedia not supported');
    // })
