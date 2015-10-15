var theArtist;
app.factory("ArtistFactory", function($http, AlbumFactory){

	return {

		fetchAll: function (){	
			return $http.get('/api/artists/').then(function(response) {
				return response.data;
			}).then(function(artists) {
				return artists;
			})
		},

		fetchById: function(id){
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
				songs.forEach(function(song) {
					song.audioUrl = '/api/songs/' + song._id + '.audio';
				})
				theArtist.songs = songs;
			})
			.then(function(){
				return theArtist;
			})
			.catch(function(err){console.err(err.message)});
		}
	}
})