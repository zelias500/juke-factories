app.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {	
	var songs;
	$scope.$on('startIt', function (evt, data) {
		PlayerFactory.start(data.song, data.album.songs);
		$scope.currentSong = PlayerFactory.getCurrentSong();
		$scope.isPlaying = PlayerFactory.isPlaying();
	});

	$scope.toggle = function () {
		if (PlayerFactory.isPlaying()) PlayerFactory.pause();
		else PlayerFactory.resume();
		$scope.isPlaying = PlayerFactory.isPlaying();
	};

	$scope.forward = PlayerFactory.next;
	$scope.back = PlayerFactory.previous;
});