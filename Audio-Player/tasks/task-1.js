function solve() {
    return {
        getPlayer: function (name) {
            
        },
        getPlaylist: function (name) {
           
        },
        getAudio: function (title, author, length) {
            
        },
        getVideo: function (title, author, imdbRating) {
            
        }
    };
}

// var result = solve();
// var audio = result.getAudio('asd', 'sdf', 4);
// audio = result.getAudio('asd', 'sdf', 4);
// console.log(audio.play());

/*var pl = result.getPlaylist('asd');

var playable = {id: 1, name: 'Rock', author: 'Stephen'};
pl.addPlayable(playable);
console.log(pl.getPlayableById(1));

console.log(pl.listPlayables(0, 10));
pl.removePlayable(1);
console.log(pl.getPlayableById(1));

var list = result.getPlaylist('Rock');
for (var i = 0; i < 35; i += 1) {
    list.addPlayable({id: (i + 1), name: 'Rock' + (9 - (i % 10))});
}

//console.log(list.listPlayables(0, 10));

/*returnedPlayables = list.listPlaylables(2,10);
 returnedPlayables = list.listPlaylables(3,10);
 console.log(returnedPlayables);*/

module.exports = solve;