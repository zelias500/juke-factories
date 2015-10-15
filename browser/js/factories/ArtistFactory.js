var theArtist;
app.factory("ArtistFactory", function($http, AlbumFactory, SongFactory, $q){
	var cache = {};

	return {

		fetchAll: function (){
			if (cache['allArtists']){
				console.log("cache!")
				return $q(function(resolve, reject){
					resolve(cache['allArtists'])
				})
			}

			return $http.get('/api/artists/').then(function(response) {
				return response.data;
			}).then(function(artists) {
				cache['allArtists'] = artists;
				return artists;
			})
		},

		fetchById: function(id){
			if (cache[id]){
				console.log("cache!")
				return $q(function(resolve, reject){
					resolve(cache[id])
				})
			}
			return $http.get("/api/artists/"+id).then(function(response){
				return response.data
			})
			.then(function(artist){
				theArtist = artist;
				return $http.get('/api/artists/' + id + '/albums')
			})
			.then(function(response){
				return response.data
			})
			.then(function(albums) {
				theArtist.albums = AlbumFactory.getImgUrl(albums);
				return $http.get('/api/artists/' + id + '/songs');
			})
			.then(function(response){
				return response.data
			})
			.then(function(songs) {
				theArtist.songs = SongFactory.populateSongAudio(songs);
			})
			.then(function(){
				cache[id] = theArtist;
				return theArtist;
			})
			.catch(function(err){console.err(err.message)});
		}
	}
})