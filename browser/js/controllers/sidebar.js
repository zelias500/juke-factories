app.controller("sidebar", function($scope, $rootScope){
	$scope.viewAlbums = function(){
		$rootScope.$broadcast('view albums');
	}

	$scope.viewAllArtists = function() {
		$rootScope.$broadcast('view artists');
	}
})