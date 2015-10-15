app.factory("AlbumFactory", function($http){
	var imgUrl = function(albums){
			albums.forEach(function(album) {
					album.imageUrl = '/api/albums/' + album._id + '.image';
			})
			return albums
		}
	return {

		fetchAll: function(){
			return $http.get("/api/albums").then(function(response){
				return response.data;
			}).then(function(albums){
				return imgUrl(albums)
			}).catch(function(e){console.error(e.message)})
		},

		fetchById: function(id){
			return $http.get('/api/albums/'+id)
			.then(function (response) {
				var album = response.data;
				album.imageUrl = imgUrl([album])[0].imageUrl;
				var albumArtists = _.indexBy(album.artists, '_id');
				album.songs.forEach(function (s) {
					s.audioUrl = '/api/songs/' + s._id + '.audio';
					s.artists = s.artists.map(function (artistId) {
						return albumArtists[artistId];
					});
				});
				return album;
			}).catch(function(err){console.err(err.message)});
		},

		getImgUrl: function(albums){
			return imgUrl(albums);
		}

	}
})