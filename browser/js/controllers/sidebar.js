app.controller("sidebar", function($scope, $rootScope){
	$scope.viewAlbums = function(){
		$rootScope.$broadcast('view albums');
		$rootScope.showArtists = false;
	}

	$scope.viewAllArtists = function() {
		$rootScope.$broadcast('view artists');
		$rootScope.showArtists = true;
	}
})