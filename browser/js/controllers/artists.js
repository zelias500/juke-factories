app.controller('artistsCtrl', function($scope, $rootScope, ArtistFactory, PlayerFactory) {
	$scope.viewOneArtist;
	ArtistFactory.fetchAll().then(function(artists){
		$scope.artists = artists;
	})

	$scope.viewAnArtist = function(artist) {
		ArtistFactory.fetchById(artist._id).then(function(artist){
			$scope.artist = artist;
		})
		$scope.viewOneArtist = true;
	}

	$scope.$on('view artists', function(){
		$scope.viewOneArtist = false;
	})

	$scope.start = function (s) {
		$rootScope.$broadcast('startIt', {
			song: s,
			album: $scope.artist
		});
		$scope.currentSong = PlayerFactory.getCurrentSong()

	};

	$scope.$on("song change", function(evt, data){
		$scope.currentSong = PlayerFactory.getCurrentSong()
	})	

})