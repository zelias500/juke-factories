app.controller('AlbumCtrl', function ($scope, $http, $rootScope, StatsFactory) {
	$rootScope.$on("show one album", function(evt, album){
		$http.get('/api/albums/'+album._id)
		.then(function (response) {
			var album = response.data;
			album.imageUrl = '/api/albums/' + album._id + '.image';
			var albumArtists = _.indexBy(album.artists, '_id');
			album.songs.forEach(function (s) {
				s.audioUrl = '/api/songs/' + s._id + '.audio';
				s.artists = s.artists.map(function (artistId) {
					return albumArtists[artistId];
				});
			});
			$scope.album = album;
			StatsFactory.totalTime($scope.album).then(function(time){
				$scope.album.totalTime = Math.round(time);
			})
		});
	})	
	$scope.start = function (s) {
		$rootScope.$broadcast('startIt', {
			song: s,
			album: $scope.album
		});
	};
	$scope.$on('songLoad', function (evt, song) {
		$scope.currentSong = song;
	});

	$scope.figureOutTime = function(time){
		var mins = Math.floor(time/60);
		var secs = Math.floor(time%60);
		return mins+"min "+secs+"sec"
	}	
});