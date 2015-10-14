app.controller('artistsCtrl', function($scope, $rootScope, $http) {
	$scope.viewOneArtist=false;
	$http.get('/api/artists/').then(function(response) {
		return response.data;
	}).then(function(data) {
		$scope.artists = data;
	})

	$rootScope.$on('view artists', function() {
		$scope.showArtists = true;
		console.log('in view artists')
	})

	$scope.viewAnArtist = function(artist) {
		console.log('artist - ', artist)
		$scope.artist = artist;
		$http.get('/api/artists/' + artist._id + '/albums').then(function(response) {
			return response.data;
		}).then(function(data) {
			data.forEach(function(album) {
				album.imageUrl = '/api/albums/' + album._id + '.image';
			})
			$scope.artist.albums = data;

			return $http.get('/api/artists/' + artist._id + '/songs')
		}).then(function(response) {
			response.data.forEach(function(song) {
				song.audioUrl = '/api/songs/' + song._id + '.audio';
			})
			$scope.artist.songs = response.data;
		})
		$scope.viewOneArtist = true;
	}

	$scope.start = function (s) {
		$rootScope.$broadcast('startIt', {
			song: s,
			album: $scope.artist.songs
		});
	};
	$scope.$on('songLoad', function (evt, song) {
		$scope.currentSong = song;
	});
})