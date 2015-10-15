app.factory('SongFactory', function() {
	return {
		populateSongAudio: function(songs) {
			songs.forEach(function (song) {
				song.audioUrl = '/api/songs/' + song._id + '.audio';
			})
			return songs;
		},

		populateSongArtists: function(album) {
			var albumArtists = _.indexBy(album.artists, '_id');
			album.songs.forEach(function (song) {
				song.artists = song.artists.map(function (artistId) {
					return albumArtists[artistId];
				})
			})
			return album;
		}
	}
})