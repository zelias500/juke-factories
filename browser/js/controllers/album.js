app.controller('AlbumCtrl', function ($scope, AlbumFactory, $rootScope, PlayerFactory, StatsFactory) {
	$rootScope.$on("show one album", function(evt, album){
		// $http.get('/api/albums/'+album._id)
		// .then(function (response) {
		// 	var album = response.data;
		// 	album.imageUrl = '/api/albums/' + album._id + '.image';
		// 	var albumArtists = _.indexBy(album.artists, '_id');
		// 	album.songs.forEach(function (s) {
		// 		s.audioUrl = '/api/songs/' + s._id + '.audio';
		// 		s.artists = s.artists.map(function (artistId) {
		// 			return albumArtists[artistId];
		// 		});
		// 	});
			AlbumFactory.fetchById(album._id).then(function(album){
				$scope.album = album;
				StatsFactory.totalTime($scope.album).then(function(time){
					$scope.album.totalTime = Math.round(time);
				})
			})
		});	
	$scope.start = function (s) {
		$rootScope.$broadcast('startIt', {
			song: s,
			album: $scope.album
		});
		$scope.currentSong = PlayerFactory.getCurrentSong()
	};

	$scope.figureOutTime = function(time){
		var mins = Math.floor(time/60);
		var secs = Math.floor(time%60);
		return mins+"min "+secs+"sec"
	}
	$scope.$on("song change", function(evt, data){
		$scope.currentSong = PlayerFactory.getCurrentSong()
	})	
});