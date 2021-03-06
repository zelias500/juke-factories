app.controller('multipleAlbums', function($scope, AlbumFactory, $rootScope){
	// $http.get("/api/albums").then(function(response){
	// 	return response.data;
	// }).then(function(albums){
	// 	albums.forEach(function(album){
	// 		album.imageUrl = "api/albums/"+album._id+".image"
	// 	})
	// 	$scope.albums = albums
	// }).catch(function(e){console.error(e.message)})

	AlbumFactory.fetchAll().then(function(albums){
		$scope.albums = albums;
	})

	$rootScope.showAlbums = true;

	$rootScope.$on("view albums", function(evt, data){
		$rootScope.showAlbums = true;
	})

	$scope.showThisAlbum = function(album){
		$rootScope.showAlbums = false;
		$rootScope.$broadcast('show one album', album)
	}

})