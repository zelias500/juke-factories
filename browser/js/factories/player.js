app.factory('PlayerFactory', function ($rootScope) {
	var playing = false;
	var audio = document.createElement('audio');
	var progress = 0;
	audio.addEventListener('timeupdate', function () {
		$rootScope.progress = 100 * audio.currentTime / audio.duration;
		$rootScope.$digest();
	});

	audio.addEventListener('ended', function () {
		player.next()
	});

	var currentSong = null;
	var songs = []; 
	var moveTo = function(index){
			index += songs.length
			index %= songs.length;
			player.start(songs[index], songs);
		}
	player = {
		start: function(song, songList){
			songs = songList;
			currentSong = song;
			this.pause();
			audio.src = song.audioUrl;
			audio.load();
			audio.play();
			playing = true;
		},
		pause: function(){
			playing = false;
			audio.pause();
		},
		resume: function(){
			playing = true;
			audio.play();
		},
		isPlaying: function(){
			return playing;
		},
		getCurrentSong: function(){
			return currentSong;
		},
		next: function(){
			var index = songs.indexOf(currentSong);
			moveTo(index + 1);
		},
		previous: function(){
			var index = songs.indexOf(currentSong);
			moveTo(index - 1);
		},
		getProgress: function(){
			return progress;
		}
	};

	return player;
});