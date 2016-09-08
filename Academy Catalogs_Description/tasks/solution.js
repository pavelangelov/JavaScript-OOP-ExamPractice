function solve() {
    let getId = function() {
        var currentId = 0;
        return function() {
            return ++currentId;
        }
    }();

    const Genre_Min_Length = 2;
    const Genre_Max_Length = 20;

    class Validator {
        constructor() { }

        static validateName(name) {
            const Name_Min_Length = 2;
            const Name_Max_Length = 40;

            if (!name) {
                throw new Error('Name is undefined!');
            }

            let nameLen = name.length;
            if (nameLen < Name_Min_Length || Name_Max_Length < nameLen) {
                throw new Error('Name must be between 2 and 40 cgaracters!');
            }
        }

        static validateItemDescription(description) {
            if (!description) {
                throw new Error('Description cannot be empty string!');
            }
        }

        static validateISBN(isbn) {
            let ISBN_Min_Length = 10;
            let ISBN_Max_Length = 13;
            let length = isbn.length;
            if (!isbn) {
                throw new Error('ISBN cannot be undefined!');
            }
            if (length < 10 || 13 < length) {
                throw new Error('ISBN length must be between 10 and 13 symbols!');
            }

            for (var i = 0, len = isbn.length; i < len; i += 1) {
                if (isNaN(+isbn.charAt(i))) {
                    throw new Error('ISBN must contain only digits!');
                }

            }
        }

        static validateGenre(genre) {
            if (!genre || genre.length < Genre_Min_Length || Genre_Max_Length < genre.length) {
                throw new Error('Invalid genre!');
            }
        }

        static validateDuration(number) {
            if (isNaN(+number) || +number <= 0) {
                throw new Error('Duration must be number greater than 0!');
            }
        }

        static validateRating(number) {
            if (isNaN(+number) || +number < 1 || 5 < +number) {
                throw new Error('Rating must be number between 1 and 5!');
            }
        }
    }

    class ItemsValidator {
        constructor() { }

        static validateItem(item) {
            if (typeof item !== 'object') {
                throw new Error('Invalid item type!');
            }
        }

        static validateBookItem(bookItem) {
            if(!(bookItem instanceof Book)) {
                throw new Error('Cannot add this item to BookCatalog!');
            }
        }

        static validateMediaItem(mediaItem) {
            if(!(mediaItem instanceof Media)) {
                throw new Error('Cannot add this item to BookCatalog!');
            }
        }
    }

    class Item {
        constructor(name, description) {
            this.name = name;
            this.description = description;
            this.id = getId();
        }

        get name() {
            return this._name;
        }

        set name(value) {
            Validator.validateName(value);

            this._name = value;
        }

        get description() {
            return this._description;
        }

        set description(value) {
            Validator.validateItemDescription(value);

            this._description = value;
        }
    }

    class Book extends Item {
        constructor(name, isbn, genre, description) {
            super(name, description);
            this.isbn = isbn;
            this.genre = genre;
        }

        get isbn() {
            return this._isbn;
        }

        set isbn(value) {
            Validator.validateISBN(value);

            this._isbn = value;
        }

        get genre() {
            return this._genre;
        }

        set genre(value) {
            Validator.validateGenre(value);

            this._genre = value;
        }
    }

    class Media extends Item {
        constructor(name, rating, duration, description) {
            super(name, description);
            this.rating = rating;
            this.duration = duration;
        }

        get duration() {
            return this._duration;
        }

        set duration(value) {
            Validator.validateDuration(value);

            this._duration = value;
        }

        get rating() {
            return this._rating;
        }

        set rating(value) {
            Validator.validateRating(value);

            this._rating = value;
        }
    }

    class Catalog {
        constructor(name) {
            this.name = name;
            this._items = [];
            this.id = getId();
        }

        get name() {
            return this._name;
        }

        set name(value) {
            Validator.validateName(value);

            this._name = value;
        }

        get items() {
            return this._items;
        }

        set items(value) {
            this._items = value;
        }

        add(...items) {
            var thisItems = this._items;

            if (Array.isArray(items[0])) {
                items = items[0];
            }

            items.forEach(function (item) {
                ItemsValidator.validateItem(item);

                thisItems.push(item);
            });

            return this;
        }

        find(options) {
            if (!options) {
                throw new Error('Missing find parameter!');
            }

            if (typeof options === 'number') {
                let itemToReturn = null;
                this.items.forEach(function (item) {
                    if (item.id === options) {
                        itemToReturn = item;
                    }
                });

                return itemToReturn;

            } else if (typeof options === 'object') {
                var itemsToReturn = [],
                    itemName = options.name,
                    itemId = options.id;

                if (itemId) {
                    this.items.forEach(function (item) {
                        if (item.id === itemId) {
                            itemsToReturn.push(item);
                        }
                    });
                } else {
                    this.items.forEach(function (item) {
                        if (item.name === itemName) {
                            itemsToReturn.push(item);
                        }
                    });
                }

                return itemsToReturn;
            } else {
                throw new Error('Invalid find parameter!');
            }
        }

        search(pattern) {
            if(!pattern || pattern.length < 1) {
                throw new Error('Pattern must exist!');
            }

            let matchedItems = [];
            this.items.forEach(function(item) {
                let nameContainPatter = item.name.indexOf(pattern) >= 0,
                    descrContainPattert = item.description.indexOf(pattern) >= 0;
                if (nameContainPatter || descrContainPattert) {
                    matchedItems.push(item);
                }
            });

            return matchedItems;
        }
    }

    class BookCatalog extends Catalog {
        constructor(name) {
            super(name);
        }

        getGenres() {
            let genres = [];

            this.items.forEach(x => genres.push(x.genre));

            return genres;
        }

        find(options) {
            if (typeof options === 'object' && options.genre) {
                var itemsToReturn = [],
                    itemName = options.name,
                    itemId = options.id,
                    itemGenre = options.genre;

                if (itemId) {
                    this.items.forEach(function (item) {
                        if (item.id === itemId && item.name == itemName) {
                            itemsToReturn.push(item);
                        }
                    });
                } else {
                    this.items.forEach(function (item) {
                        if (item.genre === itemGenre) {
                            itemsToReturn.push(item);
                        }
                    });
                }

                return itemsToReturn;
            } else {
                return super.find(options);
            }
        }

        add(...items) {
            if (!items.length) {
                throw new Error('Missing item to add!');
            }
            if (Array.isArray(items[0])) {
                items = items[0];
            }

            items.forEach(x => ItemsValidator.validateBookItem(x));

            return super.add(items);
        }
    }

    class MediaCatalog extends Catalog {
        constructor(name) {
            super(name);
        }

        getTop(count) {
            if (typeof count !== 'number' || count < 1) {
                throw new Error('Invalid count!');
            }
            if (count > this.items.length) {
                count = this.items.length;
            }
            var sorted;
            if (this.items.length > 1) {
                sorted = this.items.sort(function(a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    } else if (a.rating < b.rating) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            } else {
                sorted = this.items;
            }
            
            let arrToReturn = [];
            for (let i = 0; i < count; i += 1) {
                let currentItem = sorted[i];
                arrToReturn.push({
                    id: currentItem.id,
                    name: currentItem.name
                });
            }

            return arrToReturn;
        }

        getSortedByDuration() {

        }
        
        add(...items) {
            if (!items.length) {
                throw new Error('Missing item to add!');
            }
            if (Array.isArray(items[0])) {
                items = items[0];
            }

            items.forEach(x => ItemsValidator.validateMediaItem(x));

            return super.add(items);
        }
        find(options) {
            if (typeof options === 'object' && options.rating) {
                var itemsToReturn = [],
                    itemName = options.name,
                    itemId = options.id,
                    itemRating = options.rating;

                if (itemId) {
                    this.items.forEach(function (item) {
                        if (item.id === itemId && item.name == itemName) {
                            itemsToReturn.push(item);
                        }
                    });
                } else {
                    this.items.forEach(function (item) {
                        if (item.rating === itemRating) {
                            itemsToReturn.push(item);
                        }
                    });
                }

                return itemsToReturn;
            } else {
                return super.find(options);
            }
        }
    }

    return {
        getBook: function (name, isbn, genre, description) {
            return new Book(name, isbn, genre, description);
        },
        getMedia: function (name, rating, duration, description) {
            return new Media(name, rating, duration, description);
        },
        getBookCatalog: function (name) {
            return new BookCatalog(name);
        },
        getMediaCatalog: function (name) {
            return new MediaCatalog(name);
        }
    };
}

module.exports = solve;