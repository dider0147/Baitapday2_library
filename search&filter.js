class SearchAndFilter {
    constructor(libraryData) {
        this.libraryData = libraryData;
    }

    findBookByID(id) {
        const result = this.libraryData.getCombineData().find(data => data.book.id === id);
        return result || {qty: 0};
    }
    findBookByTitle(title) {
        return this.libraryData.getCombineData().find(data => data.book.title.toLowerCase() === title.toLowerCase());
    }
    findBooksByAuthor(author) {
        return this.libraryData.getCombineData().filter(data => data.book.author.toLowerCase() === author.toLowerCase());
    }
    findBooksByGenre(genre) {
        return this.libraryData.getCombineData().filter(data => data.book.genre.toLowerCase() === genre.toLowerCase());
    }
}
module.exports = SearchAndFilter;