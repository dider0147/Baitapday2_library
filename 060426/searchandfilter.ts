import { LibraryData, Data } from "./libraryData.js";

export class SearchAndFilter {
    constructor(public libraryData: LibraryData) {
    }

    searchBookByID(id: number): Data | undefined {
        const datas = this.libraryData.getDatas();
        return datas.find(data => data.book.id === id);
    }

    searchBooksByTitle(title: string): Data[] {
        const datas = this.libraryData.getDatas();
        return datas.filter(data => data.book.title.includes(title));
    }

    filterByGenre(genre: string): Data[] {
        const datas = this.libraryData.getDatas();
        return datas.filter(data => data.book.genre.toLowerCase() === genre.toLowerCase());
    }
    filterByYear(year: number): Data[] {
        const datas = this.libraryData.getDatas();
        return datas.filter(data => data.book.publishedYear === year);
    }
    fillterByAuthor(author: string): Data[] {
        const datas = this.libraryData.getDatas();
        return datas.filter(data => data.book.author.toLowerCase() === author.toLowerCase());
    }

}