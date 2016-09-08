function solve() {
    let getId = function() {
        let currentId = 0;
        return function() {
            return ++currentId;
        };
    }();

    class Validator {
        constructor() {}

        static stringValidation(stringValue, paramName) {
            const Min_String_Length = 3;
            const Max_String_Length = 25;

            if (!stringValue) {
                throw new Error(`${paramName} cannot be empty!`);
            }

            let len = stringValue.length;
            if (len < Min_String_Length || Max_String_Length < len) {
                throw new Error(`${paramName} length must be between ${Min_String_Length} and ${Max_String_Length} symbols!`);
            }
        }

        static checkForPlayListInstace(objToCheck) {
            if (!(objToCheck instanceof PlayList)) {
                throw new Error('Cannot add object different from PlayList!');
            }
        }

        static checkForPlayableInstance(item) {
            let playableKeys = Object.keys(Playable);
            for (key of playableKeys) {
                if (!item[key]) {
                    throw new Error('Cannot add item different from playable!');
                }
            }
            // if(!(item instanceof Playable)) {
            //     throw new Error('Cannot add item different from playable!');
            // }
        }

        static checkAudioLength(audioLength) {
            if (audioLength <= 0) {
                throw new Error('The lenght of the audio must be greater than 0!');
            }
        }

        static validateMediaRating(imdbRating) {
            const Min_Rating_Value = 1;
            const Max_Rating_Value = 5;

            if (imdbRating < Min_Rating_Value || Max_Rating_Value < imdbRating) {
                throw new Error(`Video rating must be between ${Min_Rating_Value} and ${Max_Rating_Value}.`);
            }
        }
    }

    class Player {
        constructor(name) {
            this.name = name;
            this._id = getId();
            this._playLists = [];
        }

        get name() {
            return this._name;
        }

        set name(value) {
            Validator.stringValidation(value);

            this._name = value;
        }

        get id() {
            return this._id;
        }

        addPlaylist(playlistToAdd) {
            Validator.checkForPlayListInstace(playlistToAdd);

            this._playLists.push(playlistToAdd);

            return this;
        }

        getPlaylistById(id) {
            var playList = null;

            this._playLists.forEach(function(list) {
                if (list.id === id) {
                    playList = list;
                }
            });

            return playList;
        }

        removePlaylist(option) {
            let id;
            if (typeof option === 'object') {
                id = option.id;
            } else if (typeof option === 'number') {
                id = option;
            }

            let found = false;
            for (let i = 0, len = this._playLists.length; i < len; i += 1) {
                let currentElement = this._playLists[i];
                if (currentElement.id === id) {
                    found = true;
                    this._playLists.splice(i, 1);
                    break;
                }
            }

            if (!found) {
                throw new Error('Playlist with this id does not exist!');
            }

            return this;
        }
    }

    class PlayList {
        constructor(name) {
            this.name = name;
            this.id = getId();
            this._playableItems = [];
        }

        get name() {
            return this._name;
        }

        set name(value) {
            Validator.stringValidation(value);

            this._name = value;
        }

        addPlayable(playable) {
            Validator.checkForPlayableInstance(playable);

            this._playableItems.push(playable);

            return this;
        }

        getPlayableById(id) {
            let playable = null;

            for (let i = 0, len = this._playableItems.length; i < len; i += 1) {
                let currentItem = this._playableItems[i];
                if (currentItem.id === id) {
                    playable = this._playableItems.splice(i, 1)[0];
                    break;
                }
            }

            return playable;
        }

        removePlayable(options) {
            let id,
                found = false;

            if (typeof options === 'number') {
                id = options;
            } else if (typeof options === 'object') {
                id = options.id;
            }

            for (let i = 0, len = this._playableItems.length; i < len; i += 1) {
                let currentItem = this._playableItems[i];
                if (currentItem.id === id) {
                    found = true;
                    this._playableItems.splice(i, 1);
                    break;
                }
            }

            if (!found) {
                throw new Error('Item with this id does not exist!');
            }
        }

        listPlayables(page, size) {
            // TODO
        }
    }

    class Playable {
        constructor(title, author) {
            this.title = title;
            this.author = author;
            this._id = getId();
        }

        get title() {
            return this._title;
        }

        set title(value) {
            Validator.stringValidation(value);

            this._title = value;
        }

        get author() {
            return this._author;
        }

        set author(value) {
            Validator.stringValidation(value);

            this._author = value;
        }

        get id() {
            return this._id;
        }

        play() {
            return `${id}. ${title} - ${author}`;
        }
    }

    class Audio extends Playable {
        constructor(title, author, length) {
            super(title, author);
            this.length = length;
        }

        get length() {
            return this._length;
        }

        set length(value) {
            Validator.checkAudioLength(value);

            this._length = value;
        }

        play() {
            let baseOutput = super.play();

            return `${baseOutput} - ${this.length}`;
        }
    }

    class Video extends Playable {
        constructor(title, author, imdbRating) {
            super(title, author);
            this.imdbRating = imdbRating;
        }

        get imdbRating() {
            return this._imdbRating;
        }

        set imdbRating(value) {
            Validator.validateMediaRating(value);

            this._imdbRating = value;
        }

        play() {
            let baseOutput = super.play();

            return `${baseOutput} - ${this.imdbRating}`;
        }
    }

    return {
        getPlayer: function (name) {
            return new Player(name);
        },
        getPlaylist: function (name) {
           return new PlayList(name);
        },
        getAudio: function (title, author, length) {
            return new Audio(title, author, length);
        },
        getVideo: function (title, author, imdbRating) {
            return new Video(title, author, imdbRating);
        }
    };
}
var returnedPlayable,
    name = 'Rock and roll',
    playlist = solve().getPlaylist(name),
    playable = { id: 1, name: 'Banana Rock', author: 'Wombles' };

// returnedPlayable = playlist.addPlayable(playable).getPlayableById(1);
// console.log(returnedPlayable.id);
// console.log(returnedPlayable.name);
// console.log(returnedPlayable.author);

module.exports = solve;