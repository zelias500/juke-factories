app.factory("AlbumFactory", function($http, SongFactory){
	var imgUrl = function(albums){
			albums.forEach(function(album) {
					album.imageUrl = '/api/albums/' + album._id + '.image';
			})
			return albums
		}
	var cache = {};
	return {
		fetchAll: function(){
			if (cache['allAlbums']){
				console.log("cache!")
				return $q(function(resolve, reject){
					resolve(cache['allAlbums'])
				})
			}
			return $http.get("/api/albums").then(function(response){
				return response.data;
			}).then(function(albums){
				albums = imgUrl(albums);
				cache['allAlbums'] = albums;
				return albums;
			}).catch(function(e){console.error(e.message)})
		},

		fetchById: function(id){
			if (cache[id]){
				console.log("cache!")
				return $q(function(resolve, reject){
					resolve(cache[id])
				})
			}

			return $http.get('/api/albums/'+id)
			.then(function (response) {
				var album = response.data;
				album.imageUrl = imgUrl([album])[0].imageUrl;
				album = SongFactory.populateSongArtists(album);
				album.songs = SongFactory.populateSongAudio(album.songs);
				cache[id] = album;
				return album;
			}).catch(function(err){console.err(err.message)});
		},

		getImgUrl: function(albums){
			return imgUrl(albums);
		}
	}
})