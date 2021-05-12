// var audioPlayer  = document.getElementById('audioPlayer');

var $player = $('.audioWrapper');
var $playbackClass = 'is-playing'; 
var $fadeDuration = 500;



$player.each(function(index) {

   var $this = $(this) , id = 'audio-player-' + index;
   $this.attr('id', id);
   var audioPlayer =  $this.find('audio'); // $this.find('.audioPlayer');

   
   
  
 

   audioPlayer[0].addEventListener('loadedmetadata', function() {
     // Get the length for the current track
     trackLength =  Math.round($this.find('audio')[0].duration);
  
    // console.log($this.find('audio')[0].duration);
     
    
     //console.log(document.getElementById("myAudio"));
    
     //console.log($this.find('audio').duration);
     
     //alert(trackLength);
    
     var elapsedTime   = $this.find('.elapsedTime')[0];
     var remainingTime = $this.find('.remainingTime')[0];  
     // Set the initial elapsed and remaining times for the track
     elapsedTime.innerHTML  = formatTrackTime(trackLength);
     //remainingTime.innerHTML = '-' + formatTrackTime(trackLength - audioPlayer.currentTime);

     console.log(formatTrackTime(trackLength));

   });

  


   var scrubBar  = $this.find('.scrubBar');
   console.log(scrubBar);

   $this.find('.playPause')[0].addEventListener('click', function() {
    resetPlayback(id)
    playback($this, $this.find('audio'))
   })
  
  // Reset state once audio has finished playing
  $this.find('audio')[0].addEventListener('ended', function() {
    resetPlayback()
  })

 })

function playback($player, $audio) {
  if ($audio[0].paused) {
    $audio[0].play()
  
    $audio.animate({ volume: 1 }, $fadeDuration)
    $player.addClass($playbackClass)
  } else {
    $audio.animate({ volume: 0 }, $fadeDuration, function() {
      $audio[0].pause()
    })
    $player.removeClass($playbackClass)
  }
}

function resetPlayback(id) {
  $player.each(function() {
    var $this = $(this)

    if ($this.attr('id') !== id) {
      $this.find('audio').animate({ volume: 0 }, $fadeDuration, function() {
        $(this)[0].pause()
      })
      $this.removeClass($playbackClass)
    }
  })
}


// Format the time so it shows nicely to the user
function formatTrackTime(timeToFormat) {
  var minutes = Math.floor((timeToFormat) / 60);
  var seconds = Math.floor(timeToFormat % 60);
  seconds = (seconds >= 10) ? seconds : '0' + seconds;
  return minutes + ':' + seconds;
}



// var scrubBar      = document.getElementById('scrubBar');
// var elapsedTime   = document.getElementById('elapsedTime');
// var remainingTime = document.getElementById('remainingTime');
// var playPause     = document.getElementById('playPause');
// var trackLength;


// // Set up a listener so we can get the track data once it's loaded
// audioPlayer.addEventListener('loadedmetadata', function() {
//   // Get the length for the current track
//   trackLength = Math.round(audioPlayer.duration);

//   // Set the initial elapsed and remaining times for the track
//   elapsedTime.innerHTML   = formatTrackTime(audioPlayer.currentTime);
//   remainingTime.innerHTML = '-' + formatTrackTime(trackLength - audioPlayer.currentTime);
// });

// function runWhenLoaded() { /* read duration etc, this = audio element */ }



// // Set up a listener to watch for play / pause and display the correct image
// playPause.addEventListener('click', function() {
//   // Let's check to see if we're already playing
//   if (audioPlayer.paused) {
//     // Start playing and switch the class to show the pause button
//     audioPlayer.play();
//     playPause.className = 'pause';
//   } else {
//     // Pause playing and switch the class to show the play button
//     audioPlayer.pause();
//     playPause.className = 'play';
//   }
// });

// // Track the elapsed time for the playing audio
// audioPlayer.ontimeupdate = function() {
//   // Update the scrub bar with the elapsed time
//   scrubBar.value = Math.floor((100 / trackLength) * audioPlayer.currentTime);

//   // Update the elapsed and remaining time elements
//   elapsedTime.innerHTML   = formatTrackTime(audioPlayer.currentTime);
//   remainingTime.innerHTML = '-' + formatTrackTime(trackLength - audioPlayer.currentTime + 1);
// };

// // Set up some listeners for when the user changes the scrub bar time
// // by dragging the slider or clicking in the scrub bar progress area
// scrubBar.addEventListener('input', function() {
//   changeTrackCurrentTime();
//   scrubBar.addEventListener('change', changeTrackCurrentTime);
// });
// scrubBar.addEventListener('change', function() {
//   changeTrackCurrentTime();
//   scrubBar.removeEventListener('input', changeTrackCurrentTime);
// }); 

// // Change the track's current time to match the user's selected time
// var changeTrackCurrentTime = function() {
//   audioPlayer.currentTime = Math.floor((scrubBar.value / 100) * trackLength);
// };


// // Let's reset everything once the track has ended
// audioPlayer.addEventListener('ended', function() {
//   audioPlayer.currentTime = 0;
//   elapsedTime.innerHTML   = formatTrackTime(audioPlayer.currentTime);
//   remainingTime.innerHTML = '-' + formatTrackTime(trackLength - audioPlayer.currentTime);
//   playPause.className = 'play';
// });